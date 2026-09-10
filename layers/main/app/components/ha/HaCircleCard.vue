<script lang="ts" setup>
const props = defineProps<{
  name: string
  href?: string | null
  imgSrc?: string | null
}>()

const FALLBACK_IMG = '/images/2026Autumn/vketreal_vris_x_icon.jpg'
const displayImgSrc = computed(() => props.imgSrc || FALLBACK_IMG)

const tag = computed(() => (props.href ? 'a' : 'div'))
const linkAttrs = computed(() => {
  if (!props.href) return {}
  return {
    href: props.href,
    target: '_blank',
    rel: 'noopener noreferrer',
  }
})
</script>

<template>
  <component
    :is="tag"
    class="glassy-box-4 glassy-box-4--radius-min circle-card"
    :class="{ 'circle-card--link': !!href }"
    v-bind="linkAttrs"
  >
    <div class="circle-card__img">
      <img
        :src="displayImgSrc"
        :alt="name"
        loading="lazy"
      >
    </div>
    <p class="circle-card__name">
      {{ name }}
    </p>
  </component>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.circle-card{
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 20px;

  color: inherit;
  text-decoration: none;

  @include m.sp {
    padding: 16px;
  }

  &--link {
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid rgb(255 255 255 / 70%);
      outline-offset: 2px;
    }
  }

  &__img {
    overflow: hidden;
    flex-shrink: 0;

    aspect-ratio: 1 / 1;
    width: 88px;
    border-radius: 50%;

    background: rgb(255 255 255 / 12%);

    @include m.sp {
      width: 72px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__name {
    width: 100%;

    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: white;
    text-align: center;
    overflow-wrap: anywhere;

    @include m.sp {
      font-size: 16px;
    }
  }
}
</style>
