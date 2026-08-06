---
paths:
  - "**/*.html"
  - "render.js"
---

# Internal linking and on-page navigation

Top navigation moves people between sections. It does not move them between related ideas, and that is where the value is. Every page needs contextual links in three places: inside the body copy, in the related block, and in the call to action.

## The related content block

Appears on every page. Build it once in `render.js` and `styles.css`.

```
.related
  .related__heading      short and contextual, e.g. "Where this shows up in the work"
  .related__items        2 to 4 cards
    .related__card
      eyebrow    what kind of thing it is: Case study, Service, Article
      title      the destination
      line       one sentence on why it is relevant here
```

Rules:

- Two to four items. Never one, never five.
- The one sentence explains the connection, not the destination. "The design system work on this project ran for four years" beats "Read the PolicyFly case study".
- Descriptive link text always. Never "read more" or "click here". Link text is read by search engines and by screen readers as a list, out of context.
- Mix the types. A service linking to a case study and an article is stronger than three services.

## The linking map

| From | Links to |
|---|---|
| Home | Services, How we work, three featured case studies, AI data and IP, Contact |
| Services, in body | Design systems section links to the PolicyFly case study. AI feature design links to Hearsay. Live variant testing links to How we work. The data ownership paragraph links to AI, data and IP |
| Services, related block | How we work, PolicyFly, AI data and IP |
| How we work, in body | Design system section links to the live component library. Testing section links to Live variant testing on Services. Record section links to How we run a project |
| How we work, related block | How we run a project, Services, AI data and IP |
| How we run a project | How we work, Services, Contact |
| Work gallery | Each card to its case study. Filter chips to the matching Services anchor |
| Case study | Every service in "At a glance" links to its Services anchor. Related block: two case studies plus one service or article |
| Article | Related block: one case study, one service, one article |
| About | Services, How we work, AI data and IP |
| AI, data and IP | How we work, Services, About |

## Rules

- **Every case study links to at least two others.** No dead ends in the gallery.
- **Service names in case study "At a glance" are links** to the matching Services anchor. This builds the service-to-evidence connection automatically as case studies are added.
- **No orphan pages.** Every page is linked from at least two other pages, not counting the header and footer.
- **One outbound path per section.** A section that ends with nowhere to go is where people leave.

## Anchors

Every service on `/services` needs a stable `id` matching its slug: `#user-research`, `#product-strategy`, `#product-design`, `#ux-design`, `#ui-design`, `#ai-feature-design`, `#prototyping`, `#design-systems`, `#accessibility`, `#prototype-build`, `#design-system-engineering`, `#analytics-and-measurement`, `#testing-and-qa`, `#live-variant-testing`, `#ai-workflow-setup`, `#the-project-record`, `#design-system-governance`, `#training-and-embedded-working`.

These are link targets from case studies and articles. Once published they must not change.

## Section navigation on long pages

`/how-we-work`, `/how-we-run-a-project` and every case study need in-page section navigation.

- Horizontal on desktop, below the header, sticky on scroll.
- Collapses to a single dropdown on narrow viewports.
- Highlights the current section using `IntersectionObserver`.
- Real anchors to real `id` attributes, working with JavaScript disabled.
- Smooth scroll only when `prefers-reduced-motion` is not set.

The existing `/ai-enabled-design` page has a working version of this. Extract that pattern into a reusable component rather than rebuilding it.

## Breadcrumbs

On every page except the home page, marked up with `BreadcrumbList` JSON-LD.

```
Home / Work / PolicyFly
Home / Services
```
