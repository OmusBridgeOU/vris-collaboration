<template>
  <div class="layout -top">
    <HoTheHeader :nav-links="navLinks" />
    <slot />
    <HoTheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NavLink } from '../components/ho/HoTheHeader.vue'

const { t } = useI18n()

const navLinks = computed<NavLink[]>(() => [
  { type: 'link', href: '/', text: t('page.top') },
])
</script>

<style lang="scss" scoped>
.layout.-top {
  overflow-x: hidden;
}
</style>
