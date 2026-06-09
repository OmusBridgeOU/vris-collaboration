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
    <p class="swiper-card__timestamp">{{ item.timestamp }}</p>
    <p class="swiper-card__title">{{ item.title }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  item: { id: number, title: string, href: string, imgSrc: string, timestamp: string }
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.swiper-card {
  cursor: pointer;

  display: block;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 460px;
  padding: 24px;

  background-color: rgb(18 33 59);

  @include m.tb {
    min-height: 380px;
  }

  @include m.sp {
    min-height: 340px;
  }

  &__img {
    display: block;

    width: 100%;
    margin-bottom: 6px;

    object-fit: cover;

    transition: transform 0.2s ease;
  }

  &__timestamp {
    margin-bottom: 6px;
    color: v.$vket-amber;
  }

  &__title {
    font-size: 20px;
    line-height: 1.2em;
    color: white;

    @include m.sp {
      font-size: 16px;
    }
  }
}
</style>
