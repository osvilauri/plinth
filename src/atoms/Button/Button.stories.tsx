import type { Meta, StoryObj } from '@storybook/react-vite'
import { faArrowRight, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from './Button'
import docs from './Button.md?raw'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { docs: { description: { component: docs } } },
  argTypes: {
    iconStart: { control: false, description: 'A Font Awesome icon shown before the label.' },
    iconEnd: { control: false, description: 'A Font Awesome icon shown after the label.' },
  },
  args: { children: 'Save changes' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
      <Button variant="primary">Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Learn more</Button>
      <Button variant="danger" iconStart={faTrash}>
        Delete account
      </Button>
    </div>
  ),
}

/** Heights come from `--control-height-sm|md|lg`, shared with `Input`. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  name: 'With icons',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
      <Button iconStart={faFloppyDisk}>Save changes</Button>
      <Button iconEnd={faArrowRight}>Continue</Button>
      <Button variant="secondary" iconEnd={faArrowRight}>
        Skip for now
      </Button>
    </div>
  ),
}

/**
 * Tab to the loading button: it still takes focus, because it is busy rather
 * than disabled. The disabled one beside it does not — which is exactly why
 * `loading` is not implemented as `disabled`.
 */
export const LoadingVersusDisabled: Story = {
  name: 'Loading vs disabled',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-md)', justifyItems: 'start' }}>
      <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
        <Button loading>Save changes</Button>
        <Button disabled>Save changes</Button>
      </div>
      <p style={{ fontSize: 'var(--type-size-caption)', color: 'var(--color-text-muted)' }}>
        The first keeps focus and stays announced. The second is skipped entirely.
      </p>
    </div>
  ),
}

/** The label does not move and the button does not resize while it works. */
export const LoadingHoldsItsWidth: Story = {
  name: 'Loading holds its width',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-sm)', justifyItems: 'start' }}>
      <Button iconStart={faFloppyDisk}>Save changes</Button>
      <Button iconStart={faFloppyDisk} loading>
        Save changes
      </Button>
    </div>
  ),
}

export const FullWidth: Story = {
  name: 'Full width',
  args: { fullWidth: true, children: 'Create account' },
  parameters: { layout: 'padded' },
}
