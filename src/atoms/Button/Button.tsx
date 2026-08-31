import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '../Icon/Icon'
import styles from './Button.module.css'

/** What the button is for, which decides how much it shouts. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

/** Control heights, drawn from the `--control-height-*` tokens. */
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /** The label. Write what will happen — "Save changes", not "Submit". */
  children: ReactNode
  /**
   * How much attention it asks for. Exactly one `primary` per view: two primary
   * buttons is a decision the interface failed to make.
   * @default 'primary'
   */
  variant?: ButtonVariant
  /**
   * Control height.
   * @default 'md'
   */
  size?: ButtonSize
  /** An icon before the label. Decorative — the label carries the meaning. */
  iconStart?: IconDefinition
  /** An icon after the label. Use it for direction, as in "Continue →". */
  iconEnd?: IconDefinition
  /**
   * Swaps the leading icon for a spinner and blocks activation.
   *
   * The label stays put and the width does not move, so a pending button does
   * not shove the layout around. The button reports `aria-busy` rather than
   * going disabled, which keeps it focusable and keeps a screen reader informed.
   */
  loading?: boolean
  /** Fills the width of its container. For a form's final action, or narrow screens. */
  fullWidth?: boolean
  /** Extra class names, for margins the parent owns. */
  className?: string | undefined
}

/**
 * A button.
 *
 * Every dimension, colour and duration comes from a token; there is not a
 * literal in its stylesheet. Sizes map to `--control-height-*`, so a change to
 * control sizing moves buttons, inputs and selects together.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  loading = false,
  fullWidth = false,
  className,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const iconSize = size === 'sm' ? 'label' : 'body'
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      // Defaults to `button`: a bare <button> inside a form submits it, which
      // is a surprise often discovered in production.
      type={type}
      className={classes}
      disabled={disabled ?? false}
      aria-busy={loading || undefined}
      // Not `disabled`, so it keeps focus and stays announced while pending.
      aria-disabled={loading || undefined}
      onClick={loading ? (event) => event.preventDefault() : rest.onClick}
      {...rest}
    >
      {loading ? (
        <Icon icon={faSpinner} spin size={iconSize} label="Working" />
      ) : iconStart ? (
        <Icon icon={iconStart} size={iconSize} />
      ) : null}
      <span className={styles.label}>{children}</span>
      {iconEnd && !loading ? <Icon icon={iconEnd} size={iconSize} /> : null}
    </button>
  )
}
