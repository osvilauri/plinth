# Plinth

A small design system: a palette, a type scale, and nine components built on
design tokens.

The tokens live in one JSON file and become CSS custom properties through
[`tokens-to-css`](https://www.npmjs.com/package/tokens-to-css), installed from
npm like any other dependency. No component holds a literal colour, size,
duration or font — if a value looks wrong, the token is wrong, and the token is
the thing to change.

Everything here is published as a static Storybook, built by the same command
below: **<https://plinth-iota-one.vercel.app>**. The token pages there read the
live stylesheet, so what they show is what the components actually use.

```bash
npm install
npm run storybook
```

## How a token becomes a style

```
design/tokens.json  →  tokens-to-css  →  src/styles/tokens.css  →  var(--…)
```

The whole integration is three lines, in `scripts/build-tokens.mjs`:

```js
import { generateCss } from 'tokens-to-css'

await generateCss('design/tokens.json', { outDir: 'src/styles', fileName: 'tokens.css' })
```

It runs before dev, before a build and before Storybook, so the stylesheet is
never stale. **The generated file is not committed** — the JSON is the only
source of truth, and a checked-in stylesheet would be a second one waiting to
disagree.

145 custom properties, last count.

## Three tiers, and why the middle one earns its keep

| | |
| --- | --- |
| **primitive** | Raw values. The only tier allowed to hold a literal. |
| **semantic** | Intent — `--color-accent`, `--space-md` |
| **component** | A part's binding — `--control-padding-x`, `--card-padding` |

A button asks for `--control-padding-x`, which points at `--space-md`, which
points at `--primitive-size-4`, which is `16px`.

Three hops looks like ceremony until something has to change. Making every
control roomier is one edit at the component tier. Changing the spacing scale is
one edit at the primitive tier, and everything that meant "medium spacing"
follows.

**The hops survive into the browser.** The generated CSS contains
`var(--space-md)`, not `16px`, so the relationship is live: override a token in a
media query or a theme and everything downstream of it moves. That is the
property that makes the middle tier worth its weight, and the reason this system
uses a converter that refuses to flatten references.

## What is in it

**Atoms** — `Button`, `Input`, `Label`, `Icon`, `Image`, `Hero`
**Molecules** — `Card`
**Organisms** — `Form`

Nothing at a lower level composes anything above it. `Card` is built from `Icon`
and tokens; `Form` from `Button`, `Icon` and whatever `Input`s it is given.

Each component ships a `.md` beside it, rendered as its Storybook page, and
TSDoc on every prop, which becomes the props table. The documentation is in the
code rather than beside it, so there is one copy to keep true.

### Icons

`Icon` wraps Font Awesome. Every component that shows a glyph goes through it,
so icon sizing is one decision rather than six stylesheets.

## Working on it

```bash
npm run tokens      # regenerate the stylesheet from the JSON
npm run storybook   # the component workshop, on :6006
npm run typecheck   # tokens + tsc
npm run build       # typecheck + a production bundle
```

### A note on TypeScript 7 and Storybook

`.storybook/main.ts` uses `reactDocgen: 'react-docgen'`, not
`react-docgen-typescript`. The latter drives the TypeScript compiler through its
old JavaScript API, which TypeScript 7 replaced when it moved to Go; it crashes
on every component here with `Cannot read properties of undefined (reading
'fileExists')`.

`react-docgen` parses with Babel instead and is Storybook's own default. The
trade is slightly weaker resolution of imported union types — worth it to stay on
the current TypeScript rather than pin an old one to satisfy a plugin.

## What the tokens deliberately do not contain

No typography composites, no shadow objects. `tokens-to-css` emits **one custom
property per token** and refuses values describing more than one CSS property.

That constraint turned out to cost nothing. An elevation is a single string:

```json
"low": { "$value": "0 1px 2px rgb(15 23 42 / 0.06), 0 1px 3px rgb(15 23 42 / 0.10)" }
```

One token, one property. A composite would have bought nothing here except a
value the converter cannot honestly write.

## License

MIT.
