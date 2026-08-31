import type { Meta, StoryObj } from '@storybook/react-vite'
import { faArrowRight, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button/Button'
import { Image } from '../Image/Image'
import { Hero } from './Hero'
import docs from './Hero.md?raw'

const media = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4F46E5"/><stop offset="1" stop-color="#0EA5A5"/>
    </linearGradient></defs>
    <rect width="800" height="600" fill="url(#g)"/>
  </svg>`,
)}`

const meta = {
  title: 'Atoms/Hero',
  component: Hero,
  parameters: { docs: { description: { component: docs } }, layout: 'fullscreen' },
  argTypes: {
    actions: { control: false, description: 'Buttons or links. Primary action first.' },
    media: { control: false, description: 'Something beside the text on wide screens.' },
  },
  args: {
    eyebrow: 'Design system',
    title: 'Tokens in, stylesheets out.',
    lead: 'A small set of components built on design tokens, converted to CSS custom properties by tokens-to-css. Change a primitive and everything that meant it moves.',
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithActions: Story = {
  name: 'With actions',
  args: {
    actions: (
      <>
        <Button iconEnd={faArrowRight}>Browse components</Button>
        <Button variant="secondary" iconStart={faBookOpen}>
          Read the tokens
        </Button>
      </>
    ),
  },
}

/** Two columns above 56rem, stacked below it — text first, always. */
export const WithMedia: Story = {
  name: 'With media',
  args: {
    actions: <Button iconEnd={faArrowRight}>Browse components</Button>,
    media: <Image src={media} alt="" ratio="landscape" />,
  },
}

export const Centred: Story = {
  args: { align: 'center', actions: <Button iconEnd={faArrowRight}>Get started</Button> },
}

/** Opening a section rather than a page: `h2`, so the page keeps one `h1`. */
export const AsASectionOpener: Story = {
  name: 'As a section opener',
  args: {
    as: 'h2',
    eyebrow: 'Atoms',
    title: 'The smallest pieces',
    lead: 'Button, Input, Label, Icon, Image and Hero. Nothing here composes anything else.',
  },
}

export const TitleOnly: Story = {
  name: 'Title only',
  args: { eyebrow: undefined, lead: undefined },
}
