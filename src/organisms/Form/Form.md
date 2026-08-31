A heading, a set of fields, an error summary, and its actions.

Composed entirely of atoms — `Button`, `Icon`, and whatever `Input`s you pass as
children. What it adds is the wiring that is easy to get subtly wrong once per
form, and that nobody notices is missing until someone tries to use the form
without a mouse.

## The error summary is the reason this is an organism

After a failed submit on a form with eight fields, the user's problem is not
"which field is red". It is "where are the red fields".

`errors` renders a summary at the top with a link straight to each field:

```tsx
<Form
  title="Create account"
  errors={[
    { fieldId: 'email', message: 'This address has no @ in it.' },
    { fieldId: 'password', message: 'That is 8 characters; 12 are needed.' },
  ]}
>
```

- It is `role="alert"`, so it announces itself. A failed submit is worth
  interrupting for — the user just acted and is waiting to hear what happened.
- It is `tabIndex={-1}`, so you can move focus to it after a failed submit. That
  puts a keyboard user *at the list*, not back at the top of the page.
- The `fieldId` must match the `id` you gave the field, because that is what the
  link jumps to.

Fields keep their own messages as well. The summary is for finding them; the
inline message is for fixing them.

## `noValidate` is deliberate

Browser validation is off. This form reports problems through the summary and
the fields, and native validation bubbles would say the same thing in a second
visual style, in a different order, with worse screen reader support.

Two error systems disagreeing about the same field is worse than one.

## Fields are wrapped in a fieldset

The `<fieldset>` and its visually hidden `<legend>` give the group a name, which
is what a screen reader announces when the user enters the form. Without it, the
user hears a series of unrelated fields.

The fieldset also carries `disabled` while `submitting`, which disables every
field inside it in one place rather than threading a prop into each one.

## `submitting`

Sets the submit button to `loading` — busy rather than disabled, so it keeps
focus — and disables the fields. The user cannot edit what is already in flight,
and cannot submit it twice.

## Write errors as instructions

"That is 8 characters; 12 are needed", not "Password invalid". The user already
knows something is wrong. What they lack is what to do about it.
