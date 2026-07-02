<i18n lang="yaml">
ja:
  section:
    title: 参加者向け重要情報
    label: quick access
  cards:
    date:
      title: 開催日
      label: DATE
      body: 2026年9月26日(土)
    location:
      title: 会場
      label: LOCATION
      body:
        line1: アスティホール
        line2: 札幌市中央区 北4条西5丁目1 4F
    tickets:
      title: チケット
      label: TICKETS
      body: 販売開始に向けて準備中です。
    schedule:
      title: スケジュール
      label: SCHEDULE
      body: 詳細タイムテーブルは順次公開予定です。
en:
  section:
    title: Key Information for Visitors
    label: quick access
  cards:
    date:
      title: Date
      label: DATE
      body: Sat, September 26, 2026
    location:
      title: Venue
      label: LOCATION
      body:
        line1: ASTY Hall
        line2: Kita 4-jo Nishi 5-chome 1, Chuo-ku, Sapporo, 4F
    tickets:
      title: Tickets
      label: TICKETS
      body: Ticket sales are being prepared.
    schedule:
      title: Schedule
      label: SCHEDULE
      body: The detailed timetable will be announced later.
</i18n>

<script setup lang="ts">
import HaQuickAccessCard from '../ha/HaQuickAccessCard.vue'
import HaCalendarIcon from '../ha/icons/HaCalendarIcon.vue'
import HaMapPinIcon from '../ha/icons/HaMapPinIcon.vue'
import HaTicketIcon from '../ha/icons/HaTicketIcon.vue'
import HaTimerIcon from '../ha/icons/HaTimerIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.gsap-list__child')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="t('section.title')"
      :label="t('section.label')"
    />
    <div
      ref="listRef"
      class="grid2x"
    >
      <div class="gsap-list__child grid2x__child">
        <HaQuickAccessCard
          color="cyan"
          :title="t('cards.date.title')"
          :label="t('cards.date.label')"
        >
          <template #icon>
            <HaCalendarIcon />
          </template>
          <template #body>
            <p>{{ t('cards.date.body') }}</p>
          </template>
        </HaQuickAccessCard>
      </div>
      <div class="gsap-list__child grid2x__child">
        <HaQuickAccessCard
          color="magenta"
          :title="t('cards.location.title')"
          :label="t('cards.location.label')"
        >
          <template #icon>
            <HaMapPinIcon />
          </template>
          <template #body>
            <p>
              {{ t('cards.location.body.line1') }}<br>
              {{ t('cards.location.body.line2') }}
            </p>
          </template>
        </HaQuickAccessCard>
      </div>
      <div class="gsap-list__child grid2x__child">
        <HaQuickAccessCard
          color="amber"
          :title="t('cards.tickets.title')"
          :label="t('cards.tickets.label')"
        >
          <template #icon>
            <HaTicketIcon />
          </template>
          <template #body>
            <p>{{ t('cards.tickets.body') }}</p>
          </template>
        </HaQuickAccessCard>
      </div>
      <div class="gsap-list__child grid2x__child">
        <HaQuickAccessCard
          color="vermilion"
          :title="t('cards.schedule.title')"
          :label="t('cards.schedule.label')"
          icon-url="/icons/material-symbols_timer-outline.svg"
        >
          <template #icon>
            <HaTimerIcon />
          </template>
          <template #body>
            <p>{{ t('cards.schedule.body') }}</p>
          </template>
        </HaQuickAccessCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.grid2x {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 20px;

  @include m.sp {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  &__child {
    height: 100%;
    min-height: 280px;
  }
}
</style>
