<template>
  <div
    class="ht-2026-top"
    :class="{ '-sp': isSp }"
  >
    <div class="bg" />
    <div
      v-for="section in randomizedSections"
      :key="section.id"
      :class="['normal-section', section.cssClass]"
      :style="{ '--section-bg': section.backgroundColor }"
    >
      <div class="bg" />
      <component :is="section.component" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Ho2026EarlyspringAccessSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringAccessSection.vue'
import Ho2026EarlyspringArtSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringArtSection.vue'
import Ho2026EarlyspringCircleSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringCircleSection.vue'
import Ho2026EarlyspringCorporateSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringCorporateSection.vue'
import Ho2026EarlyspringDocumentsSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringDocumentsSection.vue'
import Ho2026EarlyspringHeroSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringHeroSection.vue'
import Ho2026EarlyspringHighlightsSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringHighlightsSection.vue'
import Ho2026EarlyspringHistorySection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringHistorySection.vue'
import Ho2026EarlyspringIntroSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringIntroSection.vue'
import Ho2026EarlyspringLtSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringLtSection.vue'
import Ho2026EarlyspringMemberSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringMemberSection.vue'
import Ho2026EarlyspringScheduleSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringScheduleSection.vue'
import Ho2026EarlyspringTicketSection from '#vris/app/components/ho/sections/2026Earlyspring/Ho2026EarlyspringTicketSection.vue'
import { breakpoints } from '#vris/app/composables/useBreakpoints'
import { onMounted, ref, type Component } from 'vue'

interface SectionConfig {
  id: string
  name: string
  description: string
  component: Component
  cssClass: string
  backgroundColor: string
}

const GRADIENT_PRESETS = [
  'linear-gradient(135deg, rgba(173, 213, 255, 0.55), rgba(255, 196, 230, 0.55))',
  'linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(173, 213, 255, 0.6))',
  'linear-gradient(135deg, rgba(255, 220, 250, 0.6), rgba(173, 213, 255, 0.58))',
  'linear-gradient(135deg, rgba(200, 231, 255, 0.6), rgba(255, 214, 240, 0.6))',
  'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(214, 233, 255, 0.6))',
]

const SECTIONS_CONFIG: SectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero',
    description: 'メインビジュアル・ヒーローセクション',
    component: Ho2026EarlyspringHeroSection,
    cssClass: 'hero',
    backgroundColor: '',
  },
  {
    id: 'ticket',
    name: 'Ticket',
    description: 'チケット・参加CTA',
    component: Ho2026EarlyspringTicketSection,
    cssClass: 'ticket',
    backgroundColor: '',
  },
  {
    id: 'about',
    name: 'About',
    description: '2025 SummerのAboutセクション流用',
    component: Ho2026EarlyspringIntroSection,
    cssClass: 'about',
    backgroundColor: '',
  },
  {
    id: 'schedule',
    name: 'Schedule',
    description: 'タイムテーブル・スケジュールセクション',
    component: Ho2026EarlyspringScheduleSection,
    cssClass: 'schedule',
    backgroundColor: '',
  },
  {
    id: 'lineup',
    name: 'Lineup',
    description: '企画一覧カード（ハイライト相当）',
    component: Ho2026EarlyspringHighlightsSection,
    cssClass: 'lineup',
    backgroundColor: '',
  },
  {
    id: 'circle',
    name: 'Circle',
    description: 'サークルビジュアルカルーセル',
    component: Ho2026EarlyspringCircleSection,
    cssClass: 'circle',
    backgroundColor: '',
  },
  {
    id: 'lt',
    name: 'LT',
    description: 'LT登壇者一覧',
    component: Ho2026EarlyspringLtSection,
    cssClass: 'lt',
    backgroundColor: '',
  },
  {
    id: 'access',
    name: 'Access',
    description: 'アクセス・会場情報セクション',
    component: Ho2026EarlyspringAccessSection,
    cssClass: 'access',
    backgroundColor: '',
  },
  {
    id: 'art',
    name: 'Art',
    description: 'ビジュアルカルーセル',
    component: Ho2026EarlyspringArtSection,
    cssClass: 'art',
    backgroundColor: '',
  },
  {
    id: 'documents',
    name: 'Documents',
    description: '関連ドキュメント',
    component: Ho2026EarlyspringDocumentsSection,
    cssClass: 'documents',
    backgroundColor: '',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'ご協力・クレジット',
    component: Ho2026EarlyspringCorporateSection,
    cssClass: 'corporate',
    backgroundColor: '',
  },
  {
    id: 'staff',
    name: 'Staff',
    description: 'スタッフクレジット',
    component: Ho2026EarlyspringMemberSection,
    cssClass: 'staff',
    backgroundColor: '',
  },
  {
    id: 'related',
    name: 'Related Links',
    description: '関連リンク/アーカイブ',
    component: Ho2026EarlyspringHistorySection,
    cssClass: 'related',
    backgroundColor: '',
  },
]

const isSp = breakpoints.smaller('sp')
const randomizedSections = ref<SectionConfig[]>([])

const getRandomizedBackgrounds = (): string[] => {
  return [...GRADIENT_PRESETS].sort(() => Math.random() - 0.5)
}

const initializeRandomBackgrounds = () => {
  const backgrounds = getRandomizedBackgrounds()
  randomizedSections.value = SECTIONS_CONFIG.map((section, index) => {
    const background = backgrounds[index % backgrounds.length]!
    return {
      ...section,
      backgroundColor: background,
    }
  })
}

onMounted(() => {
  initializeRandomBackgrounds()
})
</script>

<style lang="scss" scoped>
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ht-2026-top {
  position: relative;

  width: 100vw;
  height: 100dvh;

  color: #333;

  background: #fff;

  &.-sp {
    background-position: center;
  }

  > .bg {
    position: fixed;
    z-index: 1;
    inset: 0;

    background-image: url('/images/2026EarlySpring/2026EarlySpring-kv.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    backdrop-filter: blur(12px);
  }
}

.normal-section {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 100%;
  margin-top: 40px;
  padding: v.space(8) 0;

  @include m.sp {
    padding: v.space(6) 0;

    &::before {
      inset: v.space(4);
    }
  }

  > .bg {
    pointer-events: none;

    position: absolute;
    z-index: 1;

    width: 95%;
    height: 95%;
    border-radius: 20px;

    background: rgb(255 255 255 / 40%);
    backdrop-filter: blur(8px);

    @include m.sp {
      width: 98%;
      height: 98%;
    }
  }

  &:last-of-type {
    padding-bottom: 120px;

    @include m.sp {
      padding-bottom: 80px;
    }
  }
}

:global(.ha-section) {
  position: relative;
  z-index: v.$zindex-main;

  width: 100%;
  max-width: min(v.$pc-content-medium-width, 100%);
  margin: 0 auto;
  padding: v.space(10) 4vw;

  @include m.sp {
    padding: v.space(14) 6vw;
  }
}

:global(.ha-section__heading) {
  margin-bottom: v.space(10);
  text-align: left;
}

:global(.ha-section__eyebrow) {
  display: inline-flex;
  align-items: center;

  margin-bottom: v.space(4);
  padding: v.space(1) v.space(3.5);
  border-radius: 999px;

  font-size: f.rem(14px);
  color: rgba(v.$blue, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.08em;

  background: rgba(v.$white, 0.1);
}

:global(.ha-section__title) {
  margin: 0;
  font-size: clamp(f.rem(29px), 2.6vw, f.rem(44px));
  font-weight: 700;
  line-height: 1.25;
}

:global(.ha-section__lead) {
  margin-top: v.space(5);
  font-size: f.rem(16px);
  line-height: 1.7;
  color: rgba(v.$text-body, 0.8);
}

:global(.ha-eyebrow) {
  margin-bottom: v.space(3);

  font-size: f.rem(14px);
  color: rgba(v.$blue, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

:global(.ha-button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: v.space(3.5) v.space(7);
  border: 1px solid rgba(v.$white, 0.3);
  border-radius: 999px;

  font-weight: 600;
  color: v.$text-body;

  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &.-primary {
    background: linear-gradient(135deg, v.$orange, v.$blue);
    box-shadow: 0 10px 30px rgba(v.$blue, 0.35);
  }

  &.-ghost {
    background: rgba(v.$white, 0.12);
  }

  @include m.hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(v.$blue, 0.35);
  }

}
</style>
