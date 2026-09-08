# Accessibility

Every component here already does this work. This page names it, so you can find
it without reading eight files — and so you can tell what is guaranteed from what
is left to you.

Nothing below is aspirational. Each line points at behaviour that is in the
component today, and the component's own page explains why.

## What each component guarantees

| Component | Accessibility guarantee |
| --- | --- |
| **Button** | `loading` reports `aria-busy` and `aria-disabled` instead of using `disabled`, so the button keeps keyboard focus and stays announced. A `disabled` button drops focus mid-task and screen readers skip it entirely. |
| **Icon** | Without `label` the icon is `aria-hidden`; with one it becomes an image with a name. An arrow inside a button that already says "Continue" needs no label — "arrow right, Continue" is worse than "Continue". |
| **Image** | `alt` is required. `""` is a valid answer for a decorative image, and the requirement is what separates a considered empty alt from a forgotten one. |
| **Input** | `aria-describedby` is wired to the hint, the error, or both, and `aria-invalid` is set when `error` is present. Ids are generated with `useId` so several fields never collide. |
| **Label** | `htmlFor` is required, not defaulted. Without it, clicking the label does not focus the field and a screen reader reads the field as unnamed. |
| **Card** | The anchor wraps only the title and a `::after` stretches the hit area, so the accessible name is the title instead of every word in the card. Nested interactive elements are warned about in development. |
| **Form** | The error summary is `role="alert"` and takes focus when a submit produces new errors, so a keyboard user lands at the list rather than at the top of the page. |
| **Hero** | `as` controls the heading level. Two `h1`s on a page leave someone navigating by heading with no way to tell which one the page is about. |

## Keyboard

Every interactive component is reachable and operable by keyboard, and the focus
ring is a visible token rather than the browser default being suppressed.

Two decisions exist specifically to protect keyboard users:

- A loading button does not become `disabled`, because a disabled control loses
  focus the instant it disables — which throws the user back to the top of the
  document in the middle of a task.
- The form's error summary is `tabIndex={-1}` and receives focus on a failed
  submit. Focus is not taken on mount: a form rendered with errors already
  showing has not just been submitted.

## Screen readers

The recurring theme is **naming**. Most accessibility bugs in a component
library are not missing ARIA — they are controls with the wrong name, or no name
at all:

- an icon button with no `label` is a button with no name;
- a card wrapped whole in an anchor has a link name made of its entire contents;
- a field whose `aria-describedby` points nowhere looks correct and tells a
  screen reader user nothing.

Each of those is prevented by the component's API rather than by convention.

## What this does not cover

- No automated axe or WCAG conformance suite runs in CI yet; the guarantees above
  are design decisions, verified by hand.
- Colour contrast comes from the token palette, so it holds for the default theme
  and has to be rechecked if you override the primitives.
- Reduced motion is respected where components animate, but there is no global
  audit of it.
