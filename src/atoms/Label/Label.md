A form label and the hint that goes with it.

Used on its own only for controls this system does not wrap yet. For text
fields, reach for `Input` — it renders this and wires the descriptions up, which
is the part that is easy to get subtly wrong.

## `htmlFor` is required, on purpose

It is not an optional prop with a sensible default. A label without `htmlFor`
looks completely fine and is connected to nothing:

- Clicking it does not focus the field.
- A screen reader reads the field as unnamed.

Both failures are invisible in a screenshot, which is why the type system asks
for it rather than trusting anyone to remember.

## `required` is not a decorative asterisk

A bare `*` is a convention sighted users have learned. Everyone else gets
nothing from it.

`required` draws the marker *and* adds the words "(required)" for assistive
technology, so the field announces its own constraint. The visible asterisk is
`aria-hidden`, so nobody hears "asterisk".

## Write labels as nouns

"Email address", not "Enter your email". The field already implies the entering;
the label's job is to name the thing. Nouns also stay correct when the same
label is reused in a summary or an error message.

## The hint is wired by id

The hint renders with `id="{htmlFor}-hint"`. Point the field's
`aria-describedby` at it and the hint is read out along with the field instead
of sitting there as text nobody hears.

```tsx
<Label htmlFor="email" hint="We only use this to send receipts.">Email address</Label>
<input id="email" aria-describedby="email-hint" />
```

`Input` does exactly this, and also handles the case where an error message has
to be announced too.
