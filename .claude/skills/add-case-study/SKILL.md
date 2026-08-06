---
name: add-case-study
description: "Use when adding a new case study to the Antiphono site, or updating an existing one. Covers the nine section template, the index entry in data.js, the controlled service vocabulary, image handling, related links and the checks to run before it is considered done. Trigger on any request to add, write, draft or update a case study, project page or piece of work on the site."
---

# Adding a case study

Follow this every time. Consistency across case studies is what makes the gallery look like a studio rather than a folder.

## Before writing anything

Ask for, and do not guess:

- Client name, and whether they can be named publicly.
- Sector.
- Start year, and end year or "present".
- Which services were delivered, from the controlled vocabulary.
- What the problem was, in the client's terms.
- What happened, and whether any outcome number has a real source.
- What the client's team took forward and now runs.
- Which assets exist.

If any of these is missing, write a visible `TODO:` naming what is needed. Never invent it.

## Step 1: index entry

Add an object to `caseStudies` in `data.js`. Fields and the controlled service vocabulary are in `.claude/rules/case-studies.md`.

Services must come from the vocabulary exactly. A new value fragments the gallery filter, so if the work genuinely does not fit, raise it rather than inventing a label.

## Step 2: the page

Copy an existing case study file from `work/` as the starting point. Never build one from scratch, or the class names drift.

Nine sections in order: hero, at a glance, the problem, three to five chapters, the detail, what happened, how it runs now, client quote, related.

Section 7, "How it runs now", is required and is not a footnote. It must make clear that the client's own development team takes the work through their own deployment process. Never imply Antiphono deploys to their production environment.

## Step 3: chapters

Three to five. One idea each, one to two paragraphs, one dominant visual.

Use `.cs-chapter--sticky` exactly once, on the strongest chapter. Repeating it removes the effect.

## Step 4: the detail section

One deep dive. Prefer an embedded live prototype or a before and after slider over a static image. This is the section that shows craft rather than process, and it is the main reason someone remembers the case study.

## Step 5: links

- Every service in "At a glance" links to its anchor on `/services`.
- The related block carries two other case studies plus one service or article.
- Update the related blocks on the two case studies you linked to, so the connection runs both ways.

## Step 6: metadata

Title, meta description, canonical URL, Open Graph and Twitter tags, `CreativeWork` JSON-LD, breadcrumbs. Keep `noindex` in place until launch.

## Before calling it done

- [ ] Body copy is 400 to 700 words.
- [ ] Every heading passes the clarity test.
- [ ] Australian English. No em dashes anywhere.
- [ ] No number without a recorded source.
- [ ] Every image has meaningful alt text.
- [ ] Every iframe has a `title` and a text link to open it directly.
- [ ] Keyboard test on the slider and any interactive element.
- [ ] The case study links to at least two others, and they link back.
- [ ] `sitemap.xml` includes the new page.
- [ ] Client name only appears if they have cleared it.

## Record it

Add a line to `knowledge/INDEX.md` noting the case study was added and anything decided while writing it, such as what was left out and why.
