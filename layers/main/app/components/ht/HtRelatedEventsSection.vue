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
    ref="worksSwiperRef"
    :_slides-per-view="1.4"
    class="mb-24"
    @slide-change="onSlideChange"
  />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.custom-swiper-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  border-radius: 100px;

  background-color: #1e355b;

  &.is-disabled {
    opacity: 0.6;
    background-color: transparent;
  }
}
</style>
