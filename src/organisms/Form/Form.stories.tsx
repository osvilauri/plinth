import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../atoms/Button/Button'
import { Input } from '../../atoms/Input/Input'
import { Form } from './Form'
import docs from './Form.md?raw'

const fields = (
  <>
    <Input id="name" label="Full name" iconStart={faUser} required autoComplete="name" />
    <Input
      id="email"
      label="Email address"
      type="email"
      iconStart={faEnvelope}
      required
      autoComplete="email"
      hint="We only use this to send receipts."
    />
    <Input
      id="password"
      label="Password"
      type="password"
      iconStart={faLock}
      required
      autoComplete="new-password"
      hint="At least 12 characters."
    />
  </>
)

const meta = {
  title: 'Organisms/Form',
  component: Form,
  parameters: { docs: { description: { component: docs } }, layout: 'padded' },
  argTypes: {
    children: { control: false, description: 'The fields. Usually Inputs.' },
    secondaryAction: { control: false, description: 'A secondary action beside submit.' },
    errors: { control: false, description: 'Errors to summarise at the top.' },
  },
  args: {
    title: 'Create account',
    description: 'You will be able to change any of this later.',
    submitLabel: 'Create account',
    // Declared here so every story inherits the required props; a story that
    // needs different fields overrides them in its own render.
    children: fields,
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Form {...args}>{fields}</Form>,
}

export const WithSecondaryAction: Story = {
  name: 'With a secondary action',
  render: (args) => (
    <Form {...args} secondaryAction={<Button variant="ghost">I already have an account</Button>}>
      {fields}
    </Form>
  ),
}

/**
 * The point of the organism. Click a message in the summary: it jumps straight
 * to the field. On a form this short the value is small; on one with eight
 * fields it is the difference between usable and not.
 */
export const WithErrorSummary: Story = {
  name: 'With an error summary',
  render: (args) => (
    <Form
      {...args}
      errors={[
        { fieldId: 'email', message: 'This address has no @ in it.' },
        { fieldId: 'password', message: 'That is 8 characters; 12 are needed.' },
      ]}
    >
      <Input id="name" label="Full name" iconStart={faUser} required defaultValue="Osvaldo Morgan" />
      <Input
        id="email"
        label="Email address"
        iconStart={faEnvelope}
        required
        defaultValue="osvaldo.example.com"
        error="This address has no @ in it."
      />
      <Input
        id="password"
        label="Password"
        type="password"
        iconStart={faLock}
        required
        defaultValue="hunter22"
        hint="At least 12 characters."
        error="That is 8 characters; 12 are needed."
      />
    </Form>
  ),
}

/** Fields disabled by the fieldset, submit busy rather than disabled. */
export const Submitting: Story = {
  render: (args) => (
    <Form {...args} submitting>
      {fields}
    </Form>
  ),
}

export const Stacked: Story = {
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <Form {...args} stacked secondaryAction={<Button variant="ghost" fullWidth>Cancel</Button>}>
        <Input id="stacked-email" label="Email address" type="email" required />
        <Input id="stacked-password" label="Password" type="password" required />
      </Form>
    </div>
  ),
}

/**
 * A real submit. Leave a field empty and press the button: the summary appears,
 * announces itself, and takes focus — which is what puts a keyboard user at the
 * list of problems instead of back at the top of the page.
 */
export const Interactive: Story = {
  render: () => {
    const [errors, setErrors] = useState<readonly { fieldId: string; message: string }[]>([])
    const [submitting, setSubmitting] = useState(false)

    return (
      <Form
        title="Create account"
        description="Try submitting it empty."
        submitLabel="Create account"
        errors={errors}
        submitting={submitting}
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          const found: { fieldId: string; message: string }[] = []

          if (!String(data.get('email') ?? '').includes('@')) {
            found.push({ fieldId: 'live-email', message: 'Enter an address with an @ in it.' })
          }
          if (String(data.get('password') ?? '').length < 12) {
            found.push({ fieldId: 'live-password', message: 'Use at least 12 characters.' })
          }

          setErrors(found)
          if (found.length === 0) {
            setSubmitting(true)
            setTimeout(() => setSubmitting(false), 1500)
          } else {
            // Focus the summary, not the first field: the user hears how many
            // things are wrong before being dropped into one of them.
            requestAnimationFrame(() => {
              document.querySelector<HTMLElement>('[role="alert"]')?.focus()
            })
          }
        }}
      >
        <Input
          id="live-email"
          name="email"
          label="Email address"
          iconStart={faEnvelope}
          required
          error={errors.find((e) => e.fieldId === 'live-email')?.message}
        />
        <Input
          id="live-password"
          name="password"
          label="Password"
          type="password"
          iconStart={faLock}
          required
          hint="At least 12 characters."
          error={errors.find((e) => e.fieldId === 'live-password')?.message}
        />
      </Form>
    )
  },
}
