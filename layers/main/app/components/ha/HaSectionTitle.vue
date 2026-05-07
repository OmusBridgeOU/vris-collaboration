<script setup lang="ts">
defineProps<{
  label: string
  title: string
}>()
</script>

<template>
  <div class="section-title">
    <div class="section-title__line" />
    <p class="section-title__label">
      {{ label }}
    </p>
    <h2 class="section-title__text">
      {{ title }}
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.section-title {
  position: relative;
  margin-bottom: 96px;
  padding-top: 16px;

  &__line {
    position: relative;

    overflow: hidden;

    width: 100%;
    height: 2px;
    margin-bottom: 2px;

    // 点
    &::before {
      content: '';

      position: absolute;
      top: 0;
      left: 0;

      width: 2px;
      height: 2px;

      background: v.$vket-amber;
    }

    &::after {
      content: '';

      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
      margin-left: 12px;

      background: linear-gradient(to right, v.$vket-amber 0%, v.$vket-vermilion 100%);
    }
  }

  &__label {
    margin-bottom: 4px;
    font-size: 12px;
    color: v.$vket-amber;
    letter-spacing: 0.1em;
  }

  &__text {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
  }
}
</style>
