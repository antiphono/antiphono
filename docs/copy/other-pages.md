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

# Thinking, `/articles`

**Do not change this page.**

Thinking pulls an RSS feed from Soro and renders it. The feed, the proxy in `server.js` and the rendering are all working and out of scope. Do not restructure it, do not rewrite the article cards, do not audit the article copy, and do not touch the RSS proxy.

Two things only, and only if they can be done without altering how the feed renders:

1. Apply the shared header, footer and breadcrumbs so it matches the rest of the site.
2. Keep `noindex, nofollow` in place like every other page.

Thinking stays in the main navigation.

If adding the shared components would require changing how the feed is fetched or rendered, stop and ask rather than proceeding.

---

# Research, `/reports`

**Hidden for now. Do not link to it from anywhere.**

The page currently holds placeholder research PDFs which will be replaced later. Until then it must not be reachable through the site.

What to do:

1. **Remove every link to `/reports`.** It comes out of the header, out of the footer, and out of any related content block. Check `render.js` and every HTML file.
2. **Leave the page and its files in place.** Do not delete anything. It comes back later.
3. **Keep `noindex, nofollow` on it permanently,** not just until launch. Add a comment in the file saying so, because the launch checklist removes `noindex` everywhere else and this page must be skipped.
4. **Exclude `/reports` from `sitemap.xml`.**
5. **Add `Disallow: /reports` to `robots.txt`,** and keep that line when the rest of `robots.txt` is opened up at launch.

The placeholder PDFs stay reachable by direct URL unless Ben says otherwise. Flag this if you think it is a risk.

"Want to commission a report?" and any other calls to action on that page are dormant along with it. Leave them as they are.

