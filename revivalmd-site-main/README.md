# RevivalMD Website

Website for RevivalMD Aesthetic Clinic, built with [Hugo](https://gohugo.io/) and deployed automatically by Netlify.

## How publishing works

1. Edit content (see the two options below).
2. Commit the change to the `main` branch.
3. Netlify detects the change, builds the site, and publishes it to revivalmd.com automatically in about 1-2 minutes.

There is no server to manage. If a change does not appear, check the Deploys tab in the Netlify dashboard.

## Option 1: Edit with Pages CMS (no coding needed)

The repo is pre-configured for [Pages CMS](https://pagescms.org), a free editor with friendly forms.

1. Go to https://app.pagescms.org and sign in with a GitHub account that has access to this repository.
2. Select this repository.
3. Edit Service Pages, Blog Posts, Local Area Pages, or About & Team.
4. Press Save. The change is committed automatically and the site republishes itself.

Fields marked "locked" (page URLs, SEO titles, system fields) are shown for reference but cannot be edited in the CMS. They control search rankings and page behavior.

## Option 2: Edit files directly (for developers)

All page text lives in plain Markdown and YAML files:

| What you want to change | Where |
|---|---|
| Service pages (Botox, fillers, laser, IV, etc.) | `content/services/*.md` |
| Blog posts | `content/blog/*.md` |
| Local area pages | `content/local/*.md` |
| About page and team bios | `content/about/*.md` |
| Homepage service cards, team, locations, testimonials | `data/*.yaml` |
| Navigation, footer, page templates | `layouts/` (Hugo templates) |

Each Markdown file starts with a block between `---` lines (front matter). The page body is normal Markdown below it.

Important rules:

- Do NOT change `url:`, `aliases:`, or `slug:` values in front matter. They preserve the site's Google rankings; changing them breaks existing links and search results.
- Keep front matter formatting intact (indentation, quotes, `---` fences).
- Layout and design changes require Hugo template and Tailwind CSS knowledge.

## Running the site locally (optional)

Only needed to preview before pushing:

```bash
# Requires Hugo Extended v0.139.3+ and Node.js
npm install
hugo server --disableFastRender
# open http://localhost:1313
```

Production build (what Netlify runs): `hugo --minify`

## Tech summary

- Hugo v0.139.3 (extended), Tailwind CSS v4 via Hugo Pipes, vanilla JS
- Booking via Cal.com embed
- Contact form handled by a Netlify Function (`netlify/functions/contact.js`)
- Netlify build settings in `netlify.toml`
