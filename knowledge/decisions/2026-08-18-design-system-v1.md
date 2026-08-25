# The design system is documented and tokenised

**Date:** 2026-08-18
**Decided by:** Ben
**Status:** Version 1.0 published

## What was decided

The system that grew out of the Apex port becomes a documented, tokenised design system with a live reference page and a library of sections that can be pasted into new pages.

- Live reference: `design/system.html`, served at `/design/system.html`
- Written companion: `docs/design-system.md`
- Source of truth: `styles/system.css` and `scripts/apex.js`

The live page loads the real stylesheet and reads real values out of it at runtime, so it cannot describe a system that no longer exists. Where the page and the markdown disagree, the page is right.

## Why a token layer had to come first

Documenting the system meant reading every token, and reading every token found three things.

**Three colliding tokens.** There were two `:root` blocks, and three names were declared in both. The second silently won:

| Token | Lost | Won |
|---|---|---|
| `--gutter` | `clamp(24px, 2.2vw, 40px)` | `clamp(20px, 5vw, 80px)` |
| `--s-4` | `4px` | `24px` |
| `--s-8` | `8px` | `96px` |

`--s-4` is referenced 52 times. The Apex components were written expecting 4px and have been rendering at 24px since the merge. Because the site as it looks today is the winning set, the winning values are now declared once as the real values rather than being changed. The names stay misleading, and that is written down in both documents. Renaming them is correct but moves spacing on every page, so it needs its own pass.

**Thirteen dangling tokens.** Names referenced but defined nowhere, so those declarations were invalid and did nothing. `--text-xs` appeared 38 times, `--text-sm` 26. They were casualties of namespacing the legacy sheet: the rules moved across, the tokens they depended on did not. They are now defined and mapped onto the existing scale.

**Thirty-one unused tokens.** Defined and never referenced. Left alone for now.

## What the system contains

Twelve documented areas: principles, colour, typography, space, layout and breakpoints, shape, elevation, motion, primitives, behaviour contracts, a section library and a page recipe.

Two things are worth calling out because they are the parts a new page gets wrong.

**`data-theme` is the centre of the system.** A section declares its ground and everything follows: the section's own text colour, the fixed header inverting as it passes over, and the button borders. Setting a text colour by hand to fix contrast is the anti-pattern, and it is the bug that made four sections on index render white on white.

**Behaviour hooks carry no styles.** `system-card__reveal` appears 16 times in markup and once in `apex.js` and nowhere in the stylesheet. A dead-CSS pass will flag it. It is not dead. Check `scripts/apex.js` before deleting any class a sweep flags.

## The section library

Ten responsive sections, each complete markup needing no new CSS and no new JavaScript: statement, split with media, feature cards, ruled list, manifesto, full bleed media, horizontal card track, two column prose, staggered card grid, call to action band.

They were taken from sections already running on index rather than invented, so they are known to work. Every class in every snippet was checked against the stylesheet.

## Documentation chrome

`design/system.html` carries its own `<style>` block. That is a deliberate exception to the one-stylesheet rule: those styles lay out the documentation and ship to no other page, and putting them in `system.css` would add production weight for a page only the studio sees. Everything being documented uses the real production classes.

## Related

- `knowledge/decisions/2026-08-18-apex-becomes-the-site-system.md`
- `docs/primitives-to-standardise.md`, which this supersedes for anything already decided
