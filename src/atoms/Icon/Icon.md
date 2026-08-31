A single Font Awesome glyph, sized and coloured from the design tokens.

Every component in the system that shows an icon goes through this one. That is
the point: a change to how icons are sized lands everywhere at once, rather than
in six different stylesheets.

## Sizes follow the text, not a pixel scale

`size` is named after the text an icon sits beside — `label`, `body`, `title` —
and resolves to the same token that text uses. A glyph therefore never ends up
taller than the sentence around it, whatever the type scale does later.

```tsx
<Icon icon={faCircleInfo} size="label" />   // matches --type-size-label
```

## The `label` prop decides whether it exists

This is the prop worth reading twice.

| | |
| --- | --- |
| **No `label`** | The icon is `aria-hidden`. Use this when the icon repeats something already written next to it. |
| **With `label`** | The icon becomes an image with a name. Use this when the icon is the only thing carrying the meaning. |

An arrow inside a button that already says "Continue" needs no label — announcing
"arrow right, Continue" is worse than announcing "Continue". A bare icon button
needs one, or it is a button with no name.

```tsx
<Button iconEnd={faArrowRight}>Continue</Button>          {/* decorative */}
<Icon icon={faTrash} label="Delete this item" />          {/* meaningful */}
```

## Colour

`tone` defaults to `inherit`, which follows the surrounding text. That is almost
always right inside a button or a link, where the icon should change colour with
its container rather than fighting it.

Reach for an explicit tone only when the icon carries a status the text does not.
