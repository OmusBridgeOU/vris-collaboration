<!-- components/GlassCard.vue -->
<script setup lang="ts">
defineProps<{
  color: 'cyan' | 'magenta' | 'amber' | 'vermilion' | 'light-cyan' | 'light-magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
}>()
</script>

<template>
  <div :class="['glassy-box card', `glassy-box--${color ?? 'cyan'}`]">
    <div class="icon-box icon-box--round">
      <slot name="icon" />
    </div>
    <h3 class="title">
      <slot name="title" />
    </h3>
    <div class="card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.card {
  padding: 20px;

  .icon-box {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    border-radius:1000px;
  }

  &__body {
    font-size: 13px;
    line-height: 1.2em;
  }
}
</style>
