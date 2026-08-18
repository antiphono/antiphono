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
| `.btn` | ✅ pill | ✅ `.btn` | ✅ `.btn-lime` | | Apex `.btn-pill` and index `.btn` are near identical. `.btn-lime` is the odd one. |
| `.section` | ✅ | ✅ | ✅ | | Pure spacing wrapper. Cheapest to standardise, do this first. |
| `.shell` / `.container-x` | `.container-x` | `.shell` | `.shell` | | Same job: max width plus gutter. Two names for one thing. |
| `.row` / `.rows` | — | ✅ ruled list | ✅ | | Index's is the newer, with hover wipe. |
| `.stack` / `.stack-lg` | — | ✅ | ✅ | | Flex column with a gap. Trivial, low risk. |
| `.footer` | `.apex-footer` | `.ft` | `.footer` | | Three footers. Only one should survive. |
| `.line` / `.line-w` | `.reveal-line` | ✅ | ✅ | | Text reveal wrapper. Behaviour differs, check both before choosing. |
| `.ph` | — | ✅ placeholder | ✅ | | Image placeholder surface. |
| `.panel` | — | ✅ inset panel | ✅ | | Index's version was already removed once for colliding. |
| `.mobile-menu` | ✅ | `.menu` | ✅ | | `scripts/apex.js` now resolves any of them, so markup can standardise without touching JS. |
| `.skip-link` / `.apex-skip` | ✅ | ✅ | ✅ | | Accessibility requirement, must survive in exactly one form. |
| `.statement` | — | ✅ | ✅ | | |
| `.metrics` / `.stat-card` | — | ✅ both | ✅ | | Index has two of these itself. |
| `.small` | ✅ (18 uses) | ✅ (1 use) | ✅ | Apex | Already decided on usage, kept here for the record. |

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
