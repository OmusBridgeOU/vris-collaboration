<i18n lang="yaml">
ja:
  title: 開催情報
  eyebrow: event info
  theme: 「閉ざされた冬から、開かれた世界へ。」
  date: 2026年1月24日(土)
  venue: Deep Tech CORE SAPPORO（札幌駅徒歩2分）
  organizer: VketReal in 札幌 実行委員会
  partner: VR法人HIKKY / 株式会社インフィニットループ
  items:
    - label: 開催日
      value: 2026年1月24日(土)
    - label: 会場
      value: Deep Tech CORE SAPPORO
      note: XRスタジオ併設 / 札幌駅徒歩2分圏
    - label: テーマ
      value: 「閉ざされた冬から、開かれた世界へ。」
    - label: 主催
      value: VketReal in 札幌 実行委員会
    - label: 協力
      value: VR法人HIKKY / 株式会社インフィニットループ
en:
  title: Event Info
  eyebrow: event info
  theme: "From a closed winter to an open world."
  date: Sat, Jan 24, 2026
  venue: Deep Tech CORE SAPPORO (2 min from Sapporo Sta.)
  organizer: VketReal in Sapporo Executive Committee
  partner: VR法人HIKKY / Infinite Loop Inc.
  items:
    - label: Date
      value: Sat, Jan 24, 2026
    - label: Venue
      value: Deep Tech CORE SAPPORO
      note: XR Studio on-site / 2 min walk from Sapporo Station
    - label: Theme
      value: "From a closed winter to an open world."
    - label: Organizer
      value: VketReal in Sapporo Executive Committee
    - label: Partners
      value: VR法人HIKKY / Infinite Loop Inc.
</i18n>

<template>
  <section class="ha-section ha-info">
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('title') }}
      </h2>
      <p class="ha-section__lead">
        {{ t('theme') }}
      </p>
    </div>
    <div class="info-grid">
      <div
        v-for="item in items"
        :key="item.label"
        class="info-card"
      >
        <p class="label">
          {{ item.label }}
        </p>
        <p class="value">
          {{ item.value }}
        </p>
        <p
          v-if="item.note"
          class="note"
        >
          {{ item.note }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface InfoItem {
  label: string
  value: string
  note?: string
}

const { t } = useI18n()

const items = computed<InfoItem[]>(() => t('items') as unknown as InfoItem[])
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-info {
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: v.space(4);
  }

  .info-card {
    padding: v.space(4);
    border-radius: 18px;

    background: rgb(255 255 255 / 72%);
    backdrop-filter: blur(10px);
    box-shadow: 0 12px 34px rgba(v.$navy, 0.18);

    .label {
      margin: 0 0 v.space(1.5);

      font-size: f.rem(13px);
      color: rgba(v.$blue, 0.85);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .value {
      margin: 0;

      font-size: f.rem(18px);
      font-weight: 700;
      line-height: 1.4;
      color: v.$text-body;
    }

    .note {
      margin: v.space(1.5) 0 0;
      font-size: f.rem(13px);
      color: rgba(v.$text-body, 0.7);
    }
  }
}
</style>
