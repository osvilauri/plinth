import type { Meta, StoryObj } from '@storybook/react-vite'
import { faArrowRight, faCube, faPalette, faShapes } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../atoms/Button/Button'
import { Image } from '../../atoms/Image/Image'
import { Card } from './Card'
import docs from './Card.md?raw'

const media = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4F46E5"/><stop offset="1" stop-color="#0EA5A5"/>
    </linearGradient></defs>
    <rect width="800" height="450" fill="url(#g)"/>
  </svg>`,
)}`

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: { docs: { description: { component: docs } }, layout: 'padded' },
  argTypes: {
    icon: { control: false, description: 'A decorative Font Awesome icon beside the title.' },
    media: { control: false, description: 'An Image, or anything else, above the text.' },
    actions: { control: false, description: 'Buttons at the foot of the card.' },
  },
  args: {
    title: 'Design tokens',
    children: 'One JSON file becomes 145 custom properties, and every component reads from them.',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <div style={{ maxWidth: '22rem' }}><Card {...args} /></div>,
}

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)' }}>
      <Card {...args} variant="raised" eyebrow="raised" />
      <Card {...args} variant="outlined" eyebrow="outlined" />
      <Card {...args} variant="sunken" eyebrow="sunken" />
    </div>
  ),
}

export const WithIcon: Story = {
  name: 'With an icon',
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)' }}>
      <Card {...args} icon={faCube} title="Atoms" eyebrow="6 components">
        Button, Input, Label, Icon, Image, Hero.
      </Card>
      <Card {...args} icon={faShapes} title="Molecules" eyebrow="1 component">
        Card, composed only of atoms and tokens.
      </Card>
      <Card {...args} icon={faPalette} title="Foundations" eyebrow="145 properties">
        Colour, type, space, radius, elevation, motion.
      </Card>
    </div>
  ),
}

export const WithMedia: Story = {
  name: 'With media',
  render: (args) => (
    <div style={{ maxWidth: '22rem' }}>
      <Card {...args} media={<Image src={media} alt="" ratio="wide" radius="none" />} />
    </div>
  ),
}

export const WithActions: Story = {
  name: 'With actions',
  render: (args) => (
    <div style={{ maxWidth: '22rem' }}>
      <Card {...args} actions={<Button variant="secondary" iconEnd={faArrowRight}>Read the tokens</Button>} />
    </div>
  ),
}

/**
 * Click anywhere. Then tab to it: the link's accessible name is only the title,
 * not every word in the card — which is what wrapping the whole thing in an
 * anchor would have produced.
 */
export const AsALink: Story = {
  name: 'As a link',
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-lg)' }}>
      <Card {...args} href="#atoms" icon={faCube} title="Atoms" eyebrow="6 components">
        Button, Input, Label, Icon, Image and Hero. Nothing here composes anything else.
      </Card>
      <Card {...args} href="#molecules" icon={faShapes} title="Molecules" eyebrow="1 component">
        Card. Built from atoms and tokens, with no values of its own.
      </Card>
    </div>
  ),
}

/**
 * Summaries of different lengths, buttons on one line. The body is `flex: 1`,
 * so the actions are pushed to the foot rather than floating after the text.
 */
export const ActionsAlignAcrossARow: Story = {
  name: 'Actions align across a row',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)' }}>
      <Card title="Short" variant="outlined" actions={<Button size="sm">Open</Button>}>
        One line.
      </Card>
      <Card title="Longer" variant="outlined" actions={<Button size="sm">Open</Button>}>
        Two sentences, which is about as much as a card should ever carry. Past that it wants to be a page.
      </Card>
      <Card title="Longest" variant="outlined" actions={<Button size="sm">Open</Button>}>
        Three sentences now. The body grows and the button stays put. That is the whole trick, and it is
        the reason a row of cards does not look like a bar chart of button positions.
      </Card>
    </div>
  ),
}
