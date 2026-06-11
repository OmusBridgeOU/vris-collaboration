<template>
  <div
    class="contact-card glassy-box-2"
    :class="`contact-card--${color}`"
  >
    <p class="contact-card__title">
      {{ title }}
    </p>
    <a
      class="jump-to-form"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p class="jump-to-form__text">{{ text }}<br></p>
      <div class="jump-to-form__flex">
        <span class="jump-to-form__text jump-to-form__text-underline">フォームへ</span>
        <HaJumpToPageIcon class="jump-to-form__icon" />
      </div>
    </a>
  </div>
</template>

<script setup>
import HaJumpToPageIcon from './icons/HaJumpToPageIcon.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
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

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 24px 0;

  background-color: rgb(18 33 59 / 60%);

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
    font-size: 16px;
    font-weight: bold;
  }

  &__link {
    font-size: 14px;
    color: v.$vket-green;

    &__underline {
      text-decoration: underline;
    }
  }

  &--magenta {
    .contact-card__icon {
      background-color: rgba(v.$vket-magenta, 0.8);
    }
  }

  &--cyan {
    .contact-card__icon {
      background-color: rgba(v.$vket-cyan, 0.8);
    }
  }

  &--amber {
    .contact-card__icon {
      background-color: rgba(v.$vket-amber, 0.8);
    }
  }

  &--vermilion {
    .contact-card__icon {
      background-color: rgba(v.$vket-vermilion, 0.8);
    }
  }
}

.jump-to-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  @include m.sp {
    gap: 16px;
  }

  &__flex {
    display: flex;
    gap: 6px;
    align-items: center;

    width: fit-content;
    border-bottom: 1px solid v.$vket-green;
  }

  &__text {
    font-size: 14px;
    color: v.$vket-green;

    &--underline {
      margin-bottom: 0;
      font-size: 12px;
      text-decoration: underline;
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
  }
}
</style>
