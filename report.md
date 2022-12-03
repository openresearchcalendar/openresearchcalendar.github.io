---
title: Reporting Events
show-avatar: false
nav-short: true
---
As a community tool, we trust the community to use it appropriately. However, all operations of this tool are automated to expedite communication, which makes the tool vulnerable to spam and predatory events. We request that the events added are community policed :oncoming_police_car:. If anything is wrong/ duplicated/ offensive/ inappropriate, we expect the community to report the event. :pencil2:  

<div id="tripetto"></div>
<script src="https://unpkg.com/tripetto-runner-foundation"></script>
<script src="https://unpkg.com/tripetto-runner-classic"></script>
<script src="https://unpkg.com/tripetto-services"></script>
<script>
var tripetto = TripettoServices.init({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiV1hmTGdnMWpkSkpzMFdZVk5USmRRbEd4WVZLQnFxWlNWUHpZdS9RNU1PQT0iLCJkZWZpbml0aW9uIjoiVTJnNDRTVE1xT0hCNHJzbUcwdXZkeHd5bk1zUmRRVWo4NjVPczlUNVJHbz0iLCJ0eXBlIjoiY29sbGVjdCJ9.HHBcD8uTU5N02PJiXKat-XBwoyM2zQRPsRtWYFjkFUs" });

TripettoClassic.run({
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

