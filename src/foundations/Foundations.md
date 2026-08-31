Everything on these pages is read from the **live stylesheet**, not retyped into
a story. If a token changes in `design/tokens.json`, this page changes with it —
and if a token disappears, the page notices rather than showing a stale swatch.

## Where they come from

```
design/tokens.json  →  tokens-to-css  →  src/styles/tokens.css
```

One call, in `scripts/build-tokens.mjs`, run before dev, before a build and
before Storybook:

```js
import { generateCss } from 'tokens-to-css'

await generateCss('design/tokens.json', { outDir: 'src/styles', fileName: 'tokens.css' })
```

145 custom properties. The generated file is **not committed** — the JSON is the
only source of truth, and a stylesheet in the repository would be a second one
waiting to disagree.

## Three tiers, and why the middle one exists

| | |
| --- | --- |
| **primitive** | Raw values. The only tier allowed to hold a literal. |
| **semantic** | Intent. `--color-accent`, `--space-md`. |
| **component** | A part's binding. `--control-padding-x`, `--card-padding`. |

A component asks for `--control-padding-x`. That points at `--space-md`, which
points at `--primitive-size-4`, which is `16px`.

Three hops looks like ceremony until you need to change something. Making every
control roomier is one edit to `--control-padding-x`. Changing the spacing scale
is one edit to the primitive, and everything that meant "medium spacing" follows.

**The hops survive the conversion.** The generated CSS contains
`var(--space-md)`, not `16px` — so the relationship is live in the browser, and
overriding a token in a media query or a theme moves everything downstream of it.
That is the property that makes the middle tier worth its weight.

## What the tokens deliberately do not contain

No typography composites, no shadow objects. `tokens-to-css` v1 emits **one
custom property per token** and refuses values that describe more than one CSS
property.

That is a real constraint and it turned out to cost nothing. An elevation is a
single string:

```json
"low": { "$value": "0 1px 2px rgb(15 23 42 / 0.06), 0 1px 3px rgb(15 23 42 / 0.10)" }
```

One token, one property, `--primitive-elevation-low`. A composite would have
bought nothing here except a value the converter cannot honestly write.
