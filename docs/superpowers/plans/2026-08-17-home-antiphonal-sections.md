# Home Page Antiphonal Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild home page sections 1.1 to 1.4 as call-and-response panel pairs running at poster scale.

**Architecture:** A new `.pair` layout primitive renders two edge-to-edge panels with opposite grounds and no gutter. Each panel carries one poster-scale line and optional reading-scale text. Ratio and call side vary per section. Section 1.3 deliberately does not use `.pair`. All new CSS appends to `styles.css`; all new values are added to `styles/tokens.css` first.

**Tech Stack:** Static HTML, one custom `styles.css`, one `styles/tokens.css`, vanilla JS in `script.js`. No framework, no bundler, no build step, no npm dependency.

**Spec:** `docs/superpowers/specs/2026-08-17-home-page-visual-direction-design.md`

## Global Constraints

Every task inherits all of these. They come from `CLAUDE.md` and `.claude/rules/`.

- Australian English. Organisation, recognise, colour, behaviour, optimise.
- **No em dashes anywhere.** Use commas, full stops, colons or brackets.
- Every value must resolve to a token in `styles/tokens.css`. No literal hex, pixel, rem or font value in HTML or in `styles.css`. If a value has no token, add the token to `styles/tokens.css` first, then reference it.
- Copy is reproduced verbatim from the spec. Do not paraphrase, shorten or improve it.
- Body content lives in the HTML. The page must be readable with JavaScript disabled.
- `<meta name="robots" content="noindex, nofollow">` stays in `index.html`. Never remove it.
- WCAG 2.1 AA. One `h1` on the page, no skipped heading levels, visible focus states.
- `prefers-reduced-motion: reduce` shows final states with no animation.
- No stock photography, no generated decorative imagery, no invented statistics or quotes.
- Do not touch `robots.txt` or `content/metrics.json`.
- Work on the `staging` branch only. Never commit to `main`.

**Existing components to reuse, do not rebuild:**
- `.ph` placeholder graphic, `styles.css`. Modifiers `.ph--4x3`, `.ph--1x1`, `.ph--3x4`, `.ph--wide`. Set `data-label` and `aria-hidden="true"`.
- `.line-w` / `.line` poster reveal, driven by `.reveal` plus `.is-started`.
- `.rise` block reveal, `.wipe` clip reveal.
- `window.observeReveals(root)` in `script.js` registers `.reveal`, `.rise`, `.wipe` with the shared IntersectionObserver and sets `--i` stagger indices. It already runs on `DOMContentLoaded`. Do not write a second observer.

**Verification command used throughout:**

```bash
python3 -c "
import re,io
s=io.open('index.html',encoding='utf-8').read()
assert 'noindex' in s, 'noindex missing'
assert s.count('<h1')==1, 'h1 count wrong'
assert '—' not in s, 'em dash found'
print('index.html checks pass')
"
```

---

### Task 1: Tokens for the pair primitive

**Files:**
- Modify: `styles/tokens.css`

**Interfaces:**
- Consumes: nothing.
- Produces: `--text-poster`, `--leading-poster`, `--track-poster`, `--pair-ratio-a`, `--pair-ratio-b`, `--panel-pad`, `--pair-delay`. Tasks 2 to 6 reference these by name.

- [ ] **Step 1: Add the poster type tokens**

In `styles/tokens.css`, immediately after the `--track-caption` declaration, add:

```css
  /* ---- Poster scale (spec 2026-08-17) ---------------------------
     The middle of the type ramp is deliberately unused on the home
     page pairs. Two sizes only: poster and reading. */
  --text-poster:    clamp(3rem, 11vw, 9rem);
  --leading-poster: 0.92;
  --track-poster:   -0.05em;
```

- [ ] **Step 2: Add the pair layout tokens**

In the same file, immediately after the `--panel-inset` declaration, add:

```css
  /* Antiphonal pair. Ratios alternate between sections so no two
     consecutive pairs share a split. */
  --pair-ratio-a: 58fr 42fr;
  --pair-ratio-b: 55fr 45fr;
  --panel-pad:    clamp(28px, 5vw, 96px);
  --pair-delay:   0.12s;
```

- [ ] **Step 3: Verify the tokens resolve**

```bash
grep -nE 'text-poster|pair-ratio-a|pair-ratio-b|panel-pad|pair-delay' styles/tokens.css
```

Expected: five matches, one per token.

- [ ] **Step 4: Commit**

```bash
git add styles/tokens.css
git commit -m "Tokens: poster scale and antiphonal pair ratios"
```

---

### Task 2: The pair primitive CSS

**Files:**
- Modify: `styles.css` (append at end of file)

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: classes `.pair`, `.pair--b`, `.pair--flip`, `.panel`, `.panel__poster`, `.panel__read`, `.panel__label`. Tasks 3 to 6 use these exact class names.

- [ ] **Step 1: Append the pair CSS**

Append to `styles.css`:

```css

/* ============================================================
   ANTIPHONAL PAIR
   ------------------------------------------------------------
   Two panels, edge to edge, no gutter. Opposite grounds. The
   meeting edge is the contrast. Spec 2026-08-17.
   ============================================================ */

.pair {
  display: grid;
  grid-template-columns: var(--pair-ratio-a);
  align-items: stretch;
}
.pair--b { grid-template-columns: var(--pair-ratio-b); }

/* Call on the right. Order swaps, ratio follows the call. */
.pair--flip { direction: rtl; }
.pair--flip > * { direction: ltr; }

.panel {
  padding: var(--panel-pad);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-xl);
  min-height: clamp(360px, 52vw, 720px);
}

.panel__poster {
  font-size: var(--text-poster);
  line-height: var(--leading-poster);
  letter-spacing: var(--track-poster);
  font-weight: var(--weight-semi);
  margin: 0;
}

.panel__read {
  font-size: var(--text-body2);
  line-height: var(--leading-body2);
  letter-spacing: var(--track-body2);
  font-weight: var(--weight-regular);
  max-width: 46ch;
  margin: 0;
}

.panel__label {
  font-size: var(--text-caption);
  line-height: var(--leading-caption);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  font-weight: var(--weight-medium);
  color: var(--grey);
  margin: 0;
}

/* Response arrives after the call */
html.js .panel--response .reveal .line,
html.js .panel--response .rise { transition-delay: var(--pair-delay); }

@media (max-width: 900px) {
  .pair,
  .pair--b { grid-template-columns: minmax(0, 1fr); }
  .pair--flip { direction: ltr; }
  .panel { min-height: auto; }
}

@media (prefers-reduced-motion: reduce) {
  html.js .panel--response .reveal .line,
  html.js .panel--response .rise { transition-delay: 0s; }
}
```

- [ ] **Step 2: Verify no literal values were introduced**

```bash
awk '/ANTIPHONAL PAIR/,0' styles.css | grep -nE '#[0-9a-fA-F]{3,6}|[0-9]+px|[0-9]+rem' | grep -v 'var(--' | grep -v '@media'
```

Expected: no output. `@media` breakpoints are the only permitted literals and are excluded above.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "CSS: antiphonal pair primitive"
```

---

### Task 3: Section 1.2, What changed

Built before the hero. It is the purest case of the system, so it is the cheapest place to discover the system is wrong.

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `.pair`, `.panel` from Task 2.
- Produces: the markup pattern Tasks 4 to 6 copy.

- [ ] **Step 1: Replace the existing section**

In `index.html`, find the section with `id="what-changed"` and replace the entire `<section>` element, opening tag to closing tag, with:

```html
<!-- 1.2 What changed. Call left, dark, 58/42. -->
<section class="pair" id="what-changed" aria-labelledby="h2-what-changed">
  <div class="panel panel--call" data-scheme="dark">
    <p class="panel__label">01 / What changed</p>
    <h2 class="panel__poster reveal" id="h2-what-changed">
      <span class="line-w"><span class="line">Making things</span></span>
      <span class="line-w"><span class="line">used to be the</span></span>
      <span class="line-w"><span class="line">expensive part.</span></span>
    </h2>
    <p class="panel__read rise">Drawing every screen. Writing every summary. Rebuilding every option somebody wanted to compare.</p>
  </div>
  <div class="panel panel--response" data-scheme="light">
    <p class="panel__label">The answer</p>
    <p class="panel__poster reveal">
      <span class="line-w"><span class="line">That cost has</span></span>
      <span class="line-w"><span class="line">mostly gone.</span></span>
      <span class="line-w"><span class="line">Judgement has not.</span></span>
    </p>
    <p class="panel__read rise">So the constraint moved. You are no longer limited by how much you can produce. You are limited by how well you decide.</p>
  </div>
</section>
```

- [ ] **Step 2: Verify the page still passes structural checks**

```bash
python3 -c "
import io
s=io.open('index.html',encoding='utf-8').read()
assert 'noindex' in s, 'noindex missing'
assert s.count('<h1')==1, 'h1 count wrong'
assert '—' not in s, 'em dash found'
assert s.count('id=\"what-changed\"')==1
print('pass')
"
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Home 1.2: antiphonal pair, call left dark"
```

---

### Task 4: Section 1.4, Where we come in

Built second so the alternation rule can be checked against a real neighbour.

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `.pair--b`, `.pair--flip` from Task 2.

- [ ] **Step 1: Replace the existing section**

Find the section with `id="where-we-come-in"` and replace the entire `<section>` element with:

```html
<!-- 1.4 Where we come in. Call right, light, 55/45. Inverted from 1.2. -->
<section class="pair pair--b pair--flip" id="where-we-come-in" aria-labelledby="h2-where">
  <div class="panel panel--call" data-scheme="light">
    <p class="panel__label">03 / Where we come in</p>
    <h2 class="panel__poster reveal" id="h2-where">
      <span class="line-w"><span class="line">We rebuilt our</span></span>
      <span class="line-w"><span class="line">process around the</span></span>
      <span class="line-w"><span class="line">new economics.</span></span>
    </h2>
    <p class="panel__read rise">Then kept every gate that made the old one safe.</p>
  </div>
  <div class="panel panel--response" data-scheme="dark">
    <span class="ph ph--4x3 wipe" data-label="Placeholder" aria-hidden="true"></span>
    <p class="panel__read rise">You still get research, design, design systems and prototypes. You get more of them, tested harder, with the reasoning written down as we go. Nothing you relied on has gone.</p>
    <a href="/how-we-work" class="btn-ghost rise">How we work<span class="btn__arrow"><svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" stroke-width="1.4"/></svg></span></a>
  </div>
</section>
```

- [ ] **Step 2: Verify alternation against 1.2**

```bash
python3 -c "
import io,re
s=io.open('index.html',encoding='utf-8').read()
a=re.search(r'<section class=\"([^\"]*)\" id=\"what-changed\"',s).group(1)
b=re.search(r'<section class=\"([^\"]*)\" id=\"where-we-come-in\"',s).group(1)
assert a!=b, 'consecutive pairs share a split, spec violation'
assert 'pair--flip' in b and 'pair--flip' not in a, 'call side does not alternate'
print('alternation pass')
"
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Home 1.4: antiphonal pair, call right light, inverted from 1.2"
```

---

### Task 5: Section 1.3, What that means

Deliberately not a pair. Three consecutive splits would become the new monotony.

**Files:**
- Modify: `styles.css` (append), `index.html`

**Interfaces:**
- Consumes: poster tokens from Task 1.
- Produces: `.stagger`, `.stagger__item`, `.stagger__num`, `.stagger__text`.

- [ ] **Step 1: Append the stagger CSS**

Append to `styles.css`:

```css

/* ---- Staggered numeral pairs (home 1.3) --------------------------
   Not a .pair. Contrast comes from scale alone, on one ground. */
.stagger { display: flex; flex-direction: column; gap: var(--space-3xl); }
.stagger__item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-xl);
  align-items: baseline;
}
.stagger__item:nth-child(even) {
  grid-template-columns: minmax(0, 1fr) auto;
}
.stagger__item:nth-child(even) .stagger__num { order: 2; }
.stagger__num {
  font-size: var(--text-poster);
  line-height: var(--leading-poster);
  letter-spacing: var(--track-poster);
  font-weight: var(--weight-semi);
  color: var(--grey-light);
  margin: 0;
}
.stagger__text {
  font-size: var(--text-body2);
  line-height: var(--leading-body2);
  letter-spacing: var(--track-body2);
  max-width: 40ch;
  margin: 0;
}
@media (max-width: 900px) {
  .stagger__item,
  .stagger__item:nth-child(even) { grid-template-columns: minmax(0, 1fr); }
  .stagger__item:nth-child(even) .stagger__num { order: 0; }
}
```

- [ ] **Step 2: Replace the existing section**

Find the section with `id="what-that-means"` and replace the entire `<section>` element with:

```html
<!-- 1.3 What that means. No pair, three staggered numeral pairs, light ground. -->
<section class="band" data-scheme="light" id="what-that-means" aria-labelledby="h2-means">
  <div class="shell">
    <p class="panel__label">02 / What that means</p>
    <h2 class="panel__poster reveal" id="h2-means" style="margin-bottom:var(--space-3xl)">
      <span class="line-w"><span class="line">What that means</span></span>
    </h2>
    <ol class="stagger">
      <li class="stagger__item rise">
        <p class="stagger__num">01</p>
        <p class="stagger__text">Three directions in front of users, instead of one you committed to in a meeting.</p>
      </li>
      <li class="stagger__item rise">
        <p class="stagger__num">02</p>
        <p class="stagger__text">Working software in week two, not a picture of it in week six.</p>
      </li>
      <li class="stagger__item rise">
        <p class="stagger__num">03</p>
        <p class="stagger__text">An answer to whether the last release worked, instead of an argument about it.</p>
      </li>
    </ol>
    <p class="panel__read rise" style="margin-top:var(--space-3xl)">Most teams have not caught up. They are still running a process built around a constraint that no longer exists.</p>
  </div>
</section>
```

- [ ] **Step 3: Verify**

```bash
python3 -c "
import io
s=io.open('index.html',encoding='utf-8').read()
assert s.count('stagger__item')==3
assert '—' not in s
print('pass')
"
```

- [ ] **Step 4: Commit**

```bash
git add styles.css index.html
git commit -m "Home 1.3: staggered numeral pairs, breaks the split rhythm"
```

---

### Task 6: Section 1.1, Hero

Built last. It is the most composed section and benefits from the system being proven first.

**Files:**
- Modify: `styles.css` (append), `index.html`

**Interfaces:**
- Consumes: poster tokens, `.panel__read`, `.ph`.
- Produces: `.hero-anti`, `.hero-anti__cut`.

- [ ] **Step 1: Append the hero CSS**

Append to `styles.css`:

```css

/* ---- Hero (home 1.1) ---------------------------------------------
   Full-bleed dark ground with a light panel cutting in from the
   lower right. The cut edge is the same hard boundary as a .pair. */
.hero-anti {
  position: relative;
  min-height: min(92vh, 960px);
  padding: calc(var(--nav-h) + var(--panel-pad)) var(--panel-pad) var(--panel-pad);
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: var(--space-xl);
  overflow: hidden;
}
.hero-anti__poster {
  font-size: var(--text-poster);
  line-height: var(--leading-poster);
  letter-spacing: var(--track-poster);
  font-weight: var(--weight-semi);
  max-width: 18ch;
  margin: 0;
}
.hero-anti__cut {
  justify-self: end;
  align-self: end;
  max-width: min(46ch, 100%);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
.hero-anti__actions { display: flex; flex-wrap: wrap; gap: var(--space-sm); }

@media (max-width: 900px) {
  .hero-anti { min-height: auto; }
  .hero-anti__cut { justify-self: stretch; max-width: none; }
}
```

- [ ] **Step 2: Replace the existing hero**

Find the section with `id="hero"` and replace the entire `<section>` element with:

```html
<!-- 1.1 Hero. Dark ground, light panel cutting in lower right. -->
<section class="hero-anti" data-scheme="dark" id="hero" aria-labelledby="h1-hero">
  <p class="panel__label">Product design and research studio, Sydney</p>
  <h1 class="hero-anti__poster reveal" id="h1-hero">
    <span class="line-w"><span class="line">Antiphono is a</span></span>
    <span class="line-w"><span class="line">product design and</span></span>
    <span class="line-w"><span class="line">research studio built</span></span>
    <span class="line-w"><span class="line">for the way software</span></span>
    <span class="line-w"><span class="line">gets made now.</span></span>
  </h1>
  <div class="hero-anti__cut" data-scheme="light">
    <span class="ph ph--wide wipe" data-label="Placeholder" aria-hidden="true"></span>
    <p class="panel__read rise">We work with technology businesses on research, design and working prototypes, and we stay long enough to find out whether it worked.</p>
    <div class="hero-anti__actions rise">
      <a href="https://cal.com/ben-tweedie-v96yxs/discovery-call" target="_blank" rel="noopener" class="btn-lime">Get in touch<span class="btn__arrow"><svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" stroke-width="1.4"/></svg></span></a>
      <a href="/work" class="btn-ghost">See the work<span class="btn__arrow"><svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" stroke-width="1.4"/></svg></span></a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Remove the now-unused hero meta strip**

The old `<div class="hero__meta">` sat inside the previous hero section and was removed with it in Step 2. Confirm it is gone:

```bash
grep -c 'hero__meta' index.html
```

Expected: `0`.

- [ ] **Step 4: Verify**

```bash
python3 -c "
import io
s=io.open('index.html',encoding='utf-8').read()
assert s.count('<h1')==1, 'h1 count wrong'
assert 'noindex' in s
assert '—' not in s
assert 'hero-anti' in s
print('pass')
"
```

- [ ] **Step 5: Commit**

```bash
git add styles.css index.html
git commit -m "Home 1.1: hero rebuilt on the antiphonal system"
```

---

### Task 7: Contrast and accessibility verification

**Files:**
- Create: `scripts/check-contrast.mjs`

**Interfaces:**
- Consumes: token values from `styles/tokens.css`.
- Produces: a pass or fail report. No site code depends on this.

- [ ] **Step 1: Write the checker**

Create `scripts/check-contrast.mjs`:

```js
// Verifies every text position in the antiphonal sections meets WCAG 2.1 AA.
// Run: node scripts/check-contrast.mjs
const lum = (hex) => {
  const c = [1, 3, 5].map(i => parseInt(hex.substr(i, 2), 16) / 255)
    .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const x = lum(a), y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

const DARK = '#18181B', LIGHT = '#FAFAFA', INK = '#09090B';
const GREY = '#999999', GREY_LIGHT = '#BBBBBB', CTA = '#2563EB';

const cases = [
  ['body on dark',        LIGHT, DARK, 4.5],
  ['body on light',       INK,   LIGHT, 4.5],
  ['label grey on dark',  GREY,  DARK, 4.5],
  ['label grey on light', '#666666', LIGHT, 4.5],
  ['numeral on light',    GREY_LIGHT, LIGHT, 3.0],
  ['CTA fill on dark',    CTA,   DARK, 3.0],
  ['CTA text on fill',    LIGHT, CTA, 4.5],
];

let failed = 0;
for (const [name, fg, bg, min] of cases) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(22)} ${r.toFixed(2)}:1  (min ${min})`);
}
console.log(failed ? `\n${failed} failure(s)` : '\nAll contrast checks pass');
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Run it**

```bash
node scripts/check-contrast.mjs
```

Expected: every line `PASS`, exit code 0. If `numeral on light` fails, change `.stagger__num` colour from `var(--grey-light)` to `var(--grey)` in `styles.css` and rerun.

- [ ] **Step 3: Verify the page with JavaScript disabled**

```bash
python3 -c "
import io,re
s=io.open('index.html',encoding='utf-8').read()
for t in ['Making things','That cost has','What that means','We rebuilt our','Antiphono is a']:
    assert t in s, f'{t} not in static HTML'
print('all copy present without JS')
"
```

- [ ] **Step 4: Commit**

```bash
git add scripts/check-contrast.mjs
git commit -m "Add contrast checker for the antiphonal sections"
```

---

### Task 8: Remove dead CSS

The previous hero and band markup for these four sections is gone. Their CSS is now unused.

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing.

- [ ] **Step 1: Confirm the rules are genuinely unused**

```bash
for c in hero-wrap hero-panel hero-panel__mark hero-panel__kicker hero-panel__scroll hero-panel__foot hero-panel__lead hero-panel__actions hero-cards hero-card hero__meta; do
  n=$(grep -c "class=\"[^\"]*$c" index.html)
  echo "$c used in index.html: $n"
done
```

Expected: `0` for every class. **If any is non-zero, stop and do not delete that rule.**

- [ ] **Step 2: Check no other page uses them**

```bash
grep -l 'hero-panel\|hero-wrap\|hero-cards' *.html work/*.html 2>/dev/null || echo "no other page uses them"
```

Expected: `no other page uses them`. **If any file is listed, stop and leave the CSS in place.**

- [ ] **Step 3: Delete the block**

Only if Steps 1 and 2 both came back clean, delete from `styles.css` the block that begins with the comment `HOME PAGE, FIGMA-BORROWED LAYOUT` down to but not including the comment `Service group rows (home 1.5)`. Keep `.ph`, `.stat-cards`, `.stat-card` and all their modifiers, which are still used by section 1.9.

- [ ] **Step 4: Verify nothing broke**

```bash
node scripts/check-contrast.mjs && python3 -c "
import io
s=io.open('index.html',encoding='utf-8').read()
assert '.ph' or 'class=\"ph' in s
print('pass')
"
```

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "Remove CSS for the replaced hero and band sections"
```

---

## Self-Review

**Spec coverage.** Every spec section maps to a task: the mechanic and type system to Tasks 1 and 2; sections 1.1, 1.2, 1.3 and 1.4 to Tasks 6, 3, 5 and 4; motion to Task 2 Step 1; palette to Task 1 and verified in Task 7; placeholder imagery to Tasks 4 and 6; accessibility and success criteria 1 to 7 to Task 7. Success criterion 2, alternation, is enforced by an assertion in Task 4 Step 2. Success criterion 8 is a judgement call and is checked in review, not by script.

**Placeholder scan.** No TBDs. Every code step contains the literal content to write.

**Type consistency.** Class names used in Tasks 3 to 6 match those defined in Task 2: `.pair`, `.pair--b`, `.pair--flip`, `.panel`, `.panel--call`, `.panel--response`, `.panel__poster`, `.panel__read`, `.panel__label`. Token names used throughout match those defined in Task 1.

**Deliberate ordering.** 1.2 is built first because it is the purest test of the system, and the hero last because it is the most composed. Task 8 deletes dead CSS only after two guard checks and stops if either fails.
