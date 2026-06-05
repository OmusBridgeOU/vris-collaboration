<i18n lang="yaml">
ja:
  section:
    title: チケット
    label: tickets
  description:
    line1: 持続可能なイベント開催のため、
    line2: チケット制でのご参加にご協力をお願いいたします。
    line3: チケットは複数種類を用意予定です。
  cards:
    general:
      title: 一般参加チケット
      desc: 販売開始に向けて準備中です。
      cta: 準備中
    exhibitor:
      title: 出展者向け案内
      desc: 募集要項・申込方法は順次公開予定です。
      cta: 近日公開
    updates:
      title: 最新情報
      desc: 公式Xで販売開始や追加情報をお知らせします。
      cta: 公式Xを見る
en:
  section:
    title: Tickets
    label: tickets
  description:
    line1: To support a sustainable event,
    line2: we kindly ask for your cooperation with ticketed admission.
    line3: Multiple ticket types are planned.
  cards:
    general:
      title: General Admission
      desc: Ticket sales are being prepared.
      cta: Coming soon
    exhibitor:
      title: Exhibitor Information
      desc: Application guidelines and details will be announced later.
      cta: Coming soon
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
      {{ t('description.line2') }}<br>
      {{ t('description.line3') }}
    </p>
    <div
      ref="listRef"
      class="ticket-grid"
    >
      <div class="ticket-grid__item">
        <HaTicketCard
          :title="t('cards.general.title')"
          :desc="t('cards.general.desc')"
          :cta-label="t('cards.general.cta')"
        />
      </div>
      <div class="ticket-grid__item">
        <HaTicketCard
          :title="t('cards.exhibitor.title')"
          :desc="t('cards.exhibitor.desc')"
          :cta-label="t('cards.exhibitor.cta')"
        />
      </div>
      <div class="ticket-grid__item ticket-grid__item--full-width">
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

  &__item {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
