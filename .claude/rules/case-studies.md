---
paths:
  - "work/**"
  - "data.js"
---

# Case studies

## Architecture

| Thing | How | Why |
|---|---|---|
| Gallery and home page cards | Objects in `data.js`, rendered by `render.js` | Needs sorting and filtering |
| Individual case study pages | One static `.html` file each, at `/work/[slug].html` | Each needs its own title, description and share image in the HTML |

Never render case study body content with JavaScript.

## Index data in `data.js`

```js
const caseStudies = [
  {
    slug: "beautycrew",
    client: "BeautyCrew",
    named: true,
    sector: "Ecommerce and cosmetics",
    yearStart: 2018,
    yearEnd: 2018,
    headline: "",     // TODO Ben
    summary: "",      // TODO Ben
    services: ["Product design", "Product strategy"],
    thumbnail: "",
    featured: false
  },
  {
    slug: "policyfly",
    client: "PolicyFly",
    named: true,
    sector: "InsurTech",
    yearStart: 2018,
    yearEnd: "present",
    headline: "",
    summary: "",
    services: ["UX design", "Product design", "Design systems"],
    thumbnail: "",
    featured: true
  },
  {
    slug: "hearsay",
    client: "Hearsay",
    named: true,
    sector: "SaaS and technology",
    yearStart: 2024,
    yearEnd: 2024,
    headline: "",
    summary: "",
    services: ["Product design", "Product strategy", "AI feature design"],
    thumbnail: "",
    featured: true
  },
  {
    slug: "winter-olympics-on-7",
    client: "Winter Olympics on 7",
    named: true,
    sector: "OTT streaming",
    yearStart: 2018,
    yearEnd: 2018,
    headline: "",
    summary: "",
    services: ["Product strategy", "Product design", "UX design",
               "UI design", "Analytics and measurement"],
    thumbnail: "",
    featured: true
  }
];
```

`yearEnd: "present"` renders as "2018 to present". Make this prominent on the card. A client relationship running eight years is the strongest single signal on the page.

`named: false` hides the client name everywhere and shows the sector description instead. Build this now even though all four launch case studies are named.

Sort: featured first, then most recent.

## Controlled service vocabulary

Case study `services` arrays draw only from this list. Anything else fragments the gallery filter.

User research · Product strategy · Product design · UX design · UI design · AI feature design · Prototyping · Design systems · Accessibility · Prototype build · Design system engineering · Analytics and measurement · Testing and QA · Live variant testing · AI workflow setup · The project record · Design system governance · Training and embedded working

Brand design is not on this list. BeautyCrew included brand work and it is described in that case study's body copy, but it is not a current service and must not appear as a filter value.

## Page template

Nine sections, same order every time, stable class names.

| # | Section | Class | Required | Contents |
|---|---|---|---|---|
| 1 | Hero | `.cs-hero` | Yes | Full bleed image, client, sector, years, headline |
| 2 | At a glance | `.cs-glance` | Yes | 4 to 6 label and value pairs, horizontal strip |
| 3 | The problem | `.cs-problem` | Yes | 2 to 3 paragraphs, optional client quote |
| 4 | Chapters | `.cs-chapter` | Yes, 3 to 5 | One idea, short body, one dominant visual |
| 5 | The detail | `.cs-detail` | Optional | One deep dive |
| 6 | What happened | `.cs-outcome` | Yes | The result. Numbers only where real and sourced |
| 7 | How it runs now | `.cs-handover` | Yes | What the client's team owns and runs |
| 8 | Client quote | `.cs-quote` | Optional | One quote, attributed, with role |
| 9 | Related | `.related` | Yes | Two case studies plus one service or article |

Section 2 is what gets read when someone does not read the case study. Make it scannable in three seconds. Every service listed in it links to its anchor on `/services`.

### Chapters

Three layouts only: `.cs-chapter--full`, `.cs-chapter--split`, `.cs-chapter--sticky`.

Use `--sticky` once per case study, on the strongest chapter. It holds the text column while the visual column scrolls, and it loses its effect if repeated.

Media types: `image`, `video`, `embed` (an iframe of a live prototype), `comparison` (before and after).

### The detail section

One deep dive per case study. This is what separates a real case study from a summary. Four types: `embed`, `slider`, `variants`, `annotated`.

Build `embed` and `slider` first. Existing prototypes are already deployed and can be embedded directly, and a working prototype inside a case study is worth more than another paragraph. The slider must be keyboard operable.

### Section 7 is not a footnote

It must make clear that Antiphono builds working prototypes and design system components which the client's own development team takes through their own deployment process. Never imply Antiphono deploys to a client's production environment or owns their release process.

## Content rules

- 400 to 700 words of body copy across the whole page. Beyond that the visuals stop carrying it.
- Plain headings. Australian English. No em dashes.
- No number appears without a recorded source. If there is no source, describe the outcome in words.
- Anonymised case studies: check every image for identifying detail before publishing.
- GroupTogether and Future Women may be named in case studies only.

## Images

Not in the repository. Use an image service that transforms on request, so one upload serves every size. Store an ID or URL, never a local path.

For now, use the assets already on the site. Where one is missing, generate a plain neutral block at the correct aspect ratio with the filename visible on it. Do not use stock photography and do not generate decorative imagery to fill space. A visible empty slot is honest and gets replaced. A plausible wrong image does not.
