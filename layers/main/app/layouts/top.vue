<i18n lang="yaml">
ja:
  nav:
    top: TOPページ
    quickAccess: 参加者向け重要情報
    about: VketReal in 札幌とは
    news: お知らせ
    contents: 企画・コンテンツ
    schedule: 開催スケジュール
    exhibition: 出展情報
    access: アクセス
    ticket: チケット
    qa: よくある質問
    codeOfConduct: 行動規範
    relatedEvents: 関連イベント
    sponsorsAndPartners: ご協力
    contact: お問い合わせ
en:
  nav:
    top: Top
    quickAccess: Key Information
    about: About VketReal in SAPPORO
    news: News
    contents: Contents
    schedule: Schedule
    exhibition: Exhibition
    access: Access
    ticket: Tickets
    qa: FAQ
    codeOfConduct: Code of Conduct
    relatedEvents: Related Events
    sponsorsAndPartners: Partners
    contact: Contact
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
  { type: 'link', href: '/', text: t('nav.top') },
  { type: 'anchor', href: 'quick-access', text: t('nav.quickAccess') },
  { type: 'anchor', href: 'about', text: t('nav.about') },
  { type: 'anchor', href: 'news', text: t('nav.news') },
  { type: 'anchor', href: 'contents', text: t('nav.contents') },
  { type: 'anchor', href: 'schedule', text: t('nav.schedule') },
  { type: 'anchor', href: 'exhibition', text: t('nav.exhibition') },
  { type: 'anchor', href: 'access', text: t('nav.access') },
  { type: 'anchor', href: 'ticket', text: t('nav.ticket') },
  { type: 'anchor', href: 'qa', text: t('nav.qa') },
  { type: 'anchor', href: 'code-of-conduct', text: t('nav.codeOfConduct') },
  { type: 'anchor', href: 'related-events', text: t('nav.relatedEvents') },
  { type: 'anchor', href: 'sponsors-and-partners', text: t('nav.sponsorsAndPartners') },
  { type: 'anchor', href: 'contact', text: t('nav.contact') },
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
