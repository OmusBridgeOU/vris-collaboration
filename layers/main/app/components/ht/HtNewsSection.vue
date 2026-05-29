<script setup lang="ts">
import HmSwiper from '../hm/HmSwiper.vue'
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

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="お知らせ"
      label="news"
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

    <HmSwiper
      ref="worksSwiperRef"
      :_slides-per-view="1"
      :_breakpoints="{
        768: { slidesPerView: 1.4 },
      }"
      @slide-change="onSlideChange"
    />
  </div>
</template>
