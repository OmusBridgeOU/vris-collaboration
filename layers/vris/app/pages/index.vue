<template>
  <Ht2026EarlyspringTop />
</template>

<script setup lang="ts">
import Ht2026EarlyspringTop from '#vris/app/components/ht/Ht2026EarlyspringTop.vue'
import { useNuxtContentDocsInjectionKey } from '#vris/app/composables/useNuxtContentDocs'

// const i18n = useI18n()
const nuxtContentDocs = useNuxtContentDocs()
const mounted = ref(false)
const cards = ref<unknown[]>([])

provide(useNuxtContentDocsInjectionKey, nuxtContentDocs)

const { data: cardsState, refresh } = await nuxtContentDocs.fetchCards()
nuxtContentDocs.setCards(cardsState.value ?? [])
cards.value = nuxtContentDocs.cards.value

onMounted(async () => {
  if (!cards.value || cards.value.length === 0) {
    if (nuxtContentDocs.cards.value) {
      cards.value = nuxtContentDocs.cards.value
    } else {
      await refresh()
      nuxtContentDocs.setCards(cardsState.value ?? [])
      cards.value = nuxtContentDocs.cards.value
    }
  }
  mounted.value = true
})

definePageMeta({
  layout: '2025-winter-teaser',
})
</script>
