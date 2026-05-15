<template>
  <div class="ticket-card glassy-box-3">
    <p class="ticket-card__title">
      {{ title }}
    </p>
    <p class="ticket-card_desc">
      {{ desc }}
    </p>

    <button class="glassy-button-3 ticket-card__button">
      チケット購入
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

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

  &__title {
    font-size: 24px;
    font-weight: bold;
  }

  &__desc {
    font-size: 16px;
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
  }
}
</style>
