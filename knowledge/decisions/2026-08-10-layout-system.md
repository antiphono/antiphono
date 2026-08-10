# Layout system: the editorial band grid

Date: 2026-08-10
Status: applied to staging, pending Ben's review

## The problem

Every page was built on a `760px` column with `margin: 0`. On a 1440px viewport
that left roughly 680px of empty space down the right of every page, and because
each section used the same wrapper at the same width with the same hairline rule,
there was no hierarchy between a five-item list, a comparison and a gallery.
The result read as fragmented rather than composed.

## The decision

Adopt the layout approach recorded in `design/style-guide.html` under the NLC /
Obys reference, and apply it as shared CSS rather than per-page markup.

- **Container.** One centred shell, `max-width: 1680px`, fluid gutter
  `clamp(24px, 4vw, 72px)`. Applied to the nav, page heroes, prose sections,
  services, counters, the related block and the footer.
- **Band.** The section primitive. A `3px` top rule, a sticky index rail in a
  narrow left column carrying an outlined chapter numeral and a label, and the
  content in the wide right column.
- **Spread.** Where a section is a heading plus supporting text, the two sit
  side by side on wide viewports instead of stacking and trailing dead space.
- **Measure.** Prose caps at `68ch`. Before this it ran to 976px, which is
  roughly 130 characters and too long to read comfortably.
- **Rows over cards.** Case studies, services, process steps and the five points
  are full-width ruled rows. Link rows invert on hover with a `scaleY` wipe.

## Why rows rather than a card gallery

Case study thumbnails have not been shot. The previous gallery rendered an empty
16:9 box per card, and the home page rendered a generated bar-chart graphic that
represented nothing. Rows carry the client name at display scale and drop the
imagery question entirely, which is also what the style guide's layout extraction
recommends for data at scale.

## What was deliberately not adopted

- **Colour.** Ben's instruction was type, motion, layout and components only.
  The black and cream tokens already in `styles.css` are unchanged.
- **Custom cursor and Lenis smooth scroll.** Recorded as "no" in the style guide.
- **Page transition overlay.** Needs AJAX navigation. Still aspirational.

## Consequences

- `.reveal` was renamed `.reveal-legacy` on `work-project.html` and
  `reports.html` so the new reveal system could take the class.
- Reveals are gated behind an `html.js` flag set by a one-line inline script in
  every page head, so content stays readable with JavaScript disabled.
- Fraunces and Space Mono are gone from `styles.css`. Sora is the only typeface.

## Still open

- Case study body copy, headlines and summaries are TODO placeholders.
- Counter values remain `"placeholder": true`.
- `ai-enabled-design.html` links to `/reports`, which the internal linking rule
  forbids. Pre-existing, not introduced here, and left for Ben to decide.
