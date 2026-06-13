<script setup lang="ts">
defineProps<{
  label: string
  title: string
}>()
</script>

<template>
  <div class="page-title">
    <div class="page-title__flex">
      <div class="page-title__text-box">
        <p class="page-title__label">
          {{ label }}
        </p>
        <h2 class="page-title__text">
          {{ title }}
        </h2>
      </div>
      <div class="page-title__controls">
        <slot name="controls" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.page-title {
  position: relative;
  margin-bottom: 48px;

  @include m.tb {
    margin-bottom: 32px;
  }

  &__line {
    position: relative;

    overflow: hidden;

    width: 100%;
    height: 2px;
    margin-bottom: 4px;

  }

  &__flex {
    display: flex;
    justify-content: space-between;
    height: 130px;
    border-bottom: 1px solid white;

    @include m.sp {
        height: 85px;
    }
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
      font-size: 40px;
    }

    @include m.sp {
      font-size: 32px;
    }
  }

  &__controls {
    display: flex;
    gap: 4px;
    align-items: center;
  }
}
</style>
