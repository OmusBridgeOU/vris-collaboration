<i18n lang="yaml">
ja:
  cta:
    purchase: チケット購入
    pending: 準備中
en:
  cta:
    purchase: Buy Tickets
    pending: Coming soon
</i18n>

<template>
  <div class="ticket-card glassy-box-3">
    <p class="ticket-card__title">
      {{ title }}
    </p>
    <p class="ticket-card_desc">
      {{ desc }}
    </p>

    <NuxtLink
      v-if="href"
      class="glassy-button ticket-card__button none-hover-animation"
      :to="href"
      target="_blank"
      rel="noopener"
    >
      {{ ctaLabel ?? t('cta.purchase') }}
    </NuxtLink>
    <span
      v-else
      class="glassy-button ticket-card__button ticket-card__button--disabled none-hover-animation"
    >
      {{ ctaLabel ?? t('cta.pending') }}
    </span>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  title: string
  desc: string
  href?: string
  ctaLabel?: string
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ticket-card {
  display: flex;
  flex-direction: column;
  gap: 44px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: rgb(49 35 96 / 40%);
  mix-blend-mode: plus-lighter;

  @include m.tb {
    gap: 16px;
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
    line-height: 1em;

    @include m.sp {
      font-size: 16px;
    }
  }

  &__desc {
    font-size: 16px;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 130px;
    height: 40px;

    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;
    text-decoration: none;

    &--disabled {
      cursor: not-allowed;
      opacity: 0.68;
    }
  }
}
</style>
