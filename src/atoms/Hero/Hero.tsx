import type { ReactNode } from 'react'
import styles from './Hero.module.css'

/** Where the text sits. */
export type HeroAlign = 'start' | 'center'

export interface HeroProps {
  /** The one sentence the page is about. Rendered as the page's `<h1>`. */
  title: ReactNode
  /** A short label above the title — a section name, a category. Not a sentence. */
  eyebrow?: ReactNode
  /** One or two sentences under the title. Held to a readable measure. */
  lead?: ReactNode
  /** Buttons or links. Put the primary action first. */
  actions?: ReactNode
  /** Something beside the text on wide screens, below it on narrow ones. */
  media?: ReactNode
  /**
   * Where the text sits. `center` suits a landing page with no media; `start`
   * is the better default for anything that has to be read.
   * @default 'start'
   */
  align?: HeroAlign
  /**
   * Which heading level the title renders as.
   *
   * Defaults to `h1` because a hero is normally the page's subject. Drop it to
   * `h2` when the hero opens a section rather than a page — two `h1`s on a page
   * leave a screen reader user with no way to tell what the page is about.
   * @default 'h1'
   */
  as?: 'h1' | 'h2'
  /** Extra class names. */
  className?: string | undefined
}

/**
 * The opening block of a page or a section.
 *
 * Layout, spacing and measure all come from the `--hero-*` tokens, so the
 * proportions are a design decision recorded in `design/tokens.json` rather
 * than numbers living in this stylesheet.
 */
export function Hero({
  title,
  eyebrow,
  lead,
  actions,
  media,
  align = 'start',
  as: Heading = 'h1',
  className,
}: HeroProps) {
  return (
    <section
      className={[styles.hero, styles[align], media ? styles.split : null, className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.copy}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <Heading className={styles.title}>{title}</Heading>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      {media ? <div className={styles.media}>{media}</div> : null}
    </section>
  )
}
