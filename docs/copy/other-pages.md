# Remaining page copy

**Approved copy. Use as written.**

---

# About, `/about`

**Title:** `About Antiphono | Product Design Studio, Sydney`
**Meta description:** `Antiphono is a product design and research studio in Sydney, founded by Ben Tweedie. Established 2018, formerly BT Digital.`
**Schema:** `AboutPage`, `Person` for Ben, `Organization`

## H1: About Antiphono

Antiphono is a product design and research studio in Sydney, Australia. We work with technology businesses on research, product design, design systems and working prototypes, and we stay long enough to find out whether it worked.

The studio has been operating since 2018, previously as BT Digital. The name changed because the work did.

## H2: Ben Tweedie, Founder and Product Lead

Ben leads strategy, client relationships and creative direction, and does the design and prototyping work himself. Clients deal with the person doing the work, which is the main advantage of a studio this size.

[LinkedIn]

> `TODO: Ben to supply two or three sentences of background. Where he worked before, what he has shipped, what he is good at.`

## H2: The team

Antiphono is small and senior by design. There is no junior layer absorbing volume and no margin taken on it.

Two contract specialists are joining during 2026: a senior designer for design and rollout work, and a researcher working on applied AI tooling. Until they start, Ben does the work.

## H2: What Antiphono means

Antiphony is a musical term for call and response. Two voices in dialogue, each shaping the other.

It is the shape of the relationship between human judgement and AI, and it is why the name changed. Design, research and development have shifted in the last two years, and our traditional services, UX design, research, strategy and prototyping, now move at a different speed because of it. Nothing you relied on has gone. What changed is how fast it moves and how much of it compounds.

## H2: How we work, and what we hold ourselves to

WCAG 2.1 AA on everything we design, build or advise on. The Australian Privacy Act for Australian clients and for our own handling of data. GDPR where clients operate in or serve the EU.

Where a project involves personal information, including research participants and analytics, participants are told how their contribution will be used, including any AI assisted analysis, and identifying details are removed before material is processed.

[Read our position on AI, data and IP]

**CTA:** [Get in touch]
**Related block:** Services · How we work · AI, data and your IP

---

# Work, `/work`

**Title:** `Product Design Case Studies | Antiphono`
**Meta description:** `Selected product design, UX and design system work for technology businesses, including PolicyFly, Hearsay, BeautyCrew and Winter Olympics on 7.`
**Schema:** `CollectionPage`, `BreadcrumbList`

## H1: Selected work

Nine years of product design for technology businesses, media platforms and marketplaces. Some of this work predates the way we work now, and we have said so where it matters.

**Gallery.** Rendered by `render.js` from `data.js`. Cards show thumbnail, client, sector, years and headline.

**Filtering.** By service and by sector, using the controlled vocabulary only. Filters update the URL query string so a filtered view can be shared.

**Sorting.** Featured first, then most recent.

**Related block:** Services · How we work

---

# Contact, `/contact`

**Title:** `Contact Antiphono | Product Design Studio, Sydney`
**Meta description:** `Get in touch with Antiphono. Tell us what you are trying to fix and we will tell you whether we are the right people for it.`

## H1: Get in touch

Tell us what you are trying to fix. If we are the right people for it we will say so, and if we are not, we will say that instead.

**ben@antiphono.com**

Sydney, Australia. We work with clients anywhere.

> `TODO: confirm whether a form is wanted, or email only. Email only is faster to build and converts fine at this volume.`

Replace every `#book` anchor across the site with `/contact`.

---

# AI, data and your IP, `/ai-data-and-ip`

Copy has moved to `docs/copy/ai-data-and-ip.md`. Use that file.

---

# How we run a project, `/how-we-run-a-project`

Copy has moved to `docs/copy/how-we-run-a-project.md`. Every fix required when migrating the old page has already been applied there. Build from that file rather than migrating and correcting the existing copy.

---

# Thinking, `/articles` and Research, `/reports`

Keep the existing structure. Two changes:

1. Every article page needs `Article` schema, an author of Ben Tweedie, a published date and a related block.
2. Article and report cards must show a real date. Undated content reads as abandoned.
