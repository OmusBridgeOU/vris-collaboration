<i18n lang="yaml">
ja:
  hero:
    title: 閉ざされた冬から、開かれた世界へ。
    schedule:
      item1:
        label: 開催日時
        value: 2026.1.24 (土) 15:00 〜 20:00 予定
      item2:
        label: 会場
        value: Deep Tech CORE SAPPORO
        note: 札幌駅徒歩2分／XRスタジオ併設
    ctas:
      item1:
        label: チケット購入はこちら
        href: https://livepocket.jp/e/kr1us
en:
  hero:
    title: From a Closed Winter to an Open World.
    schedule:
      item1:
        label: Date & Time
        value: Jan 24, 2026 (Sat) 15:00 – 20:00 (JST)
      item2:
        label: Venue
        value: Deep Tech CORE SAPPORO
        note: 2 min walk from Sapporo Station, XR studio on-site
    ctas:
      item1:
        label: Get Tickets
        href: https://livepocket.jp/e/kr1us
</i18n>

<template>
  <section class="ha-section ha-hero">
    <div class="inner">
      <div class="headline">
        <h1 class="title">
          {{ t('hero.title') }}
        </h1>
        <ul class="meta">
          <li
            v-for="item in heroSchedule"
            :key="item.label"
          >
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.value }}</span>
            <span
              v-if="item.note"
              class="note"
            >
              {{ item.note }}
            </span>
          </li>
        </ul>
      </div>
      <div class="cta">
        <a
          v-for="(cta, index) in heroCtas"
          :key="cta.href"
          class="ha-button"
          :class="CTA_VARIANTS[index]"
          :href="cta.href"
          :target="cta.href.startsWith('#') ? undefined : '_blank'"
          :rel="cta.href.startsWith('#') ? undefined : 'noopener'"
        >
          {{ cta.label }}
        </a>
      </div>
    </div>
    <div class="visual">
      <img
        class="hero-logo"
        src="/images/2026EarlySpring/2026EarlySpringLogo.png"
        width="400"
        :alt="t('hero.title')"
        loading="lazy"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface HeroMetaItem {
  label: string
  value: string
  note?: string
}

interface HeroCtaItem {
  label: string
  href: string
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, te } = useI18n()

const CTA_VARIANTS: ('-primary')[] = ['-primary']

const heroSchedule = computed<HeroMetaItem[]>(() =>
  Array.from({ length: 2 }, (_, index) => {
    const baseKey = `hero.schedule.item${index + 1}`
    const noteKey = `${baseKey}.note`
    return {
      label: t(`${baseKey}.label`),
      value: t(`${baseKey}.value`),
      note: te(noteKey) ? t(noteKey) : undefined,
    }
  }),
)

const heroCtas = computed<HeroCtaItem[]>(() =>
  Array.from({ length: CTA_VARIANTS.length }, (_, index) => {
    const baseKey = `hero.ctas.item${index + 1}`
    return {
      label: t(`${baseKey}.label`),
      href: t(`${baseKey}.href`),
    }
  }),
)
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-hero {
  position: relative;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: f.rem(48px);
  align-items: center;

  min-height: clamp(560px, 90vh, 780px);

  color: #333;

  @include m.sp {
    grid-template-columns: 1fr;
    gap: f.rem(40px);
    text-align: center;
  }

  > .inner {
    display: flex;
    grid-column: span 6;
    flex-direction: column;
    gap: f.rem(32px);

    @include m.sp {
      grid-column: 1;
      align-items: center;
    }
  }

  .title {
    margin: 0;
    font-size: clamp(f.rem(36px), 4vw, f.rem(56px));
    font-weight: 800;
    line-height: 1.1;
  }

  .subtitle {
    margin: 0;
    font-size: clamp(f.rem(18px), 2vw, f.rem(26px));
    font-weight: 600;
    color: #333;
  }

  .description {
    max-width: 560px;
    margin: 0;

    font-size: f.rem(16px);
    line-height: 1.7;
    color: #333;

    @include m.sp {
      max-width: none;
    }
  }

  .meta {
    display: grid;
    gap: f.rem(16px);

    margin: 16px 0 0;
    padding: 0;

    list-style: none;

    @include m.sp {
      width: 100%;
      text-align: left;
    }

    .label {
      display: block;

      font-size: f.rem(13px);
      color: rgba(v.$blue, 0.9);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .value {
      display: block;
      font-size: f.rem(18px);
      font-weight: 600;
    }

    .note {
      display: block;
      font-size: f.rem(12px);
      color: #333;
    }
  }

  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: f.rem(16px);
    justify-content: center;
  }

  > .visual {
    display: flex;
    grid-column: span 6;
    align-items: center;
    justify-content: center;

    @include m.sp {
      grid-column: 1;
      order: -1;
    }

    .hero-logo {
      display: block;
      width: 400px;
      height: auto;
      filter: drop-shadow(0 18px 38px rgba(v.$navy, 0.3));

      @include m.sp {
        width: 100%;
      }
    }
  }
}
</style>
