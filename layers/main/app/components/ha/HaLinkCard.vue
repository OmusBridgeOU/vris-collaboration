<!-- components/GlassCard.vue -->
<script setup lang="ts">
defineProps<{
  color: 'cyan' | 'magenta' | 'amber' | 'vermilion' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
  title: string
  label: string
  iconUrl?: string
}>()
</script>

<template>
  <div
    :class="['glassy-box link-card', `glassy-box--${color ?? 'cyan'}`]"
  >
    <div class="link-card__head">
      <div class="link-card__head-left">
        <div
          v-if="iconUrl"
          class="icon-box"
        >
          <img
            :src="iconUrl"
            :alt="title"
          >
        </div>
        <div class="title-box">
          <p class="label">
            {{ label }}
          </p>
          <h3 class="title">
            {{ title }}
          </h3>
        </div>
      </div>
      <div class="link-card__head-right">
        <img src="/icons/ep_right.svg">
      </div>
    </div>
    <div class="link-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.link-card {
  padding: 22px 36px;

  &__head{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__head-left {
    display: flex;
    gap: 12px;
  }

//   &__head-right {

//   }

  .title-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: inherit;
    padding: 4px 0;

    .label{
      font-size: 10px;
      font-weight: 700;
      line-height: 1em;
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1em;
    }
  }
}
</style>
