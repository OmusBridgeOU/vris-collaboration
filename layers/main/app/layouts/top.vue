<i18n lang="yaml">
ja:
  nav:
    about: イベントについて
    individualParticipant: 一般参加
    clubParticipant: サークル参加
    listOfClubs: サークル一覧
    qa: よくある質問
    # top: TOPページ
    # quickAccess: 参加者向け重要情報
    # news: お知らせ
    # contents: 企画・コンテンツ
    # schedule: 開催スケジュール
    # exhibition: 出展情報
    # access: アクセス
    # ticket: チケット
    # codeOfConduct: 行動規範
    # relatedEvents: 関連イベント
    # sponsorsAndPartners: ご協力
    # contact: お問い合わせ
en:
  nav:
    about: About VketReal in SAPPORO
    individualParticipant: Individual Participant
    clubParticipant: Club Participant
    listOfClubs: List of Clubs
    qa: FAQ
    # top: Top
    # quickAccess: Key Information
    # news: News
    # contents: Contents
    # schedule: Schedule
    # exhibition: Exhibition
    # access: Access
    # ticket: Tickets
    # codeOfConduct: Code of Conduct
    # relatedEvents: Related Events
    # sponsorsAndPartners: Partners
    # contact: Contact
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
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n()

const navLinks = computed<NavLink[]>(() => [
  { type: 'anchor', href: 'about', text: t('nav.about') },
  { type: 'anchor', href: 'participation-guide', text: t('nav.individualParticipant') },
  { type: 'anchor', href: 'participation-guide', text: t('nav.clubParticipant') },
  { type: 'anchor', href: 'qa', text: t('nav.qa') },
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
