# The Apex stack becomes the site system

**Date:** 2026-08-18
**Decided by:** Ben
**Status:** Foundation laid, migration not started

## What was decided

The stack built for `/homepage2`, ported from the Apex Roadster package, becomes the standard for the whole site: its stylesheet, its component set, its motion library and its JavaScript. New pages are to be built from these components.

This supersedes the design system built earlier in the same week.

## What this replaces

| Was | Becomes |
|---|---|
| `styles/tokens.css` plus `styles/app.css` | `styles/system.css` |
| `script.js`, hand-rolled reveals and dynamics | `scripts/apex.js` |
| No dependencies | GSAP 3.13 and Lenis 1.3 from a CDN |
| Figma-extracted mono palette | Apex palette, including `--signal-red` |

## What has been done

`styles/apex-scoped.css` was written deliberately not to be shared. Its header said so, its tokens sat on `.apex` rather than `:root`, and 179 of its 219 rules were scoped as descendants of `.apex`. Promoting it meant unscoping it.

`styles/system.css` is that file unscoped:

- tokens moved from `.apex` to `:root`
- the `.apex` descendant prefix stripped from every rule
- `html:has(body.apex)` guards, which existed only so Lenis would not affect other pages, reduced to `html`
- `body.apex.has-custom-cursor` reduced to `body.has-custom-cursor`
- component class names kept as they are: `.apex-header`, `.apex-logo`, `.apex-cursor`

Brace balance verified. 222 rules, about 25KB.

## What has not been done

**Nothing has been migrated.** All 21 pages still load `styles/tokens.css` and `styles/app.css`, and `/homepage2` still loads `styles/apex-scoped.css`. The old files are untouched and the site is unchanged.

## Why the migration was not attempted in the same session

Twenty-one pages, two stylesheets to remove, one to add, plus a JavaScript swap. Attempting it without the room to verify each page would have left the site half-migrated, which is worse than either state.

## What migrating actually involves

1. Swap the three stylesheet links on each page for `styles/system.css`.
2. Swap `script.js` for `scripts/apex.js`, and add the GSAP, ScrollTrigger and Lenis CDN tags.
3. Rewrite each page's markup to the Apex component classes. This is the real work. The two systems share no class names, so every section needs rebuilding rather than relinking.
4. Delete `styles/tokens.css`, `styles/app.css` and `script.js` once nothing references them.
5. Re-verify accessibility per `.claude/rules/accessibility.md`. The Apex page uses a custom cursor and Lenis smooth scroll, and both need checking against reduced motion and keyboard use.

## Open questions

- **The palette is a car brand's.** `--signal-red` and the Apex greys were drawn for a roadster launch. Whether they suit a product design studio is a brand decision, not a technical one.
- **`CLAUDE.md` is now out of date** in three places: the no-framework rule, the single-stylesheet rule, and the Sora-only typeface rule. It should be updated to match reality or the drift will be rediscovered later.
- **The 15MB hero video** is larger than the rest of the site combined. It needs compressing before production.

## Related

- `knowledge/decisions/2026-08-17-frameworks-approved.md`
- `knowledge/decisions/2026-08-14-tokens-file-and-section-schemes.md`
