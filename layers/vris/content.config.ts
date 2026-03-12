/* eslint-disable @typescript-eslint/await-thenable */
import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      source: 'docs/**/*.md',
      type: 'page',
    }),
    cards: defineCollection({
      source: 'cards/*.md',
      type: 'page',
    }),
  },
})
