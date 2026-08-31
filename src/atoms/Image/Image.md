An image with a reserved box, so the page does not jump when it loads.

## The ratio goes on the container, not the file

`ratio` sets `aspect-ratio` on a wrapper, which claims the space **before a
single byte arrives**. That is the whole difference between a layout that settles
and one that shoves paragraphs down the page as images appear.

`auto` opts out and lets the file decide — for a logo or a diagram whose
proportions matter more than the grid.

## `alt` is required, and `""` is a real answer

An empty string means "decorative, skip me", and it is a perfectly good value.
Making the prop required forces the decision to be made rather than forgotten —
which is the difference between a considered empty alt and a missing one, even
though they produce the same markup.

```tsx
<Image src={hero} alt="" />                              {/* decorative */}
<Image src={chart} alt="Revenue doubled between Q1 and Q3." />
```

Describe what the image *shows*, not that it is an image. "Revenue doubled" is
useful; "chart of revenue" is a filename read aloud.

## Lazy by default

`loading="lazy"` unless you say otherwise. An image below the fold should not
compete with the text above it for bandwidth.

Pass `loading="eager"` for the one image that is the first thing on the page —
usually a hero — where lazy loading delays exactly the pixel the user is waiting
for.

## `caption` changes the markup

With a caption, the component renders a `<figure>` and a `<figcaption>` instead
of a bare `<img>`. The caption is then associated with the image structurally,
rather than being a paragraph that happens to sit underneath.
