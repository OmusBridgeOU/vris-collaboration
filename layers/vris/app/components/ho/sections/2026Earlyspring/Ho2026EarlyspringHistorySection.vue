<i18n lang="yaml">
ja:
  history:
    eyebrow: Archive
    title: 2025 Summerの実績
    lead: 2025年7月21日に札幌テレビ塔で開催した「VketReal in 札幌 2025 Summer」は来場者767名を記録し、道内のXRシーンに新たな歴史を築きました。
    stats:
      item1:
        label: 来場者数
        value: 767名
        note: 道内参加者が約83%を占める盛況
      item2:
        label: 開催日
        value: 2025.07.21 (月・祝)
      item3:
        label: 会場
        value: さっぽろテレビ塔 2階 イベントホール
    highlights:
      item1: VRヘッドセットを使ったミニゲームやオリジナルデバイスの展示が人気を集めました。
      item2: アバターイラスト制作、バーチャルネイルなど多様なコンテンツが展開されました。
      item3: 北海道のVRSNSユーザーのハブとしてコミュニティが形成され、長時間滞在する来場者も多数。
    source:
      text: "情報提供: PressWalker プレスリリース (2025.08.25)"
      url: https://presswalker.jp/press/84603
en:
  history:
    eyebrow: Archive
    title: Highlights from 2025 Summer
    lead: Held at the Sapporo TV Tower on July 21, 2025, “VketReal in Sapporo 2025 Summer” welcomed 767 visitors and fostered a vibrant XR community in Hokkaido.
    stats:
      item1:
        label: Visitors
        value: 767
        note: About 83% of attendees were from Hokkaido
      item2:
        label: Event Date
        value: July 21, 2025 (Mon – Holiday)
      item3:
        label: Venue
        value: Sapporo TV Tower, Event Hall 2F
    highlights:
      item1: Immersive mini-games and original XR devices drew large crowds.
      item2: Diverse offerings included avatar illustration services and virtual nail art.
      item3: Served as a hub for VR SNS users across Hokkaido, encouraging long visits and new connections.
    source:
      text: "Source: PressWalker Press Release (Aug 25, 2025)"
      url: https://presswalker.jp/press/84603
</i18n>

<template>
  <section
    id="history"
    class="ha-section ha-history"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('history.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('history.title') }}
      </h2>
      <p class="ha-section__lead">
        {{ t('history.lead') }}
      </p>
    </div>
    <div class="grid">
      <div class="stats">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat"
        >
          <span class="label">{{ stat.label }}</span>
          <span class="value">{{ stat.value }}</span>
          <span
            v-if="stat.note"
            class="note"
          >
            {{ stat.note }}
          </span>
        </div>
      </div>
    </div>
    <p class="source">
      {{ t('history.source.text') }}
      <a
        :href="t('history.source.url')"
        target="_blank"
        rel="noopener"
      >
        {{ t('history.source.url') }}
      </a>
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface HistoryStat {
  label: string
  value: string
  note?: string
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, te } = useI18n()

const stats = computed<HistoryStat[]>(() =>
  Array.from({ length: 3 }, (_, index) => {
    const baseKey = `history.stats.item${index + 1}`
    const noteKey = `${baseKey}.note`
    return {
      label: t(`${baseKey}.label`),
      value: t(`${baseKey}.value`),
      note: te(noteKey) ? t(noteKey) : undefined,
    }
  }),
)
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-history {
  .grid {
    display: grid;
    grid-template-columns: repeat(1fr);
    gap: f.rem(24px);

    @include m.tb {
      grid-template-columns: repeat(1fr);
    }

    @include m.sp {
      grid-template-columns: 1fr;
    }
  }

  .stats {
    display: grid;
    grid-column: span 4;
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

    .note {
      font-size: f.rem(12px);
      color: #333;
    }
  }

  .source {
    margin-top: f.rem(24px);
    font-size: f.rem(13px);

    a {
      margin-left: f.rem(8px);
      color: rgba(v.$blue, 0.85);
      text-decoration: underline;
      word-break: break-all;
    }
  }
}
</style>
