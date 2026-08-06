# Approved page copy

Use these files as written. Do not rewrite, paraphrase or improve the copy. It has been reviewed against the voice rules in `CLAUDE.md`, the positioning rules, and the SEO and answer engine requirements in `.claude/rules/seo-aeo.md`. Changing a sentence usually breaks one of the three.

| File | Covers |
|---|---|
| `home.md` | `/` |
| `services.md` | `/services` |
| `how-we-work.md` | `/how-we-work` |
| `how-we-run-a-project.md` | `/how-we-run-a-project` |
| `ai-data-and-ip.md` | `/ai-data-and-ip` |
| `other-pages.md` | `/about`, `/work`, `/contact`, `/articles`, `/reports` |
| `navigation-and-states.md` | Header, footer, breadcrumbs, filters, counters, empty states, 404, 500, alt text and link text rules |

## What is not here

**Case study body content.** Four case studies need an at a glance strip, a problem section, three to five chapters, a detail section, an outcome and a handover section. None of it is written. Build the template and the index entries, and leave the content sections as visible `TODO` blocks. Do not draft placeholder case study copy.

**Ben's background** for the About page.

**Real counter values.** See `.claude/rules/counters.md`.

**Existing articles and reports.** Whatever is currently on `/articles` and `/reports` has not been audited against the voice rules. Flag anything that breaks them rather than silently rewriting it.

## TODO markers

Where copy is missing, leave a visible HTML comment naming what is needed and who from:

```html
<!-- TODO Ben: case study headline, one plain sentence stating the outcome -->
```

Never invent content to fill a gap. An empty section with a marker is honest and gets filled. Plausible invented copy does not.
