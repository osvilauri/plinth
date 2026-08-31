Media or an icon, a heading, a summary, and somewhere to go next.

Composed only of atoms and tokens. It has no colours or sizes of its own — just
the `--card-*` values and the `Icon` atom — which is what makes it a molecule
rather than a component with opinions.

## `href` makes the card a link, carefully

The obvious implementation is to wrap the whole card in an `<a>`. Do not: a
screen reader then reads **every word inside the card** as the link text. "Read
the tokens, Design system, One hundred and forty five custom properties
generated from…" is not a link name.

So the anchor wraps only the title, and a `::after` pseudo-element stretches its
hit area over the whole card. The result is a card you can click anywhere, whose
accessible name is just its title.

```tsx
<Card href="/atoms" title="Atoms" eyebrow="6 components">
  Button, Input, Label, Icon, Image, Hero.
</Card>
```

### Never with `actions`

A link containing buttons is invalid HTML and unusable by keyboard — the nested
interactive elements fight over focus. The component warns in development if you
pass both.

Pick one: a card that *is* a link, or a card that *contains* actions.

## Actions sit at the foot, aligned across a row

The body is `flex: 1`, so the actions are pushed to the bottom however tall the
text is. A row of cards with summaries of different lengths therefore lines its
buttons up, instead of having them float at three different heights.

## `as` for the heading level

`h3` by default, which is right inside a section that already has an `h2`. Move
it so the document outline stays honest — heading levels are how a screen reader
user navigates, and skipping one is a broken rung on the ladder.

## Media bleeds to the edge

The image sits flush against the card's border, because the padding lives on the
body rather than the card. That is why `media` and `body` are separate elements
rather than one padded container.

## Variants

| | |
| --- | --- |
| `raised` | Sits above the page. The default, and right on a plain background. |
| `outlined` | A line instead of a shadow. Better in a dense grid, where shadows accumulate into mud. |
| `sunken` | Recedes into the page. For secondary or inactive content. |
