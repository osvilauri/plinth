import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  framework: { name: '@storybook/react-vite', options: {} },
  // The docs addon is what turns `tags: ['autodocs']` into an actual page.
  // Without it in this list, autodocs is silently a no-op — Storybook shows the
  // stories and none of the prose or props tables beside them.
  addons: ['@storybook/addon-docs'],
  typescript: {
    /**
     * Props tables come from the types and their doc comments, so a prop
     * documented in the code is documented in Storybook. There is no second
     * place to keep in sync.
     *
     * `react-docgen` and not `react-docgen-typescript`: the latter drives the
     * TypeScript compiler through its old JavaScript API, which TypeScript 7
     * replaced when it moved to Go. It crashes on every component here with
     * `Cannot read properties of undefined (reading 'fileExists')`.
     *
     * This one parses with Babel instead, needs no compiler, and is Storybook's
     * own default. The trade is slightly less resolution of imported union
     * types — worth it to stay on the current TypeScript.
     */
    reactDocgen: 'react-docgen',
  },
}

export default config
