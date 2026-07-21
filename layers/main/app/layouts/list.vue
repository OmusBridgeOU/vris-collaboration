<template>
  <div class="layout">
    <div class="layout-bg">
      <div
        class="layout-bg__bg-img"
        :style="{ backgroundImage: `url('/kv.png')` }"
      />
      <img
        src="/kv.png"
        alt="Vket Real in 札幌 2026 Autumnのキービジュアル"
        class="layout-bg__img"
      >
    </div>
    <HoTheHeader :nav-links="navLinks" />
    <slot />
    <HoTheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NavLink } from '../components/ho/HoTheHeader.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n()

const navLinks = computed<NavLink[]>(() => [
  { type: 'link', href: '/', text: t('page.top') },
])

const { firstViewBlur, headerRevealOnScroll, destroyScrollTriggers } = useGsapFadeIn()
const route = useRoute()

onMounted(() => {
  initScrollEffects()
})

// ページ遷移時に#first-viewが存在しない場合があるためrouteを監視
watch(() => route.path, () => {
  destroyScrollTriggers()
  nextTick(() => initScrollEffects())
})

onUnmounted(() => {
  destroyScrollTriggers()
})

const initScrollEffects = () => {
  const firstView = document.querySelector('#gsap-fv')
  const header = document.querySelector('#gsap-header')

  if (!header) return

  // #first-viewがないページ（トップ以外）では実行しない
  if (!firstView) return

  firstViewBlur(firstView)
  headerRevealOnScroll(header, firstView)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.layout{
  position: relative;
  overflow: visible;
  background-color: v.$base-background-color;
}

.layout-bg {
  position: fixed;
  z-index: -1;

  width: 100svw;
  height: 100svh;

  filter: blur(14px);

  &__bg-img {
    position: absolute;
    z-index: 1;
    inset: 0;
    transform: scale(1.2);

    overflow: hidden;

    width: 100%;
    height: 100%;

    background-position: center;
    background-size: cover;
    filter: blur(8px);
  }

  &__img {
    position: relative;
    z-index: 2;

    overflow: hidden;

    width: 100%;
    height: 100%;

    object-fit: contain;
  }
}
</style>
