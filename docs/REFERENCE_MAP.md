# Reference Map — Apex Roadster (from reference-recording.mp4)

**STATUS: ANALYZED** — frame-by-frame visual review of 53 frames (2 fps, 26.4s).

Source recording: `reference/reference-recording.mp4` (1920×1080, 26.4s, 60fps).
The reference is the **Toyokoh corporate site** (toyokoh.com) — an award-style
Japanese industrial editorial site. Frames are screen captures incl. browser
chrome; all geometry below is normalized to the *viewport content area*.

Capture: 53 frames at 0.5s intervals → timestamps t = (frame# − 1) × 0.5s.

---

## Global system

- **Two alternating background modes:** warm off-white light sections
  (`#F4F4F2` → mapped to Apex White) and near-black dark sections
  (`#111214` Apex Black / `#08090A` deep black). Light↔dark transitions are
  full-viewport curtain wipes driven by scroll.
- **Typography:** heavy neo-grotesk, oversized uppercase display lines with
  tight tracking and 0.9–0.98 line-height; small parenthetical monospace
  section labels `( SECTION )`; compact gray body columns.
- **Cursor:** thin outlined circle (~36px) + center dot, `mix-blend-mode:
  difference`, follows with delay; expands into a labeled ring ("READ MORE")
  over interactive cards. Disabled on touch.
- **Section labels** are sticky/pinned within their section: `( OUR BUSINESS )`,
  `( RECRUIT )`, `( NEWS )`, `( ABOUT )`.
- **Motion:** Lenis smooth scroll; GSAP ScrollTrigger pinning; masked
  line-by-line headline reveals; media scale 1.06→1; horizontal-scroll gallery
  pinned under a fixed text card (RECRUIT); editorial curtain wipes between
  major sections; ease = power4 / expo style (≈ cubic-bezier(0.76,0,0.24,1)).

---

## Section map (scroll order)

### 1. Global header — persistent, transparent over hero
- Thin bar, height ~64px. Left: nav links row (in reference: product/company
  links). Center: wordmark. Right: language pill + CONTACT pill (light).
- Over the dark hero video the text is white. When a light section scrolls
  under, header flips to dark text (smooth color transition).
- **Apex mapping:** left = APEX symbol+wordmark; center nav = ROADSTER /
  DESIGN / TECHNOLOGY / EXPERIENCE / JOURNAL; right = CONFIGURE pill.
  Mobile → burger opening full-screen oversized-type menu.

### 2. Hero — frames f_001–f_003 (0–1.5s) | 100vh, dark, full-bleed video
- Full-bleed looping video (reference: laser cleaning; Apex: supplied
  `apex-hero-video.mp4`), `object-fit: cover`, focal center.
- Centered bottom-anchored white copy block (~78% vh): two-line headline +
  `( SCROLL DOWN )` micro-label below (~88% vh).
- Subtle bottom gradient scrim for legibility only; video stays bright.
- Custom cursor visible over video.
- **Opening animation:** composed load — header fades/slides in, hero video
  reveals via clip-path inset mask + scale 1.12→1, copy enters masked
  line-by-line, support/meta follow with restrained stagger.
- **Apex mapping:** eyebrow "APEX ROADSTER / 01", main "Motion, reduced to its
  purest form.", support line, CTA "Discover the Roadster", bottom metadata row
  (ZERO EMISSIONS / DUAL-MOTOR PERFORMANCE / CONCEPT 2026).

### 3. Light intro — frames f_004–f_006 (1.5–2.5s) | light bg, tall
- **Curtain wipe:** dark hero slides up & dims; light section rises from below.
- Massive left-aligned stacked uppercase headline (~13–15vh/line), left ~6%:
  3 stacked words ("NEXT / NEW / TECHNOLOGY" → Apex: "THE / NEXT / FORM OF /
  PERFORMANCE" — 4 lines).
- Small floating media top-right (~14%w × ~4:3, at ~85–99% x, 42–65% vh) that
  **travels with the scroll** through the transition (persistent thumbnail).
- Compact body copy below headline, left-aligned.
- **Apex mapping:** VisionIntro — label "01 / VISION", 4-line headline, support
  copy, floating media = front-light macro, parallax 4–12%.

### 4. Split editorial — frames f_007–f_011 (3–5.5s) | light bg
- Continued light section: left ~55% has two stacked media (top 16:9 wide,
  bottom 4:3), right column body text (~65% x) + dark pill "READ MORE".
- Generous whitespace; circular ring scroll indicator fixed right (~85% x).
- **Apex mapping:** DriverEngineering — large cockpit/interior visual left,
  compact copy block right, label, "READ THE PHILOSOPHY" pill CTA.

### 5. Full-bleed cinematic — frames f_012–f_015 (5.5–7.5s) | media
- Large ultrawide (~21:9) aerial media enters from bottom with rounded
  corners, then **scroll-scales to full-bleed 100vh** (pinned grow), then
  releases and scrolls up, revealing dark section below.
- **Apex mapping:** CinematicInterlude — reuse a segment of the Apex hero
  video (calm studio), scroll-driven scale/reveal, no aggressive scrub.

### 6. Dark manifesto — frames f_016–f_024 (7.5–11.5s) | dark bg, tall pinned
- Dark near-black section. Centered/left oversized uppercase headline
  ("BEAUTIFULLY / FOR THE / FUTURE" → Apex: "BEAUTIFULLY / BUILT FOR /
  MOTION"), ~18vh/line.
- Label `( ABOUT )` top-center (~32% vh) → Apex "ABOUT / APEX".
- **Layered floating imagery parallaxes around the fixed type:** one wide
  image lower (~16:9), one smaller floating top, one vertical/offset detail —
  all move at different scroll rates (scroll-linked vertical movement).
- Narrow body column right (~65% x) + short statement.
- **Apex mapping:** Manifesto — 3 layered vehicle images around the headline
  with differential parallax, body copy + "Less interface. More instinct."

### 7. Feature cards — frames f_025–f_033 (12–16.5s) | split sticky cards
- `( OUR BUSINESS )` sticky label top-left. **Sticky split-screen cards:**
  left ~50% full-bleed image, right ~50% light content card.
- Right card: index `( 01 )` top-right, product image center, circular
  outline "READ MORE" button, brand title + 2-line tagline centered bottom.
- Cards transition with motion-blur/crossfade between items (2 in reference).
- **Apex mapping:** RoadsterSystems — 4 features (AEROFLOW, VECTOR DRIVE,
  HALO LIGHT, QUIET CABIN) as vertically-stacking sticky split cards; left
  media swaps, right card holds title/description/metadata + circular action.
  NOT a 4-column grid.

### 8. Curtain transition — frames f_033–f_035 (16.5–17.5s)
- Full-screen dark scrim wipe between sections; a thin ring element rides the
  edge. Brief, ~1s.
- **Apex mapping:** MaterialInterlude — soft abstract silver/reflection media
  as breathing space, revealed through the wipe.

### 9. Pinned horizontal gallery — frames f_036–f_043 (17.5–21s) | dark
- `( RECRUIT )` label. **Fixed center text card** ("CREATE / INNOVATION" →
  Apex "CREATE / THE NEW / STANDARD") stays pinned center while a gallery of
  images pans **horizontally with vertical stagger** behind it (scroll-scrub).
- Tagline + pill CTA under headline. Thin progress rule.
- **Apex mapping:** PurposeSection — label "OUR PURPOSE / 02", headline, body,
  "OUR APPROACH" pill; behind it a horizontal mosaic of design-studio /
  workshop / vehicle-detail imagery scrubbing horizontally on scroll.

### 10. News list — frames f_044–f_047 (21.5–23s) | light bg
- `( NEWS )` sticky label. Hairline-divided rows: date (small gray, left) /
  black pill category tag(s) / headline (dark, from ~32% x).
- Hover: title shifts/opacity, arrow/circular indicator animates. Optional
  cursor-following thumbnail.
- Black pill "VIEW ALL" centered below.
- **Apex mapping:** JournalList — "JOURNAL", 4 dated entries with category
  pills, hairline separators, hover title movement, "VIEW ALL".

### 11. Contact — frames f_048–f_050 (23.5–24.5s) | light bg
- Giant centered uppercase heading ("CONTACT US" with alternating solid/ghost
  letters → Apex "MEET THE / APEX ROADSTER" — solid/ghost word treatment).
- Lower-left tagline block (4 lines). Large **solid white circular CTA**
  (~14vw diameter, "GO TO FORM" → Apex "REQUEST ACCESS") + smaller outlined
  circle accent. Circular CTA expands/inverts on hover, magnetic, returns
  gently, keyboard accessible.
- **Apex mapping:** ReservationSection — heading, support copy, circular
  "REQUEST ACCESS" CTA, secondary "CONFIGURE APEX" link.

### 12. Footer — frames f_051–f_053 (25–26s) | dark bg
- Dark near-black footer rising as contact scrolls up. Left: wordmark +
  copyright. Center: nav link groups (2–3 columns). Right: social circles.
  Bottom-left: © + privacy. Bottom-right: language pill → Apex back-to-top.
- **Apex mapping:** Footer — Apex logo + "Apex Motion Systems © 2026",
  EXPLORE / CONTACT / LEGAL groups, social (Instagram / X / YouTube),
  final line "Designed around motion.", circular back-to-top.

---

## Motion / interaction summary
- Lenis smooth scroll (duration ~1.15, exponential ease).
- GSAP ScrollTrigger: pin hero→intro wipe; pin cinematic grow; pin manifesto
  parallax; pin feature cards; pin horizontal gallery scrub.
- Masked line-by-line headline reveals (translateY 110%→0, power4.out,
  ~0.9–1.1s, stagger ~0.09s).
- Media reveal via clip-path inset + scale 1.06→1.
- Curtain wipes between light↔dark via full-viewport panels.
- Custom cursor: delayed ring follow, expand+label over `[data-cursor]`,
  difference blend, disabled on touch.
- All reversible; `prefers-reduced-motion` disables smoothing + reveals.

## Responsive
- Desktop master (1920). Tablet 8-col/24px, mobile 4-col/16–20px gutters.
- Mobile: disable cursor + horizontal gallery becomes vertical stack, reduce
  parallax, keep full-bleed hero, circular buttons stay usable.
