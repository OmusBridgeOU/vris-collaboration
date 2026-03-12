<i18n lang="yaml">
ja:
  lightningTalk:
    eyebrow: Lightning Talk
    title: Parareal Lightning Talk in SAPPORO
    lead: 「XR × 北海道 × ○○」をテーマに、アイデアを共有するライトニングトーク。リアル会場での熱量をそのままお届けします。
    points:
      item1: XR × 北海道 × ○○ をテーマにしたプレゼンテーション
      item2: 登壇は原則リアル会場参加。オンライン登壇は準備が整った場合のみ
      item3: スライド提出はイベント前日まで。XRスタジオから配信連携予定
      item4: 参加費は無料 (リアル登壇者は入場チケット 3,500円(税込) が別途必要)
    meta:
      start:
        label: 開始時間
        value: 17:00〜
      fee:
        label: 参加費
        value: 無料 ※別途入場券
      deadline:
        label: 応募締切
        value: 2025.11.04 (火) 23:59 JST
en:
  lightningTalk:
    eyebrow: Lightning Talk
    title: Parareal Lightning Talk in SAPPORO
    lead: Five-minute lightning talks themed “XR × Hokkaido × Your Idea,” sharing inspiration directly from the real venue.
    points:
      item1: Five-minute presentations on the theme “XR × Hokkaido × ___”
      item2: Presenters appear on-site; remote slots available only if preparations permit
      item3: Submit slide decks by the day before; streaming support planned from the XR studio
      item4: Participation is free (separate admission ticket of ¥3,500 required for on-site speakers)
    meta:
      start:
        label: Start Time
        value: 17:00
      fee:
        label: Participation Fee
        value: Free (ticket required)
      deadline:
        label: Entry Deadline
        value: Tue, Nov 4, 2025 — 23:59 JST
</i18n>

<template>
  <section
    id="lt"
    class="ha-section ha-lt"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('lightningTalk.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('lightningTalk.title') }}
      </h2>
      <p class="ha-section__lead">
        {{ t('lightningTalk.lead') }}
      </p>
    </div>
    <div class="grid">
      <div class="main">
        <ul>
          <li
            v-for="point in points"
            :key="point"
          >
            {{ point }}
          </li>
        </ul>
      </div>
      <aside class="meta">
        <div
          v-for="item in metaItems"
          :key="item.label"
          class="stat"
        >
          <span class="label">{{ item.label }}</span>
          <span class="value">{{ item.value }}</span>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface MetaItem {
  label: string
  value: string
}

const i18n = useI18n()
const translate = (key: string) => i18n.t(key as never)
const t = translate

const points = computed(() =>
  Array.from({ length: 4 }, (_, index) => String(translate(`lightningTalk.points.item${index + 1}`))),
)

const metaItems = computed<MetaItem[]>(() => {
  const keys: ('start' | 'fee' | 'deadline')[] = ['start', 'fee', 'deadline']
  return keys.map(key => ({
    label: String(translate(`lightningTalk.meta.${key}.label`)),
    value: String(translate(`lightningTalk.meta.${key}.value`)),
  }))
})
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-lt {
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: f.rem(24px);

    @include m.tb {
      grid-template-columns: 1fr;
    }
  }

  .main {
    padding: f.rem(24px);
    border-radius: 24px;

    background: v.$white;
    backdrop-filter: blur(12px);
    box-shadow: 0 20px 60px rgba(v.$navy, 0.38);

    ul {
      margin: 0;
      padding-left: f.rem(16px);
      line-height: 1.8;
      color: #333;
    }
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: f.rem(16px);

    padding: f.rem(24px);
    border-radius: 24px;

    background: v.$white;
    backdrop-filter: blur(10px);
    box-shadow: 0 18px 50px rgba(v.$navy, 0.32);
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
}
</style>
