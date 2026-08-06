# Antiphono website

Static marketing site for Antiphono, a product design and research studio in Sydney, Australia. Founded 2018, previously trading as BT Digital. Founder and Product Lead: Ben Tweedie.

The full build specification is at `docs/site-build-spec.md`. Read it before starting any new page or component. Approved page copy is in `docs/copy/`. Use that copy as written. Do not rewrite it.

## Stack, and what not to add

- HTML: static `.html` files served directly.
- CSS: one custom `styles.css`. No Tailwind, no Bootstrap, no CSS framework.
- JavaScript: vanilla only. `script.js`, `render.js`, `data.js`.
- Node: a light `server.js` serving static files and proxying an RSS feed.

Never add a framework, a bundler, a build step or an npm dependency beyond what `server.js` already uses.

Page body content lives in the HTML. JavaScript handles the gallery, the counters, navigation and interaction only. Every page must be readable with JavaScript disabled.

## Writing rules

These apply to every word on the site, including alt text, link text, button labels and meta descriptions.

- Australian English. Organisation, recognise, colour, behaviour, analyse, optimise.
- **No em dashes anywhere.** Use commas, full stops, colons or brackets.
- Short sentences. Plain verbs. Specific nouns.
- Headings as clear as body copy. A heading that sounds impressive but says nothing is worse than a plain one.
- Never use: leverage, unlock, seamless, cutting edge, revolutionise, supercharge, game changing, best in class, synergy, holistic, empower, transform (as a noun), robust, journey (unless it is literally a user journey).
- Tone: a senior person explaining something technical to a smart client over coffee. Confident, never salesy.

Before finishing any copy, read every heading and ask whether a technically literate client with no design background would know exactly what it means on first read. If not, rewrite it.

## Positioning rules

1. Lead with the outcome, method second. Never open a page with technology.
2. Be transparent about where AI is used and where it is not.
3. Never say or imply that AI does our research. People run interviews and make the calls. AI compresses synthesis, production and documentation.
4. Never frame efficiency as a discount. The gain is more scope, more testing and more evidence for the same money.
5. Lead with platform categories, then name examples. "Agentic coding tool", then Claude Code. "Analytics and behaviour platform", then GA4 and Contentsquare.
6. No invented numbers. No percentages, cycle times or case study figures unless real and sourced.
7. Any claim about speed arrives with its quality control: review gates, the design system, human sign off.
8. Never imply Antiphono replaces a client's development team or deploys to their production environment.

## Facts that must stay accurate

- Email is `ben@antiphono.com`. The old site uses `hello@antiphono.studio` in several places. It is wrong everywhere it appears.
- LinkedIn is `https://www.linkedin.com/in/bentweedie`.
- The team is one person. Two contract roles are planned and unfilled. Never describe them as if they exist.
- Established 2018.
- GroupTogether and Future Women may be named in case studies only, never in general site copy.

## Confidentiality

The rebrand has not been announced. **Every page ships with `<meta name="robots" content="noindex, nofollow">`.** Do not remove it. Only Ben removes it, and only at launch. `robots.txt` disallows everything until then.

## Where the detail lives

| Topic | File |
|---|---|
| Full build specification | `docs/site-build-spec.md` |
| Approved page copy | `docs/copy/` |
| Navigation, footer, states, 404 | `docs/copy/navigation-and-states.md` |
| SEO and AEO requirements | `.claude/rules/seo-aeo.md` |
| Internal linking design | `.claude/rules/internal-linking.md` |
| Accessibility standard | `.claude/rules/accessibility.md` |
| Case study schema and template | `.claude/rules/case-studies.md` |
| Site counters | `.claude/rules/counters.md` |
| Decisions and why they were made | `knowledge/INDEX.md` |

Rules files load automatically when working on matching files. The docs are read on demand.

## Working method

Build in phases. Do not attempt the whole site in one pass.

1. Fix the existing site so it can hold the new content. Spec Part 9.
2. Build the shared components once. Spec Part 4.
3. Build the pages. Spec Part 5, copy from `docs/copy/`.
4. Build the case study template and the four launch case studies. Spec Part 6.
5. Run the pre-launch checklist. Spec Part 11.

Use plan mode for anything structural: URL changes, navigation changes, new shared components.

Where content is missing, leave a visible `TODO:` comment naming what is needed and who from. Never invent content to fill a gap.

When a decision is made or changed during a session, write it to `knowledge/decisions/` as a dated markdown file and add a line to `knowledge/INDEX.md`. This repository keeps its own project record, the same way client projects do.

## Do not

- Do not add a framework, bundler or npm dependency.
- Do not render body content with JavaScript.
- Do not invent statistics, client quotes, outcomes or case study figures.
- Do not ship the placeholder counter values. See `.claude/rules/counters.md`.
- Do not use stock photography or generate decorative imagery to fill space.
- Do not describe the two unfilled contract roles as if they exist.
- Do not imply AI runs research or makes decisions.
- Do not imply Antiphono deploys to client production environments.
- Do not name GroupTogether or Future Women outside a case study.
- Do not use em dashes.
- Do not apply a colour palette or brand typeface. There is no approved visual identity yet. The retired navy, teal and slate palette must not be used.
- Do not remove `noindex` without Ben's explicit instruction.
