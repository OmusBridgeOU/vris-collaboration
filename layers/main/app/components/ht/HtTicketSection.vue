<i18n lang="yaml">
ja:
  section:
    title: チケット
    label: tickets
  description:
    line1: 一般来場チケットは2026年8月26日(水)より販売開始です。
    line2: LivePocketの販売ページからお申し込みください。
  cards:
    general:
      title: 一般参加チケット
      desc: VketReal in 札幌 2026 Autumnの来場チケットです。
      cta: チケットを購入する
    updates:
      title: 最新情報
      desc: 公式Xで販売開始や追加情報をお知らせします。
      cta: 公式Xを見る
en:
  section:
    title: Tickets
    label: tickets
  description:
    line1: General admission tickets go on sale Wednesday, August 26, 2026.
    line2: Please purchase tickets through LivePocket.
  cards:
    general:
      title: General Admission
      desc: Admission ticket for VketReal in Sapporo 2026 Autumn.
      cta: Buy Tickets
    updates:
      title: Latest Updates
      desc: Sales launches and additional information will be announced on official X.
      cta: Official X
</i18n>

<script setup lang="ts">
import HaTicketCard from '../ha/HaTicketCard.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n()
const sectionRef = ref<Element | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.ticket-grid__item')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="t('section.title')"
      :label="t('section.label')"
    />
    <p class="description description--left">
      {{ t('description.line1') }}<br>
      {{ t('description.line2') }}
    </p>
    <div
      ref="listRef"
      class="ticket-grid"
    >
      <div class="ticket-grid__item">
        <HaTicketCard
          :title="t('cards.general.title')"
          :desc="t('cards.general.desc')"
          href="https://livepocket.jp/e/alkjd"
          :cta-label="t('cards.general.cta')"
        />
      </div>
      <div class="ticket-grid__item">
        <HaTicketCard
          :title="t('cards.updates.title')"
          :desc="t('cards.updates.desc')"
          href="https://x.com/vketreal_vris"
          :cta-label="t('cards.updates.cta')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ticket-grid {
  display: grid;
  grid-auto-rows: 275px;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;

  @include m.tb {
    grid-auto-rows: 166px;
    gap: 12px 16px;
  }

  @include m.sp {
    grid-template-columns: 1fr;
  }

}
</style>
