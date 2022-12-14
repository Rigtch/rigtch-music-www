/// <reference types="vitest" />

import { fileURLToPath } from 'url'

import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  // @ts-expect-error - This should work
  plugins: [Vue()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setup-tests.ts',
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
    },
    exclude: ['**/tests/**', '**/tests-examples/**', '**/node_modules/**'],
  },
})
