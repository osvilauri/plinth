The opening block of a page or a section.

Layout, spacing and measure all come from the `--hero-*` tokens, so the
proportions are a design decision recorded in `design/tokens.json` rather than
numbers living in a stylesheet nobody reviews.

## `as` exists because of `h1`

The title renders as `<h1>` by default, because a hero is normally what the page
is about.

Drop it to `h2` when the hero opens a *section* rather than a page. Two `h1`s
leave a screen reader user with no way to tell which one the page is about — and
that is invisible until someone navigates by heading.

```tsx
<Hero title="Plinth" />                      {/* the page */}
<Hero as="h2" title="Atoms" />               {/* a section within it */}
```

## The lead is held to a measure, not a width

`--hero-measure` is `62ch` — characters, not pixels. The line length therefore
stays readable when the type scale changes, which a pixel width would not.

Long lines are the fastest way to lose a reader, and a hero is where readers are
most easily lost.

## `align`

`start` is the default and the better one for anything meant to be read. Centred
text is harder to scan because every line begins in a different place.

Reach for `center` on a landing page with no media, where the block is short
enough that scanning is not the point.

## `media` changes the layout, responsively

With media, the hero becomes two columns **above `56rem`** and stacks below it —
text first, always. On a phone, the words arrive before the picture, which is the
order that lets someone decide whether to keep reading.

The title also steps down from `--type-size-hero` to `--type-size-display` below
`48rem`; the hero size is calibrated for wide screens and wraps into a wall on a
narrow one.

## The eyebrow is a label, not a sentence

Two or three words: a section name, a category. It is uppercased with wide
tracking, which stops working past about five words.
