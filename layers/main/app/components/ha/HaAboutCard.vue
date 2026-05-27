<!-- components/GlassCard.vue -->
<script setup lang="ts">
defineProps<{
  color:
    | 'cyan'
    | 'magenta'
    | 'amber'
    | 'vermilion'
    | 'light-cyan'
    | 'light-magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
}>()
</script>

<template>
  <div :class="['glassy-box about-card', `glassy-box--${color ?? 'cyan'}`]">
    <div class="about-card__icon glassy-box__icon">
      <slot name="icon" />
    </div>
    <h3 class="title about-card__title">
      <slot name="title" />
    </h3>
    <div class="about-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.about-card {
  padding: 20px;

  &__icon {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    border-radius: 1000px;
  }

  &__title {
    font-size: 16px;
  }

  &__body {
    font-size: 13px;
    line-height: 1.2em;
  }
}
</style>
