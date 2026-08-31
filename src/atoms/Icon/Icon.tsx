import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import styles from './Icon.module.css'

/** Icon sizes, named after the text they sit beside rather than in pixels. */
export type IconSize = 'caption' | 'label' | 'body' | 'lead' | 'title' | 'heading'

/** Icon colours, drawn from the system's intents. `inherit` takes the surrounding text colour. */
export type IconTone = 'inherit' | 'muted' | 'accent' | 'danger' | 'warning' | 'success'

export interface IconProps {
  /** A Font Awesome icon definition, e.g. `faArrowRight` from `@fortawesome/free-solid-svg-icons`. */
  icon: IconDefinition
  /**
   * How large the glyph is, matched to a text size so it aligns with the words
   * next to it.
   * @default 'body'
   */
  size?: IconSize
  /**
   * What colour it takes. `inherit` follows the surrounding text, which is what
   * you want inside a button or a link.
   * @default 'inherit'
   */
  tone?: IconTone
  /**
   * What a screen reader should say.
   *
   * Leave it out when the icon repeats something already written next to it —
   * the icon is then hidden from assistive technology, because announcing
   * "arrow right, arrow right" is worse than silence. Set it when the icon is
   * the only thing carrying the meaning.
   */
  label?: string
  /** Turns 360° while rendered. For pending states; pair it with a `label`. */
  spin?: boolean
  /** Extra class names, for spacing decided by the parent. */
  className?: string | undefined
}

/**
 * A single Font Awesome glyph, sized and coloured from the design tokens.
 *
 * Every other component that shows an icon goes through this one, so a change
 * to icon sizing lands everywhere at once instead of in each component's CSS.
 */
export function Icon({
  icon,
  size = 'body',
  tone = 'inherit',
  label,
  spin = false,
  className,
}: IconProps) {
  const classes = [styles.icon, styles[size], styles[tone], className].filter(Boolean).join(' ')

  return (
    <FontAwesomeIcon
      icon={icon}
      spin={spin}
      className={classes}
      // Decorative icons are removed from the accessibility tree entirely;
      // meaningful ones become an image with a name.
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    />
  )
}
