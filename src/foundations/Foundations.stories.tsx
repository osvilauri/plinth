import type { Meta, StoryObj } from '@storybook/react-vite'
import docs from './Foundations.md?raw'

const meta = {
  title: 'Foundations/Tokens',
  parameters: { docs: { description: { component: docs } }, layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Reads the generated custom properties straight off the document. */
function tokensMatching(prefix: string): [string, string][] {
  const found: [string, string][] = []
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      continue // a cross-origin stylesheet, such as the font import
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule) || rule.selectorText !== ':root') continue
      for (const property of Array.from(rule.style)) {
        if (property.startsWith(prefix)) {
          found.push([property, rule.style.getPropertyValue(property).trim()])
        }
      }
    }
  }
  return found
}

const mono = { fontFamily: 'var(--type-family-code)', fontSize: 'var(--type-size-caption)' }

/**
 * Every colour intent, with the primitive it points at. The value shown is the
 * literal `var()` from the generated stylesheet — not a resolved colour — which
 * is the whole point: the relationship survived the conversion.
 */
export const Colour: Story = {
  render: () => {
    const intents = tokensMatching('--color-')
    return (
      <div style={{ display: 'grid', gap: 'var(--space-sm)' }}>
        {intents.map(([name, points]) => (
          <div
            key={name}
            style={{
              display: 'grid',
              gridTemplateColumns: '3rem 16rem 1fr',
              alignItems: 'center',
              gap: 'var(--space-md)',
            }}
          >
            <span
              style={{
                height: 'var(--space-xl)',
                borderRadius: 'var(--radius-tight)',
                background: `var(${name})`,
                border: '1px solid var(--color-border)',
              }}
            />
            <code style={mono}>{name}</code>
            <code style={{ ...mono, color: 'var(--color-text-muted)' }}>{points}</code>
          </div>
        ))}
      </div>
    )
  },
}

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
      {(
        [
          ['hero', 'Tokens in, stylesheets out'],
          ['display', 'Tokens in, stylesheets out'],
          ['heading', 'Tokens in, stylesheets out'],
          ['title', 'Tokens in, stylesheets out'],
          ['lead', 'Tokens in, stylesheets out'],
          ['body', 'Tokens in, stylesheets out'],
          ['label', 'Tokens in, stylesheets out'],
          ['caption', 'Tokens in, stylesheets out'],
        ] as const
      ).map(([step, sample]) => (
        <div key={step} style={{ display: 'grid', gap: 'var(--space-xs)' }}>
          <code style={{ ...mono, color: 'var(--color-text-muted)' }}>--type-size-{step}</code>
          <span
            style={{
              fontSize: `var(--type-size-${step})`,
              lineHeight: 'var(--type-leading-heading)',
              letterSpacing: 'var(--type-tracking-display)',
            }}
          >
            {sample}
          </span>
        </div>
      ))}
    </div>
  ),
}

export const Space: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-sm)' }}>
      {tokensMatching('--space-').map(([name, points]) => (
        <div
          key={name}
          style={{ display: 'grid', gridTemplateColumns: '11rem 14rem 1fr', alignItems: 'center', gap: 'var(--space-md)' }}
        >
          <code style={mono}>{name}</code>
          <code style={{ ...mono, color: 'var(--color-text-muted)' }}>{points}</code>
          <span style={{ height: 'var(--space-md)', width: `var(${name})`, background: 'var(--color-accent)', borderRadius: 'var(--radius-tight)' }} />
        </div>
      ))}
    </div>
  ),
}

export const RadiusAndElevation: Story = {
  name: 'Radius and elevation',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-2xl)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
        {(['tight', 'control', 'card', 'pill'] as const).map((r) => (
          <div key={r} style={{ display: 'grid', gap: 'var(--space-xs)', justifyItems: 'center' }}>
            <span style={{ width: 'var(--space-2xl)', height: 'var(--space-2xl)', background: 'var(--color-accent-subtle)', border: '1px solid var(--color-accent)', borderRadius: `var(--radius-${r})` }} />
            <code style={mono}>--radius-{r}</code>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2xl)', flexWrap: 'wrap' }}>
        {(['flat', 'card', 'overlay'] as const).map((e) => (
          <div key={e} style={{ display: 'grid', gap: 'var(--space-sm)', justifyItems: 'center' }}>
            <span style={{ width: 'var(--space-3xl)', height: 'var(--space-2xl)', background: 'var(--color-surface)', borderRadius: 'var(--radius-card)', boxShadow: `var(--elevation-${e})` }} />
            <code style={mono}>--elevation-{e}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}

/** The three-hop chain, read from the live stylesheet rather than retyped. */
export const TheChain: Story = {
  name: 'The three-hop chain',
  render: () => {
    const rows = [
      ['--control-padding-x', 'component'],
      ['--space-md', 'semantic'],
      ['--primitive-size-4', 'primitive'],
    ] as const
    const root = getComputedStyle(document.documentElement)
    return (
      <div style={{ display: 'grid', gap: 'var(--space-md)', maxWidth: '46rem' }}>
        <p>
          One value, three tiers. A component asks for its own token, which points at an intent,
          which points at a raw value — and every hop survives into the stylesheet as a{' '}
          <code style={mono}>var()</code>.
        </p>
        <div style={{ display: 'grid', gap: 'var(--space-sm)' }}>
          {rows.map(([name, tier]) => (
            <div key={name} style={{ display: 'grid', gridTemplateColumns: '7rem 15rem 1fr', gap: 'var(--space-md)', alignItems: 'center' }}>
              <code style={{ ...mono, color: 'var(--color-text-muted)' }}>{tier}</code>
              <code style={mono}>{name}</code>
              <code style={{ ...mono, color: 'var(--color-accent-text)' }}>
                {root.getPropertyValue(name).trim()}
              </code>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
