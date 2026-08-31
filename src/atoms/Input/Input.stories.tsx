import type { Meta, StoryObj } from '@storybook/react-vite'
import { faLock, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button/Button'
import { Input } from './Input'
import docs from './Input.md?raw'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: { docs: { description: { component: docs } }, layout: 'padded' },
  argTypes: {
    iconStart: { control: false, description: 'A decorative Font Awesome icon inside the field.' },
  },
  args: { label: 'Email address', placeholder: 'you@example.com' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = {
  name: 'With a hint',
  args: { hint: 'We only use this to send receipts.' },
}

/** One prop turns the border, sets `aria-invalid`, and announces the message. */
export const WithError: Story = {
  name: 'With an error',
  args: { error: 'This address has no @ in it.', defaultValue: 'osvaldo.example.com' },
}

/**
 * A field can have a format requirement *and* have failed. Both ids end up in
 * `aria-describedby`, so the user hears the requirement and the failure.
 */
export const HintAndErrorTogether: Story = {
  name: 'Hint and error together',
  args: {
    label: 'Password',
    type: 'password',
    hint: 'At least 12 characters.',
    error: 'That is 8 characters.',
    defaultValue: 'hunter22',
    iconStart: faLock,
  },
}

export const WithIcon: Story = {
  name: 'With an icon',
  args: { label: 'Search', placeholder: 'Search components', iconStart: faMagnifyingGlass },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-md)', maxWidth: '26rem' }}>
      <Input {...args} label="Small" size="sm" />
      <Input {...args} label="Medium" size="md" />
      <Input {...args} label="Large" size="lg" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'locked@example.com' },
}

/**
 * Sizes come from the same `--control-height-*` tokens as `Button`, which is
 * what makes a field and its action sit on one line without hand-tuning.
 */
export const LinedUpWithAButton: Story = {
  name: 'Lined up with a button',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-end', maxWidth: '32rem' }}>
      <Input label="Invite a teammate" placeholder="name@company.com" iconStart={faUser} />
      <Button>Send invite</Button>
    </div>
  ),
}
