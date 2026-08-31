import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'
import docs from './Label.md?raw'

const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: { docs: { description: { component: docs } } },
  args: { children: 'Email address', htmlFor: 'demo-email' },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Required: Story = {
  args: { required: true },
}

export const WithHint: Story = {
  name: 'With a hint',
  args: { hint: 'We only use this to send receipts.' },
}

/**
 * The label is a click target for its field. Click the words, not the box, and
 * the field takes focus — that is `htmlFor` doing its job.
 */
export const ConnectedToItsField: Story = {
  name: 'Connected to its field',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-xs)', maxWidth: '22rem' }}>
      <Label htmlFor="connected-demo" required hint="Click the label, not the box.">
        Email address
      </Label>
      <input
        id="connected-demo"
        aria-describedby="connected-demo-hint"
        style={{
          height: 'var(--control-height-md)',
          padding: '0 var(--control-padding-x)',
          border: 'var(--control-border-width) solid var(--color-border)',
          borderRadius: 'var(--radius-control)',
          font: 'inherit',
        }}
      />
    </div>
  ),
}
