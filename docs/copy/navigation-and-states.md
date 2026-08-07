# Navigation, footer, states and error pages

**Approved copy. Use as written.** Every string that appears outside a page body lives here, so it stays consistent and gets checked once.

---

## Header navigation

| Label | Destination |
|---|---|
| Work | `/work` |
| Services | `/services` |
| How we work | `/how-we-work` |
| Thinking | `/articles` |
| About | `/about` |
| Get in touch | `/contact` (button style) |

Logo accessible name: `Antiphono, home`.
Mobile toggle accessible name: `Menu`. When open: `Close menu`.
Skip link: `Skip to main content`.

Research reports are not in the navigation at all. That page is hidden. See `other-pages.md`.

---

## Footer

**Entity line, above the columns.** Worded exactly this way here, on the home page and on the about page:

> Antiphono is a product design and research studio in Sydney, Australia.

**Column 1, Navigate**
Work · Services · How we work · Thinking · About · Contact

Research reports are deliberately absent. That page is hidden.

**Column 2, Position**
AI, data and your IP · How we run a project · Accessibility

**Column 3, Contact**
ben@antiphono.com · LinkedIn

**Legal line**
© 2026 Antiphono Pty Ltd. Sydney, Australia.

Rules: the email is `ben@antiphono.com` and appears nowhere on the site in any other form. LinkedIn is `https://www.linkedin.com/in/bentweedie`. Remove the Instagram link unless an account exists. No link resolves to `#`.

---

## Breadcrumbs

Separator is a forward slash with spaces either side. First item is always `Home`.

```
Home / Work / PolicyFly
Home / Services
```

---

## Call to action block

One per page, above the footer. Copy varies by page and is given in each page's copy file. Where a page does not specify one, use:

> **Start with a conversation.**
> Tell us what you are trying to fix. If we are the right people for it, we will say so, and if we are not, we will say that instead.
> [Get in touch]

---

## Gallery filters

| Element | Copy |
|---|---|
| Filter group label | Filter by service |
| Second group label | Filter by sector |
| Clear button | Show everything |
| Active state, announced to screen readers | Showing 3 of 8 projects |

**Empty state**, when a filter combination returns nothing:

> **Nothing matches that combination.**
> Try one filter at a time, or [show everything].

---

## Counters

**Date line, beneath the group:** `As at August 2026`

**Placeholder label,** amber, shown only while `placeholder: true` in `metrics.json`:

> Placeholder. These are not real figures.

**Failure state:** hide the entire counter section. Never render zeros and never render an error message. A missing section is invisible. Four counters at zero is worse than not having them.

---

## Article and report cards

Every card shows a real published date. Undated content reads as abandoned.

Thinking renders an RSS feed and is not expected to be empty. No empty state is needed and the page is out of scope for restructuring.

Research reports is hidden. No empty state is needed.

---

## 404 page, `/404`

**Title:** `Page not found | Antiphono`
**Meta:** `noindex, nofollow` permanently, regardless of launch state.

> ## H1: That page has moved, or never existed.
>
> Not much help either way. Here is where most people are going:
>
> [What we do](/services) · [How we work](/how-we-work) · [Selected work](/work)
>
> If you followed a link from somewhere and it should have worked, tell us at ben@antiphono.com and we will fix it.

Serve a genuine 404 status code, not a 200. `server.js` must return 404 with this page rather than redirecting to the home page.

---

## 500 page

**Title:** `Something went wrong | Antiphono`

> ## H1: Something broke at our end.
>
> Not your fault. Try again in a moment, or email ben@antiphono.com if it keeps happening.
>
> [Back to the home page](/)

---

## Image alt text

Alt text follows the same writing rules as body copy: Australian English, plain, no em dashes.

Describe what matters about the image in context, not what is literally in frame. For a screenshot in a case study chapter, the useful alt text is what the screen does, not "screenshot of a webpage". Decorative images get `alt=""`.

---

## Link text

Never "read more", "click here", "learn more" or "find out more". Link text is read out of context by search engines and screen readers, so it has to say where it goes.

Good: `Read the PolicyFly design system case study`
Bad: `Read more`

---

## Buttons

Sentence case, not title case. Verb first.

Get in touch · See the work · See all services · How we work in detail · View a live component library · Show everything
