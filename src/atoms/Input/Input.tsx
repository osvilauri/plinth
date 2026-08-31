import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '../Icon/Icon'
import { Label } from '../Label/Label'
import styles from './Input.module.css'

/** Control heights, the same tokens `Button` uses. */
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size' | 'id'> {
  /** The field's name, rendered as its label. A noun: "Email address". */
  label: ReactNode
  /**
   * The `id` for the input.
   *
   * Generated when omitted, so the label, the hint and the error are always
   * wired to the right field even with several on a page.
   */
  id?: string
  /** A short clarification under the label — a format, a constraint, a reason. */
  hint?: ReactNode
  /**
   * What went wrong.
   *
   * Present means invalid: the field turns, reports `aria-invalid`, and the
   * message is announced. Say what to do about it, not that something is wrong.
   */
  error?: ReactNode
  /**
   * Control height, shared with `Button` so a field and its action line up.
   * @default 'md'
   */
  size?: InputSize
  /** A decorative icon inside the field, before the text. */
  iconStart?: IconDefinition
  /** Fills the width of its container. @default true */
  fullWidth?: boolean
  /** Extra class names. */
  className?: string | undefined
}

/**
 * A text field, with its label, hint and error wired together.
 *
 * The wiring is the reason this component exists. `aria-describedby` has to
 * point at the hint, the error, or both — and getting that wrong produces a
 * field that looks correct and tells a screen reader user nothing.
 */
export function Input({
  label,
  id,
  hint,
  error,
  size = 'md',
  iconStart,
  fullWidth = true,
  className,
  required,
  ...rest
}: InputProps) {
  const generated = useId()
  const fieldId = id ?? generated
  const hintId = `${fieldId}-hint`
  const errorId = `${fieldId}-error`

  // Both when both exist: a field can have a format hint *and* have failed.
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ')

  return (
    <div
      className={[styles.field, fullWidth ? styles.fullWidth : null, className]
        .filter(Boolean)
        .join(' ')}
    >
      <Label htmlFor={fieldId} required={required ?? false} hint={hint}>
        {label}
      </Label>

      <div className={[styles.shell, styles[size], error ? styles.invalid : null].filter(Boolean).join(' ')}>
        {iconStart ? <Icon icon={iconStart} size="body" tone="muted" className={styles.leading} /> : null}
        <input
          id={fieldId}
          className={styles.input}
          required={required ?? false}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          {...rest}
        />
      </div>

      {error ? (
        // Polite, not assertive: an error that interrupts mid-typing is worse
        // than one that waits for a pause.
        <span id={errorId} className={styles.error} role="status" aria-live="polite">
          <Icon icon={faCircleExclamation} size="label" tone="danger" />
          {error}
        </span>
      ) : null}
    </div>
  )
}
