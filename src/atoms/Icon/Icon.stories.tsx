import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  faArrowRight,
  faCircleInfo,
  faSpinner,
  faTrash,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { Icon } from './Icon'
import docs from './Icon.md?raw'

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: { docs: { description: { component: docs } } },
  argTypes: {
    icon: { control: false, description: 'A Font Awesome icon definition.' },
  },
  args: { icon: faCircleInfo },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Each size resolves to the token of the text it sits beside. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
      {(['caption', 'label', 'body', 'lead', 'title', 'heading'] as const).map((size) => (
        <span key={size} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--space-xs)' }}>
          <Icon {...args} size={size} />
          <code style={{ fontSize: 'var(--type-size-caption)' }}>{size}</code>
        </span>
      ))}
    </div>
  ),
}

export const Tones: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
      {(['inherit', 'muted', 'accent', 'danger', 'warning', 'success'] as const).map((tone) => (
        <span key={tone} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--space-xs)' }}>
          <Icon {...args} tone={tone} size="title" />
          <code style={{ fontSize: 'var(--type-size-caption)' }}>{tone}</code>
        </span>
      ))}
    </div>
  ),
}

/**
 * The difference that matters. Inspect both with a screen reader: the first is
 * silent because the words beside it already say everything, the second
 * announces its label because nothing else does.
 */
export const DecorativeVersusMeaningful: Story = {
  name: 'Decorative vs meaningful',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        Continue <Icon icon={faArrowRight} />
        <code style={{ fontSize: 'var(--type-size-caption)', color: 'var(--color-text-muted)' }}>
          no label → aria-hidden
        </code>
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        <Icon icon={faTrash} label="Delete this item" tone="danger" />
        <code style={{ fontSize: 'var(--type-size-caption)', color: 'var(--color-text-muted)' }}>
          label → role="img"
        </code>
      </span>
    </div>
  ),
}

/** Pair a spinner with a label, or a screen reader learns nothing from it. */
export const Spinning: Story = {
  args: { icon: faSpinner, spin: true, label: 'Loading', size: 'title' },
}

export const InRunningText: Story = {
  name: 'In running text',
  render: () => (
    <p>
      A glyph sized from the text scale sits on the line rather than above it{' '}
      <Icon icon={faTriangleExclamation} tone="warning" /> — which is what keeps a
      paragraph from developing a limp.
    </p>
  ),
}
