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

const navLinks: NavLink[] = [
  // { type: 'link', href: '/', text: 'TOPページ' },
  { type: 'anchor', href: 'quick-access', text: '参加者向け重要情報' },
  { type: 'anchor', href: 'about', text: 'VketReal in 札幌とは' },
  // { type: 'anchor', href: 'news', text: 'お知らせ' },
  // { type: 'anchor', href: 'contents', text: '企画・コンテンツ' },
  // { type: 'anchor', href: 'schedule', text: '開催スケジュール' },
  { type: 'anchor', href: 'exhibition', text: '出展情報' },
  // { type: 'anchor', href: 'access', text: 'アクセス' },
  { type: 'anchor', href: 'tickets', text: 'チケット' },
  { type: 'anchor', href: 'qa', text: 'よくある質問' },
  // { type: 'anchor', href: 'code-of-conduct', text: '行動規範' },
  // { type: 'anchor', href: 'related-events', text: '関連イベント' },
  // { type: 'anchor', href: 'sponsors-and-partners', text: 'ご協力' },
  // { type: 'anchor', href: 'contact', text: 'お問い合わせ' },
]

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
  overflow-x: hidden;
}
</style>
