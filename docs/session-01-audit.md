# Session 01 Audit: Orientation and Part 9 Plan

**Date:** 6 August 2026
**Branch:** staging
**Status:** Part 9 in progress — inner pages done, index.html partially done, new pages and redirects not yet started.

---

## 1. Memory files

`CLAUDE.md` loads every session.

`.claude/rules/` files present and confirmed readable:
- `accessibility.md`
- `case-studies.md`
- `counters.md`
- `internal-linking.md`
- `seo-aeo.md`
- `home.md`
- `how-we-work.md`
- `other-pages.md`
- `services.md`

These are path-scoped (frontmatter `paths:`) and load automatically only when Claude is working on matching files. They do not auto-load in a fresh session on unmatched files.

`docs/site-build-spec.md` and `knowledge/` files do **not** auto-load. Read them on demand.

`/context` slash command is not available in the web app session. Cannot verify loaded files from the UI. Workaround: read each file directly to confirm existence and content.

---

## 2. Gap analysis: current site vs target structure

### Pages that exist

| URL | File | Status |
|---|---|---|
| `/` | `index.html` | Partially updated this session |
| `/work` | `work.html` | Updated this session |
| `/articles` | `articles.html` | Updated this session |
| `/articles/[slug]` | `article.html` | Updated this session |
| `/reports` | `reports.html` | Updated this session |
| `/ai-enabled-design` | `ai-enabled-design.html` | Updated this session |
| (old) `/work-project?slug=x` | `work-project.html` | Updated this session; kept alive pending redirects |

### Pages that do not exist yet (all new)

| URL | File needed |
|---|---|
| `/services` | `services.html` |
| `/how-we-work` | `how-we-work.html` |
| `/how-we-run-a-project` | `how-we-run-a-project.html` |
| `/contact` | `contact.html` |
| `/about` | `about.html` |
| `/ai-data-and-ip` | `ai-data-and-ip.html` |
| `/work/` | `work/index.html` |
| `/work/beautycrew` | `work/beautycrew.html` |
| `/work/policyfly` | `work/policyfly.html` |
| `/work/hearsay` | `work/hearsay.html` |
| `/work/winter-olympics-on-7` | `work/winter-olympics-on-7.html` |

### Other files missing

`sitemap.xml`, `robots.txt`, `llms.txt`, `content/metrics.json`

### Navigation state

Old nav: Work · Thinking · Research · AI-Enabled Design · Contact (#book)
Target nav: Work · Services · How we work · Thinking · About · Get in touch (/contact)

All updated pages now carry the new nav. Research reports moves to footer only. AI-Enabled Design leaves the nav.

---

## 3. Issues found in existing site

All confirmed by file inspection and grep.

| # | File(s) | Issue |
|---|---|---|
| 1 | All HTML except `coming-soon.html` | `noindex, nofollow` missing entirely |
| 2 | `index.html`, `articles.html`, `article.html`, `work.html` | `hello@antiphono.studio` — wrong email |
| 3 | All HTML | LinkedIn `href="#"` — dead link |
| 4 | All HTML | Instagram `href="#"` — dead link |
| 5 | `index.html` (8 instances) | Em dashes `&#8212;` throughout |
| 6 | `index.html` footer | `&mdash;` em dash in copyright line |
| 7 | `ai-enabled-design.html` line 331 | Em dash `&#8212;` in body content |
| 8 | `index.html:107` | `behavior` (American spelling) |
| 9 | `index.html:62` | "Established 2016" — should be 2018 |
| 10 | `index.html:195,203` | Invented stats: 52 products, 120+ research studies |
| 11 | `index.html:199,207` | Invented stats: 9 years, 14 specialists |
| 12 | `index.html:99` | "Three-stage process" label — conflicts with spec (4-stage is correct) |
| 13 | `index.html` | 3-stage process copy: Research, Design, Validate — remove entirely |
| 14 | `index.html` | Manifesto copy does not match Part 5.1 |
| 15 | `index.html` | Capabilities section lists 5 AI-specific services, not the 3 service families from spec |
| 16 | `ai-enabled-design.html:804–816` | Team section describes two unfilled roles as if they exist |
| 17 | All HTML | `#book` and `/#book` anchor links — must become `/contact` |
| 18 | `index.html` | Selected work links use `/work-project?slug=x` — must become `/work/x` |
| 19 | `index.html` | Oscar Winter featured on home page — not in spec's four launch case studies |
| 20 | `data.js` (policyfly summary) | Contains "revolutionising" — banned word |
| 21 | All HTML | `lang="en"` — should be `lang="en-AU"` |
| 22 | All HTML | `<html lang>` and missing `aria-label` on nav elements |

---

## 4. Spec conflicts and unworkable items

**1. 301 redirects require `server.js`.**
The spec says move case study URLs from `/work-project?slug=x` to `/work/x` with 301s. There is no `.htaccess`. Redirects must go in `server.js`. Straightforward, but needs to be planned and implemented there.

**2. Nav change creates temporarily broken links.**
The new nav includes Services, How we work, and About — pages that don't exist yet. All updated nav links now point to those paths. Stub pages with correct `<h1>` and noindex must be created before the next deploy.

**3. Counter values are placeholder.**
`content/metrics.json` does not exist yet. The spec's four counter values are invented. While `"placeholder": true`, `render.js` must show an amber warning label. The counter animation component (Part 9.3) has not been built yet.

**4. Oscar Winter on the home page.**
The current home page features PolicyFly, Winter Olympics on 7, and Oscar Winter. Oscar Winter is not in the spec's four launch case studies (BeautyCrew, PolicyFly, Hearsay, Winter Olympics on 7). The home page featured work section should show PolicyFly, Hearsay, and Winter Olympics on 7. Oscar Winter's images and data will need to stay in the repo but it will not have a case study page at launch.

**5. `ai-enabled-design.html` keeps its current URL until `/how-we-run-a-project` exists.**
The spec says 301 it once the target page exists. For now it stays live at its current URL with the updated nav and team section fix applied this session.

**6. No approved visual identity.**
The spec is explicit: do not invent a colour system or typeface. Work within existing `styles.css` tokens. Any new value added as a provisional CSS custom property.

**7. Footer "Position" column.**
The spec footer has three columns: Navigate, Position (AI data and IP · Accessibility · How we run a project), Contact. The Accessibility page is not in the spec site map. The Position column has been omitted from this session's footer updates. To be implemented properly in Part 4 (shared components). The current session updates Navigate and Connect columns only.

---

## 5. Part 9 progress this session

### Completed

- [x] `noindex, nofollow` added to: `work.html`, `articles.html`, `article.html`, `reports.html`, `work-project.html`, `ai-enabled-design.html`
- [x] `lang="en-AU"` on all updated pages
- [x] `<title>` and `<meta description>` updated on all updated pages
- [x] Nav updated to new target (Work · Services · How we work · Thinking · About · Get in touch) on all updated pages
- [x] Mobile menu updated on all updated pages
- [x] Footer nav links updated on all updated pages (Navigate column)
- [x] Footer email fixed: `hello@antiphono.studio` → `ben@antiphono.com` on all updated pages
- [x] Footer LinkedIn fixed: `href="#"` → `https://www.linkedin.com/in/bentweedie` on all updated pages
- [x] Footer Instagram: `href="#"` → `https://www.instagram.com/antiphono/` (placeholder) on all updated pages
- [x] Footer tagline updated on all updated pages
- [x] `/#book` → `/contact` on all updated pages
- [x] `ai-enabled-design.html` em dash in body (line 331) removed
- [x] `ai-enabled-design.html` team section: two unfilled-role cards removed, replaced with accurate single-person description
- [x] `index.html` head: `lang`, `noindex`, title, description updated

### Remaining for index.html

- [ ] Nav and mobile menu
- [ ] Hero: eyebrow text, "Established 2016" → "Established 2018"
- [ ] Manifesto section → replace with "Who we work with" and "What has changed" (Part 5.1 copy)
- [ ] Process section → replace 3-stage (Research, Design, Validate) with 4-stage (Design, Build, Testing, The record) using Part 5.1 copy
- [ ] Selected work links → `/work-project?slug=x` → `/work/x`; replace Oscar Winter with Hearsay
- [ ] Stats section → replace invented stats with counter block (4 counters with placeholder warning)
- [ ] Capabilities section → replace 5 AI services with 3 service families from Part 5.1
- [ ] Book section → replace with "How to start" (Part 5.1) and "Your data" (Part 5.1)
- [ ] Footer: update all nav links, email, social, tagline, remove em dash from copyright line

### Remaining new files

- [ ] `contact.html` — stub page (nav links to this, needs to exist)
- [ ] `services.html` — stub page
- [ ] `how-we-work.html` — stub page
- [ ] `about.html` — stub page
- [ ] `ai-data-and-ip.html` — stub page
- [ ] `work/index.html` — work gallery page (move work.html content here)
- [ ] `work/beautycrew.html` — case study stub
- [ ] `work/policyfly.html` — case study stub
- [ ] `work/hearsay.html` — case study stub
- [ ] `work/winter-olympics-on-7.html` — case study stub
- [ ] `content/metrics.json` — counter data (spec values, placeholder: true)
- [ ] `robots.txt` — disallow all

### Remaining code changes

- [ ] `server.js` — add 301 redirects: `/work-project?slug=x` → `/work/x` for all four case studies
- [ ] `data.js` — add `caseStudies` array per spec 6.2; fix "revolutionising" in policyfly summary; update home page work item links

---

## 6. Recommended order for next session

1. Finish `index.html` — all remaining sections
2. Create `content/metrics.json`
3. Create `robots.txt`
4. Create stub pages: `contact.html`, `services.html`, `how-we-work.html`, `about.html`, `ai-data-and-ip.html`
5. Create `work/` directory and four case study stubs
6. Update `server.js` with 301 redirects
7. Update `data.js` — caseStudies array, fix banned word, update work item links
8. Commit everything to staging
9. Verify on `antiphono-staging.up.railway.app`

---

## 7. Open questions (from `knowledge/INDEX.md`)

- Ben to confirm the "what we do not do" list beyond brand identity
- Ben to confirm two to three weeks is a realistic discovery engagement
- Ben to supply background copy for the About page
- Ben to supply headlines and summaries for the four launch case studies
- Real values for the four site counters
- Whether the contact page uses a form or email only
