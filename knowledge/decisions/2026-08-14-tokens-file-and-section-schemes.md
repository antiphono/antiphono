# Design tokens move to their own file, and sections declare a colour scheme

**Date:** 2026-08-14
**Decided by:** Ben
**Status:** Active

## What was decided

Two things.

1. Design tokens move out of `styles.css` into `styles/tokens.css`, linked before `styles.css` on every page.
2. Sections declare their colour ground with a `data-scheme` attribute rather than a modifier class.

## Why

### The tokens file

`CLAUDE.md` says the site has one custom stylesheet and nothing else. This decision departs from that, deliberately.

The working rule for the home page rebuild was that every value in markup and CSS must resolve to a named token, and that no literal hex, pixel or font value gets written into `styles.css`. That rule is only enforceable if the tokens live somewhere a person can read in one screen. `styles.css` is over four thousand lines, and a `:root` block buried at the top of it is not a design system anybody will maintain.

`styles/tokens.css` is now the only file that declares raw values. It is about 190 lines and can be read end to end.

The stack rule otherwise stands. Still no framework, no bundler, no build step, no npm dependency. Two stylesheets instead of one.

### Section schemes

`styles.css` already had `.band--light`, which flipped a section to the light ground by redefining `--line` and `--grey` locally. That pattern worked but it was a single hard-coded case, and the class name described appearance rather than intent.

`data-scheme="dark"` and `data-scheme="light"` generalise it. A section declares its ground, the scheme block redefines the local tokens, and every descendant reads `currentColor` or a token rather than naming a colour. Flipping a section is a one-attribute change.

`.band--light` is kept as an alias so the inner pages keep working.

## What this changed in practice

The rule immediately caught a real bug. `.hero__meta strong` was hard-coded to `color: var(--white)`. When the hero moved onto a light ground, the four factual values (2018, Sydney, and so on) rendered white on off-white and were invisible. Changing it to `color: inherit` fixed it and made the component work on either ground.

## Known limitations

- Media query breakpoints cannot be tokens, because media queries do not read custom properties. The two breakpoints in use (860px, 900px) are written literally and listed in a comment in `tokens.css`.
- The pre-existing four thousand lines of `styles.css` still contain literal values. Only the tokens block and the new home page section were brought under the rule. Bringing the rest across is not scheduled.
- Values marked PROVISIONAL in `tokens.css` are working values for staging, not brand decisions. There is still no approved visual identity.

## Related

- `docs/site-build-spec.md`
- `design/style-guide.html`
- `knowledge/decisions/2026-08-10-layout-system.md`
