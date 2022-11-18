import { defineConfig } from 'windicss/helpers'

import { colors } from './config'

export default defineConfig({
  theme: {
    extend: {
      colors,
    },
  },
})
