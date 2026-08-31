import type { ReactNode } from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Icon } from '../../atoms/Icon/Icon'
import styles from './Card.module.css'

/** How much the card separates itself from the page. */
export type CardVariant = 'raised' | 'outlined' | 'sunken'

export interface CardProps {
  /** The card's subject. One line. */
  title: ReactNode
  /** A short label above the title — a category, a status. */
  eyebrow?: ReactNode
  /** The body. One or two sentences; a card is a summary, not an article. */
  children?: ReactNode
  /** An icon beside the title, in place of media. Decorative. */
  icon?: IconDefinition
  /** An `Image`, or anything else, above the text. */
  media?: ReactNode
  /** Buttons at the foot of the card. */
  actions?: ReactNode
  /**
   * How much it separates itself from the page.
   * @default 'raised'
   */
  variant?: CardVariant
  /**
   * Makes the whole card a link to here.
   *
   * The title becomes the link and the card grows a hit area around it, so the
   * accessible name stays the title rather than the whole body being read out.
   * A card wrapped in an anchor announces every word inside it as the link text.
   *
   * Do not combine with `actions`: a link containing buttons is invalid HTML and
   * unusable by keyboard.
   */
  href?: string
  /** Which heading level the title renders as. @default 'h3' */
  as?: 'h2' | 'h3' | 'h4'
  /** Extra class names. */
  className?: string | undefined
}

/**
 * A card: media or an icon, a heading, a summary, and somewhere to go next.
 *
 * Composed only of atoms and tokens — it has no colours or sizes of its own,
 * just `--card-*` values and the `Icon` atom.
 */
export function Card({
  title,
  eyebrow,
  children,
  icon,
  media,
  actions,
  variant = 'raised',
  href,
  as: Heading = 'h3',
  className,
}: CardProps) {
  if (href && actions && process.env['NODE_ENV'] !== 'production') {
    console.warn(
      'Card: `href` and `actions` together produce a link containing buttons, which is invalid ' +
        'and unusable by keyboard. Pick one.',
    )
  }

  return (
    <article
      className={[styles.card, styles[variant], href ? styles.linked : null, className]
        .filter(Boolean)
        .join(' ')}
    >
      {media ? <div className={styles.media}>{media}</div> : null}

      <div className={styles.body}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

        <Heading className={styles.title}>
          {icon ? <Icon icon={icon} size="lead" tone="accent" /> : null}
          {/* The anchor wraps only the title, so that is the accessible name.
              The ::after below stretches its hit area over the whole card. */}
          {href ? (
            <a className={styles.link} href={href}>
              {title}
            </a>
          ) : (
            title
          )}
        </Heading>

        {children ? <div className={styles.content}>{children}</div> : null}
      </div>

      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </article>
  )
}
