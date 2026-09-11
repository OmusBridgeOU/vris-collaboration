<i18n lang="yaml">
ja:
  section:
    title: チケット
    label: tickets
  description:
    line1: イベント入場券は2026年8月26日(水)より販売開始です。
    line2: LivePocketの販売ページからお申し込みください。
  numberedTicketNotice:
    line1: ※入場にはイベント入場券とは別に、オンライン入場整理券が必要です。
    line2: 入場整理券は2026年9月24日(木)19:00よりLivePocketで配布します。
    line3: 整理券番号はLivePocketからメールで届きます。事前にLivePocketからのメールを受信できるよう、受信設定をご確認ください。
    link: 整理券番号のお知らせを確認する
  cards:
    general:
      title: イベント入場券
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
    line1: Event admission tickets go on sale Wednesday, August 26, 2026.
    line2: Please purchase tickets through LivePocket.
  numberedTicketNotice:
    line1: An online numbered admission ticket is required in addition to an event admission ticket.
    line2: Numbered admission tickets will be available through LivePocket from 7:00 PM on Thursday, September 24, 2026.
    line3: LivePocket will email your admission number. Please check your email settings in advance to ensure you can receive messages from LivePocket.
    link: View Admission Number Updates
  cards:
    general:
      title: Event Admission Ticket
      desc: Admission ticket for VketReal in Sapporo 2026 Autumn.
      cta: Buy Tickets
    updates:
      title: Latest Updates
      desc: Sales launches and additional information will be announced on official X.
      cta: Official X
</i18n>

<script setup lang="ts">
import HaTicketCard from '../ha/HaTicketCard.vue'
import { DOCUMENT_LINKS } from '~/constants/documentLinks'

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
    <div class="numbered-ticket-notice glassy-box-3">
      <p>{{ t('numberedTicketNotice.line1') }}</p>
      <p>{{ t('numberedTicketNotice.line2') }}</p>
      <p>{{ t('numberedTicketNotice.line3') }}</p>
      <a
        class="numbered-ticket-notice__link"
        :href="DOCUMENT_LINKS.numberedTicket"
        target="_blank"
        rel="noopener noreferrer"
      >{{ t('numberedTicketNotice.link') }}</a>
    </div>
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

.numbered-ticket-notice {
  display: grid;
  gap: 8px;

  margin-bottom: 24px;
  padding: 16px 20px;

  font-size: 14px;
  line-height: 1.7;

  background: rgb(49 35 96 / 40%);

  &__link {
    width: fit-content;
    color: v.$vket-cyan;
    text-decoration: underline;
    text-underline-offset: 4px;

    &:hover {
      text-decoration: none;
    }
  }

  @include m.sp {
    margin-bottom: 16px;
    padding: 14px 16px;
    font-size: 13px;
  }
}
</style>
