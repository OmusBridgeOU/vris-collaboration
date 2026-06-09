<i18n lang="yaml">
ja:
  items:
    news1:
      title: ロゴマークを公開しました！
    news2:
      title: キービジュアルを公開しました！
en:
  items:
    news1:
      title: We have published our logo!
    news2:
      title: We have published our key visual!
</i18n>

<script setup lang="ts">
import HmNewsSwiper from '../hm/HmNewsSwiper.vue'
import HaChevronLeftIcon from '../ha/icons/HaChevronLeftIcon.vue'
import HaChevronRightIcon from '../ha/icons/HaChevronRightIcon.vue'

// Swiper
import type { Swiper as SwiperType } from 'swiper'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const worksSwiperRef = ref<{ swiperInstance: SwiperType | null } | null>(null)

const isBeginning = ref(true)
const isEnd = ref(false)

const onSlideChange = (newIsBeginning: boolean, newIsEnd: boolean) => {
  isBeginning.value = newIsBeginning
  isEnd.value = newIsEnd
}

const { t } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: t('items.news1.title'),
    href: 'https://archived.vris.jp/',
    imgSrc: '/news1_thumbnail.png',
    timestamp: '2026-06-06',
  },
  {
    id: 2,
    title: t('items.news2.title'),
    href: 'https://archived.vris.jp/',
    imgSrc: '/news2_thumbnail.png',
    timestamp: '2026-06-01',
  },
])

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <HaSectionTitle
    title="お知らせ"
    label="NEWS"
  >
    <template #controls>
      <button
        :disabled="isBeginning"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isBeginning }"
        @click="worksSwiperRef?.swiperInstance?.slidePrev()"
      >
        <HaChevronLeftIcon />
      </button>
      <button
        :disabled="isEnd"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isEnd }"
        @click="worksSwiperRef?.swiperInstance?.slideNext()"
      >
        <HaChevronRightIcon />
      </button>
    </template>
  </HaSectionTitle>
  <div ref="sectionRef">
    <HmNewsSwiper
      ref="worksSwiperRef"
      class="news__swiper"
      :items="items"
      :_slides-per-view="1"
      :_breakpoints="{
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
      }"
      @slide-change="onSlideChange"
    />
    <NuxtLink
      class="glassy-button-3 news__button"
      to="/news"
    >
      すべて見る
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.news {
  &__swiper {
    margin-bottom: 36px;

    @include m.tb {
      margin-bottom: 24px;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 185px;
    height: 57px;
    margin: 0 auto;

    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;

    background-color: #e5b5ff3b;

    @include m.tb {
      width: 130px;
      height: 40px;
    }
  }
}
</style>
