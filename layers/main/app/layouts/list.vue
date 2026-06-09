<i18n lang="yaml">
ja:
  nav:
    about: イベントについて
    individualParticipant: 一般参加
    clubParticipant: サークル参加
    listOfClubs: サークル一覧
    qa: よくある質問
en:
  nav:
    about: About VketReal in SAPPORO
    individualParticipant: Individual Participant
    clubParticipant: Club Participant
    listOfClubs: List of Clubs
    qa: FAQ
</i18n>

<template>
  <div class="layout -top">
    <HoTheHeader :nav-links="navLinks" />
    <slot />
    <HoTheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NavLink } from '../components/ho/HoTheHeader.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n()

const navLinks = computed<NavLink[]>(() => [
  { type: 'link', href: '/#about', text: t('nav.about') },
  { type: 'link', href: '/#individual-participant', text: t('nav.individualParticipant') },
  { type: 'link', href: '/#club-participant', text: t('nav.clubParticipant') },
  { type: 'link', href: '/#list-of-clubs', text: t('nav.listOfClubs') },
  { type: 'link', href: '/#qa', text: t('nav.qa') },
])

const { firstViewBlur, headerRevealOnScroll, destroyScrollTriggers } = useGsapFadeIn()
const route = useRoute()

onMounted(() => {
  initScrollEffects()
})

// ページ遷移時に#first-viewが存在しない場合があるためrouteを監視
watch(() => route.path, () => {
  destroyScrollTriggers()
  nextTick(() => initScrollEffects())
})

onUnmounted(() => {
  destroyScrollTriggers()
})

const initScrollEffects = () => {
  const firstView = document.querySelector('#gsap-fv')
  const header = document.querySelector('#gsap-header')

  if (!header) return

  // #first-viewがないページ（トップ以外）では実行しない
  if (!firstView) return

  firstViewBlur(firstView)
  headerRevealOnScroll(header, firstView)
}
</script>

<style lang="scss" scoped>
.layout.-top {
  overflow: visible;
}
</style>
