import type { Preview } from '@storybook/react-vite'
import { DocsPage } from './DocsPage'

// The generated stylesheet first, then everything that reads from it. If the
// order were reversed, every component would fall back to its unset defaults.
import '../src/styles/tokens.css'
import '../src/styles/base.css'

const preview: Preview = {
  /**
   * A documentation page for every component, without adding a tag to each one.
   *
   * This is what renders the `.md` file beside each component and the props
   * table built from its types — the two halves of the documentation. Without
   * it Storybook shows the stories and nothing else, and the prose sitting next
   * to each component is never seen by anyone.
   */
  tags: ['autodocs'],

  parameters: {
    /**
     * The canvas above the prose. Storybook's default page renders the whole
     * `.md` before the first story, which on a long page looks like a component
     * that failed to render. See `DocsPage.tsx`.
     */
    docs: { page: DocsPage },
    controls: { expanded: true },
    options: {
      storySort: {
        order: ['Demo', 'Foundations', 'Atoms', 'Molecules', 'Organisms'],
      },
    },
  },
}

export default preview
