# Duplicate primitives: what to keep

There are now three component sets in `styles/system.css`: the Apex set, the index set, and the legacy set under `.legacy`. Thirty class names exist in more than one. This is the list to work through, one row at a time.

## How to use this

For each row, pick **Keep**. Then:

1. Search the markup for the losing class, replace it with the winner.
2. Delete the losing rule from `system.css`.
3. Reload the affected pages, check nothing moved.
4. Commit that one primitive on its own, so a regression is one revert.

Do not batch these. Each one touches pages across the site and a bad merge is hard to unpick when it is buried with nine others.

## The duplicates

Usage counts are how many pages reference each class today.

| Primitive | Apex | Index | Legacy | Keep | Why |
|---|---|---|---|---|---|
| `.hero` | ✅ full-bleed video | `.herov` | ✅ old home hero | | Three heroes. Apex is the richest, index's deck is the most distinctive. |
| `.btn` | ✅ pill | ✅ `.btn` | ✅ `.btn-lime` | **`.btn-pill`** | Decided 18 Aug. Most complete of the three, with arrow disc and dot variants. `.btn` and `.btn-lime` both retire. |
| `.section` | ✅ | ✅ | ✅ | **index** | Decided 18 Aug. Pads on `--section-y` so rhythm stays tunable in one place. Apex components own their padding, so little is lost. |
| `.shell` / `.container-x` | `.container-x` | `.shell` | `.shell` | **`.container-x`** | Decided 18 Aug. Apex is the standard, so its pages need no change. Cost: index's 14 sections and 18 legacy pages swap `.shell` to `.container-x`. |
| `.row` / `.rows` | — | ✅ ruled list | ✅ | | Index's is the newer, with hover wipe. |
| `.stack` / `.stack-lg` | — | ✅ | ✅ | | Flex column with a gap. Trivial, low risk. |
| `.footer` | `.apex-footer` | `.ft` | `.footer` | | Three footers. Only one should survive. |
| `.line` / `.line-w` | `.reveal-line` | ✅ | ✅ | | Text reveal wrapper. Behaviour differs, check both before choosing. |
| `.ph` | — | ✅ placeholder | ✅ | **index** | 18 Aug, done. Genuine duplicate, both placeholder image surfaces. 2 legacy rules deleted, no markup change needed since the name is shared. |
| `.panel` | — | ✅ inset panel | ✅ | | Index's version was already removed once for colliding. |
| `.mobile-menu` | ✅ | `.menu` | ✅ | | `scripts/apex.js` now resolves any of them, so markup can standardise without touching JS. |
| `.skip-link` / `.apex-skip` | ✅ | ✅ | ✅ | **`.apex-skip`** | Decided 18 Aug. Keyboard test required on every page after the swap: this is the one primitive where a silent failure is an accessibility defect. |
| `.statement` | — | ✅ grid layout | ✅ type treatment | **NEITHER, rename one** | 18 Aug. Not a duplicate. Index's is `display: grid` with a 1.25fr/1fr split. Legacy's is a font-size clamp. Same name, different components. Deleting either breaks pages. Rename one before touching it. |
| `.metrics` / `.stat-card` | — | ✅ both | ✅ | | Index has two of these itself. |
| `.small` | ✅ (18 uses) | ✅ (1 use) | ✅ | Apex | Already decided on usage, kept here for the record. |

## Decided so far

Four settled on 18 August. Twenty-six still open.

| Primitive | Keep | Retire |
|---|---|---|
| Container | `.container-x` | ~~`.shell`~~ **done** |
| Section | index `.section` | ~~legacy `.section`~~ **done** |
| Button | `.btn-pill` | `.btn`, `.btn-lime` — **blocked**, needs page rebuild |
| Skip link | `.apex-skip` | ~~`.skip-link`~~ **done** |

Rough surface for these four: `.shell` appears on 20 pages, `.skip-link` on 19, `.btn` and `.btn-lime` across most. None is difficult, all are wide, so each wants its own commit.

## Attempted 18 August, reverted

The four decided primitives were swapped across all pages and their
legacy rules deleted. Reverted before commit.

**What worked.** `.skip-link` to `.apex-skip` on 17 pages, `.shell` to
`.container-x` on 7, and the legacy `.section` rules removed. All
verified fine on /contact: skip link positioned correctly, body ground
and text correct, no overflow.

**What broke.** `.btn-lime` to `.btn-pill`, 22 occurrences. On legacy
pages the button rendered 18.5px tall with a transparent fill, so it
lost its box entirely. `.btn-pill` assumes `display: inline-flex` plus
its own padding, and something in the legacy cascade overrides
`display`, leaving it as inline text.

**The lesson.** A class swap is only safe when the two primitives make
the same layout assumptions. `.skip-link` and `.container-x` are
positioning and width wrappers, so they transplanted cleanly.
`.btn-lime` is a composed component with internal layout, so it cannot
be reclassed. Its pages need the markup rebuilt around `.btn-pill`,
which is page work, not a find and replace.

**Revised approach.** Split the list in two:

- **Reclassable**, safe to swap and delete: wrappers and utilities that
  only set position, width, spacing or colour.
- **Rebuild required**, only retire when the page is rebuilt: anything
  with internal structure, child elements or its own display mode.

Buttons, heroes, footers, rows, metrics and the mobile menu are all in
the second group.

## Third category: name collisions

`.statement` turned this from a two-way split into a three-way one.

- **Reclassable** — same job, different name. Swap markup, delete the loser.
- **Rebuild required** — composed component with internal layout. Wait for the page.
- **Name collision** — *different* components that happen to share a name.
  Neither is a duplicate. Deleting either breaks something. One must be
  renamed before it can be reasoned about at all.

Before deleting any remaining legacy rule, read both definitions. If they
do different jobs, it belongs in the third group. `.line`, `.panel`,
`.row` and `.metrics` are the likely candidates, since all four exist in
both systems and index redefined several of them from scratch.

## Note on the container swap

`.shell` had no max-width, so index's sections ran edge to edge.
`.container-x` caps at 1800px. Below that width nothing changes, and at
1440 the two are identical, but on a very wide display index's sections
now stop at 1800px rather than filling. If full bleed was deliberate,
drop the max-width from `.container-x` or add a `.container-x--full`.

## Suggested order

Start with the ones that carry no visual identity, so a mistake is obvious and cheap:

1. `.section`, `.stack`, `.shell` — spacing only
2. `.skip-link`, `.mobile-menu` — accessibility, verify with a keyboard
3. `.btn`, `.ph`, `.row` — visible but contained
4. `.line`, `.statement`, `.metrics` — behaviour attached
5. `.hero`, `.footer` — leave until last, they define the page

## The rule that keeps this honest

A primitive is standardised when the losing class appears **nowhere** in markup and its rule is **deleted**. Leaving the old rule in place "just in case" is how the site got three of everything.

## When this is finished

`.legacy` will have nothing left referencing it, and the whole namespaced block at the end of `system.css` can be deleted along with `styles.css`, `styles/app.css`, `styles/tokens.css` and `script.js`.
