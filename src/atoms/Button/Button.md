Every dimension, colour and duration comes from a token. There is not a literal
value in its stylesheet — sizes map to `--control-height-*`, the same tokens
`Input` uses, so a change to control sizing moves buttons and fields together
instead of drifting apart.

## Variants

`variant` is about how much attention the button asks for, not about colour.

| | |
| --- | --- |
| `primary` | The one thing you want done on this view |
| `secondary` | A real alternative — "Cancel", "Back" |
| `ghost` | A tertiary action that should not compete with the text around it |
| `danger` | Destructive and irreversible |

**One `primary` per view.** Two primary buttons is a decision the interface
failed to make, and the user pays for it.

## `loading` is not `disabled`

This is the prop worth understanding.

A loading button reports `aria-busy` and `aria-disabled` and swallows its own
clicks — but it is **not** `disabled`. That matters:

- It **keeps keyboard focus**. A `disabled` button drops focus the moment it
  becomes disabled, which throws a keyboard user back to the top of the document
  mid-task.
- It **stays announced**. Screen readers skip disabled controls, so the user who
  just pressed it would hear nothing about what happened.
- **The width does not move.** The spinner replaces the leading icon and the
  label stays put, so a pending button does not shove the layout sideways.

```tsx
<Button loading={isSaving}>Save changes</Button>
```

Use `disabled` for "you cannot do this yet". Use `loading` for "this is
happening".

## Icons

`iconStart` and `iconEnd` are decorative: they take no accessible label, because
the button's text already carries the meaning. An icon announcing itself next to
a label that says the same thing gives a screen reader user the sentence twice.

For direction, put it at the end — `Continue →` reads in the order it means.

```tsx
<Button iconEnd={faArrowRight}>Continue</Button>
```

There is no icon-only variant on purpose. A button with no text is a button with
no name, and adding an `aria-label` to fix that quietly builds an interface that
is fine for sighted users and worse for everyone else.

## `type` defaults to `button`

Not to `submit`. A bare `<button>` inside a `<form>` submits it, which is a
surprise usually discovered in production. Pass `type="submit"` when you mean it
— `Form` does this for its own action.
