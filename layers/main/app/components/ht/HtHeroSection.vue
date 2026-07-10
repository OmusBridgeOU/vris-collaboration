<template>
  <div
    id="gsap-fv"
    class="hero"
  >
    <div
      class="hero__bg"
      :style="{ backgroundImage: `url('/kv.png')` }"
    />
    <img
      src="/kv.png"
      alt="Vket Real in 札幌 2026 Autumnのキービジュアル"
      class="hero__kv"
    >
    <div
      id="scroll-indicator"
      class="scroll-indicator"
    >
      <span class="scroll-indicator__text">scroll</span>
      <div class="scroll-indicator__line-outer">
        <div class="scroll-indicator__line-inner" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { fadeOutOnScroll, destroyScrollTriggers } = useGsapFadeIn()
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
  const scrollIndicator = document.querySelector('#scroll-indicator')

  if (!scrollIndicator) return

  // #first-viewがないページ（トップ以外）では実行しない
  if (!firstView) return

  fadeOutOnScroll(scrollIndicator, firstView)
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100svw;
  height: 100svh;

  clip-path: inset(0);

  &__bg {
    position: absolute;
    z-index: 1;
    inset: 0;
    transform: scale(1.1);

    overflow: hidden;

    width: 100%;
    height: 100%;

    background-position: center;
    background-size: cover;
    filter: blur(8px);
  }

  &__kv {
    position: relative;
    z-index: 2;

    overflow: hidden;

    width: 100%;
    height: 100%;

    object-fit: contain;
  }
}

.scroll-indicator {
  pointer-events: none;

  position: absolute;
  z-index: 2;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  transition: opacity 0.12s linear;

  &__text {
    font-size: 14px;
    color: white;
    text-shadow: 1px 1px 2px rgb(black, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  &__line-outer {
    position: relative;

    overflow: hidden;

    width: 2px;
    height: 48px;

    background: rgb(255 255 255 / 30%);
  }

  &__line-inner {
    position: absolute;
    top: -50%;
    left: 0;

    width: 100%;
    height: 50%;

    background: #fff;

    animation: line-run 1.8s cubic-bezier(0.76, 0, 0.24, 1) infinite;
  }
}

@keyframes line-run {
  0% {
    top: -50%;
  }

  100% {
    top: 100%;
  }
}
</style>
