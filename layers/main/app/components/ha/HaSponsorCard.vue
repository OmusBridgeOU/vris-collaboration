<template>
  <div class="sponsor-card glassy-box-2">
    <div
      class="sponsor-card__img"
      :class="`-${logoVariant}`"
    >
      <img
        :src="imgSrc"
        :alt="name"
        loading="lazy"
      >
    </div>
    <div class="sponsor-card__text-box">
      <p class="sponsor-card__label">
        {{ label }}
      </p>
      <p class="sponsor-card__name">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    imgSrc: string
    label: string
    name: string
    logoVariant?: 'default' | 'wide' | 'square' | 'compact' | 'hikky'
  }>(),
  {
    logoVariant: 'default',
  },
)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.sponsor-card {
  overflow: hidden;

  width: 100%;
  height: 100%;
  padding: 16px;
  border-top: 1px solid white;

  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: v.$vket-cyan;
  }

  @include m.sp {
    padding: 12px;
    border-top: 0;
  }

  &__img {
    position: relative;

    overflow: hidden;
    display: grid;
    place-items: center;

    aspect-ratio: 16 / 9;
    width: 100%;
    margin-bottom: 14px;
    padding: 16px;
    border-radius: 10px;

    background: v.$base-background-color;

    img {
      position: absolute;
      inset: 16px;

      display: block;

      width: calc(100% - 32px);
      height: calc(100% - 32px);

      object-fit: contain;
    }

    &.-wide img {
      transform: scale(1.15);
    }

    &.-square img {
      transform: scale(1.08);
      object-fit: cover;
    }

    &.-compact img {
      transform: scale(2.1);
    }

    &.-hikky {
      background: #0052a9;
    }
  }

  &__label {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.4;
    color: v.$vket-cyan;
  }

  &__name {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    color: white;

    @include m.sp {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
