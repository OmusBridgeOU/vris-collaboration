<template>
  <div
    class="conduct-card glassy-box"
    :class="`conduct-card--${color}`"
  >
    <div class="conduct-card__icon-box">
      <div class="conduct-card__icon">
        <slot name="icon" />
      </div>
    </div>
    <div class="conduct-card__text-box">
      <p class="conduct-card__title">
        {{ title }}
      </p>
      <p class="conduct-card__text">
        <slot
          class="conduct-card__text"
          name="text"
        />
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  color: {
    type: String,
    validator: value =>
      ['cyan', 'magenta', 'amber', 'vermilion'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.conduct-card {
  display: flex;
  gap: 24px;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 24px 36px;

  box-shadow: inset rgb(70 132 255 / 35%) 0 0 8px 4px;

  @include m.sp {
    gap: 16px;
    padding: 16px 28px;
  }

  &__icon-box {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    border-radius: 10px;

    @include m.sp {
      width: 32px;
      height: 32px;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50%;
    height: 50%;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__text {
    font-size: 13px;
    line-height: 1em;
    color: white;

    @include m.sp {
      font-size: 10px;
    }
  }

  &--magenta {
    .conduct-card__icon-box {
      background-color: rgba(v.$vket-magenta, 0.6);
    }

    .conduct-card__title {
      color: v.$vket-magenta;
    }
  }

  &--cyan {
    .conduct-card__icon-box {
      background-color: rgba(v.$vket-cyan, 0.6);
    }

    .conduct-card__title {
      color: v.$vket-cyan;
    }
  }

  &--amber {
    .conduct-card__icon-box {
      background-color: rgba(v.$vket-amber, 0.6);
    }

    .conduct-card__title {
      color: v.$vket-amber;
    }
  }

  &--vermilion {
    .conduct-card__icon-box {
      background-color: rgba(v.$vket-vermilion, 0.6);
    }

    .conduct-card__title {
      color: v.$vket-vermilion;
    }
  }
}
</style>
