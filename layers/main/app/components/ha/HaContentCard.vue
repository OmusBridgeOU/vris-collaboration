<template>
  <component
    :is="isLink ? 'a' : 'div'"
    :href="isLink ? item.href : undefined"
    :target="isLink ? '_blank' : undefined"
    :rel="isLink ? 'noopener noreferrer' : undefined"
    class="content-card"
    :class="{ 'content-card--static': !isLink }"
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
    <div class="content-card__title-flex">
      <p class="content-card__title">{{ item.title }}</p>
      <HaJumpToListIcon
        v-if="isLink"
        class="content-card__icon"
      />
    </div>
    <p
      v-if="item.text"
      class="content-card__text"
    >
      {{ item.text }}
    </p>
  </component>
</template>

<script setup lang="ts">
import HaNoImage from './HaNoImage.vue'
import HaJumpToListIcon from './icons/HaJumpToListIcon.vue'

const props = defineProps<{
  item: { title: string, href?: string, imgSrc: string, text: string }
}>()

const isLink = computed(() => Boolean(props.item.href))
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.content-card {
  cursor: pointer;

  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
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

  &--static {
    cursor: default;

    &:hover {
      border-color: white;

      @include m.sp {
        border: none;
      }
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
    background-color: #d2d2d2;

    @supports not (aspect-ratio: 16 / 9) {
      height: 0;
      padding-top: 56.25%;
    }

    @include m.sp {
      margin-bottom: 6px;
    }
  }

  &__title-flex {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
  }

  &__title {
    flex: 1;
    min-width: 0;
    margin-bottom: 8px;

    font-size: 20px;
    line-height: 1.2em;
    color: white;
    overflow-wrap: anywhere;

    @include m.sp {
      font-size: 16px;
    }
  }

  &__text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

    margin-bottom: 6px;
    font-size: 14px;
    line-height: 1.4;
    color: #a0a0a0;
  }

  &__icon {
    flex-shrink: 0;
    width: 20px;
    fill: v.$vket-cyan;

    @include m.sp {
      width: 16px;
    }
  }
}
</style>