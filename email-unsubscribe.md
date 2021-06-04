---
show-avatar: false
nav-short: true
---
<title>Email Unsubscribe</title>
<div id="tripetto"></div>
<script src="https://unpkg.com/tripetto-runner-foundation"></script>
<script src="https://unpkg.com/tripetto-runner-autoscroll"></script>
<script src="https://unpkg.com/tripetto-services"></script>
<script>
var tripetto = TripettoServices.init({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiV1hmTGdnMWpkSkpzMFdZVk5USmRRbEd4WVZLQnFxWlNWUHpZdS9RNU1PQT0iLCJkZWZpbml0aW9uIjoiZmU0M0Y5L2ZOQ21VZ29vMUcyOXd6NlZNWE9DQjF1bnVmYXBNMFdzd0hndz0iLCJ0eXBlIjoiY29sbGVjdCJ9.NYxrzYRl7HQUEGrFKcYrF1YmfHVWvzD5Eqxj6uzAObo" });

TripettoAutoscroll.run({
    element: document.getElementById("tripetto"),
    definition: tripetto.definition,
    styles: tripetto.styles,
    l10n: tripetto.l10n,
    locale: tripetto.locale,
    translations: tripetto.translations,
    attachments: tripetto.attachments,
    onSubmit: tripetto.onSubmit
});
</script>
