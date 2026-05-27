<script setup lang="ts">
import HmSwiper from '../hm/HmSwiper.vue'
import HaChevronLeftIcon from '../ha/icons/HaChevronLeftIcon.vue'
import HaChevronRightIcon from '../ha/icons/HaChevronRightIcon.vue'

import type { Swiper as SwiperType } from 'swiper'

const worksSwiperRef = ref<{ swiperInstance: SwiperType | null } | null>(null)

// 親側でリアクティブな状態として持つ
const isBeginning = ref(true)
const isEnd = ref(false)

const onSlideChange = (newIsBeginning: boolean, newIsEnd: boolean) => {
  isBeginning.value = newIsBeginning
  isEnd.value = newIsEnd
}
</script>

<template>
  <HaSectionTitle
    title="関連イベント"
    label="RELATED EVENTS"
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
    :_slides-per-view="1"
    :_breakpoints="{
      768: { slidesPerView: 1.4 },
    }"
    @slide-change="onSlideChange"
  />
</template>
