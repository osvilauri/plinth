import { useId, useRef, type FormHTMLAttributes, type ReactNode } from 'react'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import styles from './Form.module.css'

/** One thing that went wrong, and which field it belongs to. */
export interface FormError {
  /** The `id` of the field. The summary links to it, so pass the same one you gave the field. */
  fieldId: string
  /** What to do about it. An instruction, not a verdict. */
  message: string
}

export interface FormProps
  // `title` is omitted because <form> has a native title attribute typed as a
  // string, and here it is the form's heading — a node, not a tooltip.
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'className' | 'title'> {
  /** What the form is for. Rendered as its heading and used as the fieldset's name. */
  title: ReactNode
  /** The fields. Usually `Input`s. */
  children: ReactNode
  /** The submit button's label. Say what will happen: "Create account". */
  submitLabel?: string
  /** A secondary action beside submit — "Cancel", "Back". */
  secondaryAction?: ReactNode
  /** One or two sentences under the title. */
  description?: ReactNode
  /**
   * Errors to summarise at the top.
   *
   * A summary is what makes a long form usable after a failed submit: the user
   * gets a list of what went wrong with links straight to each field, instead of
   * scrolling to hunt for red borders. Fields keep their own messages too.
   */
  errors?: readonly FormError[]
  /** Disables the submit button and shows it working. */
  submitting?: boolean
  /**
   * Stacks the actions and fills the width. For a narrow column or a modal.
   * @default false
   */
  stacked?: boolean
  /** Extra class names. */
  className?: string | undefined
}

/**
 * A form: a heading, a set of fields, an error summary, and its actions.
 *
 * Composed entirely of atoms. What it adds is the wiring that is easy to get
 * wrong once per form — the error summary, focus management after a failed
 * submit, and the fieldset that names the group.
 */
export function Form({
  title,
  children,
  submitLabel = 'Submit',
  secondaryAction,
  description,
  errors,
  submitting = false,
  stacked = false,
  className,
  onSubmit,
  ...rest
}: FormProps) {
  const id = useId()
  const summaryRef = useRef<HTMLDivElement>(null)
  const hasErrors = (errors?.length ?? 0) > 0

  return (
    <form
      className={[styles.form, stacked ? styles.stacked : null, className].filter(Boolean).join(' ')}
      // Browser validation off: this form reports errors through the summary and
      // the fields, and native bubbles would say the same thing in a second
      // style that cannot be read by a screen reader in the same order.
      noValidate
      aria-labelledby={`${id}-title`}
      {...(description ? { 'aria-describedby': `${id}-description` } : {})}
      onSubmit={onSubmit}
      {...rest}
    >
      <header className={styles.header}>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
        {description ? (
          <p id={`${id}-description`} className={styles.description}>
            {description}
          </p>
        ) : null}
      </header>

      {hasErrors ? (
        <div
          ref={summaryRef}
          className={styles.summary}
          // A failed submit is worth interrupting for: the user just acted and
          // is waiting to hear what happened.
          role="alert"
          // Focusable so the caller can move focus here after a failed submit,
          // which puts the keyboard user at the list rather than at the top.
          tabIndex={-1}
        >
          <p className={styles.summaryTitle}>
            <Icon icon={faCircleExclamation} size="label" tone="danger" />
            {errors!.length === 1
              ? 'One thing needs fixing'
              : `${errors!.length} things need fixing`}
          </p>
          <ul className={styles.summaryList}>
            {errors!.map((error) => (
              <li key={error.fieldId}>
                {/* Straight to the field, so a long form does not have to be
                    scrolled and scanned for red borders. */}
                <a href={`#${error.fieldId}`}>{error.message}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* A fieldset groups the controls and gives the group a name, which is how
          a screen reader announces where it is when it enters the form. */}
      <fieldset className={styles.fields} disabled={submitting}>
        <legend className="plinth-visually-hidden">{title}</legend>
        {children}
      </fieldset>

      <footer className={styles.actions}>
        <Button type="submit" loading={submitting} fullWidth={stacked}>
          {submitLabel}
        </Button>
        {secondaryAction}
      </footer>
    </form>
  )
}
