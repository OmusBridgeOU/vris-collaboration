<template>
  <div class="layout -top">
    <HoTheHeader :nav-links="navLinks" />
    <slot />
    <HoTheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NavLink } from '../components/ho/HoTheHeader.vue'

const navLinks: NavLink[] = [
  { type: 'link', href: '/', text: 'TOPページ' },
  { type: 'anchor', href: 'quick-access', text: '参加者向け重要情報' },
  { type: 'anchor', href: 'about', text: 'VketReal in 札幌とは' },
  { type: 'anchor', href: 'news', text: 'お知らせ' },
  { type: 'anchor', href: 'contents', text: '企画・コンテンツ' },
  { type: 'anchor', href: 'schedule', text: '開催スケジュール' },
  { type: 'anchor', href: 'exhibition', text: '出展情報' },
  { type: 'anchor', href: 'access', text: 'アクセス' },
  { type: 'anchor', href: 'tickets', text: 'チケット' },
  { type: 'anchor', href: 'qa', text: 'よくある質問' },
  { type: 'anchor', href: 'code-of-conduct', text: '行動規範' },
  { type: 'anchor', href: 'related-events', text: '関連イベント' },
  { type: 'anchor', href: 'sponsors-and-partners', text: 'ご協力' },
  { type: 'anchor', href: 'contact', text: 'お問い合わせ' },
]
</script>

<style lang="scss" scoped>
.layout.-top {
  overflow-x: hidden;
}
</style>
