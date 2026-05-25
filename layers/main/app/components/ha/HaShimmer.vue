<template>
  <component
    :is="as"
    class="shimmer-wrap"
    :class="{ 'shimmer-wrap--loading': loading }"
    :style="{
      minHeight: loading ? minHeight : undefined,
      minWidth: loading ? minWidth : undefined,
    }"
  >
    <slot />
    <div
      v-if="loading"
      class="shimmer"
    />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    loading: boolean
    as?: string
    minHeight?: string
    minWidth?: string
  }>(),
  {
    as: 'div',
    minHeight: '1em',
    minWidth: '4em',
  },
)
</script>

<style scoped lang="scss">
.shimmer-wrap {
  position: relative;

  &--loading {
    visibility: hidden;

    > .shimmer {
      visibility: visible;
    }
  }
}

.shimmer {
  pointer-events: none;

  position: absolute;
  z-index: calc(var(--parent-z, 0) + 1);
  inset: 0;

  border-radius: inherit;

  background: linear-gradient(
    90deg,
    rgb(217 217 217 / 100%) 0%,
    rgb(200 200 200 / 100%) 40%,
    rgb(232 232 232 / 100%) 50%,
    rgb(200 200 200 / 100%) 60%,
    rgb(217 217 217 / 100%) 100%
  );
  background-size: 200% 100%;

  animation: shimmer 1.6s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
