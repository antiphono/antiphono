# Antiphono design system

**Version 1.0, 18 August 2026.**

The live version of this document is `design/system.html`, served at `/design/system.html`. That page loads the real stylesheet and reads real values out of it, so where the two disagree, the page is right and this file is stale.

| | |
|---|---|
| Stylesheet | `styles/system.css` |
| Behaviour | `scripts/apex.js` |
| Libraries | GSAP 3.13 with ScrollTrigger, Lenis 1.3, both from a CDN |
| Live documentation | `design/system.html` |
| Decisions | `knowledge/decisions/` |

## Principles

1. **Ground first.** Every section declares whether it sits on a light or a dark ground with `data-theme`. Text colour, header colour and button colour all follow from that one attribute. Never set a text colour to fix a contrast problem: set the ground.
2. **Flat by default.** Depth comes from ground colour and hairlines. A shadow means something genuinely floats. Three shadows exist and that is the whole set.
3. **Type carries the design.** One face for headlines, one for body, one weight for every heading. Interest comes from scale and space, not from weight, colour or decoration.
4. **Motion is a reveal, not a performance.** Content enters once as you reach it and then stays put. Every animation has a reduced-motion answer.
5. **Readable with JavaScript off.** Body content lives in the HTML. JavaScript adds reveals, the menu, the cursor and the gallery.

## Tokens

Everything below is declared in the token layer at the top of `styles/system.css`. If a value is not here, it should not appear in a rule.

### Colour

| Token | Value | Use for |
|---|---|---|
| `--apex-white` | `#F4F4F2` | The light ground |
| `--apex-black` | `#111214` | The dark ground |
| `--deep-black` | `#08090A` | The deepest ground, used by the mobile menu and full-bleed media |
| `--pure-white` | `#FFFFFF` | Cards and panels sitting on the light ground |
| `--text-on-light` | `#111214` | Body and heading ink on a light ground |
| `--text-secondary-light` | `#686A6D` | Supporting copy on a light ground |
| `--text-on-dark` | `#F4F4F2` | Body and heading ink on a dark ground |
| `--text-secondary-dark` | `#A4A6A8` | Supporting copy on a dark ground |
| `--hairline-light` | `rgba(17,18,20,0.16)` | Rules on a light ground |
| `--hairline-dark` | `rgba(255,255,255,0.18)` | Rules on a dark ground |
| `--signal-red` | `#D7372F` | The single accent. **Large text and UI only**, see below |
| `--signal-ink-light` | `#C2322A` | The accent at body size or smaller, on a light ground |
| `--signal-ink-dark` | `#DB4B44` | The accent at body size or smaller, on a dark ground |
| `--highlight` | `var(--signal-red)` | The block behind selected text |
| `--highlight-ink` | `var(--pure-white)` | Text inside the selection block |

There is also a mono ramp, `--mono-10` through `--mono-90`, used by the index components for tints and fills. Prefer the named tokens above in new work.

**The accent does not pass at body size.** `--signal-red` measures 4.26:1 on the light ground and 4.00:1 on the dark one. That clears the 3:1 a large heading or a UI element needs and misses the 4.5:1 body text needs, on both. No single red clears 4.5:1 on both grounds: darken it enough for light and it fails on dark, and the reverse. So the accent takes a per-ground pair the way the ink tokens do. Use `--signal-red` for a heading, a rule or an icon, and the ink pair for anything at body size or smaller.

**The highlight.** The selection block used to be declared three times, near-black on one component set and white on the other two. The white one won, so selecting text on a light section painted a white block on a near-white ground and the selection disappeared. One rule now, in the signal red with white text: white on the red reads at 4.69:1, and the red block sits between 4.0:1 and 4.69:1 against every ground in the system, so it is visible on black and on white.

**Contrast.** Body text at 4.5:1, large text and interface components at 3:1. Never use colour alone to carry meaning.

### Typography

Two faces:

- **`--font-display`** — Helvetica Neue, Helvetica, Arial. Every heading.
- **`--font-sans`** — Inter, then Helvetica Neue. Body on the current components.
- Sora still sets body on the pages waiting to be rebuilt.

**Every heading on every page is 600 weight and sentence case.** No exceptions and no `text-transform` on a heading.

| Class | Token | Use for |
|---|---|---|
| `.display-xl` | `--display-xl` | One per page at most. The hero statement |
| `.display-l` | `--display-l` | Section statements that carry a whole screen |
| `.display-m` | `--display-m` | Standard section heading |
| `.heading-l` | `--heading-l` | Card titles and sub-sections |
| `.heading-m` | `--heading-m` | The smallest thing that still reads as a heading |
| `.body-l` | `--body-l` | Lead paragraphs |
| — | `--body` | The default paragraph, set on `body` |
| `.small` | `--small` | Meta, captions, dates |
| `.micro-label` | `--micro` | Uppercase eyebrow. A label, not a heading |

`.micro-label` is uppercase by design. It must never be marked up as `h1` to `h6`: it is a label, and a heading that renders as a label breaks both the outline and the heading rule above.

**Known limit.** Helvetica Neue has no semibold on macOS, only Medium 500 and Bold 700, so a 600 request resolves to Bold. The stylesheet says 600 and the type renders Bold. It is also a system face, so it renders differently on Windows and Android. Self-hosting a display face is an open decision.

### Space

One ramp, `--s-1` to `--s-10`, roughly geometric: 4, 8, 16, 24, 32, 48, 64, 96, 128, 160.

Plus `--gutter` for the page edge and `--section-y` for the space above and below a section. Both fluid.

**Read this before using the small steps.** Two token blocks used to declare `--s-4` and `--s-8` with different values and the second silently won, so **`--s-4` is 24px and `--s-8` is 96px**, not 4px and 8px as the names suggest. The 4px and 8px steps are `--s-1` and `--s-2`. The names are misleading and are kept because changing them would move spacing on every page. Read the value, not the name.

### Layout

| Class | Max width | Use for |
|---|---|---|
| `.container-x` | `--content-max`, 1800px | The standard page container. Use this in new work |
| `.section` | none | Vertical rhythm only. Pads block by `--section-y` |

**Breakpoints.** The system is fluid first: `clamp()` handles most of the range and breakpoints handle the moments where a layout changes shape rather than size.

| Width | What changes |
|---|---|
| 1100px | Desktop nav gives way to the burger. Both sides aligned to the same number so there is never a gap where neither is reachable |
| 900px | Split layouts stack. Header nav and CTA hide |
| 860px | The busiest breakpoint. Cards, rows and grids drop to one column |
| 700px, 560px | Type steps down, padding tightens. Prefer widening a `clamp()` to adding a rule here |

Test at 360, 768, 1024, 1280 and 1800. The last one matters because `.container-x` caps and the page stops filling.

### Shape

`--r-sm` 4px, `--r-md` 12px, `--r-lg` 24px, `--r-xl` 40px, `--r-pill` 999px.

Buttons and chips are always pill. Media and panels are large. Small is for inline chips and bars. Extra large is for the hero frame and should stay rare.

### Elevation

| Token | Use for |
|---|---|
| `--elev-0` | The default. Separate with a hairline or a change of ground |
| `--elev-1` | A hairline drawn as a shadow so it does not affect layout. Cards and cells |
| `--elev-2` | Something sitting over content: a pinned panel or a sticky card |
| `--elev-3` | The deck and the modal. One per screen, never two |

**Glass.** Backdrop blur is used only where content passes behind a control: the mobile menu ground and the tab pill. It is never applied to a full width bar, which was a deliberate call. Blur sits between 12px and 20px, always paired with a translucent fill so it still works where blur is unsupported.

### Motion

| Token | Use for |
|---|---|
| `--t-hover` 240ms | Hover and focus. Anything the pointer causes directly |
| `--t-button` 380ms | A control changing state |
| `--t-text` 900ms | A line of type revealing |
| `--t-media` 1200ms | An image or video mask opening |
| `--t-section` 1500ms | A whole section arriving. Rare |
| `--d-fast` / `--d-base` / `--d-slow` | The index components' ramp. `--d-base` drives every `data-anim` reveal |
| `--stagger` | Delay between siblings in a staggered group |

| Easing | Character |
|---|---|
| `--ease-soft` / `--e-out` | The default. Fast out, long settle |
| `--ease-editorial` | Slow in and slow out. Type and masks that should feel deliberate |
| `--e-expo` | The most aggressive settle. Clip paths and reveals |
| `--ease-mechanical` / `--e-inout` | Symmetrical. Things that move and come back |

Animate `transform` and `opacity` only. Reveal once, then unobserve. Remove `will-change` when the animation is done.

## Behaviour contracts

The system is driven by data attributes rather than by classes wired to JavaScript. Set the attribute in the markup and `scripts/apex.js` picks it up.

| Attribute | Goes on | What it does |
|---|---|---|
| `data-theme` | `section`, `footer` | `"light"` or `"dark"`. Sets the section's **ground and its ink**, and tells the fixed header what it is passing over. **Required on every section.** The most important attribute in the system |
| `data-anim` | any element | Reveals on scroll. `up`, `down`, `left`, `right`, `fade`, `scale`, `clip`. Starts at opacity 0, gains `.in` on entry, once |
| `data-stagger` | a parent | Numbers its `data-anim` children through `--i` so they arrive in sequence |
| `data-cursor` | interactive elements | Grows the custom cursor. Pointer devices only |
| `data-cursor-label` | any element | Puts a word inside the cursor |
| `data-header-theme` | `.apex-header` | Written by JavaScript. Set the initial value to match the first section |
| `data-menu-open` / `data-menu-close` | buttons and links | Opens and closes `#apex-mobile-menu` |

**The ground rule.** `data-theme` sets `background-color` as well as `color`, wrapped in `:where()` so it adds no specificity. Any component that paints its own ground keeps it; this only fills in sections that would otherwise have painted nothing. Until 25 August it set the ink alone, so a section could declare itself dark, take light text, and sit on whatever background the page happened to have. Building a page entirely from `.section` rather than from components is what exposed it.

**Behaviour hooks that carry no styles.** Some classes exist only so JavaScript can find an element. `system-card__reveal` is the current example: it appears 16 times in `index.html` and once in `apex.js`, and nowhere in the stylesheet. It is not dead code. Check `scripts/apex.js` before deleting any class that a dead-CSS pass flags.

**Reduced motion.** Under `prefers-reduced-motion: reduce`, Lenis does not initialise, every `data-anim` element renders in its final state, the marquee stops and transitions are removed. Not optional, not a later pass.

**If a library fails to load.** The page still reads, the menu still opens and the header still inverts, because `initHeader` falls back to a scroll listener when GSAP is absent.

## Primitives

### Button, `.btn-pill`

A pill that borders in `currentColor`, so it works on both grounds without a variant.

| State | Visual | Behaviour |
|---|---|---|
| Default | Transparent fill, 1px border in `currentColor`, pill radius | — |
| Hover | Lifts 2px. On a dark ground the fill inverts to white with near-black text | `--t-hover` on transform, `--t-button` on colour |
| Focus visible | 2px outline, 3px offset, in the current text colour | Never remove without an equally visible replacement |
| Disabled | Reduced opacity | Set the real `disabled` attribute, not just a class |

Variant: `.btn-pill--dark` fills solid with `--apex-black` and sets its label in `--pure-white` for a primary action on a light ground. It takes pure white rather than the off-white `--text-on-dark` so the label is at full strength against the fill.

### Label, `.micro-label`

The eyebrow above almost every section heading, and section numbering in the `( 01 )` form. Uppercase by design. Never a heading element.

### Circle action, `.circle-action`

The round outline control inside feature cards. Reserved for a card's single action.

### Media mask, `.media-mask`

Clips an image and opens it on scroll. **Wrap the figure, never the `img`.** Transforms applied straight to an image fight the hover zoom on work cards, which is a bug this system has already had once.

### Placeholder, `.ph`

The standing-in surface for media that does not exist yet. Deliberately obvious. Never ship a page with one still in it, and never replace one with stock photography.

### Skip link, `.apex-skip`

The first focusable element on every page, targeting the page's `main`. The one primitive where a silent failure is an accessibility defect: test it with the keyboard after any header change.

## Page components

Section patterns the library did not already cover. All unscoped and tokenised, so any page can use them.

| Class | What it is, and what to watch |
|---|---|
| `.secnav` | Sticky section navigation. Real anchors to real ids, so with JavaScript off it is always visible and every link works. The script adds the appear-after-hero behaviour, the current-section highlight and mirrors the header's ground. The current item is marked with a rule as well as a colour |
| `.logo-grid` | Client logos. Monochrome by filter so mixed source files read as one set, optically sized, static with no carousel |
| `.svc-group` | A named service group: heading, one line, dot separated list |
| `.gain` | A numbered benefit block. Rule, `( 01 )`, heading, one paragraph |
| `.phase` | A process stage. Same shape without the number |
| `.duo` | Two column comparison. `--machine` sets in the interface face, `--human` in the display face |
| `.facts` | Two to four figures with a qualifier under each. Never an unattributed number |
| `.booking` | Third party booking embed, loaded on request rather than on page load. Times out after eight seconds into a real link rather than a spinner. The email beside it is always present |
| `.vision__headline--wide` | A hero whose line breaks are written rather than wrapped. Sized from the longest written line rather than from the scale. **If the copy changes, remeasure** |

**On sizing type from copy.** `.vision__headline--wide` breaks the usual rule that type comes from the scale. The hero has three written lines and the break points are part of the design, so the size has to be whatever holds the longest of them. Measured: that line fills the measure at 6.0vw at every viewport, so the rule is 5.9vw with a floor and a cap. Below about 470px the floor takes over and the first line wraps, which is the right trade because 22px is not display size. A deliberate exception, not a pattern to copy.

## Section library

Fourteen responsive sections, ready to paste. Each is complete markup needing no new CSS and no new JavaScript. The live page at `/design/system.html#library` has each one in a code block with a copy button.

| Section | Use for |
|---|---|
| **Statement** | A single idea at display size with a supporting paragraph. Opens a page or marks a turn in the argument |
| **Split with media** | Image one side, copy and one action the other. The workhorse: most explanatory content fits here |
| **Feature cards** | Three to five things of equal weight, each with media, a title and one action |
| **Ruled list** | Rows separated by hairlines, each a link. Work, articles, anything that is a list of destinations |
| **Manifesto** | A short strong statement broken across lines on a dark ground. One per page at most |
| **Full bleed media** | An image or video running full width, used as a pause between two dense sections |
| **Horizontal card track** | Four to six short items moving sideways as the page scrolls |
| **Two column prose** | Heading left, copy right. Generic, works on any page |
| **Staggered card grid** | A responsive grid where each card reveals a beat after the one before |
| **Numbered benefit grid** | Numbered blocks, each a rule, a number, a heading and a paragraph |
| **Two column comparison** | Two lists in the two different faces, where the point is the difference between them |
| **Facts row** | Two to four figures with a qualifier under each |
| **Section navigation** | Sticky strip that appears after the hero and marks the section you are in |
| **Call to action band** | One heading, one sentence, one button. The end of a page |

Every section carries `data-theme`. Alternate light and dark down a page and the header inverts as it passes over each one with no further work. Every section also carries `aria-labelledby` or `aria-label`: a section landmark with no name is not much use to a screen reader.

### Two you can paste from here

The rest are on the live page. These two cover most needs.

**Split with media**

```html
<section class="driver" data-theme="light" aria-labelledby="s-split">
  <div class="container-x driver__grid">
    <figure class="driver__media media-mask">
      <img src="/media/your-image.jpg" alt="Describe what the image shows" loading="lazy" decoding="async">
    </figure>
    <div class="driver__copy">
      <p class="micro-label driver__label">Label</p>
      <h2 class="heading-m driver__heading" id="s-split">A heading that says what this is</h2>
      <p class="body-l driver__body">The lead sentence answers the heading rather than building towards it.</p>
      <p class="driver__secondary">A second paragraph for the detail that follows from it.</p>
      <a href="/your-path" class="btn-pill btn-pill--dark" data-cursor>Call to action</a>
    </div>
  </div>
</section>
```

**Call to action band**

```html
<section class="section" data-theme="dark" aria-labelledby="s-cta">
  <div class="container-x" style="display:grid;gap:24px;justify-items:start;max-width:60ch">
    <p class="micro-label">Next step</p>
    <h2 class="display-m" id="s-cta">Start with a conversation</h2>
    <p class="body-l">One sentence on what happens when someone gets in touch, so the button is not a leap.</p>
    <a href="/contact" class="btn-pill" data-cursor>Get in touch</a>
  </div>
</section>
```

## Building a new page

1. Start from the page skeleton at `/design/system.html#newpage`. It has the head, the noindex, the header, the mobile menu, the footer and the scripts in the right order.
2. Paste sections from the library. Alternate `data-theme` so the page has rhythm and the header has something to respond to.
3. Set the initial `data-header-theme` on the header to match your first section, so the header is correct before JavaScript runs.
4. Write the copy in sentence case, Australian English, no em dashes.
5. Check: one `h1`, no skipped heading levels, alt text on content images, `alt=""` on decorative ones, skip link reaching `main` by keyboard.
6. Check at 360, 768, 1024 and 1800, then with Reduce Motion on, then with JavaScript disabled.

### Not negotiable

- Every page keeps `noindex, nofollow` until Ben removes it at launch.
- One `h1`, no skipped heading levels.
- Reads with JavaScript disabled.
- Never links to `/reports`.
- No bundler, no build step, no npm dependency.
- No invented statistics, client quotes or case study figures.
- No stock photography to fill space.

## What the audit found

The system was built by merging three component sets, and consolidating the token layer surfaced three problems worth recording.

**Three colliding tokens.** Two `:root` blocks each declared `--gutter`, `--s-4` and `--s-8`, and the second silently won. The Apex components were authored against the losing values and have been rendering with the winning ones ever since. The site as it looks today is the winning set, so those are now declared once as the real values. No visual change, but the names stay misleading. Documented above.

**Thirteen dangling tokens.** Names referenced but never defined anywhere, so those declarations were invalid and did nothing. `--text-xs` alone appeared 38 times and `--text-sm` 26. They are now defined and mapped onto the existing scale, which restored the intended sizes on the legacy pages.

**Thirty-one unused tokens.** Defined and never referenced. Left in place for now: they are cheap, and some belong to components not yet built. Worth a sweep once the legacy pages are rebuilt and the `.legacy` block can be deleted.

## Open questions

- Self-hosting a display face, so headline weight is a real semibold rather than Bold, and so Windows and Android match macOS.
- Whether the Apex palette, drawn for a car brand launch, is right for a product design studio. That is a brand decision, not a technical one.
- Renaming `--s-4` and `--s-8` to match their values. Correct, but it moves spacing on every page, so it needs its own pass.
- The eighteen pages still on the `.legacy` block. Each one rebuilt on these components shrinks that block, and when it is empty the namespaced CSS and the last of the old stylesheets can go.
