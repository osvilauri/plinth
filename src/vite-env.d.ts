/// <reference types="vite/client" />

/**
 * Markdown imported as raw text.
 *
 * Each component ships a `.md` next to it, and its story hands that text to
 * Storybook as the page description. The documentation lives in one file rather
 * than being duplicated between a prose file and a story.
 */
declare module '*.md?raw' {
  const content: string
  export default content
}
