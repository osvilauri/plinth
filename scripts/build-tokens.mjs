#!/usr/bin/env node
/**
 * Turns the design tokens into CSS custom properties.
 *
 * This is the whole integration with tokens-to-css: one call. It runs before
 * dev, before a build, and before Storybook, so the stylesheet is never stale
 * and never checked in — `design/tokens.json` is the only source of truth.
 */
import { generateCss } from 'tokens-to-css'

const result = await generateCss('design/tokens.json', {
  outDir: 'src/styles',
  fileName: 'tokens.css',
})

console.log(`  ${result.tokenCount} custom properties → ${result.outputPath.replace(process.cwd() + '/', '')}`)
