---
show-avatar: false
nav-short: true
---

<script src="https://unpkg.com/tripetto-runner-foundation"></script>
<script src="https://unpkg.com/tripetto-runner-classic"></script>
<script src="https://unpkg.com/tripetto-services"></script>
<script>
var tripetto = TripettoServices.init({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiV1hmTGdnMWpkSkpzMFdZVk5USmRRbEd4WVZLQnFxWlNWUHpZdS9RNU1PQT0iLCJkZWZpbml0aW9uIjoibGdDRmlFb3JZQlUvNDRIWmpma2hWUUhEeThTc0JuMUNvcDk1Nk04Y3IwMD0iLCJ0eXBlIjoiY29sbGVjdCJ9.FJo6S9Wg8bbExjYqoh5YAi0qJ_pgZ7soTLWG8XTlG9g" });

TripettoClassic.run({
    element: document.body, 
    definition: tripetto.definition,
    styles: tripetto.styles,
    l10n: tripetto.l10n,
    locale: tripetto.locale,
    translations: tripetto.translations,
    attachments: tripetto.attachments,
    onSubmit: tripetto.onSubmit
});
</script>
