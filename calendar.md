---
title: Open Research Calendar
show-avatar: false
nav-short: true
full-width: true
---
<p>Layout issues? <a href="https://calendar.google.com/calendar/u/0/embed?src=openresearchcalendar@gmail.com&amp;ctz=Europe/London" target="_blank" rel="noopener">View on Google instead</a></p>
<p style="text-align: center;"><iframe style="border-width: 0;" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FLondon&amp;src=b3BlbnJlc2VhcmNoY2FsZW5kYXJAZ21haWwuY29t&amp;color=%23F4511E&amp;showTitle=1&amp;title=Open%20Research%20Calendar&amp;showPrint=0&amp;showCalendars=0&amp;hl=en_GB" width="800" height="600" frameborder="0" scrolling="no"></iframe></p>
<p style="text-align: right;">Want to add <strong>the live calendar</strong> to your own? Select 'Add to Google Calendar'</p>
<p style="text-align: right;">&nbsp;</p>
<p style="text-align: left;">Want to add an <strong>individual event&nbsp;</strong>to your own calendar? Click on the event and select 'Copy to my calendar'</p>
<p style="text-align: left;">Do you want to <strong>subscribe to all events directly into your non-Google calendar?</strong> You can use the following iCal Link. <br><strong>NOTE:</strong> This will synchronise all of the Open Research Calendar events to your calendar. It is highly recommended to create a separate folder or calendar for these events so that you can remove them easily from your device if you wish to. The link to import into your calendar is: <a href="https://calendar.google.com/calendar/ical/openresearchcalendar%40gmail.com/public/basic.ics" id="ical-download-trigger" target="_blank" rel="noopener">iCal Import</a>.</p>

<div id="ical-download-modal" class="orc-modal" aria-hidden="true">
  <div class="orc-modal__backdrop" data-modal-close="true"></div>
  <div class="orc-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="ical-download-title">
    <button type="button" class="orc-modal__close" aria-label="Close download warning" data-modal-close="true">&times;</button>
    <h2 id="ical-download-title">Before you import these events</h2>
    <p>Please create a separate folder or calendar for these events before importing them.</p>
    <p>Merging them into your main or primary calendar can be extremely difficult to undo.</p>
    <p class="orc-modal__actions">
      <a href="https://calendar.google.com/calendar/ical/openresearchcalendar%40gmail.com/public/basic.ics" id="ical-download-continue" target="_blank" rel="noopener" class="orc-download-button">Continue to download</a>
      <button type="button" class="orc-cancel-button" data-modal-close="true">Cancel</button>
    </p>
  </div>
</div>

<style>
  .orc-modal {
    position: fixed;
    inset: 0;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 1000;
  }

  .orc-modal.is-open {
    display: flex;
  }

  .orc-modal__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
  }

  .orc-modal__dialog {
    position: relative;
    width: 100%;
    max-width: 540px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
    padding: 28px 24px 20px;
    z-index: 1;
  }

  .orc-modal__dialog h2 {
    margin-top: 0;
  }

  .orc-modal__dialog p {
    margin-bottom: 14px;
  }

  .orc-modal__close {
    position: absolute;
    top: 10px;
    right: 12px;
    border: 0;
    background: transparent;
    color: #666666;
    cursor: pointer;
    font-size: 28px;
    line-height: 1;
  }

  .orc-modal__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 0;
  }

  .orc-download-button,
  .orc-cancel-button {
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 600;
    text-decoration: none;
    font: inherit;
  }

  .orc-download-button {
    background: #ff7700;
    color: #ffffff;
  }

  .orc-download-button:hover,
  .orc-download-button:focus {
    background: #e56b00;
    color: #ffffff;
  }

  .orc-cancel-button {
    border: 1px solid #cccccc;
    background: #ffffff;
    color: #404040;
    cursor: pointer;
  }
</style>

<script>
  (function () {
    var trigger = document.getElementById("ical-download-trigger");
    var modal = document.getElementById("ical-download-modal");
    var continueLink = document.getElementById("ical-download-continue");

    if (!trigger || !modal) {
      return;
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }

    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    });

    modal.addEventListener("click", function (event) {
      if (event.target.matches("[data-modal-close='true']")) {
        closeModal();
      }
    });

    if (continueLink) {
      continueLink.addEventListener("click", function () {
        closeModal();
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  })();
</script>
