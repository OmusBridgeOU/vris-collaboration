<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import HaNewsCard from '../ha/HaNewsCard.vue'
import HaChevronLeftIcon from '../ha/icons/HaChevronLeftIcon.vue'
import HaChevronRightIcon from '../ha/icons/HaChevronRightIcon.vue'

// スライドの型
type SlideItem = {
  id: number
  timestamp: string
  title: string
  href: string
  imgSrc: string
}

// ブレークポイントごとのSlidesPerViewの型
type BreakpointSlidesPerView = {
  [width: number]: {
    slidesPerView: number | 'auto'
  }
}

defineProps<{
  items?: SlideItem[]
  _slidesPerView?: number | 'auto'
  _breakpoints?: BreakpointSlidesPerView
}>()

const modules = [Autoplay, Navigation, Pagination]
</script>

<template>
  <div class="works-swiper mb-25">
    <Swiper
      :slides-per-view="_slidesPerView ?? 'auto'"
      :breakpoints="_breakpoints"
      :speed="1000"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :modules="modules"
      :loop="true"
      :centered-slides="false"
      :space-between="24"
      :navigation="{
        nextEl: '.custom-swiper-button--next',
        prevEl: '.custom-swiper-button--prev',
      }"
      :pagination="{
        el: '.custom-swiper-pagination',
        clickable: true,
      }"
    >
      <SwiperSlide
        v-for="item in items"
        :key="item.id"
      >
        <HaNewsCard :item="item" />
      </SwiperSlide>
      <div
        class="custom-swiper-pagination"
      />
      <div class="swiper-button-flex">
        <button
          type="button"
          class="custom-swiper-button custom-swiper-button--prev"
          aria-label="前のスライドへ"
        >
          <HaChevronLeftIcon />
        </button>
        <button
          type="button"
          class="custom-swiper-button custom-swiper-button--next"
          aria-label="次のスライドへ"
        >
          <HaChevronRightIcon />
        </button>
      </div>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
:deep(.swiper) {
  overflow: hidden;
}
</style>
