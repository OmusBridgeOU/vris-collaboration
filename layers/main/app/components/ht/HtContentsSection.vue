<i18n lang="yaml">
ja:
  items:
    paraRealCreatorInSapporo:
      title: パラリアルクリエイター in SAPPORO
      text: VRクリエイターによるグッズ展示・即売コーナー
en:
  items:
    paraRealCreatorInSapporo:
      title: ParaRealCreator in SAPPORO
      text: Goods Exhibition & Sale by VR Creators
</i18n>

<script setup lang="ts">
import HmContentsSwiper from '../hm/HmContentsSwiper.vue'
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
    title: t('items.paraRealCreatorInSapporo.title'),
    href: 'https://archived.vris.jp/',
    text: t('items.paraRealCreatorInSapporo.text'),
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
    title="企画・コンテンツ"
    label="CONTENTS"
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
    <HmContentsSwiper
      ref="worksSwiperRef"
      class="contents__swiper"
      :items="items"
      :_slides-per-view="1"
      :_breakpoints="{
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
      }"
      @slide-change="onSlideChange"
    />
    <NuxtLink
      class="glassy-button-3 contents__button"
      to="/contents"
    >
      すべて見る
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.contents {
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
