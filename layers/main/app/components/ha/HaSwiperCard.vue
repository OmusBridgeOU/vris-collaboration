<template>
  <NuxtLink
    :to="item.href"
    class="swiper-card glassy-box-2"
  >
    <img
      :src="item.imgSrc"
      :alt="item.title"
      class="swiper-card__img"
      loading="lazy"
    >
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  item: { id: number, title: string, href: string, imgSrc: string }
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.swiper-card {
  cursor: pointer;

  display: block;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 500px;

  @include m.tb {
    min-height: 380px;
  }

  &__img {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    transition: transform 0.2s ease;
  }
}
</style>
