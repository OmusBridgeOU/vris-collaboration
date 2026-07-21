<script setup lang="ts">
defineProps<{
  label: string
  title: string
}>()
</script>

<template>
  <div class="section-title">
    <div class="section-title__line" />
    <div class="section-title__flex">
      <div class="section-title__text-box">
        <p class="section-title__label">
          {{ label }}
        </p>
        <h2 class="section-title__text">
          {{ title }}
        </h2>
      </div>
      <div class="section-title__controls">
        <slot name="controls" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.section-title {
  position: relative;
  margin-bottom: 40px;

  @include m.sp {
    margin-bottom: 24px;
  }

  &__line {
    position: relative;

    overflow: hidden;

    width: 100%;
    height: 2px;
    margin-bottom: 4px;

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

      background: linear-gradient(
        to right,
        v.$vket-amber 0%,
        v.$vket-vermilion 100%
      );
    }
  }

  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-size: 12px;
    color: v.$vket-amber;
    letter-spacing: 0.1em;

    @include m.tb {
      font-size: 10px;
    }
  }

  &__text {
    font-size: 48px;
    font-weight: 700;
    line-height: 1em;
    color: #fff;

    @include m.tb {
      font-size: 32px;
    }

    @include m.sp {
      font-size: 24px;
    }
  }
}
</style>
