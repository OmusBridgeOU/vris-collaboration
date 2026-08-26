<i18n lang="yaml">
ja:
  linkLabel: フォームへ
en:
  linkLabel: Open form
</i18n>

<template>
  <a
    :class="['contact-card glassy-box', `glassy-box--${color ?? 'cyan'}`]"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <p class="contact-card__title">
      {{ title }}
    </p>
    <div class="jump-to-form__flex">
      <span class="jump-to-form__text">
        {{ t('linkLabel') }}
      </span>
      <HaJumpToPageIcon class="jump-to-form__icon" />
    </div>
  </a>
</template>

<script setup>
import HaJumpToPageIcon from './icons/HaJumpToPageIcon.vue'

const { t } = useI18n()

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
    color: white;
  }

  &__link {
    font-size: 14px;
    color: v.$vket-green;

    &__underline {
      text-decoration: underline;
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
  }

  &__icon {
    width: 14px;
    height: 14px;
  }
}
</style>
