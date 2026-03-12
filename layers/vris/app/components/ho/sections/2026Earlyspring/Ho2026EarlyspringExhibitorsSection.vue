<i18n lang="yaml">
ja:
  exhibitors:
    eyebrow: Exhibition
    title: 出展サークル向け情報
    summary:
      labels:
        fee: 参加費
        applicationDeadline: 応募締切
        resultDate: 当落発表
      fee: 5,000円 (税込) / 1サークル
      applicationDeadline: 2025.11.04 (火) 23:59 JST
      resultDate: 2025.11.18 (火) 予定
    sections:
      perks:
        title: 出展特典
        items:
          - 入場チケット1枚を無償配布
          - 追加入場券1枚を割引価格で購入可能
          - Lightning Talk 登壇枠を1サークルにつき1枠付与 (任意参加)
          - 公式Webサイトにクレジット掲載 (アイコン・URL・PR文など)
      booth:
        title: ブース仕様
        items:
          - 長机半卓 (900mm × 750mm) と椅子1脚を提供
          - 背面への直接掲示は不可。自立式スタンドをご用意ください
          - Wi-Fi利用可 / 有線LANは原則不可
      flow:
        title: 応募の流れ
        items:
          - 出展ガイドライン・規約を確認のうえ申込フォームから応募
          - 応募締切 11/4 (火) 23:59 JST
          - 11/18 (火) 当落発表。専用Discordで詳細連絡
          - 当日は12:00から搬入・設営、20:00から搬出開始
    note: バーチャル領域に関連しない出展はお断りする場合があります。必ず出展規約をご確認ください。
en:
  exhibitors:
    eyebrow: Exhibition
    title: Information for Exhibiting Circles
    summary:
      labels:
        fee: Fee
        applicationDeadline: Deadline
        resultDate: Result Announcement
      fee: ¥5,000 (tax incl.) per circle
      applicationDeadline: Tue, Nov 4, 2025 — 23:59 JST
      resultDate: Results on Tue, Nov 18, 2025
    sections:
      perks:
        title: Exhibitor Benefits
        items:
          - One complimentary admission ticket per circle
          - Option to purchase one additional ticket at a discount
          - One optional Lightning Talk slot per circle
          - Credit listing on the official website (icon, URL, PR text)
      booth:
        title: Booth Specifications
        items:
          - Half-width table (900mm × 750mm) with one chair
          - No direct wall mounting; prepare a self-standing display
          - Venue Wi-Fi available; wired LAN generally unavailable
      flow:
        title: Application Flow
        items:
          - Review the guidelines/terms and submit via the entry form
          - Entry deadline: Tue, Nov 4 at 23:59 JST
          - Results announced Tue, Nov 18 via dedicated Discord
          - Load-in from 12:00, teardown from 20:00 on event day
    note: Exhibits unrelated to virtual content may be declined. Please review the terms in advance.
</i18n>

<template>
  <section
    id="exhibitors"
    class="ha-section ha-exhibitors"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('exhibitors.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('exhibitors.title') }}
      </h2>
    </div>
    <div class="grid">
      <div class="summary">
        <div class="stat">
          <span class="label">{{ t('exhibitors.summary.labels.fee') }}</span>
          <span class="value">{{ t('exhibitors.summary.fee') }}</span>
        </div>
        <div class="stat">
          <span class="label">{{ t('exhibitors.summary.labels.applicationDeadline') }}</span>
          <span class="value">{{ t('exhibitors.summary.applicationDeadline') }}</span>
        </div>
        <div class="stat">
          <span class="label">{{ t('exhibitors.summary.labels.resultDate') }}</span>
          <span class="value">{{ t('exhibitors.summary.resultDate') }}</span>
        </div>
      </div>
      <div class="details">
        <div
          v-for="section in detailSections"
          :key="section.title"
          class="block"
        >
          <h3>{{ section.title }}</h3>
          <ul>
            <li
              v-for="item in section.items"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="note">
      {{ t('exhibitors.note') }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DetailSection {
  title: string
  items: string[]
}

const i18n = useI18n()
const translate = (key: string) => i18n.t(key as never)
const message = (key: string) => i18n.tm(key as never)
const t = translate

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(item => (typeof item === 'string' ? item : String(item)))
  }

  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).map(item =>
      typeof item === 'string' ? item : String(item),
    )
  }

  return []
}

const detailSections = computed<DetailSection[]>(() => {
  const sectionKeys = ['perks', 'booth', 'flow'] as const

  return sectionKeys.map((sectionKey) => {
    const title = String(t(`exhibitors.sections.${sectionKey}.title`))
    const items = toStringArray(message(`exhibitors.sections.${sectionKey}.items`))

    return { title, items }
  })
})
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-exhibitors {
  .grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: f.rem(32px);

    @include m.tb {
      grid-template-columns: repeat(6, 1fr);
    }

    @include m.sp {
      grid-template-columns: 1fr;
    }
  }

  .summary {
    display: flex;
    grid-column: span 4;
    flex-direction: column;
    gap: f.rem(16px);

    padding: f.rem(24px);
    border-radius: 24px;

    background: v.$white;
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 60px rgba(v.$navy, 0.35);

    @include m.tb {
      grid-column: span 6;
    }

    @include m.sp {
      grid-column: 1;
    }
  }

  .details {
    display: grid;
    grid-column: span 8;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: f.rem(24px);

    @include m.tb {
      grid-column: span 6;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include m.sp {
      grid-column: 1;
      grid-template-columns: 1fr;
    }
  }

  .block {
    padding: f.rem(24px);
    border-radius: 24px;

    background: v.$white;
    backdrop-filter: blur(10px);
    box-shadow: 0 18px 50px rgba(v.$navy, 0.32);

    h3 {
      margin: 0 0 f.rem(16px);
      font-size: clamp(f.rem(18px), 2vw, f.rem(24px));
    }

    ul {
      margin: 0;
      padding-left: f.rem(16px);
      line-height: 1.7;
      color: #333;
    }
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: f.rem(4px);

    .label {
      font-size: f.rem(12px);
      color: rgba(v.$blue, 0.9);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .value {
      font-size: clamp(f.rem(20px), 2vw, f.rem(26px));
      font-weight: 600;
      color: rgba(v.$black, 0.9);
    }
  }

  .note {
    margin-top: f.rem(32px);
    font-size: f.rem(14px);
    color: #333;
  }
}
</style>
