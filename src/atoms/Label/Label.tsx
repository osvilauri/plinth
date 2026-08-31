import type { LabelHTMLAttributes, ReactNode } from 'react'
import styles from './Label.module.css'

export interface LabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'className'> {
  /** The field's name. A noun, not an instruction: "Email address", not "Enter your email". */
  children: ReactNode
  /**
   * The `id` of the field this labels.
   *
   * Required, and deliberately not optional. A label without `htmlFor` looks
   * fine and is not connected to anything: clicking it does not focus the
   * field, and a screen reader reads the field as unnamed.
   */
  htmlFor: string
  /**
   * Marks the field as required.
   *
   * Draws a marker with an accessible name, so it is not a decorative asterisk
   * that sighted users understand and nobody else does.
   */
  required?: boolean
  /**
   * A short clarification under the label — a format, a constraint, a reason.
   *
   * Point the field's `aria-describedby` at `${htmlFor}-hint` so it is read out
   * with the field. `Input` does this for you.
   */
  hint?: ReactNode
  /** Extra class names. */
  className?: string | undefined
}

/**
 * A form label, and the hint that goes with it.
 *
 * Used on its own only for controls this system does not wrap yet. For text
 * fields, use `Input`, which renders this and wires the descriptions up.
 */
export function Label({ children, htmlFor, required = false, hint, className, ...rest }: LabelProps) {
  return (
    <div className={[styles.group, className].filter(Boolean).join(' ')}>
      <label htmlFor={htmlFor} className={styles.label} {...rest}>
        {children}
        {required ? (
          <span className={styles.required} aria-hidden>
            *
          </span>
        ) : null}
        {required ? <span className="plinth-visually-hidden">(required)</span> : null}
      </label>
      {hint ? (
        <span id={`${htmlFor}-hint`} className={styles.hint}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}
