Every component in the system, on one page, doing the job it was built for.

The page is Plinth presenting itself: the design system's own landing page,
assembled from its own nine components. Nothing here is a special case — no
component gained a prop to make this page possible, and the page holds no colour,
size or spacing of its own. Every value in it is a `var(--…)`.

That is the claim the rest of the documentation makes one component at a time.
This page is where it either holds together or does not.

## What is used where

| Section | Components |
| --- | --- |
| Opening | `Hero`, `Button`, `Image` |
| What it gives you | `Card`, `Icon`, `Image`, `Button` |
| Changelog sign-up | `Form`, `Input`, `Label`, `Button`, `Icon` |
| Footer | `Icon` |

`Label` appears on its own beside the `<textarea>`, which is the case it exists
for: a control the system does not wrap still needs a label with the same
required marker and hint as every other field. `Input` renders its own `Label`
internally, so pairing the two would produce it twice.

## The form really submits

Leave a field empty and press the button. The error summary appears, announces
itself and takes focus — the same organism behaviour documented on `Form`, here
inside a page rather than on its own.
