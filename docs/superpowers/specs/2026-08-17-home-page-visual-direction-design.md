# Home page visual direction: antiphonal split at poster scale

**Date:** 2026-08-17
**Status:** Approved by Ben, 17 August 2026
**Scope:** Home page sections 1.1 to 1.4 only. The rest of the home page and the other pages follow once these four are working.

---

## Problem

The current home page fails on four counts, confirmed by Ben:

1. Too dark and heavy. A near-black ground dominates every section.
2. Layout is monotonous. Rail number, heading, body, repeat, for eleven sections.
3. Type lacks presence. The scale steps politely and never commits.
4. It feels like a template. Nothing is specific to Antiphono, which is fatal for a design studio.

## Direction

**Antiphonal split at poster scale.** Approach A crossed with B: the organising idea comes from the studio's name, and the execution runs at poster rather than reading scale.

Antiphony is call and response, two voices in dialogue, each shaping the other. That is already the shape of the content. Section 1.2 is *was expensive* answered by *cost has gone*. Section 1.3 is *three directions* against *one*. Section 1.4 is *rebuilt* answered by *kept the gates*. The layout performs the argument before anyone reads it.

This is the only direction considered that is original to Antiphono rather than a style applied to it.

## The mechanic

Every section is a **pair**: a call panel and a response panel.

- Two panels, edge to edge, **no gutter between them**. The meeting edge is a hard black-to-white boundary and is the main source of contrast on the page.
- Panels carry **opposite grounds**. One dark, one light.
- The **split ratio varies per section** and the call **alternates sides**. This is what kills the monotony. Never two consecutive sections with the same ratio or the same call side.
- Each panel contains **one poster-scale line** and optionally one block of reading-scale supporting text. Nothing sits between those two sizes.

## Type system

Sora only. Weights 300, 500, 600. No second typeface. Fraunces and Space Mono remain removed.

| Role | Size | Tracking | Line height | Weight |
|---|---|---|---|---|
| Poster | `clamp(3rem, 11vw, 9rem)` | `-0.05em` | `0.92` | 600 |
| Reading | `1rem` | `-0.01em` | `1.5` | 400 |
| Label | `0.75rem` uppercase | `0.10em` | `1.33` | 500 |

**Deleting the middle of the scale is the point.** The absence of intermediate sizes is what gives the poster line its presence. Do not reintroduce a heading size between poster and reading.

## Palette

The ui-ux-pro-max generator palette, target "portfolio website". Confirmed by Ben. Already in `styles/tokens.css`.

| Token | Value | Use |
|---|---|---|
| `--gen-primary` | `#18181B` | dark panel ground |
| `--gen-bg` | `#FAFAFA` | light panel ground |
| `--gen-text` | `#09090B` | ink on light |
| `--gen-secondary` | `#3F3F46` | raised surface, borders on dark |
| `--gen-cta` | `#2563EB` | primary action only |

`--gen-cta` on the dark ground is 3.43:1. That passes for buttons and borders and **fails for body text**. Never set blue as text on dark.

## Sections

Copy is reproduced verbatim below from `Antiphono-Website-Copy-v2.md` sections 1.1 to 1.4. Use it exactly as written. Do not paraphrase, shorten or improve it.

### 1.1 Hero

Full-bleed dark panel. The h1 runs at poster scale across most of the viewport. A light panel cuts into the dark from the lower right carrying the lead and the two actions. One placeholder graphic sits as a third element, overlapping the meeting edge.

- **h1, poster:** Antiphono is a product design and research studio built for the way software gets made now.
- **Reading:** We work with technology businesses on research, design and working prototypes, and we stay long enough to find out whether it worked.
- **Actions:** `Get in touch` to the booking link, `See the work` to `/work`.

### 1.2 What changed

The purest case. If the system does not work here it does not work. Split 58 / 42, call on the left, dark.

- **Call panel, dark, poster:** Making things used to be the expensive part.
- **Call panel, reading:** Drawing every screen. Writing every summary. Rebuilding every option somebody wanted to compare.
- **Response panel, light, poster:** That cost has mostly gone. Judgement has not.
- **Response panel, reading:** So the constraint moved. You are no longer limited by how much you can produce. You are limited by how well you decide.

### 1.3 What that means

Light ground throughout. No panel split here, which is deliberate: three consecutive splits would become the new monotony. Instead three staggered pairs, each a numeral at poster scale set against its statement at reading scale. The numeral alternates side down the page.

1. Three directions in front of users, instead of one you committed to in a meeting.
2. Working software in week two, not a picture of it in week six.
3. An answer to whether the last release worked, instead of an argument about it.

- **Closing, reading:** Most teams have not caught up. They are still running a process built around a constraint that no longer exists.

### 1.4 Where we come in

Inverted from 1.2. Split 55 / 45, call on the **right**, light.

- **Call panel, light, poster:** We rebuilt our process around the new economics, then kept every gate that made the old one safe.
- **Response panel, dark, reading:** You still get research, design, design systems and prototypes. You get more of them, tested harder, with the reasoning written down as we go. Nothing you relied on has gone.
- **Link:** `How we work` to `/how-we-work`.
- One placeholder graphic in the dark panel.

## Motion

Paired reveals. The call enters from one side and the response from the other, so the movement performs the dialogue rather than decorating it.

- Easing `--ease-expo`, `cubic-bezier(0.86, 0, 0.07, 1)`.
- Triggered by `IntersectionObserver`, `unobserve` after firing so it runs once.
- Response panel delayed 0.12s behind its call. The answer arrives after the statement.
- Poster lines use the existing `.line-w` / `.line` translate reveal.
- The placeholder graphic uses the existing clip-path wipe.

`prefers-reduced-motion: reduce` disables every transition and shows final states immediately. Not a softened animation, no animation.

## Placeholder imagery

A single dummy graphic, reused. Real imagery arrives once structure and motion are settled.

Use the existing `.ph` component. It carries a visible label so that shipping a placeholder is a deliberate act. No stock photography and no generated decorative imagery.

## Constraints

These are project rules from `CLAUDE.md` and `.claude/rules/`. They are not negotiable and apply to every line written.

- **Australian English.** Organisation, recognise, colour, behaviour, optimise.
- **No em dashes anywhere.** Commas, full stops, colons or brackets.
- **Every value resolves to a token** in `styles/tokens.css`. No literal hex, pixel or font value in the HTML or in `styles.css`. If a value has no token, add the token first.
- **Static HTML and CSS only.** Vanilla JS. No framework, no bundler, no build step, no npm dependency.
- **Body content lives in the HTML.** The page must be readable and navigable with JavaScript disabled.
- **`<meta name="robots" content="noindex, nofollow">` stays** on every page.
- **WCAG 2.1 AA.** One `h1`, no skipped heading levels, visible focus states, 4.5:1 for body text and 3:1 for large text and interface components.
- **No invented content.** No statistics, client quotes, outcomes or logos.

## Out of scope

- Home page sections 1.5 to 1.11. They keep their current markup until these four are approved.
- Every other page.
- The typeface question. Sora stays for now.
- Real imagery.
- `design/style-guide.html`, which is updated after the direction is settled, not before.

## Success criteria

1. The four sections render correctly at 375px, 768px, 1024px and 1440px.
2. No two consecutive sections share a split ratio or a call side.
3. Only two type sizes are used per section, poster and reading.
4. Contrast passes AA at every text position, verified by computation and reported.
5. The page is readable and navigable with JavaScript disabled.
6. `prefers-reduced-motion` shows final states with no animation.
7. No literal design value appears outside `styles/tokens.css`.
8. Section 1.2 reads as one argument across the meeting edge rather than two adjacent boxes.
