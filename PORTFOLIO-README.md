# Portfolio Architecture — Maintenance Guide

This site is intentionally split into three independent layers so that
**content**, **structure/config** and **design** never need to touch each
other:

```
data/                     <- WHAT to say (your content, edit this often)
assets/js/                <- HOW it's assembled (rarely needs changes)
assets/css/themes/*.css   <- HOW it looks (swap or add new visual themes)
```

## 1. Updating your content

Everything visible on the page is driven by plain JSON files in [data/](/data):

| File | Controls |
|---|---|
| [data/profile.json](/data/profile.json) | Name, title, photo, location, contact details, social links, hero quote, career-summary bullets |
| [data/experience.json](/data/experience.json) | Work history timeline |
| [data/education.json](/data/education.json) | Degrees |
| [data/skills.json](/data/skills.json) | Skill categories/tags, languages, interests |
| [data/projects.json](/data/projects.json) | Project cards (title, image, tags, summary) |
| [data/testimonials.json](/data/testimonials.json) | Testimonials — leave `items: []` for the "coming soon" empty state |
| [data/site.json](/data/site.json) | Nav links, page `<title>`/meta, theme registry, and the 3 serverless integrations |

Edit the JSON, save, refresh the page — no build step, no HTML/JS edits
needed. Because the site loads these files with `fetch()`, you must serve
the folder over `http://` (e.g. `python -m http.server`) rather than opening
`index.html` directly via `file://` when testing locally. GitHub Pages
already serves it correctly.

## 2. Switching or adding a design theme

The whole visual identity (colors, fonts, radii, shadows) lives in small
CSS-variable files under [assets/css/themes/](/assets/css/themes):

- `classic.css` — the original charcoal/yellow look, kept as the default.
- `midnight.css` — a dark, alternate "lead engineer" skin, proving the
  same content/markup can be fully re-skinned.

To add a new theme:
1. Copy `assets/css/themes/classic.css` to e.g. `assets/css/themes/sunrise.css`
   and change the `--color-*` / `--font-*` / `--shadow-*` / `--radius` values.
2. Register it in `data/site.json`:
   ```json
   { "id": "sunrise", "label": "Sunrise", "file": "assets/css/themes/sunrise.css" }
   ```
3. Reload the page — the header's **Theme** button now cycles through it too.
   You can also force a theme for a link with `?theme=sunrise`.

No HTML, JS or content changes are ever required to add/switch a theme.

## 3. Serverless features (all free-tier, no backend required)

Configured centrally in `data/site.json -> integrations`:

- **Contact form** (`contactForm`) — uses [Formspree](https://formspree.io)
  (free tier, no credit card). Currently enabled with your configured endpoint.
  To configure a different form:
  1. Create a free form at formspree.io and copy its endpoint URL.
  2. Paste it into `integrations.contactForm.endpoint`.
  3. Set `integrations.contactForm.enabled` to `true`.
- **Testimonial form** (`testimonialForm`) — same pattern; submissions land
  in your inbox for manual review. Once you're happy with one, add it as a
  plain object to `data/testimonials.json`:
  ```json
  { "name": "Jane Doe", "role": "Engineering Manager, Acme", "quote": "..." }
  ```
- Both forms submit via POST with a JSON response, show accessible delivery
  feedback, prevent duplicate pending submissions, and keep entered text on
  failure. Testimonials can be submitted even when existing reviews are shown;
  they remain unpublished until you manually add them to the JSON content.
  Email links remain available if delivery fails. Check the Formspree dashboard
  for recipient verification, domain restrictions and free-tier quota.
- **Hit counter** (`hitCounter`) — currently disabled because Formspree is not
  a visitor-counter service. The existing renderer uses a `hits.seeyoufarm.com`
  badge; to use it, set `provider: "seeyoufarm"`, set `targetUrl` to your
  public portfolio URL and enable it only after checking service availability.
  Do not send automatic page-view submissions to Formspree.

## 4. File map

```
index.html                     new, JSON-driven homepage (this replaces the old one)
classic-2019.html               unmodified snapshot of the previous homepage, kept for reference
portfolio/index.html            unchanged — detailed project write-ups, linked from Projects section
json/kural.json                 unchanged — Thirukural data source, reused as-is
data/*.json                     all editable content — see table above
assets/css/base.css              layout & component styling (theme-agnostic, uses CSS variables only)
assets/css/themes/*.css          theme definitions (colors/fonts/shadows only)
assets/js/main.js                entry point: loads data, applies theme, renders every section
assets/js/modules/dataStore.js   fetch + cache layer for /data/*.json
assets/js/modules/theme.js       theme switching, persistence, ?theme= override
assets/js/modules/utils.js       tiny DOM helper functions
assets/js/modules/render/*.js    one file per page section (hero, about, experience, skills, projects, testimonials, thirukural, contact, hitcounter)
```

## 5. Known assumptions to double-check

- **Privacy**: home address, date of birth, Skype/WhatsApp handles and
  secondary personal emails from the old site were intentionally left out
  of `data/profile.json` for a public, recruiter-facing professional page.
  Phone number was kept since it's already public on the current CV. Adjust
  freely in `data/profile.json`.
- **LinkedIn**: automated scraping of the LinkedIn profile wasn't possible
  (login-walled); content instead reflects the up-to-date Overleaf CV plus
  the existing site/portfolio. Review `data/experience.json`,
  `data/education.json` and `data/skills.json` against your LinkedIn profile
  and adjust wording/dates as needed.
- **CV file**: `assets/files/Sivashankar-Palraj-CV.pdf` was copied from your
  local Overleaf output at the time of writing — replace it whenever you
  export a newer version (same filename, or update `data/profile.json ->
  resume.file`).
