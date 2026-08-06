---
paths:
  - "**/*.html"
  - "**/*.css"
  - "**/*.js"
---

# Accessibility

WCAG 2.1 AA. Not optional and not a later pass. Antiphono publicly commits to this standard on client work, so the site failing it is a credibility problem as well as a compliance one.

## Structure

- Skip link to main content, the first focusable element on every page.
- One `<h1>` per page. No skipped heading levels. Headings describe structure, never appearance.
- Landmarks: `header`, `nav`, `main`, `footer`. Where there is more than one `nav`, give each an `aria-label`.

## Keyboard

- Everything interactive is reachable and operable by keyboard, including the gallery filters, the before and after slider, the section navigation and the mobile menu.
- Visible focus states on everything focusable. Never remove an outline without replacing it with something at least as visible.
- Mobile navigation: `aria-expanded` on the toggle, focus trapped while open, Escape closes it, focus returns to the toggle on close.
- Test with the keyboard alone before considering any component finished.

## Colour and motion

- Contrast: 4.5:1 for body text, 3:1 for large text and interface components.
- Never use colour alone to convey meaning, including in the gallery filter states.
- `prefers-reduced-motion` respected by the counters, smooth scrolling, sticky chapter layouts and every transition. When set, show final states immediately.

## Content

- Meaningful `alt` text on content images. `alt=""` on decorative ones. Alt text follows the same writing rules as everything else: Australian English, no em dashes.
- Descriptive link text. Never "read more" or "click here".
- `title` attribute on every iframe, plus a text link to open the embedded prototype directly.
- Form fields, if any, have real associated `<label>` elements. Placeholder text is not a label.

## Dynamic behaviour

- Filter and navigation state changes announced through a polite live region.
- The sticky chapter layout degrades to normal stacked scrolling on narrow viewports and when JavaScript is unavailable.
- If a component depends on JavaScript, the page must still be readable and navigable without it.
