<i18n lang="yaml">
ja:
  items:
    earlySpring:
      title: VketReal mini in 札幌 2026 Early Spring
    summer:
      title: VketReal in 札幌 2025 Summer
en:
  items:
    earlySpring:
      title: VketReal mini in SAPPORO 2026 Early Spring
    summer:
      title: VketReal in SAPPORO 2025 Summer
</i18n>

<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import HaSwiperCard from '../ha/HaSwiperCard.vue'
import type { Swiper as SwiperType } from 'swiper'

// ブレークポイントごとのSlidesPerViewの型
type BreakpointSlidesPerView = {
  [width: number]: {
    slidesPerView: number | 'auto'
  }
}

defineProps<{
  _slidesPerView?: number | 'auto' // デフォルトのslidesPerView
  _breakpoints?: BreakpointSlidesPerView // ブレークポイントごとの設定
}>()

const modules = [Autoplay, Navigation, Pagination]
const { t } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: t('items.earlySpring.title'),
    href: 'https://archived.vris.jp/',
    imgSrc: 'https://archived.vris.jp/images/2026EarlySpring/2026EarlySpring-kv.png',
  },
  {
    id: 2,
    title: t('items.summer.title'),
    href: 'https://archived.vris.jp/2025Summer',
    imgSrc: 'https://archived.vris.jp/images/2025Summer/kv.png',
  },
])

const emit = defineEmits<{
  slideChange: [isBeginning: boolean, isEnd: boolean]
}>()

const swiperInstance = ref<SwiperType | null>(null)

const updateState = (swiper: SwiperType) => {
  emit('slideChange', swiper.isBeginning, swiper.isEnd)
}

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
  updateState(swiper)
}

const onSlideChange = (swiper: SwiperType) => {
  updateState(swiper)
}

defineExpose({ swiperInstance })
</script>

<template>
  <div class="works-swiper mb-25">
    <Swiper
      :slides-per-view="_slidesPerView ?? 'auto'"
      :breakpoints="_breakpoints"
      :speed="1000"
      :autoplay="{ delay: 3000, stopOnLastSlide: true }"
      :modules="modules"
      :centered-slides="false"
      :space-between="28"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="{
        el: '.custom-swiper-pagination',
        clickable: true,
      }"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide
        v-for="item in items"
        :key="item.id"
      >
        <HaSwiperCard :item="item" />
      </SwiperSlide>
    </Swiper>
    <div class="custom-swiper-pagination" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.swiper) {
  overflow: visible;
}
</style>
