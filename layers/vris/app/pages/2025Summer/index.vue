<i18n lang="yaml">
ja:
  site:
    title: VketReal in 札幌 2025 Summer
    title_template: '%s - VketReal in 札幌 2025 Summer'
    description: 北海道の有志XRクリエイターが主催する、VRSNSユーザーのためのリアルイベント、VketReal in 札幌！2025年は7月21日(月・祝)に開催！
en:
  site:
    title: VketReal in SAPPORO 2025 Summer
    title_template: '%s - VketReal in SAPPORO 2025 Summer'
    description: VketReal in SAPPORO, a real event for VRSNS users organized by XR creators in Hokkaido! Scheduled for July 21, 2025 (Mon, public holiday)!
</i18n>

<template>
  <HtHt2025SummerTop />
</template>

<script setup lang="ts">
import { useNuxtContentDocsInjectionKey } from '#vris/app/composables/useNuxtContentDocs'

const i18n = useI18n()
const nuxtContentDocs = useNuxtContentDocs()
const mounted = ref(false)
const cards = ref<unknown[]>([])
const currentLang = ref(i18n.locale.value)

provide(useNuxtContentDocsInjectionKey, nuxtContentDocs)

const { data: cardsState, refresh } = await nuxtContentDocs.fetchCards()
nuxtContentDocs.setCards(cardsState.value ?? [])
cards.value = nuxtContentDocs.cards.value

const title = computed(() => {
  return i18n.t('site.title') === 'VketReal in 札幌 2025 Summer'
    || i18n.t('site.title') === 'VketReal in SAPPORO 2025 Summer'
    ? i18n.t('site.title')
    : 'VketReal in 札幌 2025 Summer'
})

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
  layout: '2025-winter-top',
})

useHead({
  htmlAttrs: {
    lang: currentLang.value,
  },
  title,
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? i18n.t('site.title_template', { title: titleChunk })
      : title.value
  },
  meta: [
    {
      name: 'description',
      content: i18n.t('site.description'),
    },
    {
      property: 'og:title',
      content: title.value,
    },
    {
      property: 'og:description',
      content: i18n.t('site.description'),
    },
    {
      property: 'og:image',
      content: `${useRuntimeConfig().public.url}/images/2025Summer/kv.png`,
    },
  ],
})
</script>
