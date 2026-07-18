<template>
  <a
    :href="item.href"
    target="_blank"
    rel="noopener noreferrer"
    class="content-card"
  >
    <img
      v-if="item.imgSrc && item.imgSrc !== ''"
      :src="item.imgSrc"
      :alt="item.title"
      class="content-card__image"
      loading="lazy"
    >
    <div
      v-else
      class="content-card__empty-image"
    >
      <HaNoImage />
    </div>
    <p class="content-card__title">{{ item.title }}</p>
    <div class="content-card__text-flex">
      <p class="content-card__text">{{ item.text }}</p>
      <HaJumpToListIcon class="content-card__icon" />
    </div>
  </a>
</template>

<script setup lang="ts">
import HaNoImage from './HaNoImage.vue'
import HaJumpToListIcon from './icons/HaJumpToListIcon.vue'

defineProps<{
  item: { title: string, href: string, imgSrc: string, text: string }
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.content-card {
  cursor: pointer;

  display: block;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 16px;
  border-top: 1px solid white;

  transition: border-color 0.2s ease;

  @include m.sp {
    padding-top: 0;
  }

  &:hover {
    border-color: v.$vket-cyan;

    @include m.sp {
      border: none;
    }
  }

  &__image, &__empty-image {
    position: relative;

    overflow: hidden;
    display: block;

    aspect-ratio: 16 / 9;
    width: 100%;
    margin-bottom: 14px;
    border-radius: 10px;

    object-fit: cover;

    // aspect-ratio非対応ブラウザ向けフォールバック
    @supports not (aspect-ratio: 16 / 9) {
      height: 0;
      padding-top: 56.25%;
    }

    &::before {
      position: absolute;
      inset: 0;
    }

    @include m.sp {
      margin-bottom: 6px;
    }
  }

  &__text-flex {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    margin-right: 1em;
    margin-bottom: 24px;

    font-size: 20px;
    line-height: 1.2em;
    color: white;

    @include m.sp {
      margin-bottom: 12px;
      font-size: 16px;
    }
  }

  &__text {
    margin-bottom: 6px;
    font-size: 14px;
    color: #a0a0a0;
  }

  &__icon {
    width: 20px;
    fill: v.$vket-cyan;

    @include m.sp {
      width: 16px;
    }
  }
}
</style>
