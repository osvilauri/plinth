import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image } from './Image'
import docs from './Image.md?raw'

/** An inline SVG as a data URI: the stories stay self-contained and offline. */
const sample = (label: string, from: string, to: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
      </linearGradient></defs>
      <rect width="800" height="600" fill="url(#g)"/>
      <text x="400" y="315" text-anchor="middle" fill="white"
        font-family="monospace" font-size="42">${label}</text>
    </svg>`,
  )}`

const SRC = sample('800 × 600', '#4F46E5', '#F59E0B')

const meta = {
  title: 'Atoms/Image',
  component: Image,
  parameters: { docs: { description: { component: docs } }, layout: 'padded' },
  args: { src: SRC, alt: 'A gradient placeholder labelled with its dimensions.' },
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <div style={{ maxWidth: '28rem' }}><Image {...args} /></div>,
}

/** The same file cropped four ways. The box is reserved before it loads. */
export const Ratios: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)' }}>
      {(['square', 'portrait', 'landscape', 'wide'] as const).map((ratio) => (
        <div key={ratio} style={{ display: 'grid', gap: 'var(--space-xs)' }}>
          <Image {...args} ratio={ratio} />
          <code style={{ fontSize: 'var(--type-size-caption)' }}>{ratio}</code>
        </div>
      ))}
    </div>
  ),
}

export const Radii: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)' }}>
      {(['none', 'tight', 'control', 'card'] as const).map((radius) => (
        <div key={radius} style={{ display: 'grid', gap: 'var(--space-xs)' }}>
          <Image {...args} ratio="square" radius={radius} />
          <code style={{ fontSize: 'var(--type-size-caption)' }}>{radius}</code>
        </div>
      ))}
    </div>
  ),
}

/** `contain` keeps the whole file visible; `cover` fills and crops. */
export const Fit: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', maxWidth: '34rem' }}>
      <div style={{ display: 'grid', gap: 'var(--space-xs)' }}>
        <Image {...args} ratio="square" fit="cover" />
        <code style={{ fontSize: 'var(--type-size-caption)' }}>cover — fills, crops</code>
      </div>
      <div style={{ display: 'grid', gap: 'var(--space-xs)' }}>
        <Image {...args} ratio="square" fit="contain" />
        <code style={{ fontSize: 'var(--type-size-caption)' }}>contain — fits, letterboxes</code>
      </div>
    </div>
  ),
}

/** A caption turns the markup into a `figure`, associating the two structurally. */
export const WithCaption: Story = {
  name: 'With a caption',
  render: (args) => (
    <div style={{ maxWidth: '28rem' }}>
      <Image
        {...args}
        caption="A caption renders a figure and a figcaption, not a paragraph that happens to sit underneath."
      />
    </div>
  ),
}

/** Decorative images take `alt=""`, which is a considered answer rather than a gap. */
export const Decorative: Story = {
  args: { alt: '' },
  render: (args) => <div style={{ maxWidth: '20rem' }}><Image {...args} ratio="square" /></div>,
}
