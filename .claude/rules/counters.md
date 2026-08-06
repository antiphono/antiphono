---
paths:
  - "content/metrics.json"
  - "render.js"
  - "index.html"
---

# Site counters

Four counters, shown on the home page. Data lives in `content/metrics.json` and is read by `render.js`.

## The principle

Every counter has four things: a value, a short published qualifier, a date it was last updated, and a definition recorded internally. Animation is fine. Unattributed numbers are not.

The site previously carried invented statistics ("52 Products shipped", "14 Specialists") which have been removed. Do not reintroduce anything of that kind.

## The four

| Counter | Published qualifier |
|---|---|
| People we have researched with | Interviews and usability sessions since 2018. Not surveys |
| Client platforms we measure in | Live analytics and behaviour platforms |
| Features tested in production | Variations shipped to real traffic and measured |
| Decisions on the record | Written to the project record as the work happens |

Qualifiers stay this short. They exist to answer "how do you count that", not to explain the method.

**Internal definitions, not published, and not to be changed once live:**

1. Individual participants in interviews and moderated usability sessions. Excludes survey respondents.
2. Analytics and behaviour platform instances currently connected across live clients, counted per client.
3. Component or feature variations shipped to real traffic and measured. Counts variations, not tests.
4. Design and product decisions written to `knowledge/decisions/`, counted once each.

## Data file

```json
{
  "updated": "2026-08-05",
  "placeholder": true,
  "counters": [
    { "id": "participants",
      "label": "People we have researched with",
      "qualifier": "Interviews and usability sessions since 2018. Not surveys",
      "value": 840 },
    { "id": "platforms",
      "label": "Client platforms we measure in",
      "qualifier": "Live analytics and behaviour platforms",
      "value": 14 },
    { "id": "features",
      "label": "Features tested in production",
      "qualifier": "Variations shipped to real traffic and measured",
      "value": 260 },
    { "id": "decisions",
      "label": "Decisions on the record",
      "qualifier": "Written to the project record as the work happens",
      "value": 1450 }
  ]
}
```

## These values are invented

**The four values above are made up. They exist to build and test the animation. They must not go live.**

While `"placeholder": true`, `render.js` renders a visible amber "Placeholder" label beside the counter group. Shipping fake numbers must require a deliberate act rather than someone forgetting.

Ben replaces the values with real figures and sets `"placeholder": false` before launch.

## Behaviour

- Count up animation when the group scrolls into view. Once, not on every scroll.
- Render the `updated` date beneath the group as "As at August 2026".
- Never imply a live feed. The numbers are updated periodically and the date says so.
- Respect `prefers-reduced-motion`. When set, show the final value immediately with no animation.
- If `metrics.json` fails to load, hide the whole section rather than showing zeros.
- Counter values must also exist in the HTML as static text. Animate from the rendered value rather than injecting it, so the numbers are indexable and readable with JavaScript off.

## Later

Once updating by hand becomes annoying, a small endpoint can pull platform counts from connected accounts and decision counts from repository data, with the JSON file as fallback. Not before launch.
