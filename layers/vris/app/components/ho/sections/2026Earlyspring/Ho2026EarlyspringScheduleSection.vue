<i18n lang="yaml">
ja:
  schedule:
    eyebrow: Timeline
    title: 1/24(土)のタイムテーブル
    note: 当日14:30より前のご来場はご遠慮ください。
    items:
      item1:
        time: 14:30
        label: 一般開場
        detail: エレベーターをご活用いただき、会場までお越しください。他施設のご利用客様へのご配慮をお願いいたします。
      item2:
        time: 15:00
        label: VketReal mini in 札幌 2026 Early Spring 開会
        detail: スタッフの案内に従い、受付後、会場内へお進みください。
      item3:
        time: 20:00
        label: クロージング / 閉会 / 撤収・ミートアップ
        detail: イベント終了後は速やかにのご退場をお願いいたします。
en:
  schedule:
    eyebrow: Timeline
    title: Schedule for Jan 24 (Sat)
    note: Please refrain from arriving before 14:30.
    items:
      item1:
        time: 14:30
        label: Doors Open
        detail: Please use the elevator to reach the venue and be considerate of other facility users.
      item2:
        time: 15:00
        label: VketReal mini in Sapporo 2026 Early Spring Opening
        detail: Please follow the staff instructions to check in and enter the venue.
      item3:
        time: 20:00
        label: Closing / Event End / Teardown & Meetup
        detail: Please exit the venue promptly after the event concludes.
</i18n>

<template>
  <section
    id="schedule"
    class="ha-section ha-schedule"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('schedule.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('schedule.title') }}
      </h2>
    </div>
    <div class="timeline">
      <div
        v-for="slot in scheduleItems"
        :key="slot.time"
        class="item"
      >
        <span class="time">{{ slot.time }}</span>
        <div class="body">
          <h3>{{ slot.label }}</h3>
          <p>{{ slot.detail }}</p>
        </div>
      </div>
    </div>
    <p class="note">
      {{ t('schedule.note') }}
    </p>
    <figure class="timetable">
      <img
        src="/images/2026EarlySpring/timetable.png"
        alt="VketReal mini in 札幌 2026 Early Spring のタイムテーブル"
        loading="lazy"
      >
    </figure>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ScheduleSlot {
  time: string
  label: string
  detail: string
}

const { t } = useI18n()

const scheduleItems = computed<ScheduleSlot[]>(() =>
  Array.from({ length: 3 }, (_, index) => ({
    time: t(`schedule.items.item${index + 1}.time`),
    label: t(`schedule.items.item${index + 1}.label`),
    detail: t(`schedule.items.item${index + 1}.detail`),
  })),
)
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-schedule {
  .timeline {
    display: grid;
    gap: f.rem(24px);

    .item {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: f.rem(16px);
      align-items: start;

      padding: f.rem(24px);
      border-radius: 24px;

      background: v.$white;
      backdrop-filter: blur(10px);
      box-shadow: 0 18px 55px rgba(v.$navy, 0.35);

      @include m.sp {
        grid-template-columns: 1fr;
      }
    }

    .time {
      font-size: clamp(f.rem(20px), 2.3vw, f.rem(26px));
      font-weight: 600;
      color: rgba(v.$black, 0.9);
    }

    .body {
      h3 {
        margin: 0 0 f.rem(8px);
        font-size: clamp(f.rem(20px), 2vw, f.rem(24px));
      }

      p {
        margin: 0;
        line-height: 1.7;
        color: #333;
      }
    }
  }

  .note {
    margin-top: f.rem(32px);
    font-size: f.rem(14px);
    color: #333;
  }

  .timetable {
    display: flex;
    justify-content: center;
    margin-top: f.rem(28px);

    img {
      width: min(100%, 960px);
      border-radius: 20px;
      box-shadow: 0 18px 55px rgba(v.$navy, 0.35);
    }
  }
}
</style>
