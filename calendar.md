---
title: Open Research Calendar
show-avatar: false
nav-short: true
full-width: true
---
<link rel="stylesheet" href="/assets/css/calendar-page.css">

<div class="orc-calendar-page">
  <section class="orc-action-bar" aria-label="Calendar shortcuts">
    <div class="orc-action-bar__copy">
      <p class="orc-action-bar__eyebrow">Responsive calendar view</p>
      <p class="orc-action-bar__summary">
        Use the embedded calendar on larger screens. On phones and tablets, this page shifts to an upcoming events list that is much easier to browse.
      </p>
    </div>
    <div class="orc-action-bar__buttons">
      <a
        class="orc-button orc-button--primary"
        href="https://calendar.google.com/calendar/u/0/embed?src=openresearchcalendar@gmail.com&amp;ctz=Europe/London"
        target="_blank"
        rel="noopener"
      >Open in Google</a>
      <a class="orc-button orc-button--secondary" href="/events-list">View events list</a>
      <a class="orc-button orc-button--secondary" href="/add-event">Add an event</a>
    </div>
  </section>

  <div class="orc-calendar-layout">
    <section class="orc-panel orc-panel--calendar" id="calendar-view">
      <div class="orc-panel__header">
        <div>
          <p class="orc-panel__eyebrow">Desktop view</p>
          <h2>Calendar view</h2>
        </div>
        <p class="orc-panel__intro">
          The embedded month view is kept for larger screens. If you want the full Google Calendar interface, use the shortcut above.
        </p>
      </div>

      <div class="orc-calendar-frame">
        <iframe
          title="Open Research Calendar"
          src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FLondon&amp;src=b3BlbnJlc2VhcmNoY2FsZW5kYXJAZ21haWwuY29t&amp;color=%23F4511E&amp;showTitle=1&amp;title=Open%20Research%20Calendar&amp;showPrint=0&amp;showCalendars=0&amp;hl=en_GB"
          loading="lazy"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </section>

    <section class="orc-panel orc-panel--upcoming">
      <div class="orc-panel__header">
        <div>
          <p class="orc-panel__eyebrow">Mobile and tablet fallback</p>
          <h2>Upcoming events</h2>
        </div>
        <p class="orc-panel__intro">
          This list is always available and becomes the main browsing view on smaller screens.
        </p>
      </div>

      <p class="orc-mobile-note">
        The embedded month view is hidden on smaller screens to keep this page readable. Use
        <a href="https://calendar.google.com/calendar/u/0/embed?src=openresearchcalendar@gmail.com&amp;ctz=Europe/London" target="_blank" rel="noopener">Google Calendar</a>
        if you still want the full month view.
      </p>

      <div id="orc-upcoming-status" class="orc-status" aria-live="polite">Loading upcoming events...</div>
      <div id="orc-upcoming-error" class="orc-message orc-message--error" hidden></div>
      <div id="orc-upcoming-empty" class="orc-message" hidden>No upcoming events are available right now.</div>
      <div id="orc-upcoming-list" class="orc-upcoming-list"></div>

      <div class="orc-panel__footer">
        <a class="orc-text-link" href="/events-list">Browse the full events list</a>
      </div>
    </section>
  </div>

  <section class="orc-panel orc-panel--actions">
    <div class="orc-panel__header">
      <div>
        <p class="orc-panel__eyebrow">Add to your own calendar</p>
        <h2>Choose how you want to subscribe</h2>
      </div>
      <p class="orc-panel__intro">
        Keep the live shared calendar, save a single event, or import the full feed into another calendar app.
      </p>
    </div>

    <div class="orc-action-cards">
      <article class="orc-action-card">
        <p class="orc-action-card__eyebrow">Google Calendar</p>
        <h3>Add the live calendar</h3>
        <p>
          Open the live calendar in Google and select <strong>Add to Google Calendar</strong> to keep the shared calendar synced.
        </p>
        <a
          class="orc-button orc-button--primary"
          href="https://calendar.google.com/calendar/u/0/embed?src=openresearchcalendar@gmail.com&amp;ctz=Europe/London"
          target="_blank"
          rel="noopener"
        >Open live calendar</a>
      </article>

      <article class="orc-action-card">
        <p class="orc-action-card__eyebrow">Single event</p>
        <h3>Copy one event to your calendar</h3>
        <p>
          Open an event in Google Calendar and select <strong>Copy to my calendar</strong> if you only want one item rather than the whole feed.
        </p>
        <a
          class="orc-button orc-button--secondary"
          href="https://calendar.google.com/calendar/u/0/embed?src=openresearchcalendar@gmail.com&amp;ctz=Europe/London"
          target="_blank"
          rel="noopener"
        >Choose an event in Google</a>
      </article>

      <article class="orc-action-card">
        <p class="orc-action-card__eyebrow">Non-Google calendars</p>
        <h3>Import the full iCal feed</h3>
        <p>
          Subscribe to every Open Research Calendar event from another calendar app. We recommend importing it into a separate calendar first.
        </p>
        <button type="button" class="orc-button orc-button--secondary" data-ical-trigger="true">Open iCal import</button>
      </article>
    </div>
  </section>
</div>

<div id="ical-download-modal" class="orc-modal" aria-hidden="true">
  <div class="orc-modal__backdrop" data-modal-close="true"></div>
  <div
    class="orc-modal__dialog"
    role="dialog"
    aria-modal="true"
    aria-labelledby="ical-download-title"
    aria-describedby="ical-download-description"
  >
    <button type="button" class="orc-modal__close" aria-label="Close download warning" data-modal-close="true">&times;</button>
    <h2 id="ical-download-title">Before you import these events</h2>
    <p id="ical-download-description">Please create a separate folder or calendar for these events before importing them.</p>
    <p>Merging them into your main or primary calendar can be extremely difficult to undo.</p>
    <div class="orc-modal__actions">
      <a
        href="https://calendar.google.com/calendar/ical/openresearchcalendar%40gmail.com/public/basic.ics"
        id="ical-download-continue"
        target="_blank"
        rel="noopener"
        class="orc-button orc-button--primary"
      >Continue to download</a>
      <button type="button" class="orc-button orc-button--secondary" data-modal-close="true">Cancel</button>
    </div>
  </div>
</div>

<script src="/assets/js/calendar-page.js"></script>
