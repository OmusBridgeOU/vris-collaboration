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
    <NuxtLink
      class="hero__ticket-button glassy-button none-hover-animation"
      to="https://livepocket.jp/e/alkjd"
      target="_blank"
      rel="noopener"
    >
      <HaTicketIcon class="hero__ticket-icon" />
      {{ t('ticketCta') }}
    </NuxtLink>
    <div
      id="lower-content"
      class="lower-content"
    >
      <HaEventInfo />
      <div class="lower-content__line-outer">
        <div class="lower-content__line-inner" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HaEventInfo from '../ha/HaEventInfo.vue'
import HaTicketIcon from '../ha/icons/HaTicketIcon.vue'

const { t } = useI18n({ useScope: 'local' })

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
  const lowerContent = document.querySelector('#lower-content')

  if (!lowerContent) return

  // #first-viewがないページ（トップ以外）では実行しない
  if (!firstView) return

  fadeOutOnScroll(lowerContent, firstView)
}
</script>

<i18n lang="yaml">
ja:
  ticketCta: チケットを購入する
en:
  ticketCta: Buy Tickets
</i18n>

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

  &__ticket-button {
    position: absolute;
    z-index: 3;
    bottom: 136px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    width: min(320px, calc(100% - 32px));
    min-height: 56px;
    padding: 12px 24px;

    font-size: 16px;
    font-weight: 700;
    color: white;
    text-decoration: none;
    letter-spacing: 0.04em;

    &:hover {
      transform: translateX(-50%) scale(1.02);
    }

    @media (width <= 767px) {
      bottom: 216px;
      min-height: 52px;
      font-size: 14px;
    }
  }

  &__ticket-icon {
    width: 22px;
    height: 22px;
  }
}

.lower-content {
  pointer-events: none;

  position: absolute;
  z-index: 2;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

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
    height: 40px;

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
