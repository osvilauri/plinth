A text field with its label, hint and error wired together.

**The wiring is why this component exists.** `aria-describedby` has to point at
the hint, the error, or both — and getting it wrong produces a field that looks
completely correct and tells a screen reader user nothing. That is not a mistake
worth making once per form.

## `id` is generated when you leave it out

The label needs `htmlFor`, the hint and the error need ids, and all three must
match the field. Omit `id` and `useId` provides one, so several fields on a page
never collide.

Pass one only when something outside the component has to reference it — a
"jump to first error" link, for instance.

## `error` means invalid

There is no separate `invalid` prop. A present `error`:

- turns the border,
- sets `aria-invalid`,
- adds the message to `aria-describedby`,
- announces it politely.

One prop, four consequences, no way to have the colour without the announcement.

```tsx
<Input label="Email address" error="This address has no @ in it." />
```

### Politely, not assertively

The message announces with `aria-live="polite"`. An assertive live region
interrupts a screen reader mid-sentence — which, while someone is still typing
into the field, is worse than waiting for a pause.

### Write errors as instructions

"This address has no @ in it", not "Invalid input". The user knows something is
wrong; what they lack is what to do about it.

## Hint and error can both be present

A field can have a format hint *and* have failed. `aria-describedby` gets both
ids in that case, so the user hears the requirement and the failure together
rather than one replacing the other.

## The focus ring is on the shell

Not on the `<input>`. The visible box is a wrapper that holds the optional icon,
so a ring on the bare input would leave the icon outside the outline. The input
itself has `outline: none` and contributes nothing but text.

## Sizes are shared with Button

`sm`, `md` and `lg` resolve to `--control-height-*` — the same tokens `Button`
uses. A field and the button beside it therefore sit on the same line, and stay
that way if the control scale ever changes.
