<template>
  <div class="layout -top">
    <HoTheHeader :nav-links="navLinks" />
    <slot />
    <HoTheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NavLink } from '../components/ho/HoTheHeader.vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n()

const navLinks = computed<NavLink[]>(() => [
  { type: 'anchor', href: 'exhibitor-info', text: t('sectionTitle.exhibitorInfo') },
  { type: 'anchor', href: 'contents', text: t('sectionTitle.contents') },
  { type: 'anchor', href: 'location-info', text: t('sectionTitle.locationInfo') },
  { type: 'anchor', href: 'qa', text: t('sectionTitle.qa--min') },
])

const { firstViewBlur, headerRevealOnScroll, destroyScrollTriggers } = useGsapFadeIn()
const route = useRoute()

onMounted(async () => {
  await initScrollEffects()
})

// ページ遷移時に#first-viewが存在しない場合があるためrouteを監視
watch(() => route.path, () => {
  destroyScrollTriggers()
  nextTick(() => initScrollEffects())
})

onUnmounted(() => {
  destroyScrollTriggers()
})

const initScrollEffects = async () => {
  const firstView = document.querySelector('#gsap-fv')
  const header = document.querySelector('#gsap-header')

  if (!header) return

  // #first-viewがないページ（トップ以外）では実行しない
  if (!firstView) return

  firstViewBlur(firstView)
  headerRevealOnScroll(header, firstView)

  // DOM更新が完了したタイミングでレイアウトを再計算
  await nextTick()
  ScrollTrigger.refresh()

  // 画像・フォント等の読み込み完了後にも念のため再計算
  window.addEventListener('load', () => {
    ScrollTrigger.refresh()
  }, { once: true })
}
</script>

<style lang="scss" scoped>
.layout.-top {
  overflow: visible;
}
</style>
