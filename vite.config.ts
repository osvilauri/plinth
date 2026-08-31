import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Readable in the inspector: a class shows which component it came from,
      // which matters more in a design system than a short name.
      generateScopedName: 'plinth-[local]-[hash:base64:4]',
    },
  },
})
