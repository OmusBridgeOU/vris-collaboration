<template>
  <div class="sponsor-card glassy-box-2">
    <div class="sponsor-card__img">
      <img
        :src="imgSrc"
        :alt="name"
      >
    </div>
    <div class="sponsor-card__text-box">
      <p class="sponsor-card__label">
        {{ label }}
      </p>
      <p class="sponsor-card__name">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imgSrc?: string
  label: string
  name: string
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.sponsor-card {
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
  padding: 24px 36px;

  &__img {
    aspect-ratio: 1/1;
    width: 100%;
    margin-bottom: 12px;
    background-color: gray;

    img {
        width: 100%;
    }
  }

  &__label {
    margin-bottom: 12px;
    font-size: 12px;
    line-height: 1em;
    color: white;
  }

  &__name {
    font-size: 24px;
    font-weight: 700;
    line-height: 1em;
    color: white;
  }
}
</style>
