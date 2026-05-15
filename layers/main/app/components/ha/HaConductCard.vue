<template>
  <div
    class="conduct-card glassy-box-2"
    :class="`conduct-card--${color}`"
  >
    <div class="conduct-card__icon">
      <slot name="icon" />
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
    validator: value => ['cyan', 'magenta', 'amber', 'vermilion'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.conduct-card {
    display: flex;
    gap: 24px;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 24px 36px;

    &__icon {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;

        width: 44px;
        height: 44px;
        border-radius: 10px;
    }

    &__title {
        font-size: 20px;
        font-weight: 700;
    }

    &__text {
        font-size: 13px;
        line-height: 1em;
        color: white;
    }

    &--magenta {
        .conduct-card__icon {
            background-color: rgba(v.$vket-magenta, 0.6);
        }

        .conduct-card__title {
            color: v.$vket-magenta;
        }
    }

    &--cyan {
        .conduct-card__icon {
            background-color: rgba(v.$vket-cyan, 0.6);
        }

        .conduct-card__title {
            color: v.$vket-cyan;
        }
    }

    &--amber {
        .conduct-card__icon {
            background-color: rgba(v.$vket-amber, 0.6);
        }

        .conduct-card__title {
            color: v.$vket-amber;
        }
    }

    &--vermilion {
        .conduct-card__icon {
            background-color: rgba(v.$vket-vermilion, 0.6);
        }

        .conduct-card__title {
            color: v.$vket-vermilion;
        }
    }
}
</style>
