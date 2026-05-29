<!-- components/GlassCard.vue -->
<script setup lang="ts">
import HaArrowRight from './icons/HaArrowRightIcon.vue'

defineProps<{
  color:
    | 'cyan'
    | 'magenta'
    | 'amber'
    | 'vermilion'
    | 'light-cyan'
    | 'light-magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
  title: string
  label: string
}>()
</script>

<template>
  <div
    :class="['glassy-box quick-access-card', `glassy-box--${color ?? 'cyan'}`]"
  >
    <div class="quick-access-card__head">
      <div class="quick-access-card__head-left">
        <div class="glassy-box__icon quick-access-card__icon-box">
          <slot name="icon" />
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
      <div class="quick-access-card__head-right">
        <HaArrowRight />
      </div>
    </div>
    <div class="quick-access-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.quick-access-card {
  padding: 22px 36px;

  @include m.sp {
    padding: 16px 24px;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__head-left {
    display: flex;
    gap: 12px;
  }

  &__head-right {
    height: 20px;

    svg {
      height: 100%;
    }
  }

  &__icon-box {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 54px;
    height: 54px;
    border-radius: 20px;

    @include m.tb {
      width: 38px;
      height: 38px;
      border-radius: 100px;
    }
  }

  .title-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: inherit;

    .label {
      margin-bottom: 8px;
      font-size: 10px;
      font-weight: 700;
      line-height: 1em;

      @include m.tb {
        margin-bottom: 4px;
      }
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1em;

      @include m.sp {
        font-size: 20px;
      }
    }
  }
}
</style>
