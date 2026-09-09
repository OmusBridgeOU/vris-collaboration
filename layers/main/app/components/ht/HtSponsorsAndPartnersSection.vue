<script setup lang="ts">
import HaSponsorCard from '../ha/HaSponsorCard.vue'
import HaSectionTitle from '../ha/HaSectionTitle.vue'

type Sponsor = {
  id: string
  name: string
  category: string
  href: string
  imgSrc: string
  logoVariant?: 'default' | 'wide' | 'square' | 'compact' | 'hikky'
}

const { t: tGlobal } = useI18n()

const sponsors: Sponsor[] = [
  {
    id: 'infinite-loop',
    name: '株式会社インフィニットループ',
    category: '法人出展 & 特別協力',
    href: 'https://www.infiniteloop.co.jp/',
    imgSrc: '/partners-and-sponsors/infinite-loop.png',
    logoVariant: 'wide',
  },
  {
    id: 'nunuai',
    name: '株式会社NuNuAI（VR向けPCブランド NuNuPC）',
    category: '法人出展',
    href: 'https://nunupc.com/pages/event-info',
    imgSrc: '/partners-and-sponsors/nunuai.png',
    logoVariant: 'square',
  },
  {
    id: 'sapporo-innovation-lab',
    name: '一般社団法人さっぽろイノベーションラボ',
    category: '法人協賛',
    href: 'https://sapporo-innovation-lab.jp/',
    imgSrc: '/partners-and-sponsors/sapporo-innovation-lab.png',
  },
  {
    id: 'sapporo-engineer-base',
    name: 'SapporoEngineerBase',
    category: '法人協賛',
    href: 'https://sapporo-engineer-base.dev/',
    imgSrc: '/partners-and-sponsors/sapporo-engineer-base.png',
    logoVariant: 'compact',
  },
  {
    id: 'nomaps-2026',
    name: 'NoMaps 2026',
    category: '連携イベント',
    href: 'https://no-maps.jp/2026',
    imgSrc: '/partners-and-sponsors/nomaps-2026.svg',
  },
  {
    id: 'hikky',
    name: '株式会社HIKKY',
    category: '特別協力',
    href: 'https://hikky.co.jp',
    imgSrc: '/partners-and-sponsors/hikky.webp',
    logoVariant: 'hikky',
  },
]
</script>

<template>
  <HaSectionTitle
    :title="tGlobal('sectionTitle.sponsorsAndPartners')"
    label="PARTNERS & SPONSORS"
  />
  <div class="sponsor-grid">
    <a
      v-for="sponsor in sponsors"
      :key="sponsor.id"
      :href="sponsor.href"
      class="sponsor-grid__child"
      target="_blank"
      rel="noopener noreferrer"
    >
      <HaSponsorCard
        :img-src="sponsor.imgSrc"
        :label="sponsor.category"
        :logo-variant="sponsor.logoVariant"
        :name="sponsor.name"
      />
    </a>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.sponsor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;

  &__child {
    min-width: 0;
    color: inherit;
    text-decoration: none;
  }

  @include m.tb {
    grid-template-columns: 1fr 1fr;
  }

  @include m.sp {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
