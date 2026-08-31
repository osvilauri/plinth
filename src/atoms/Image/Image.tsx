import type { ImgHTMLAttributes, ReactNode } from 'react'
import styles from './Image.module.css'

/** Shapes an image can be cropped to. */
export type ImageRatio = 'square' | 'portrait' | 'landscape' | 'wide' | 'auto'

/** Corner treatment, drawn from the radius tokens. */
export type ImageRadius = 'none' | 'tight' | 'control' | 'card' | 'pill'

export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'className' | 'width' | 'height'> {
  /** Where the image lives. */
  src: string
  /**
   * What the image shows.
   *
   * Required, and an empty string is a valid answer — it means "decorative,
   * skip me". Making it required forces the decision to be made rather than
   * forgotten, which is the difference between a considered empty alt and a
   * missing one.
   */
  alt: string
  /**
   * The shape to crop to. `auto` keeps the file's own proportions.
   * @default 'landscape'
   */
  ratio?: ImageRatio
  /**
   * Corner rounding.
   * @default 'card'
   */
  radius?: ImageRadius
  /**
   * How the image fills its box when the ratio crops it.
   * @default 'cover'
   */
  fit?: 'cover' | 'contain'
  /** A caption below the image. Renders the whole thing as a `<figure>`. */
  caption?: ReactNode
  /** Extra class names. */
  className?: string | undefined
}

/**
 * An image with a reserved box, so the page does not jump when it loads.
 *
 * The ratio is applied to the container rather than the file, which means the
 * space is claimed before a single byte arrives. That is the difference between
 * a layout that settles and one that shoves the text down as images appear.
 */
export function Image({
  src,
  alt,
  ratio = 'landscape',
  radius = 'card',
  fit = 'cover',
  caption,
  className,
  loading = 'lazy',
  ...rest
}: ImageProps) {
  const frame = (
    <div
      className={[styles.frame, styles[ratio], styles[`r-${radius}`], className]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        src={src}
        alt={alt}
        // Lazy by default: an image below the fold should not compete with the
        // text above it for bandwidth.
        loading={loading}
        decoding="async"
        className={[styles.img, fit === 'contain' ? styles.contain : styles.cover].join(' ')}
        {...rest}
      />
    </div>
  )

  if (!caption) return frame

  return (
    <figure className={styles.figure}>
      {frame}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  )
}
