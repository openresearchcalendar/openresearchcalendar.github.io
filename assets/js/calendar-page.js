(function () {
  const GOOGLE_SHEET_ID = "1QnsALwDwHk4HJQGj0Sc19uJ5sLmmQDS3xUWMXW0Uh9o";
  const GOOGLE_SHEET_NAME = "Form responses 8";
  const UPCOMING_LIMIT = 8;
  const GVIZ_ENDPOINT =
    "https://docs.google.com/spreadsheets/d/" +
    GOOGLE_SHEET_ID +
    "/gviz/tq?sheet=" +
    encodeURIComponent(GOOGLE_SHEET_NAME) +
    "&headers=1&tq=" +
    encodeURIComponent("select *");

  const whenReady = document.readyState === "loading" ? "DOMContentLoaded" : null;
  if (whenReady) {
    document.addEventListener(whenReady, init);
  } else {
    init();
  }

  function init() {
    initIcalModal();
    initUpcomingEvents();
  }

  function initIcalModal() {
    const modal = document.getElementById("ical-download-modal");
    const continueLink = document.getElementById("ical-download-continue");
    const triggers = document.querySelectorAll("[data-ical-trigger='true']");
    let lastTrigger = null;

    if (!modal || !triggers.length) {
      return;
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("orc-modal-open");
      if (lastTrigger) {
        lastTrigger.focus();
      }
    }

    function openModal(trigger) {
      lastTrigger = trigger;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("orc-modal-open");
      if (continueLink) {
        continueLink.focus();
      }
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        openModal(trigger);
      });
    });

    modal.addEventListener("click", function (event) {
      if (event.target.matches("[data-modal-close='true']")) {
        closeModal();
      }
    });

    if (continueLink) {
      continueLink.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  async function initUpcomingEvents() {
    const dom = {
      status: document.getElementById("orc-upcoming-status"),
      error: document.getElementById("orc-upcoming-error"),
      empty: document.getElementById("orc-upcoming-empty"),
      list: document.getElementById("orc-upcoming-list")
    };

    if (!dom.status || !dom.error || !dom.empty || !dom.list) {
      return;
    }

    try {
      const table = await fetchSheet();
      const events = transformToEvents(table);
      const upcomingEvents = events.filter(isUpcomingEvent).sort(compareDateAsc).slice(0, UPCOMING_LIMIT);

      dom.status.hidden = true;

      if (!upcomingEvents.length) {
        dom.empty.hidden = false;
        return;
      }

      renderUpcomingEvents(upcomingEvents, dom.list);
    } catch (error) {
      console.error("Failed to load upcoming events:", error);
      dom.status.hidden = true;
      dom.error.hidden = false;
      dom.error.textContent = "Sorry, we were unable to load the upcoming events. Please refresh the page to try again.";
    }
  }

  async function fetchSheet() {
    const response = await fetch(GVIZ_ENDPOINT);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Unexpected response format");
    }

    const json = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    return json.table;
  }

  function transformToEvents(table) {
    const labelToIndex = table.cols.reduce(function (accumulator, column, index) {
      accumulator[column.label] = index;
      return accumulator;
    }, {});

    function getCell(row, label) {
      const index = labelToIndex[label];
      if (index === undefined) {
        return {};
      }

      const cell = row.c[index];
      if (!cell) {
        return {};
      }

      return {
        value: cell.v || "",
        formatted: cell.f || ""
      };
    }

    return table.rows
      .map(function (rowData) {
        const row = { c: rowData.c };
        const rawTitle = String(getCell(row, "Event title").value || "").trim();

        if (!rawTitle) {
          return null;
        }

        const titleInfo = extractLanguageFromTitle(rawTitle);
        const startCell = getCell(row, "Start Date&Time");
        const endCell = getCell(row, "End Date&Time");
        const description = String(getCell(row, "Description").value || "").trim();
        const tagsRaw = String(getCell(row, "Tags").value || "").trim();

        return {
          title: titleInfo.cleanTitle || rawTitle,
          language: titleInfo.language || "",
          location: String(getCell(row, "Location").value || "").trim(),
          url: String(getCell(row, "URL").value || "").trim(),
          description: description,
          timezone: String(getCell(row, "Timezone").value || "").trim(),
          startDate: parseDate(startCell.value),
          endDate: parseDate(endCell.value),
          tags: parseTags(tagsRaw)
        };
      })
      .filter(Boolean);
  }

  function parseDate(value) {
    if (!value) {
      return null;
    }

    if (typeof value === "string" && value.indexOf("Date(") === 0) {
      const parts = value
        .slice(5, -1)
        .split(",")
        .map(function (part) {
          return Number(part);
        });

      return new Date(parts[0], parts[1], parts[2], parts[3] || 0, parts[4] || 0, parts[5] || 0);
    }

    const parsedDate = new Date(value);
    return isNaN(parsedDate) ? null : parsedDate;
  }

  function parseTags(value) {
    if (!value) {
      return [];
    }

    return value
      .split(",")
      .map(function (tag) {
        return tag.trim();
      })
      .filter(Boolean)
      .slice(0, 3);
  }

  function extractLanguageFromTitle(title) {
    const match = title.match(/\s*\[([^\]]+)\]\s*$/);
    if (!match || typeof match.index !== "number") {
      return { cleanTitle: title, language: "" };
    }

    return {
      cleanTitle: title.slice(0, match.index).trim(),
      language: match[1].trim()
    };
  }

  function isUpcomingEvent(event) {
    const now = new Date();

    if (event.endDate instanceof Date) {
      return event.endDate >= now;
    }

    if (event.startDate instanceof Date) {
      return event.startDate >= now;
    }

    return false;
  }

  function compareDateAsc(a, b) {
    if (!a.startDate && !b.startDate) {
      return (a.title || "").localeCompare(b.title || "", undefined, { sensitivity: "base" });
    }
    if (!a.startDate) {
      return 1;
    }
    if (!b.startDate) {
      return -1;
    }

    const difference = a.startDate - b.startDate;
    if (difference !== 0) {
      return difference;
    }

    return (a.title || "").localeCompare(b.title || "", undefined, { sensitivity: "base" });
  }

  function renderUpcomingEvents(events, container) {
    const fragment = document.createDocumentFragment();

    events.forEach(function (event) {
      const card = document.createElement("article");
      card.className = "orc-upcoming-card";

      const date = document.createElement("p");
      date.className = "orc-upcoming-card__date";
      date.textContent = formatDateRange(event.startDate, event.endDate, event.timezone);
      card.appendChild(date);

      const title = document.createElement("h3");
      title.textContent = event.title;
      card.appendChild(title);

      if (event.location) {
        const location = document.createElement("p");
        location.className = "orc-upcoming-card__meta";
        location.textContent = "Location: " + event.location;
        card.appendChild(location);
      }

      const chips = buildChips(event);
      if (chips.childNodes.length) {
        card.appendChild(chips);
      }

      if (event.description) {
        const summary = document.createElement("p");
        summary.className = "orc-upcoming-card__summary";
        summary.textContent = truncateText(event.description, 190);
        card.appendChild(summary);
      }

      if (event.url) {
        const link = document.createElement("a");
        link.className = "orc-upcoming-card__link";
        link.href = event.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Open event page";
        card.appendChild(link);
      }

      fragment.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
  }

  function buildChips(event) {
    const wrapper = document.createElement("div");
    wrapper.className = "orc-upcoming-card__chips";

    if (event.language) {
      wrapper.appendChild(createChip(event.language));
    }

    event.tags.forEach(function (tag) {
      wrapper.appendChild(createChip(tag));
    });

    return wrapper;
  }

  function createChip(label) {
    const chip = document.createElement("span");
    chip.className = "orc-chip";
    chip.textContent = label;
    return chip;
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    return text.slice(0, maxLength).trimEnd() + "...";
  }

  function formatDateRange(startDate, endDate, timezone) {
    if (!(startDate instanceof Date) || isNaN(startDate)) {
      return timezone ? "Date TBC (" + timezone + ")" : "Date TBC";
    }

    const startLabel = formatDate(startDate);
    const sameDay =
      endDate instanceof Date &&
      !isNaN(endDate) &&
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate();

    let label = startLabel;
    if (endDate instanceof Date && !isNaN(endDate)) {
      label += sameDay ? " to " + formatTime(endDate) : " to " + formatDate(endDate);
    }

    if (timezone) {
      label += " (" + timezone + ")";
    }

    return label;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function formatTime(date) {
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }
})();
