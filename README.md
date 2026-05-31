# Jonathan Hung — Personal Website

A modern, terminal-themed personal portfolio built with vanilla **HTML / CSS / JS**.
No build step. No dependencies. Deploys anywhere static (GitHub Pages, Netlify, Vercel, S3, your own server, …).

```
.
├── index.html        # all content lives here
├── styles.css        # theme + layout
├── script.js         # mobile nav, typed tagline, contact form
├── README.md
└── assets/
    ├── favicon.svg
    └── resume.pdf    # your real resume
```

## Sections

1. **Hero** — name, role, short bio, animated rotating tagline.
2. **About** — background, interests, languages, full education timeline (UCI + West Valley + Lynbrook), notable coursework, honors.
3. **Skills** — grouped chips (Languages, Backend, Messaging & Data, Cloud & Observability, Security, Frontend & AI, Tooling & Testing).
4. **Work Experience** — Zoom, UC Irvine OIT, Amazon, plus a compact "Earlier Roles" card (UL, UCI teaching, Dreams for Schools, Startup Wonder).
5. **Projects** — SMS Spam Predictor, Search Engine, Simple Shell, Electric Bike.
6. **Contact** — location, email, resume download, socials, contact form.

## Quick start

Open `index.html` directly in a browser, **or** serve the folder locally
(recommended so relative paths behave normally):

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

## Still-placeholder content (you'll want to edit these)

Most copy is pulled from your resume, but a few items are intentional placeholders:

| Where | What to replace |
| --- | --- |
| Contact → `socials` list | Real `github.com/<handle>` and `linkedin.com/in/<handle>` URLs |
| (optional) Hero → bio | Tweak phrasing to taste |
| (optional) About → `interests` | Add/remove items |
| `script.js` → `phrases` array | The rotating phrases that type past the cursor |

Open `index.html` and search for `yourhandle` to find the social links.

## Theme

The color palette lives at the top of `styles.css` as CSS variables
(`--bg`, `--prompt`, `--green`, `--amber`, …). Change them in one place
to re-skin the whole site.

## Contact form

By default the form uses a `mailto:` fallback — submitting it opens the
visitor's email client pre-filled with the message, addressed to
`hungjonathan@gmail.com` (configured in `script.js` as `TO_EMAIL`). No
backend required.

When you're ready for a real form:

- **Formspree** — sign up, replace the submit handler in `script.js` with a
  `fetch("https://formspree.io/f/<your-id>", { method: "POST", body: fd })`.
- **Netlify Forms** — add `data-netlify="true"` to the `<form>` and a hidden
  `form-name` input. Netlify handles the rest.
- **Your own API** — `POST` the `FormData` to your endpoint.

## Deploy

### GitHub Pages

```bash
git init && git add . && git commit -m "feat: portfolio"
git branch -M main
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
```

Then in repo **Settings → Pages**, set source to `main` / `/ (root)`.

For a custom domain like `jonathanhung.dev`, add it under Pages → Custom domain.

### Netlify

Drag-and-drop the folder onto <https://app.netlify.com/drop>, or
`npx netlify deploy --prod --dir=.`.

### Vercel

```bash
npx vercel --prod
```

## Accessibility & performance notes

- Semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`).
- Respects `prefers-reduced-motion`.
- All animations are CSS / lightweight JS — no frameworks, no bundle.
- Fonts loaded via `preconnect` + `display=swap` for fast first paint.
- Mobile responsive with a hamburger menu under ~820px.
