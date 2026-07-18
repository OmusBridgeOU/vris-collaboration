<template>
  <a
    :href="item.href"
    target="_blank"
    rel="noopener noreferrer"
    class="news-card"
  >
    <img
      v-if="item.imgSrc && item.imgSrc !== ''"
      :src="item.imgSrc"
      :alt="item.title"
      class="news-card__img"
      loading="lazy"
    >
    <div
      v-else
      class="content-card__empty-image"
    >
      <HaNoImage />
    </div>
    <p class="news-card__timestamp">{{ item.timestamp }}</p>
    <div class="news-card__title-flex">
      <p class="news-card__title">{{ item.title }}</p>
      <HaJumpToListIcon class="news-card__icon" />
    </div>
  </a>
</template>

<script setup lang="ts">
import HaJumpToListIcon from './icons/HaJumpToListIcon.vue'

defineProps<{
  item: { id: number, title: string, href: string, imgSrc: string, timestamp: string }
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.news-card {
  cursor: pointer;

  display: block;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 16px;
  border-top: 1px solid white;

  &__img {
    display: block;

    aspect-ratio: 16/9;
    width: 100%;
    margin-bottom: 14px;
    border-radius: 10px;

    object-fit: cover;
    background-color: #d2d2d2;

    transition: transform 0.2s ease;

    @include m.sp {
      margin-bottom: 6px;
    }
  }

  &__timestamp {
    margin-bottom: 6px;
    color: v.$vket-amber;
  }

  &__title-flex {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    margin-right: 1em;
    font-size: 20px;
    line-height: 1.2em;
    color: white;

    @include m.sp {
      font-size: 16px;
    }
  }

  &__icon {
    width: 20px;
    fill: v.$vket-magenta;

    @include m.sp {
      width: 16px;
    }
  }

  @include m.sp {
    padding-top: 0;
  }
}

.swiper-slide-active .news-card {
  border-color: v.$vket-magenta;

  @include m.sp {
    border: none;
  }
}
</style>
