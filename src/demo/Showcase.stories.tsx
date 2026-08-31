import { useState, type CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  faArrowRight,
  faCheck,
  faCodeBranch,
  faEnvelope,
  faLayerGroup,
  faPalette,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '../atoms/Button/Button'
import { Hero } from '../atoms/Hero/Hero'
import { Icon } from '../atoms/Icon/Icon'
import { Image } from '../atoms/Image/Image'
import { Input } from '../atoms/Input/Input'
import { Label } from '../atoms/Label/Label'
import { Card } from '../molecules/Card/Card'
import { Form, type FormError } from '../organisms/Form/Form'
import docs from './Showcase.md?raw'

/**
 * A screenshot of this Storybook, 800 × 450 and 28 KB as a 256-colour PNG:
 * a UI capture has few colours, so a palette beats both a full-colour PNG
 * (74 KB) and a JPEG, which would soften the text. The card renders it at
 * 274 px wide, where it reads as the system rather than as a document.
 */
import thumb from './storybook.png'

/**
 * The hero's photograph, from Pexels, resized by their CDN rather than shipped
 * at source: the original is 3500 × 2333 and 518 KB, which no page should ask
 * for, and `w=1600` brings it to 106 KB.
 *
 * This is the only asset in the Storybook that needs the network. If the demo
 * ever has to render offline, download the file into this folder and import it
 * the way `thumb` below is imported — `Image` takes any string.
 */
const DEMO_IMAGE =
  'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1600'

/** What the photograph actually shows, which is not what it was searched for. */
const DEMO_ALT =
  'A laptop screen at an angle, showing syntax-highlighted source code in a dark editor, with a second monitor out of focus behind it.'

/**
 * The page's own layout. Grid and spacing only — every value is a token, which
 * is the same rule the components hold themselves to.
 */
const section: CSSProperties = {
  display: 'grid',
  gap: 'var(--space-lg)',
  padding: 'var(--space-2xl) var(--space-lg)',
  maxWidth: 'calc(var(--hero-measure) * 1.6)',
  marginInline: 'auto',
}

const cardGrid: CSSProperties = {
  display: 'grid',
  gap: 'var(--space-lg)',
  gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
}

const sectionTitle: CSSProperties = {
  fontFamily: 'var(--type-family-ui)',
  fontSize: 'var(--type-size-title)',
  fontWeight: 'var(--type-weight-heading)',
  lineHeight: 'var(--type-leading-heading)',
  color: 'var(--color-text)',
  margin: 'var(--space-none)',
}

const eyebrow: CSSProperties = {
  fontFamily: 'var(--type-family-ui)',
  fontSize: 'var(--type-size-label)',
  letterSpacing: 'var(--type-tracking-eyebrow)',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
}

/** A control the system has no atom for, so `Label` is used directly. */
const textarea: CSSProperties = {
  fontFamily: 'var(--type-family-ui)',
  fontSize: 'var(--type-size-body)',
  lineHeight: 'var(--type-leading-ui)',
  color: 'var(--color-text)',
  background: 'var(--color-surface)',
  border: 'var(--control-border-width) solid var(--color-border)',
  borderRadius: 'var(--radius-control)',
  padding: 'var(--control-padding-x)',
  minHeight: 'calc(var(--control-height-lg) * 2)',
  width: '100%',
  resize: 'vertical',
}

const footer: CSSProperties = {
  display: 'grid',
  gap: 'var(--space-md)',
  justifyItems: 'center',
  padding: 'var(--space-xl) var(--space-lg)',
  background: 'var(--color-surface-sunken)',
  borderTop: 'var(--control-border-width) solid var(--color-border)',
  fontFamily: 'var(--type-family-ui)',
  fontSize: 'var(--type-size-caption)',
  color: 'var(--color-text-muted)',
}

const footerStats: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-md)',
  alignItems: 'center',
  justifyContent: 'center',
}

/** The whole page. Split out so the story stays readable. */
function LandingPage() {
  const [errors, setErrors] = useState<readonly FormError[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  return (
    <div>
      <Hero
        eyebrow="Design system"
        title="Nine components, one JSON file."
        lead="A palette, a type scale and the parts that use them. Change a token and every component that touches it moves — because none of them holds a value of its own."
        actions={
          <>
            <Button iconStart={faPalette}>Read the tokens</Button>
            <Button variant="ghost" iconEnd={faArrowRight}>
              See the components
            </Button>
          </>
        }
        media={
          <Image
            src={DEMO_IMAGE}
            alt={DEMO_ALT}
            ratio="landscape"
            // Above the fold, so it should not wait to be scrolled to.
            loading="eager"
          />
        }
      />

      <section style={section}>
        <h2 style={sectionTitle}>What it gives you</h2>
        <div style={cardGrid}>
          <Card
            eyebrow="Foundations"
            title="Three tiers of token"
            icon={faLayerGroup}
            actions={
              <Button variant="secondary" size="sm">
                Open Foundations
              </Button>
            }
          >
            Primitive, semantic and component. The middle tier is what lets a
            palette change without touching a single component.
          </Card>

          <Card
            eyebrow="Components"
            title="Six atoms, a molecule, an organism"
            media={<Image src={thumb} alt="" ratio="wide" radius="tight" />}
            actions={
              <Button variant="secondary" size="sm" iconEnd={faArrowRight}>
                Browse them
              </Button>
            }
          >
            Each one documented beside its own code, with a props table built
            from its types.
          </Card>

          {/* No `actions` here: a card that is a link must not contain buttons. */}
          <Card
            eyebrow="The converter"
            title="tokens-to-css"
            icon={faCodeBranch}
            variant="outlined"
            href="https://www.npmjs.com/package/tokens-to-css"
          >
            The library underneath, installed from npm like any other
            dependency. It keeps the var() chain intact, which is why it was
            chosen.
          </Card>
        </div>
      </section>

      <section style={{ ...section, maxWidth: 'var(--hero-measure)' }}>
        <Form
          title="Get the changelog"
          description="One message per release, listing what moved and which token moved it."
          submitLabel={sent ? 'Subscribed' : 'Subscribe'}
          submitting={submitting}
          errors={errors}
          secondaryAction={
            sent ? (
              <span style={{ ...eyebrow, textTransform: 'none' }}>
                <Icon icon={faCheck} size="label" tone="success" /> Nothing was actually sent.
              </span>
            ) : null
          }
          onSubmit={(event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            const found: FormError[] = []

            if (String(data.get('name') ?? '').trim() === '') {
              found.push({ fieldId: 'demo-name', message: 'Tell us what to call you.' })
            }
            if (!String(data.get('email') ?? '').includes('@')) {
              found.push({ fieldId: 'demo-email', message: 'Enter an address with an @ in it.' })
            }

            // The Form moves focus to the summary itself.
            setErrors(found)
            if (found.length > 0) return

            setSubmitting(true)
            setTimeout(() => {
              setSubmitting(false)
              setSent(true)
            }, 1200)
          }}
        >
          <Input
            id="demo-name"
            name="name"
            label="Name"
            iconStart={faUser}
            required
            error={errors.find((e) => e.fieldId === 'demo-name')?.message}
          />
          <Input
            id="demo-email"
            name="email"
            label="Email address"
            type="email"
            iconStart={faEnvelope}
            required
            hint="Only used for the changelog."
            error={errors.find((e) => e.fieldId === 'demo-email')?.message}
          />

          {/* `Label` on its own: a textarea is not an atom here, and it still
              needs the same required marker and hint as every other field. */}
          <div style={{ display: 'grid', gap: 'var(--control-gap)' }}>
            <Label htmlFor="demo-notes" hint="Optional. What are you building?">
              Anything you want us to know
            </Label>
            <textarea id="demo-notes" name="notes" style={textarea} />
          </div>
        </Form>
      </section>

      <footer style={footer}>
        <div style={footerStats}>
          <span>
            <Icon icon={faPalette} size="label" tone="accent" /> 145 custom properties
          </span>
          <span>
            <Icon icon={faLayerGroup} size="label" tone="accent" /> 3 tiers
          </span>
          <span>
            <Icon icon={faCodeBranch} size="label" tone="accent" /> tokens-to-css
          </span>
        </div>
        {/* Pexels does not require attribution. It is here because a portfolio
            that borrows someone's work and says nothing reads badly.

            `target="_blank"` is not decoration: a story renders inside an
            iframe, so a plain link would navigate the canvas out from under
            itself and leave the reader stranded in a frame. */}
        <small>
          Photograph by{' '}
          <a href="https://www.pexels.com/@markusspiske/" target="_blank" rel="noreferrer">
            Markus Spiske
          </a>{' '}
          on Pexels.
        </small>
      </footer>
    </div>
  )
}

const meta = {
  title: 'Demo/Landing page',
  parameters: {
    docs: { description: { component: docs } },
    // Full width: the hero and the footer are meant to reach the edges.
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Every component in the system on one page. The form submits for real — leave
 * a field empty and press the button to see the organism's error summary do its
 * job inside a page rather than on its own.
 */
export const LandingPageStory: Story = {
  name: 'Everything together',
  render: () => <LandingPage />,
}
