import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks'

/**
 * The documentation layout: the component first, then the prose about it.
 *
 * Storybook's default page puts the whole component description above the first
 * canvas. With a description the length of `Form.md` that is two screens of
 * prose before anything renders, and the page reads as though the component is
 * missing — which is exactly how it was read.
 *
 * Here the canvas and its props table come first, and the prose follows, where
 * it is read by someone who has already seen the thing being described. The
 * `.md` files do not change; only the order they appear in does.
 */
export function DocsPage() {
  return (
    <>
      <Title />
      <Subtitle />
      <Primary />
      <Controls />
      <Description />
      {/* Excludes the primary story by default, so it is not shown twice. */}
      <Stories />
    </>
  )
}
