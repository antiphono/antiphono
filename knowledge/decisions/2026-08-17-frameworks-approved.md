# GSAP and Lenis approved for scroll driven pages

**Date decided:** 17 August 2026
**Recorded:** 18 August 2026
**Decided by:** Ben Tweedie

## The decision

GSAP (with the ScrollTrigger plugin) and Lenis are approved for use on this
site. Both load from a CDN as plain script tags. This reverses the rule in
`CLAUDE.md` that said never add a framework, a bundler, a build step or an npm
dependency beyond what `server.js` already uses.

## What it does not change

The reversal is narrow. It covers these two motion libraries only.

- No CSS framework. Tailwind and Bootstrap are still out.
- No bundler and no build step. Scripts load as `<script src>`.
- No npm dependency. `package.json` is untouched, and both libraries are
  fetched from `cdn.jsdelivr.net` at runtime.
- No UI framework. React, Vue and Svelte are still out.
- Body content still lives in the HTML. Motion libraries animate what is
  already in the markup, they do not render it. Every page must still be
  readable with JavaScript disabled.

## Why

The Apex Roadster package being ported to `/homepage2` is built on scroll
linked motion: pinned sections, scrubbed horizontal galleries, masked line
reveals and smooth scroll. Rebuilding ScrollTrigger's pinning and scrub
behaviour in vanilla JavaScript is a large amount of fragile code, and the
result would be worse than the library. The cost of two CDN script tags is
lower than the cost of maintaining a hand rolled version.

## Versions in use

| Library | Version | URL |
|---|---|---|
| GSAP | 3.13.0 | `cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js` |
| ScrollTrigger | 3.13.0 | `cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js` |
| Lenis | 1.3.11 | `cdn.jsdelivr.net/npm/lenis@1.3.11/dist/lenis.min.js` |

Versions are pinned. Do not use `@latest`.

## Conditions

1. Both libraries are loaded with `defer`. Neither blocks the first render.
2. Every animation respects `prefers-reduced-motion: reduce`. When reduced
   motion is set, Lenis does not start and no scroll animation is registered.
   The page stays fully readable and fully navigable.
3. The page works with JavaScript off. Nothing is hidden by a script that
   only a script can reveal.
4. If the CDN fails, the page still renders and reads correctly. Motion is an
   enhancement, never a requirement for content.

## Scope today

Applied to `/homepage2` only. `index.html` and the rest of the site are
unchanged and still load no libraries.
