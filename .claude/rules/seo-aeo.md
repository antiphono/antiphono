---
paths:
  - "**/*.html"
  - "sitemap.xml"
  - "robots.txt"
  - "llms.txt"
---

# SEO and answer engine optimisation

Search engines index pages. Answer engines quote passages. Both need content that says what it means in the place a machine expects to find it. Apply this while building, never as a later pass.

## Every page needs

- One `<h1>`, containing the page's primary term, matching the visible page heading.
- A `<title>` under 60 characters: `Primary Term | Antiphono` or `Primary Term | Qualifier | Antiphono`.
- A `<meta name="description">` of 140 to 160 characters, written as a sentence, containing the primary term.
- A `<link rel="canonical">` with the absolute URL.
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
- Twitter tags: `twitter:card` set to `summary_large_image`, plus title, description and image.
- `<html lang="en-AU">`.
- `<meta name="robots" content="noindex, nofollow">` until launch. Do not remove it.
- Heading levels nesting properly. No skipped levels. Headings are structure, never styling.

## Writing for answer engines

Answer engines quote self-contained passages. Write so a paragraph lifted out of the page still makes sense.

1. **Answer in the first sentence.** A section headed "How we work with your development team" opens by answering it, not by building towards it.
2. **Name the entity, do not rely on pronouns.** "Antiphono builds working prototypes" beats "We build them". Use the full name at the start of major sections, then "we" within them.
3. **One idea per paragraph.** Three to five sentences. Long paragraphs do not get quoted.
4. **Repeat the category definition where it fits naturally.** "Antiphono is a product design and research studio in Sydney, Australia" appears on the home page, the about page, the footer and in `llms.txt`, worded identically every time.
5. **Use question-shaped headings where the content is an answer.** That is what the FAQ sections are for.
6. **Never bury a fact inside a run of adjectives.** Facts get quoted. Adjectives do not.

## Keyword targets

| Page | Primary | Secondary |
|---|---|---|
| Home | product design studio Sydney | product design and research studio, AI product design |
| Services | product design services | UX design services, user research, design systems |
| How we work | product design process | design to development process, design system governance |
| How we run a project | design and development workflow | repository conventions, deployment pipeline |
| Work | product design case studies | UX case study, design system case study |
| About | Ben Tweedie product designer | product design studio Sydney |
| AI, data and IP | AI data privacy design | AI and client data, design studio IP ownership |

Terms appear in the `h1`, the title, the description, the first paragraph and at least one `h2`. No more often than reads naturally. Copy written to hit a keyword count reads as written for a machine, and answer engines are good at spotting it.

## Structured data

JSON-LD in the `<head>`. Validate every block. Invalid structured data is worse than none.

**Every page:** `Organization` and `BreadcrumbList`.

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Antiphono",
  "alternateName": "Antiphono Pty Ltd",
  "description": "Product design and research studio working with technology businesses.",
  "url": "https://antiphono.com",
  "email": "ben@antiphono.com",
  "foundingDate": "2018",
  "founder": {
    "@type": "Person",
    "name": "Ben Tweedie",
    "jobTitle": "Founder and Product Lead",
    "sameAs": "https://www.linkedin.com/in/bentweedie"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sydney",
    "addressRegion": "NSW",
    "addressCountry": "AU"
  },
  "areaServed": "Worldwide",
  "knowsAbout": [
    "Product design", "User research", "UX design",
    "Design systems", "AI feature design", "Prototyping"
  ]
}
```

- **Services page:** an `OfferCatalog` of `Service` items, one per service. Plus `FAQPage` for the common questions.
- **Case studies:** `CreativeWork` with `about`, `datePublished`, `author` and `keywords` from the services array.
- **Articles:** `Article` with `headline`, `datePublished`, `dateModified`, `author`, `image`.
- **AI, data and IP page:** `FAQPage` across the seven sections.

## Crawl files

**`robots.txt`**, until launch:

```
User-agent: *
Disallow: /
```

At launch, allow everything and reference the sitemap.

**`sitemap.xml`.** Every indexable page with `lastmod`. Generate it from a list in `data.js` so it cannot drift out of date. Exclude `/reports`, which is hidden.

**`/reports` is permanently excluded.** It keeps `noindex, nofollow` after launch, stays out of the sitemap, and `robots.txt` keeps `Disallow: /reports` when the rest is opened up.

**`llms.txt`** at the site root. Short, factual, no marketing language.

```
# Antiphono

Antiphono is a product design and research studio in Sydney, Australia,
working with technology businesses worldwide. Founded 2018, previously
BT Digital. Founder and Product Lead: Ben Tweedie.

## Services
Research and design, build and measurement, setting your team up.
See https://antiphono.com/services

## How we work
https://antiphono.com/how-we-work

## Work
https://antiphono.com/work

## Contact
ben@antiphono.com
```

## URLs

Clean paths, no query strings. Case studies are `/work/policyfly`, never `/work-project?slug=policyfly`. Add 301 redirects in `server.js` from the old query string form.

`/ai-enabled-design` must keep working. It is shared directly with clients. 301 it to `/how-we-run-a-project` once that page exists.

## Performance

- `loading="lazy"` on images below the fold. Explicit `width` and `height` on every image to prevent layout shift.
- `font-display: swap`. Preload the primary weight only.
- `defer` on all scripts. Nothing render blocking.
- Counter values present in the HTML as static text, animated from the rendered value rather than injected, so they are indexable and readable with JavaScript off.
