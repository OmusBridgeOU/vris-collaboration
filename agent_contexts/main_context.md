This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: layers/main/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
layers/
  main/
    @types/
      auto-imports.d.ts
      components.d.ts
      nuxt-i18n.d.ts
      nuxt.d.ts
      shim.d.ts
    app/
      assets/
        images/
          .gitkeep
        styles/
          _base.scss
          _common.scss
          _functions.scss
          _markdown.scss
          _mixins.scss
          _reset.scss
          _toast.scss
          _variables.scss
          style.scss
      components/
        ha/
          icons/
            HaArrowRight.vue
            HaBalanceIcon.vue
            HaBroadcastIcon.vue
            HaCalendarIcon.vue
            HaCameraIcon.vue
            HaChevronDownIcon.vue
            HaChevronLeft.vue
            HaChevronRight.vue
            HaCommunityIcon.vue
            HaCompanyIcon.vue
            HaDangerIcon.vue
            HaEmailIcon.vue
            HaHeartIcon.vue
            HaInfoIcon.vue
            HaJumpToPageIcon.vue
            HaMapPinIcon.vue
            HaOpenBookIcon.vue
            HaQuestionIcon.vue
            HaShieldIcon.vue
            HaStarShineIcon.vue
            HaSunIcon.vue
            HaSunsetIcon.vue
            HaTicketIcon.vue
            HaTimerIcon.vue
            HaWorldIcon.vue
            HaXIcon.vue
          HaAboutCard.vue
          HaAccordionItem.vue
          HaConductCard.vue
          HaContactCard.vue
          HaDocumentLink.vue
          HaFireworks.vue
          HaFirstView.vue
          HaInfoCard.vue
          HaQuickAccessCard.vue
          HaSectionTitle.vue
          HaSponsorCard.vue
          HaSwiperCard.vue
          HaTicketCard.vue
        hm/
          HmSwiper.vue
        ho/
          HoTheFooter.vue
          HoTheHeader.vue
        ht/
          HtAboutSection.vue
          HtAccessSection.vue
          HtCodeOfConductSection.vue
          HtContactSection.vue
          HtContentsSection.vue
          HtExhibitionSection.vue
          HtNewsSection.vue
          HtQandASection.vue
          HtQuickAccessSection.vue
          HtRelatedEventsSection.vue
          HtScheduleSection.vue
          HtSponsorsAndPartnersSection.vue
          HtTicketSection.vue
          HtTop.vue
      composables/
        useApi.ts
      layouts/
        default.vue
        top.vue
      middleware/
        .gitkeep
      models/
        json.ts
        todo.ts
      pages/
        index.vue
      plugins/
        gtm.client.ts
        runtimeConfig.ts
      repositories/
        .gitkeep
      test/
        composables/
          useApi.spec.ts
        utils/
          @types/
            auto-imports.d.ts
            components.d.ts
          api.spec.ts
          factory.spec.ts
          i18n.spec.ts
        setup.ts
      utils/
        api.ts
        factory.ts
        i18n.ts
      app.vue
      error.vue
    config/
      models/
        EnvType.ts
      appConfig.ts
      runtimeConfig.ts
    i18n/
      locales/
        en.json
        ja.json
      i18n.config.ts
    public/
      icons/
        mingcute_question-line.svg
      _robots.txt
      favicon.ico
    server/
      tsconfig.json
    .nuxtrc
    .stylelintrc.mjs
    app.config.ts
    eslint.config.mjs
    nuxt.config.ts
    package.json
    tsconfig.json
    vitest.config.mts
```

# Files

## File: layers/main/app/components/ha/icons/HaChevronLeft.vue
````vue
<template>
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_360_1868)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.0515 18.1781C10.6605 17.7866 10.4409 17.2559 10.4409 16.7027C10.4409 16.1494 10.6605 15.6187 11.0515 15.2273L18.9241 7.35194C19.3157 6.96045 19.8469 6.74059 20.4006 6.74072C20.6748 6.74079 20.9464 6.79486 21.1997 6.89985C21.453 7.00484 21.6831 7.1587 21.877 7.35264C22.0708 7.54657 22.2245 7.77679 22.3294 8.03014C22.4343 8.2835 22.4882 8.55503 22.4882 8.82923C22.4881 9.10343 22.434 9.37494 22.329 9.62824C22.224 9.88155 22.0702 10.1117 21.8763 10.3055L15.4805 16.7027L21.8776 23.0998C22.0771 23.2923 22.2363 23.5226 22.3459 23.7773C22.4554 24.032 22.5131 24.3059 22.5157 24.5831C22.5182 24.8603 22.4655 25.1353 22.3606 25.3919C22.2558 25.6486 22.1009 25.8817 21.9049 26.0779C21.709 26.274 21.4759 26.4291 21.2194 26.5342C20.9629 26.6393 20.688 26.6923 20.4108 26.69C20.1335 26.6877 19.8595 26.6303 19.6048 26.521C19.35 26.4117 19.1195 26.2527 18.9268 26.0534L11.0487 18.1781H11.0515Z"
        fill="#FFFFFF"
      />
    </g>
    <defs>
      <clipPath id="clip0_360_1868">
        <rect
          width="33.4054"
          height="33.4054"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaChevronRight.vue
````vue
<template>
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_360_1864)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.3539 15.2273C22.7449 15.6188 22.9645 16.1495 22.9645 16.7027C22.9645 17.256 22.7449 17.7867 22.3539 18.1781L14.4814 26.0535C14.0897 26.445 13.5585 26.6648 13.0048 26.6647C12.451 26.6646 11.9199 26.4444 11.5285 26.0528C11.137 25.6611 10.9171 25.13 10.9172 24.5762C10.9174 24.0224 11.1375 23.4914 11.5291 23.0999L17.9263 16.7027L11.5291 10.3056C11.1486 9.91201 10.9379 9.38472 10.9424 8.83729C10.9469 8.28986 11.1663 7.7661 11.5532 7.37881C11.9401 6.99152 12.4637 6.7717 13.0111 6.76669C13.5585 6.76168 14.086 6.97187 14.48 7.35201L22.3553 15.2259L22.3539 15.2273Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_360_1864">
        <rect
          width="33.4054"
          height="33.4054"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
````

## File: layers/main/app/components/ha/HaFireworks.vue
````vue
<template>
  <canvas
    ref="canvasRef"
    class="fireworks-canvas"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let resizeObserver: ResizeObserver | null = null

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
}

// アニメーションのメイン処理
function startAnimation(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  let particles: Particle[] = []

  /** 花火を1発生成 */
  function createFirework() {
    const count = 100
    const x = random(100, canvas.width - 100)
    const y = random(100, canvas.height / 2)
    const color = `hsl(${Math.floor(random(0, 360))}, 100%, 60%)`

    for (let i = 0; i < count; i++) {
      particles.push({ x, y, vx: random(-5, 5), vy: random(-5, 5), alpha: 1, color })
    }
  }

  /** パーティクルの更新と描画 */
  function updateParticles() {
    // 残像効果
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 後ろから削除するため reverse() してインデックスがずれないようにする
    particles = particles.filter((p) => {
      p.x += p.vx
      p.y += p.vy
      p.alpha -= 0.01

      ctx.beginPath()
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.alpha
      ctx.fill()

      return p.alpha > 0 // falseになったパーティクルは除外
    })

    ctx.globalAlpha = 1
  }

  /** アニメーションループ */
  function animate() {
    animationId = requestAnimationFrame(animate)
    updateParticles()
    if (Math.random() < 0.05) createFirework()
  }

  animate()
}

/** アニメーション停止 */
function stopAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

// 描画解像度が変わらないように、canvasのサイズを更新する
function resizeCanvas(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement
  if (!parent) return
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight
}

// ライフサイクル
onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  // 初回サイズ設定
  resizeCanvas(canvas)

  // 親要素のリサイズを監視
  resizeObserver = new ResizeObserver(() => resizeCanvas(canvas))
  resizeObserver.observe(canvas.parentElement!)

  // アニメーション開始
  startAnimation(canvas)
})

onUnmounted(() => {
  stopAnimation()
  resizeObserver?.disconnect()
})
</script>

<style lang="scss" scoped>
.fireworks-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
````

## File: layers/main/app/components/ha/HaSwiperCard.vue
````vue
<template>
  <NuxtLink
    :to="item.href"
    class="swiper-card glassy-box-2"
  >
    <img
      :src="item.imgSrc"
      :alt="item.title"
      class="swiper-card__img"
      loading="lazy"
    >
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ item: { id: number, title: string, href: string, imgSrc: string } }>()
</script>

<style lang="scss" scoped>
/* ── カード全体 ── */
.swiper-card {
    cursor: pointer;

    display: block;

    box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-height: 500px;

    &__img {
        display: block;

        width: 100%;
        height: 100%;

        object-fit: cover;

        transition: transform 0.2s ease;
    }
}
</style>
````

## File: layers/main/app/components/hm/HmSwiper.vue
````vue
<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import HaSwiperCard from '../ha/HaSwiperCard.vue'
import type { Swiper as SwiperType } from 'swiper'

// ブレークポイントごとのSlidesPerViewの型
type BreakpointSlidesPerView = {
  [width: number]: {
    slidesPerView: number | 'auto'
  }
}

defineProps<{
  _slidesPerView?: number | 'auto' // デフォルトのslidesPerView
  _breakpoints?: BreakpointSlidesPerView // ブレークポイントごとの設定
}>()

const modules = [Autoplay, Navigation, Pagination]

const items = [
  { id: 1, title: '', href: '', imgSrc: '' },
  { id: 2, title: '', href: '', imgSrc: '' },
  { id: 3, title: '', href: '', imgSrc: '' },
]

const emit = defineEmits<{
  slideChange: [isBeginning: boolean, isEnd: boolean]
}>()

const swiperInstance = ref<SwiperType | null>(null)

const updateState = (swiper: SwiperType) => {
  emit('slideChange', swiper.isBeginning, swiper.isEnd)
}

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
  updateState(swiper)
}

const onSlideChange = (swiper: SwiperType) => {
  updateState(swiper)
}

defineExpose({ swiperInstance })
</script>

<template>
  <div class="works-swiper mb-25">
    <Swiper
      :slides-per-view="_slidesPerView ?? 'auto'"
      :breakpoints="_breakpoints"
      :speed="1000"
      :autoplay="{ delay: 3000, stopOnLastSlide: true }"
      :modules="modules"
      :centered-slides="false"
      :space-between="28"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="{
        el: '.custom-swiper-pagination',
        clickable: true,
      }"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide
        v-for="item in items"
        :key="item.id"
      >
        <HaSwiperCard :item="item" />
      </SwiperSlide>
    </Swiper>
    <div class="custom-swiper-pagination" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.swiper) {
  overflow: visible;
}
</style>
````

## File: layers/main/app/components/ht/HtContentsSection.vue
````vue
<script setup lang="ts">
import HmSwiper from '../hm/HmSwiper.vue'
import HaChevronLeft from '../ha/icons/HaChevronLeft.vue'
import HaChevronRight from '../ha/icons/HaChevronRight.vue'

import type { Swiper as SwiperType } from 'swiper'

const worksSwiperRef = ref<{ swiperInstance: SwiperType | null } | null>(null)

// 親側でリアクティブな状態として持つ
const isBeginning = ref(true)
const isEnd = ref(false)

const onSlideChange = (newIsBeginning: boolean, newIsEnd: boolean) => {
  isBeginning.value = newIsBeginning
  isEnd.value = newIsEnd
}
</script>

<template>
  <HaSectionTitle
    title="企画・コンテンツ"
    label="contents"
  >
    <template #controls>
      <button
        :disabled="isBeginning"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isBeginning }"
        @click="worksSwiperRef?.swiperInstance?.slidePrev()"
      >
        <HaChevronLeft />
      </button>
      <button
        :disabled="isEnd"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isEnd }"
        @click="worksSwiperRef?.swiperInstance?.slideNext()"
      >
        <HaChevronRight />
      </button>
    </template>
  </HaSectionTitle>

  <HmSwiper
    ref="worksSwiperRef"
    :_slides-per-view="2"
    class="mb-24"
    :_breakpoints="{
      1024: { slidesPerView: 2.8 },
    }"
    @slide-change="onSlideChange"
  />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.custom-swiper-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  border-radius: 100px;

  background-color: #1e355b;

  &.is-disabled {
    opacity: 0.6;
    background-color: transparent;
  }
}
</style>
````

## File: layers/main/app/components/ht/HtRelatedEventsSection.vue
````vue
<script setup lang="ts">
import HmSwiper from '../hm/HmSwiper.vue'
import HaChevronLeft from '../ha/icons/HaChevronLeft.vue'
import HaChevronRight from '../ha/icons/HaChevronRight.vue'

import type { Swiper as SwiperType } from 'swiper'

const worksSwiperRef = ref<{ swiperInstance: SwiperType | null } | null>(null)

// 親側でリアクティブな状態として持つ
const isBeginning = ref(true)
const isEnd = ref(false)

const onSlideChange = (newIsBeginning: boolean, newIsEnd: boolean) => {
  isBeginning.value = newIsBeginning
  isEnd.value = newIsEnd
}
</script>

<template>
  <HaSectionTitle
    title="関連イベント"
    label="RELATED EVENTS"
  >
    <template #controls>
      <button
        :disabled="isBeginning"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isBeginning }"
        @click="worksSwiperRef?.swiperInstance?.slidePrev()"
      >
        <HaChevronLeft />
      </button>
      <button
        :disabled="isEnd"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isEnd }"
        @click="worksSwiperRef?.swiperInstance?.slideNext()"
      >
        <HaChevronRight />
      </button>
    </template>
  </HaSectionTitle>

  <HmSwiper
    ref="worksSwiperRef"
    :_slides-per-view="1.4"
    class="mb-24"
    @slide-change="onSlideChange"
  />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.custom-swiper-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  border-radius: 100px;

  background-color: #1e355b;

  &.is-disabled {
    opacity: 0.6;
    background-color: transparent;
  }
}
</style>
````

## File: layers/main/@types/auto-imports.d.ts
````typescript
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by unplugin-auto-import
// biome-ignore lint: disable
export {}
declare global {
  const EffectScope: typeof import('vue')['EffectScope']
  const abortNavigation: typeof import('#app')['abortNavigation']
  const addRouteMiddleware: typeof import('#app')['addRouteMiddleware']
  const api: typeof import('../app/utils/api')['default']
  const cancelIdleCallback: typeof import('#app')['cancelIdleCallback']
  const clearError: typeof import('#app')['clearError']
  const clearNuxtData: typeof import('#app')['clearNuxtData']
  const clearNuxtState: typeof import('#app')['clearNuxtState']
  const computed: typeof import('vue')['computed']
  const createApp: typeof import('vue')['createApp']
  const createError: typeof import('#app')['createError']
  const customRef: typeof import('vue')['customRef']
  const defineAppConfig: typeof import('#app')['defineAppConfig']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const defineI18nConfig: typeof import('#i18n')['defineI18nConfig']
  const defineI18nLocale: typeof import('#i18n')['defineI18nLocale']
  const defineI18nRoute: typeof import('#i18n')['defineI18nRoute']
  const defineNuxtComponent: typeof import('#app')['defineNuxtComponent']
  const defineNuxtLink: typeof import('#app')['defineNuxtLink']
  const defineNuxtPlugin: typeof import('#app')['defineNuxtPlugin']
  const defineNuxtRouteMiddleware: typeof import('#app')['defineNuxtRouteMiddleware']
  const definePayloadPlugin: typeof import('#app')['definePayloadPlugin']
  const definePayloadReducer: typeof import('#app')['definePayloadReducer']
  const definePayloadReviver: typeof import('#app')['definePayloadReviver']
  const effectScope: typeof import('vue')['effectScope']
  const fetcher: typeof import('../app/composables/useApi')['fetcher']
  const getAppManifest: typeof import('#app')['getAppManifest']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const getCurrentWatcher: typeof import('vue')['getCurrentWatcher']
  const getI18nArray: typeof import('../app/utils/i18n')['getI18nArray']
  const getRouteRules: typeof import('#app')['getRouteRules']
  const h: typeof import('vue')['h']
  const inject: typeof import('vue')['inject']
  const isNuxtError: typeof import('#app')['isNuxtError']
  const isPrerendered: typeof import('#app')['isPrerendered']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const isShallow: typeof import('vue')['isShallow']
  const loadPayload: typeof import('#app')['loadPayload']
  const markRaw: typeof import('vue')['markRaw']
  const navigateTo: typeof import('#app')['navigateTo']
  const nextTick: typeof import('vue')['nextTick']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeRouteLeave: typeof import('#app')['onBeforeRouteLeave']
  const onBeforeRouteUpdate: typeof import('#app')['onBeforeRouteUpdate']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onNuxtReady: typeof import('#app')['onNuxtReady']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const onWatcherCleanup: typeof import('vue')['onWatcherCleanup']
  const prefetchComponents: typeof import('#app')['prefetchComponents']
  const preloadComponents: typeof import('#app')['preloadComponents']
  const preloadPayload: typeof import('#app')['preloadPayload']
  const preloadRouteComponents: typeof import('#app')['preloadRouteComponents']
  const prerenderRoutes: typeof import('#app')['prerenderRoutes']
  const provide: typeof import('vue')['provide']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const refreshNuxtData: typeof import('#app')['refreshNuxtData']
  const reloadNuxtApp: typeof import('#app')['reloadNuxtApp']
  const repositories: typeof import('../app/utils/factory')['repositories']
  const repositoryFactory: typeof import('../app/utils/factory')['repositoryFactory']
  const requestIdleCallback: typeof import('#app')['requestIdleCallback']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const setPageLayout: typeof import('#app')['setPageLayout']
  const setResponseStatus: typeof import('#app')['setResponseStatus']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const showError: typeof import('#app')['showError']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const toValue: typeof import('vue')['toValue']
  const triggerRef: typeof import('vue')['triggerRef']
  const unref: typeof import('vue')['unref']
  const updateAppConfig: typeof import('#app')['updateAppConfig']
  const useApi: typeof import('../app/composables/useApi')['default']
  const useAppConfig: typeof import('#app')['useAppConfig']
  const useAsyncData: typeof import('#app')['useAsyncData']
  const useAttrs: typeof import('vue')['useAttrs']
  const useBrowserLocale: typeof import('#i18n')['useBrowserLocale']
  const useCookie: typeof import('#app')['useCookie']
  const useCookieLocale: typeof import('#i18n')['useCookieLocale']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useError: typeof import('#app')['useError']
  const useFetch: typeof import('#app')['useFetch']
  const useI18n: typeof import('vue-i18n')['useI18n']
  const useId: typeof import('vue')['useId']
  const useLazyAsyncData: typeof import('#app')['useLazyAsyncData']
  const useLazyFetch: typeof import('#app')['useLazyFetch']
  const useLocaleHead: typeof import('#i18n')['useLocaleHead']
  const useLocalePath: typeof import('#i18n')['useLocalePath']
  const useLocaleRoute: typeof import('#i18n')['useLocaleRoute']
  const useModel: typeof import('vue')['useModel']
  const useNuxtApp: typeof import('#app')['useNuxtApp']
  const useNuxtData: typeof import('#app')['useNuxtData']
  const useRequestEvent: typeof import('#app')['useRequestEvent']
  const useRequestFetch: typeof import('#app')['useRequestFetch']
  const useRequestHeaders: typeof import('#app')['useRequestHeaders']
  const useRequestURL: typeof import('#app')['useRequestURL']
  const useRoute: typeof import('#app')['useRoute']
  const useRouteBaseName: typeof import('#i18n')['useRouteBaseName']
  const useRouter: typeof import('#app')['useRouter']
  const useRuntimeConfig: typeof import('#app')['useRuntimeConfig']
  const useSlots: typeof import('vue')['useSlots']
  const useState: typeof import('#app')['useState']
  const useSwitchLocalePath: typeof import('#i18n')['useSwitchLocalePath']
  const useTemplateRef: typeof import('vue')['useTemplateRef']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { Component, Slot, Slots, ComponentPublicInstance, ComputedRef, DirectiveBinding, ExtractDefaultPropTypes, ExtractPropTypes, ExtractPublicPropTypes, InjectionKey, PropType, Ref, ShallowRef, MaybeRef, MaybeRefOrGetter, VNode, WritableComputedRef } from 'vue'
  import('vue')
  // @ts-ignore
  export type { Method } from '../app/utils/api'
  import('../app/utils/api')
  // @ts-ignore
  export type { Repository, Repositories, RepositoryKey } from '../app/utils/factory'
  import('../app/utils/factory')
  // @ts-ignore
  export type { UseI18nReturnType } from '../app/utils/i18n'
  import('../app/utils/i18n')
}
````

## File: layers/main/@types/components.d.ts
````typescript
/* eslint-disable */
// @ts-nocheck
// Generated by unplugin-vue-components
// Read more: https://github.com/vuejs/core/pull/3399
export {}

/* prettier-ignore */
declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}
````

## File: layers/main/@types/nuxt-i18n.d.ts
````typescript
import type { NuxtI18nInstance } from '@nuxtjs/i18n'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $i18n: NuxtI18nInstance
  }
}
````

## File: layers/main/@types/nuxt.d.ts
````typescript
declare module '#imports' {
  export * from 'nuxt/dist/app'
}
````

## File: layers/main/@types/shim.d.ts
````typescript
declare module '*.svg'
declare module '*.svg?inline'
````

## File: layers/main/app/assets/images/.gitkeep
````

````

## File: layers/main/app/assets/styles/_base.scss
````scss
@use 'variables' as v;
@use 'mixins' as m;

html,
body {
  overflow-x: clip;

  font-family: v.$base-font-family;
  font-variant-numeric: tabular-nums; // 数字フォントの幅を等幅にする
  color: v.$base-font-color;
  word-break: normal; // 単語の分割はブラウザのデフォルトであることを明記
  line-break: strict; // 約物や小文字を置き去りにして改行させない
  overflow-wrap: anywhere; // 行内に単語を収められない場合に折り返す

  background: v.$base-background-color;

  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  text-spacing-trim: trim-start; // 英字や日本語の約物が重複した場合に全角分のスペースを確保させない
}

a {
  color: v.$base-link-color;
  text-decoration: none;
}
````

## File: layers/main/app/assets/styles/_functions.scss
````scss
@function strip-unit($number) {
  @if meta.type-of($number) == 'number' and not math.is-unitless($number) {
    @return $number / ($number * 0 + 1);
  }

  @return $number;
}

@function rem($px, $base: 16px) {
  $value: $px;

  // 単位がpx以外の場合は警告を出してそのまま返す
  @if math.unit($px) != 'px' {
    @warn 'rem()の引数にpx以外の値を指定しても計算できません';

    @return $value;
  }

  $value: (strip-unit($px) / strip-unit($base)) * 1rem;

  @return $value;
}
````

## File: layers/main/app/assets/styles/_markdown.scss
````scss
// markdown 用スタイリング
@use 'variables' as v;

.hm-markdown {
  h1,
  h2,
  h3,
  h4,
  h5 {
    line-height: 1.3;
  }

  h1 {
    margin-bottom: 32px;
  }

  h2 {
    margin-bottom: 24px;
    font-size: 28px;
  }

  h3 {
    font-size: 24px;
  }

  h4 {
    font-size: 20px;
  }

  h5 {
    font-size: 16px;
  }

  h3,
  h4,
  h5 {
    margin-bottom: 16px;
    font-weight: 400;
  }

  ul,
  ol {
    margin-bottom: 24px;

    > li {
      padding-left: 1em;
      text-indent: -1em;

      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }

  li {
    line-height: 1.3;
    list-style-position: inside;

    > ul {
      margin: 16px 0;
      padding-left: 48px;
    }

    ol {
      counter-reset: ol-item;
      margin: 16px 0;
      padding-left: 28px;
      list-style: none;

      > li {
        position: relative;
        padding-left: 1.5em;
        text-indent: 0;

        // list-style: none だけで消えないので
        &::marker {
          content: '';
        }

        &::before {
          // インデントした数値は 「1)」の表示にする
          content: counter(ol-item) ')  ';
          counter-increment: ol-item 1;

          position: absolute; // 数値の桁数が違う場合の見た目に対応
          top: 0;
          left: 0;

          display: block;

          width: 100px;
        }
      }
    }
  }
  /* stylelint-disable selector-max-compound-selectors */
  ul > li {
    list-style: none;

    &::before {
      content: '・';
    }

    ul > li {
      list-style: circle;

      ul > li {
        list-style: disc;
      }
    }
  }

  /* stylelint-ensable selector-max-compound-selectors */
  ol > li {
    list-style: decimal;
    list-style-position: inside;
  }

  ol[type='a'] > li {
    list-style: lower-latin;
    list-style-position: inside;
  }

  p {
    margin-bottom: 24px;
    line-height: 1.6;
  }

  img {
    display: block;
    width: fit-content;
    max-width: 100%;
    margin: 24px auto;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;

    width: fit-content;
    min-width: 50%;
    max-width: 100%;
    margin: 24px auto;
  }

  code {
    padding: 2px 5px;
    background-color: v.$violet;
  }

  table th,
  table td {
    padding: 8px 12px;
    text-align: center;
  }

  table tr:nth-child(odd) {
    background-color: v.$blue;
  }

  thead tr:first-child {
    background-color: v.$blue;
  }
}
````

## File: layers/main/app/assets/styles/_mixins.scss
````scss
@use 'variables' as v;

@mixin xs {
  @media screen and (max-width: v.$xs-query-width) {
    @content;
  }
}

@mixin sp {
  @media screen and (max-width: v.$media-query-width) {
    @content;
  }
}

@mixin pc {
  @media screen and (min-width: v.$media-query-width) {
    @content;
  }
}

@mixin tb {
  @media screen and (max-width: v.$pc-content-min-width) {
    @content;
  }
}

@mixin splandscape {
  @media screen and (max-width: v.$pc-content-min-width) and (max-height: v.$sp-query-width) and (orientation: landscape) {
    @content;
  }
}

@mixin hover {
  @media (any-hover: hover) {
    &:hover {
      @content;
    }

    &:focus-within {
      @content;
    }
  }
}
````

## File: layers/main/app/assets/styles/_reset.scss
````scss
@forward 'ress';

ol,
ul {
  list-style: none;
}

iframe,
img {
  max-width: 100%;
  vertical-align: top;
}

img {
  height: auto;
}
````

## File: layers/main/app/assets/styles/_toast.scss
````scss
// @nuxt/toastのスタイリング
// @see nuxt.config.ts > toast
// todo: !importantあまり使いたくないので@nuxt/toastに.scss渡せたりするなら修正

@use 'variables' as v;
@use 'mixins' as m;

.hv-toast {
  z-index: v.$zindex-toast !important;
  top: v.$header-height-pc !important;
  width: 100%;
  margin-top: 0;

  @include m.sp {
    top: v.$header-height-sp !important;
  }

  .hv-toast-context {
    margin-top: 0 !important;
    word-break: break-all !important;
    overflow-wrap: break-word !important;

    + .hv-toast-context {
      margin-top: v.space(2) !important;
    }

    &.info {
      background: v.$gray-2 !important;
    }

    &.success {
      background: v.$primary-color !important;
    }

    &.error {
      background: v.$red !important;
    }

    &.danger {
      background: v.$red !important;
    }
  }
}
````

## File: layers/main/app/components/ha/icons/HaArrowRight.vue
````vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.2344 12.8676H4.28924C4.06173 12.8676 3.84353 12.958 3.68265 13.1189C3.52178 13.2798 3.4314 13.498 3.4314 13.7255C3.4314 13.953 3.52178 14.1712 3.68265 14.3321C3.84353 14.4929 4.06173 14.5833 4.28924 14.5833H20.2344L13.9748 20.8375C13.8134 20.9989 13.7228 21.2178 13.7228 21.4461C13.7228 21.6743 13.8134 21.8932 13.9748 22.0546C14.1362 22.216 14.3551 22.3067 14.5834 22.3067C14.8116 22.3067 15.0305 22.216 15.1919 22.0546L22.9125 14.334C22.9927 14.2543 23.0564 14.1595 23.0999 14.055C23.1433 13.9506 23.1657 13.8386 23.1657 13.7255C23.1657 13.6124 23.1433 13.5004 23.0999 13.3959C23.0564 13.2915 22.9927 13.1967 22.9125 13.1169L15.1919 5.39635C15.112 5.31644 15.0171 5.25304 14.9127 5.2098C14.8083 5.16655 14.6964 5.14429 14.5834 5.14429C14.4703 5.14429 14.3584 5.16655 14.254 5.2098C14.1496 5.25304 14.0547 5.31644 13.9748 5.39635C13.8949 5.47626 13.8315 5.57113 13.7883 5.67555C13.745 5.77996 13.7228 5.89187 13.7228 6.00488C13.7228 6.1179 13.745 6.22981 13.7883 6.33422C13.8315 6.43863 13.8949 6.5335 13.9748 6.61341L20.2344 12.8676Z"
      fill="#43FFBD"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaBalanceIcon.vue
````vue
<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.33337 35.0002V31.6668H18.3334V13.0418C17.6112 12.7918 16.9862 12.4029 16.4584 11.8752C15.9306 11.3474 15.5417 10.7224 15.2917 10.0002H10L15 21.6668C15 23.0557 14.4306 24.2363 13.2917 25.2085C12.1528 26.1807 10.7778 26.6668 9.16671 26.6668C7.5556 26.6668 6.1806 26.1807 5.04171 25.2085C3.90282 24.2363 3.33337 23.0557 3.33337 21.6668L8.33337 10.0002H5.00004V6.66683H15.2917C15.625 5.69461 16.2223 4.89628 17.0834 4.27183C17.9445 3.64739 18.9167 3.33461 20 3.3335C21.0834 3.33239 22.0556 3.64517 22.9167 4.27183C23.7778 4.8985 24.375 5.69683 24.7084 6.66683H35V10.0002H31.6667L36.6667 21.6668C36.6667 23.0557 36.0973 24.2363 34.9584 25.2085C33.8195 26.1807 32.4445 26.6668 30.8334 26.6668C29.2223 26.6668 27.8473 26.1807 26.7084 25.2085C25.5695 24.2363 25 23.0557 25 21.6668L30 10.0002H24.7084C24.4584 10.7224 24.0695 11.3474 23.5417 11.8752C23.0139 12.4029 22.3889 12.7918 21.6667 13.0418V31.6668H36.6667V35.0002H3.33337ZM27.7084 21.6668H33.9584L30.8334 14.4168L27.7084 21.6668ZM6.04171 21.6668H12.2917L9.16671 14.4168L6.04171 21.6668ZM20 10.0002C20.4723 10.0002 20.8684 9.84017 21.1884 9.52017C21.5084 9.20017 21.6678 8.80461 21.6667 8.3335C21.6656 7.86239 21.5056 7.46683 21.1867 7.14683C20.8678 6.82683 20.4723 6.66683 20 6.66683C19.5278 6.66683 19.1323 6.82683 18.8134 7.14683C18.4945 7.46683 18.3345 7.86239 18.3334 8.3335C18.3323 8.80461 18.4923 9.20072 18.8134 9.52183C19.1345 9.84294 19.53 10.0024 20 10.0002Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaBroadcastIcon.vue
````vue
<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.863 13.644L5 13.25H4.5C4.36739 13.25 4.24021 13.1973 4.14645 13.1036C4.05268 13.0098 4 12.8826 4 12.75V9.75C4 9.61739 4.05268 9.49021 4.14645 9.39645C4.24021 9.30268 4.36739 9.25 4.5 9.25H5L18 6.5H20V16H18L14.146 15.185L14.172 15.193C13.8993 16.0913 13.2995 16.8547 12.4912 17.3322C11.6828 17.8098 10.7248 17.9667 9.80636 17.7721C8.88792 17.5775 8.07589 17.0455 7.53073 16.2811C6.98557 15.5168 6.74794 14.5758 6.863 13.644ZM8.34 13.957C8.30786 14.4952 8.47 15.0271 8.79692 15.4559C9.12384 15.8847 9.59382 16.1819 10.1214 16.2935C10.6489 16.405 11.199 16.3235 11.6715 16.0637C12.144 15.8039 12.5075 15.3832 12.696 14.878L8.34 13.957ZM5.5 10.677L18.157 8H18.5V14.5H18.157L5.5 11.823V10.677Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaCalendarIcon.vue
````vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.7255 4.5752H21.7321C22.3611 4.5752 22.8758 5.0899 22.8758 5.71899V21.7321C22.8758 22.3611 22.3611 22.8758 21.7321 22.8758H5.71899C5.0899 22.8758 4.5752 22.3611 4.5752 21.7321V5.71899C4.5752 5.0899 5.0899 4.5752 5.71899 4.5752H13.7255Z"
      stroke="white"
      stroke-width="1.61546"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.74866 5.18958H23.1428V9.27717H4.74866V5.18958Z"
      fill="white"
    />
    <path
      d="M8.00659 4.57518V2.2876M19.4445 4.57518V2.2876"
      stroke="white"
      stroke-width="1.61546"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.00659 12.5817H19.4445"
      stroke="white"
      stroke-width="1.61546"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.00659 17.1569H16.0131"
      stroke="white"
      stroke-width="1.61546"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaCameraIcon.vue
````vue
<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3613 3.67206H15.4511L13.771 1.83594H8.26263L6.58257 3.67206H3.67231C3.18534 3.67206 2.71831 3.86551 2.37397 4.20985C2.02963 4.55419 1.83618 5.02122 1.83618 5.50819V16.525C1.83618 17.0119 2.02963 17.4789 2.37397 17.8233C2.71831 18.1676 3.18534 18.3611 3.67231 18.3611H18.3613C18.8483 18.3611 19.3153 18.1676 19.6597 17.8233C20.004 17.4789 20.1974 17.0119 20.1974 16.525V5.50819C20.1974 5.02122 20.004 4.55419 19.6597 4.20985C19.3153 3.86551 18.8483 3.67206 18.3613 3.67206ZM18.3613 16.525H3.67231V5.50819H7.39047L9.07052 3.67206H12.9631L14.6432 5.50819H18.3613V16.525ZM11.0168 6.42625C9.79939 6.42625 8.63182 6.90987 7.77097 7.77073C6.91012 8.63158 6.4265 9.79914 6.4265 11.0166C6.4265 12.234 6.91012 13.4016 7.77097 14.2624C8.63182 15.1233 9.79939 15.6069 11.0168 15.6069C12.2342 15.6069 13.4018 15.1233 14.2627 14.2624C15.1235 13.4016 15.6071 12.234 15.6071 11.0166C15.6071 9.79914 15.1235 8.63158 14.2627 7.77073C13.4018 6.90987 12.2342 6.42625 11.0168 6.42625ZM11.0168 13.7708C10.2864 13.7708 9.58582 13.4806 9.06931 12.9641C8.5528 12.4476 8.26263 11.747 8.26263 11.0166C8.26263 10.2861 8.5528 9.58557 9.06931 9.06906C9.58582 8.55255 10.2864 8.26238 11.0168 8.26238C11.7473 8.26238 12.4478 8.55255 12.9643 9.06906C13.4808 9.58557 13.771 10.2861 13.771 11.0166C13.771 11.747 13.4808 12.4476 12.9643 12.9641C12.4478 13.4806 11.7473 13.7708 11.0168 13.7708Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaChevronDownIcon.vue
````vue
<template>
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_278_53)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.4143 23.8735C18.9962 24.2911 18.4295 24.5257 17.8386 24.5257C17.2477 24.5257 16.6809 24.2911 16.2629 23.8735L7.852 15.4657C7.43389 15.0474 7.19908 14.4801 7.19922 13.8887C7.19936 13.2972 7.43444 12.7301 7.85274 12.312C8.27105 11.8939 8.83831 11.659 9.42975 11.6592C10.0212 11.6593 10.5883 11.8944 11.0064 12.3127L17.8386 19.1449L24.6707 12.3127C25.0911 11.9063 25.6543 11.6813 26.2389 11.6861C26.8236 11.6909 27.3829 11.9252 27.7966 12.3384C28.2102 12.7516 28.445 13.3108 28.4503 13.8954C28.4557 14.4801 28.2312 15.0434 27.8252 15.4642L19.4158 23.875L19.4143 23.8735Z"
        fill="#43FFBD"
      />
    </g>
    <defs>
      <clipPath id="clip0_278_53">
        <rect
          width="35.677"
          height="35.677"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaCommunityIcon.vue
````vue
<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0001 9.16675C11.4251 9.16675 12.5001 8.09175 12.5001 6.66675C12.5001 5.24175 11.4251 4.16675 10.0001 4.16675C8.57508 4.16675 7.50008 5.24175 7.50008 6.66675C7.50008 8.09175 8.57508 9.16675 10.0001 9.16675ZM10.0001 5.83341C10.5001 5.83341 10.8334 6.16675 10.8334 6.66675C10.8334 7.16675 10.5001 7.50008 10.0001 7.50008C9.50008 7.50008 9.16675 7.16675 9.16675 6.66675C9.16675 6.16675 9.50008 5.83341 10.0001 5.83341ZM10.8334 10.0001H9.16675C6.86675 10.0001 5.00008 11.8667 5.00008 14.1667V14.5834C5.00008 15.2751 5.55841 15.8334 6.25008 15.8334H13.7501C14.4417 15.8334 15.0001 15.2751 15.0001 14.5834V14.1667C15.0001 11.8667 13.1334 10.0001 10.8334 10.0001ZM6.66675 14.1667C6.66675 12.7917 7.79175 11.6667 9.16675 11.6667H10.8334C12.2084 11.6667 13.3334 12.7917 13.3334 14.1667H6.66675ZM5.41675 9.16675C5.80841 9.16675 6.16675 9.06675 6.47508 8.89175C6.12558 8.33528 5.9118 7.70444 5.851 7.05014C5.79021 6.39584 5.88409 5.73641 6.12508 5.12508C5.90841 5.05008 5.66675 5.00008 5.41675 5.00008C4.21675 5.00008 3.33341 5.88341 3.33341 7.08341C3.33341 8.28341 4.21675 9.16675 5.41675 9.16675ZM5.09175 10.0001H4.58341C2.97508 10.0001 1.66675 11.3084 1.66675 12.9167V13.7501C1.66675 13.9834 1.85008 14.1667 2.08341 14.1667H3.33341C3.33341 12.5334 4.00841 11.0584 5.09175 10.0001ZM14.5834 9.16675C15.7834 9.16675 16.6667 8.28341 16.6667 7.08341C16.6667 5.88341 15.7834 5.00008 14.5834 5.00008C14.3251 5.00008 14.0917 5.05008 13.8751 5.12508C14.1161 5.73641 14.21 6.39584 14.1492 7.05014C14.0884 7.70444 13.8746 8.33528 13.5251 8.89175C13.8334 9.06675 14.1834 9.16675 14.5834 9.16675ZM15.4167 10.0001H14.9084C15.4652 10.5417 15.9077 11.1896 16.2098 11.9053C16.5118 12.6209 16.6672 13.3899 16.6667 14.1667H17.9167C18.1501 14.1667 18.3334 13.9834 18.3334 13.7501V12.9167C18.3334 11.3084 17.0251 10.0001 15.4167 10.0001Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaCompanyIcon.vue
````vue
<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 15H16V17H18M18 11H16V13H18M20 19H12V17H14V15H12V13H14V11H12V9H20M10 7H8V5H10M10 11H8V9H10M10 15H8V13H10M10 19H8V17H10M6 7H4V5H6M6 11H4V9H6M6 15H4V13H6M6 19H4V17H6M12 7V3H2V21H22V7H12Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaDangerIcon.vue
````vue
<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5874 4.23461L19.7393 14.4811C20.6234 15.9528 20.1892 17.889 18.7689 18.8052C18.2926 19.1145 17.7367 19.279 17.1688 19.2789H4.86395C3.19216 19.2789 1.83618 17.8743 1.83618 16.1401C1.83618 15.5534 1.99501 14.9796 2.29338 14.4811L8.44624 4.23461C9.32941 2.76296 11.1968 2.31219 12.617 3.22841C13.0099 3.4818 13.3423 3.82607 13.5874 4.23461ZM11.5493 5.00487C11.4369 4.93258 11.311 4.88382 11.1793 4.86154C11.0475 4.83926 10.9126 4.84392 10.7827 4.87524C10.6528 4.90656 10.5305 4.96388 10.4234 5.04376C10.3163 5.12363 10.2264 5.2244 10.1593 5.33996L4.0074 15.5883C3.90747 15.7553 3.85479 15.9463 3.855 16.141C3.855 16.7194 4.30669 17.1876 4.86487 17.1876H17.1678C17.357 17.1876 17.5415 17.1325 17.7012 17.0297C17.9305 16.8774 18.0921 16.6425 18.1525 16.374C18.2128 16.1055 18.1673 15.8241 18.0253 15.5883L11.8734 5.33996C11.7932 5.20462 11.6826 5.08987 11.5502 5.00487H11.5493ZM11.0168 15.6067C10.7733 15.6067 10.5398 15.5099 10.3676 15.3378C10.1955 15.1656 10.0988 14.9321 10.0988 14.6886C10.0988 14.4451 10.1955 14.2116 10.3676 14.0394C10.5398 13.8673 10.7733 13.7705 11.0168 13.7705C11.2603 13.7705 11.4938 13.8673 11.666 14.0394C11.8382 14.2116 11.9349 14.4451 11.9349 14.6886C11.9349 14.9321 11.8382 15.1656 11.666 15.3378C11.4938 15.5099 11.2603 15.6067 11.0168 15.6067ZM11.0168 7.34409C11.2603 7.34409 11.4938 7.44082 11.666 7.61299C11.8382 7.78516 11.9349 8.01867 11.9349 8.26216V11.9344C11.9349 12.1779 11.8382 12.4114 11.666 12.5836C11.4938 12.7557 11.2603 12.8525 11.0168 12.8525C10.7733 12.8525 10.5398 12.7557 10.3676 12.5836C10.1955 12.4114 10.0988 12.1779 10.0988 11.9344V8.26216C10.0988 8.01867 10.1955 7.78516 10.3676 7.61299C10.5398 7.44082 10.7733 7.34409 11.0168 7.34409Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaEmailIcon.vue
````vue
<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H20C20.55 4 21.021 4.196 21.413 4.588C21.805 4.98 22.0007 5.45067 22 6V18C22 18.55 21.8043 19.021 21.413 19.413C21.0217 19.805 20.5507 20.0007 20 20H4ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaHeartIcon.vue
````vue
<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.1086 17.0298L11.0168 17.1216L10.9158 17.0298C6.55503 13.0729 3.67231 10.4565 3.67231 7.80325C3.67231 5.96713 5.0494 4.59003 6.88553 4.59003C8.29935 4.59003 9.67644 5.5081 10.163 6.75666H11.8706C12.3572 5.5081 13.7343 4.59003 15.1481 4.59003C16.9842 4.59003 18.3613 5.96713 18.3613 7.80325C18.3613 10.4565 15.4786 13.0729 11.1086 17.0298ZM15.1481 2.75391C13.5507 2.75391 12.0175 3.49754 11.0168 4.66348C10.0161 3.49754 8.48296 2.75391 6.88553 2.75391C4.05789 2.75391 1.83618 4.96644 1.83618 7.80325C1.83618 11.2644 4.9576 14.1012 9.68562 18.3885L11.0168 19.6004L12.348 18.3885C17.076 14.1012 20.1974 11.2644 20.1974 7.80325C20.1974 4.96644 17.9757 2.75391 15.1481 2.75391Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaInfoIcon.vue
````vue
<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9449 8.26976H10.1072V6.43208H11.9449M11.9449 15.6205H10.1072V10.1074H11.9449M11.026 1.83789C9.8194 1.83789 8.62458 2.07556 7.50979 2.53731C6.395 2.99907 5.38208 3.67589 4.52886 4.52911C2.80571 6.25226 1.83765 8.58937 1.83765 11.0263C1.83765 13.4632 2.80571 15.8003 4.52886 17.5234C5.38208 18.3767 6.395 19.0535 7.50979 19.5152C8.62458 19.977 9.8194 20.2147 11.026 20.2147C13.4629 20.2147 15.8 19.2466 17.5232 17.5234C19.2464 15.8003 20.2144 13.4632 20.2144 11.0263C20.2144 9.81964 19.9768 8.62482 19.515 7.51003C19.0532 6.39525 18.3764 5.38233 17.5232 4.52911C16.67 3.67589 15.6571 2.99907 14.5423 2.53731C13.4275 2.07556 12.2327 1.83789 11.026 1.83789Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaJumpToPageIcon.vue
````vue
<template>
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_293_154)">
      <path
        d="M6.75 5.25L10.5 1.5M10.5 4V1.5H8M10.5 7V9.5C10.5 9.76522 10.3946 10.0196 10.2071 10.2071C10.0196 10.3946 9.76522 10.5 9.5 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V2.5C1.5 2.23478 1.60536 1.98043 1.79289 1.79289C1.98043 1.60536 2.23478 1.5 2.5 1.5H5"
        stroke="#258966"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_293_154">
        <rect
          width="12"
          height="12"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaMapPinIcon.vue
````vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.7255 4.57511C13.2749 4.57511 12.8287 4.66387 12.4124 4.83631C11.9961 5.00875 11.6178 5.26151 11.2992 5.58014C10.9805 5.89877 10.7278 6.27704 10.5553 6.69336C10.3829 7.10967 10.2941 7.55587 10.2941 8.00649C10.2941 8.4571 10.3829 8.9033 10.5553 9.31962C10.7278 9.73593 10.9805 10.1142 11.2992 10.4328C11.6178 10.7515 11.9961 11.0042 12.4124 11.1767C12.8287 11.3491 13.2749 11.4379 13.7255 11.4379C14.6356 11.4379 15.5084 11.0763 16.1519 10.4328C16.7954 9.78933 17.1569 8.91654 17.1569 8.00649C17.1569 7.09643 16.7954 6.22365 16.1519 5.58014C15.5084 4.93663 14.6356 4.57511 13.7255 4.57511ZM8.00656 8.00649C8.00678 6.92443 8.31398 5.86463 8.89247 4.95019C9.47096 4.03575 10.297 3.30419 11.2747 2.84047C12.2523 2.37676 13.3415 2.19992 14.4156 2.33049C15.4898 2.46107 16.5049 2.8937 17.343 3.57814C18.181 4.26258 18.8078 5.17074 19.1503 6.19715C19.4929 7.22355 19.5372 8.32608 19.2782 9.37668C19.0192 10.4273 18.4674 11.3828 17.687 12.1324C16.9066 12.8819 15.9295 13.3946 14.8693 13.6111V19.4444C14.8693 19.7477 14.7488 20.0387 14.5343 20.2532C14.3198 20.4677 14.0289 20.5882 13.7255 20.5882C13.4222 20.5882 13.1312 20.4677 12.9167 20.2532C12.7022 20.0387 12.5817 19.7477 12.5817 19.4444V13.6111C11.29 13.3474 10.129 12.6455 9.29526 11.6242C8.46154 10.6029 8.00629 9.32488 8.00656 8.00649ZM10.8535 18.415C10.8762 18.5635 10.8695 18.7151 10.8336 18.8611C10.7977 19.007 10.7334 19.1445 10.6444 19.2656C10.5554 19.3867 10.4434 19.489 10.3148 19.5668C10.1862 19.6446 10.0435 19.6963 9.89496 19.7189C8.43319 19.9408 7.27225 20.2782 6.50934 20.6511C5.11391 21.3339 6.74496 21.8246 7.59594 22.09C9.11375 22.5647 11.2812 22.8758 13.7255 22.8758C16.1698 22.8758 18.3373 22.5647 19.8551 22.09C20.7118 21.8223 22.3371 21.3351 20.9417 20.6511C20.1788 20.2782 19.0178 19.9419 17.5561 19.7189C17.4059 19.6983 17.2612 19.648 17.1306 19.571C17 19.494 16.886 19.3918 16.7953 19.2703C16.7045 19.1489 16.6388 19.0106 16.602 18.8635C16.5652 18.7164 16.558 18.5635 16.5808 18.4136C16.6036 18.2637 16.656 18.1198 16.7349 17.9903C16.8138 17.8609 16.9177 17.7484 17.0405 17.6595C17.1633 17.5705 17.3026 17.5068 17.4502 17.4722C17.5978 17.4376 17.7508 17.4326 17.9004 17.4576C19.4879 17.6978 20.8994 18.0833 21.9482 18.5968C22.9593 19.0921 24.0196 19.9259 24.0196 21.1601C24.0196 22.0877 23.4203 22.7614 22.837 23.1926C20.3778 25.0089 16.6262 25.1633 13.7255 25.1633C11.1154 25.1633 8.7077 24.8339 6.91424 24.2735C5.4845 23.8274 3.4314 22.9467 3.4314 21.1601C3.4314 19.9248 4.49169 19.0921 5.5028 18.598C6.55166 18.0833 7.96424 17.699 9.54953 17.4576C9.69809 17.4349 9.84968 17.4416 9.99564 17.4775C10.1416 17.5134 10.279 17.5776 10.4001 17.6667C10.5212 17.7557 10.6236 17.8677 10.7014 17.9963C10.7792 18.1249 10.8308 18.2664 10.8535 18.415Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaOpenBookIcon.vue
````vue
<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 35.0002V11.6668M20 11.6668C20 10.7828 20.3512 9.93493 20.9764 9.30981C21.6015 8.68469 22.4493 8.3335 23.3334 8.3335H35.6667C35.798 8.3335 35.9281 8.35936 36.0494 8.40962C36.1707 8.45987 36.281 8.53353 36.3738 8.62639C36.4667 8.71925 36.5403 8.82949 36.5906 8.95081C36.6408 9.07214 36.6667 9.20217 36.6667 9.3335V31.1902M20 11.6668C20 10.7828 19.6489 9.93493 19.0237 9.30981C18.3986 8.68469 17.5508 8.3335 16.6667 8.3335H4.33337C4.06816 8.3335 3.8138 8.43885 3.62627 8.62639C3.43873 8.81393 3.33337 9.06828 3.33337 9.3335V31.1902M23.3334 31.6668H36.6667M16.6667 31.6668H3.33337"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M23.3334 31.667C22.4494 31.667 21.6015 32.0182 20.9764 32.6433C20.3513 33.2684 20.0001 34.1163 20.0001 35.0003C20.0001 34.1163 19.6489 33.2684 19.0238 32.6433C18.3986 32.0182 17.5508 31.667 16.6667 31.667"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaQuestionIcon.vue
````vue
<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 3.33301C29.205 3.33301 36.6667 10.7947 36.6667 19.9997C36.6667 29.2047 29.205 36.6663 20 36.6663C10.795 36.6663 3.33337 29.2047 3.33337 19.9997C3.33337 10.7947 10.795 3.33301 20 3.33301ZM20 6.66634C16.4638 6.66634 13.0724 8.0711 10.572 10.5716C8.07147 13.0721 6.66671 16.4635 6.66671 19.9997C6.66671 23.5359 8.07147 26.9273 10.572 29.4278C13.0724 31.9282 16.4638 33.333 20 33.333C23.5363 33.333 26.9276 31.9282 29.4281 29.4278C31.9286 26.9273 33.3334 23.5359 33.3334 19.9997C33.3334 16.4635 31.9286 13.0721 29.4281 10.5716C26.9276 8.0711 23.5363 6.66634 20 6.66634ZM20 26.6663C20.4421 26.6663 20.866 26.8419 21.1786 27.1545C21.4911 27.4671 21.6667 27.891 21.6667 28.333C21.6667 28.775 21.4911 29.199 21.1786 29.5115C20.866 29.8241 20.4421 29.9997 20 29.9997C19.558 29.9997 19.1341 29.8241 18.8215 29.5115C18.509 29.199 18.3334 28.775 18.3334 28.333C18.3334 27.891 18.509 27.4671 18.8215 27.1545C19.1341 26.8419 19.558 26.6663 20 26.6663ZM20 10.833C21.4038 10.8331 22.7638 11.3219 23.8463 12.2157C24.9289 13.1094 25.6664 14.3522 25.9322 15.7306C26.198 17.109 25.9756 18.537 25.303 19.7692C24.6305 21.0014 23.5498 21.9609 22.2467 22.483C22.0537 22.554 21.8797 22.6686 21.7384 22.818C21.665 22.9013 21.6534 23.008 21.655 23.118L21.6667 23.333C21.6662 23.7578 21.5036 24.1664 21.212 24.4753C20.9203 24.7842 20.5218 24.9701 20.0977 24.995C19.6736 25.0199 19.2561 24.8819 18.9303 24.6092C18.6046 24.3366 18.3952 23.9498 18.345 23.528L18.3334 23.333V22.9163C18.3334 20.9947 19.8834 19.8413 21.0067 19.3897C21.4639 19.2071 21.8627 18.9035 22.1603 18.5113C22.458 18.1192 22.6432 17.6534 22.696 17.1639C22.7489 16.6745 22.6674 16.1799 22.4604 15.7332C22.2534 15.2866 21.9286 14.9048 21.5209 14.6288C21.1133 14.3528 20.6381 14.1931 20.1465 14.1668C19.655 14.1405 19.1655 14.2486 18.7307 14.4795C18.2959 14.7103 17.9322 15.0553 17.6787 15.4773C17.4252 15.8993 17.2914 16.3824 17.2917 16.8747C17.2917 17.3167 17.1161 17.7406 16.8036 18.0532C16.491 18.3657 16.0671 18.5413 15.625 18.5413C15.183 18.5413 14.7591 18.3657 14.4465 18.0532C14.134 17.7406 13.9584 17.3167 13.9584 16.8747C13.9584 15.2723 14.5949 13.7356 15.7279 12.6026C16.861 11.4695 18.3977 10.833 20 10.833Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaShieldIcon.vue
````vue
<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_284_61)">
      <path
        d="M18.755 7.53912C18.8775 6.08226 19.3169 4.74483 20.0902 3.51844L17.1228 0.661133C16.1854 1.43803 15.1173 1.86857 13.9081 1.94437C12.7993 2.04087 11.7488 1.83816 10.7599 1.33492C9.74373 1.82142 8.69714 2.02545 7.60648 1.94437C6.49638 1.85571 5.43478 1.45144 4.5469 0.779232L1.57194 3.63566C2.30389 4.87923 2.71151 6.18053 2.79127 7.53912C2.82917 8.16443 2.64409 9.02638 2.22765 10.1391C2.03865 10.6645 1.87352 11.1983 1.73278 11.7387C1.62878 12.1833 1.564 12.5438 1.54197 12.8148C1.52699 14.0007 1.87247 15.0715 2.58107 16.0238C3.13499 16.7187 4.0485 17.4864 5.31675 18.3258C6.70398 19.0058 7.7779 19.4469 8.53012 19.6351L9.15411 19.9149C9.35021 20.0048 9.56041 20.0934 9.77942 20.1894C10.2531 20.4627 10.585 20.7583 10.7599 21.0637C10.975 20.7328 11.3147 20.445 11.766 20.1894C12.0365 20.0777 12.3048 19.9606 12.5706 19.8382L13.0417 19.6355C13.2025 19.5593 13.4128 19.4711 13.6683 19.3738C13.9846 19.2532 14.3025 19.137 14.622 19.0252C15.3548 18.7758 15.8884 18.5391 16.2273 18.3258C17.4577 17.4868 18.3571 16.7311 18.9295 16.0564C19.6632 15.101 20.0202 14.0249 20.0039 12.8157C19.9602 12.2737 19.7218 11.4073 19.2891 10.2268C18.8775 9.07617 18.6955 8.18338 18.755 7.53912Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_284_61">
        <rect
          width="22.0335"
          height="22.0335"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaStarShineIcon.vue
````vue
<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4275 12.25C16.6564 12.25 16.8541 12.3333 17.0208 12.5L18.3333 13.8333C18.5 14 18.5833 14.1944 18.5833 14.4167C18.5833 14.6389 18.5 14.8333 18.3333 15C18.1666 15.1667 17.9722 15.25 17.75 15.25C17.5277 15.25 17.3333 15.1667 17.1666 15L15.8333 13.6875C15.6666 13.5208 15.5833 13.3231 15.5833 13.0942C15.5833 12.8653 15.6666 12.6672 15.8333 12.5C16 12.3328 16.198 12.2494 16.4275 12.25ZM16.9166 3.09417C16.9166 3.32306 16.8333 3.52084 16.6666 3.6875L15.3541 5C15.1875 5.16667 14.9897 5.25 14.7608 5.25C14.5319 5.25 14.3339 5.16667 14.1666 5C13.9994 4.83334 13.9161 4.63556 13.9166 4.40667C13.9172 4.17778 14.0005 3.97972 14.1666 3.8125L15.5 2.5C15.6666 2.33334 15.8611 2.25 16.0833 2.25C16.3055 2.25 16.5 2.33334 16.6666 2.5C16.8333 2.66667 16.9166 2.86445 16.9166 3.09334M3.92746 2.25C4.15635 2.25 4.35413 2.33334 4.5208 2.5L5.83329 3.83334C5.99996 4 6.0833 4.19445 6.0833 4.41667C6.0833 4.63889 5.99996 4.83334 5.83329 5C5.66663 5.16667 5.46885 5.25 5.23996 5.25C5.01107 5.25 4.81302 5.16667 4.6458 5L3.3333 3.6875C3.16663 3.52084 3.0833 3.32306 3.0833 3.09417C3.0833 2.86528 3.16663 2.66722 3.3333 2.5C3.49996 2.33278 3.69802 2.24945 3.92746 2.25ZM4.41663 13.0942C4.41663 13.3231 4.3333 13.5208 4.16663 13.6875L2.85413 15C2.68746 15.1667 2.48968 15.25 2.2608 15.25C2.03191 15.25 1.83385 15.1667 1.66663 15C1.49941 14.8333 1.41607 14.6356 1.41663 14.4067C1.41718 14.1778 1.50052 13.9797 1.66663 13.8125L2.99996 12.5C3.16663 12.3333 3.36107 12.25 3.5833 12.25C3.80552 12.25 3.99996 12.3333 4.16663 12.5C4.3333 12.6667 4.41663 12.8647 4.41663 13.0942ZM7.37496 14.0208L9.99996 12.4375L12.625 14.0417L11.9375 11.0417L14.25 9.04167L11.2083 8.77084L9.99996 5.9375L8.79163 8.75L5.74996 9.02084L8.06246 11.0417L7.37496 14.0208ZM9.99996 14.3958L6.54163 16.4792C6.38885 16.5764 6.22913 16.6181 6.06246 16.6042C5.8958 16.5903 5.74996 16.5347 5.62496 16.4375C5.49996 16.3403 5.40274 16.2189 5.3333 16.0733C5.26385 15.9278 5.24996 15.7644 5.29163 15.5833L6.20829 11.6458L3.1458 9C3.00691 8.875 2.92024 8.7325 2.8858 8.5725C2.85135 8.4125 2.86163 8.25639 2.91663 8.10417C2.97163 7.95195 3.05496 7.82695 3.16663 7.72917C3.2783 7.63139 3.43107 7.56889 3.62496 7.54167L7.66663 7.1875L9.22913 3.47917C9.29857 3.3125 9.40635 3.1875 9.55246 3.10417C9.69857 3.02084 9.84774 2.97917 9.99996 2.97917C10.1522 2.97917 10.3014 3.02084 10.4475 3.10417C10.5936 3.1875 10.7014 3.3125 10.7708 3.47917L12.3333 7.1875L16.375 7.54167C16.5694 7.56945 16.7222 7.63195 16.8333 7.72917C16.9444 7.82639 17.0277 7.95139 17.0833 8.10417C17.1389 8.25695 17.1494 8.41334 17.115 8.57334C17.0805 8.73334 16.9936 8.87556 16.8541 9L13.7916 11.6458L14.7083 15.5833C14.75 15.7639 14.7361 15.9272 14.6666 16.0733C14.5972 16.2194 14.5 16.3408 14.375 16.4375C14.25 16.5342 14.1041 16.5897 13.9375 16.6042C13.7708 16.6186 13.6111 16.5769 13.4583 16.4792L9.99996 14.3958Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaSunIcon.vue
````vue
<template>
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 10V6M24 42V38M14.1 14.1L11.272 11.272M36.728 36.728L33.9 33.9M10 24H6M42 24H38M14.1 33.9L11.272 36.728M36.728 11.272L33.9 14.1M32 24C32 26.1217 31.1571 28.1566 29.6569 29.6569C28.1566 31.1571 26.1217 32 24 32C21.8783 32 19.8434 31.1571 18.3431 29.6569C16.8429 28.1566 16 26.1217 16 24C16 21.8783 16.8429 19.8434 18.3431 18.3431C19.8434 16.8429 21.8783 16 24 16C26.1217 16 28.1566 16.8429 29.6569 18.3431C31.1571 19.8434 32 21.8783 32 24Z"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaSunsetIcon.vue
````vue
<template>
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 26H8M40 26H42M11.2 13.2L12.6 14.6M36.8 13.2L35.4 14.6M16 26C16 23.8783 16.8429 21.8434 18.3431 20.3431C19.8434 18.8429 21.8783 18 24 18C26.1217 18 28.1566 18.8429 29.6569 20.3431C31.1571 21.8434 32 23.8783 32 26M6 34H42M14 40H24M32 40H34M24 10V8"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaTicketIcon.vue
````vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_350_141)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.166 6.25412L24.7303 8.35938C24.8054 8.64034 24.8009 8.93667 24.7173 9.21522C24.6336 9.49377 24.4741 9.74355 24.2566 9.93662L24.1807 10.0003C23.8068 10.2919 23.5257 10.6858 23.3713 11.1342C23.2169 11.5825 23.1959 12.066 23.311 12.526C23.426 12.986 23.672 13.4027 24.0193 13.7256C24.3665 14.0485 24.8 14.2637 25.2671 14.345L25.3729 14.3612C25.6689 14.3999 25.9466 14.5255 26.1712 14.7221C26.3957 14.9188 26.5568 15.1775 26.6342 15.4658L27.2088 17.6092C27.2755 17.8578 27.2925 18.117 27.259 18.3722C27.2255 18.6273 27.142 18.8734 27.0134 19.0962C26.8847 19.3191 26.7135 19.5145 26.5093 19.6712C26.3052 19.8278 26.0722 19.9428 25.8236 20.0094L5.95141 25.3338C5.44951 25.4681 4.9148 25.3976 4.46488 25.1377C4.01496 24.8779 3.68669 24.4499 3.55225 23.948L3.01197 21.9314C2.93174 21.6313 2.9348 21.315 3.02085 21.0165C3.10689 20.7179 3.27266 20.4485 3.50033 20.2371L3.58017 20.1686C3.94623 19.8699 4.21812 19.4718 4.36309 19.0222C4.50805 18.5725 4.51991 18.0906 4.39722 17.6343C4.27453 17.1781 4.02254 16.7671 3.6716 16.4508C3.32067 16.1345 2.88576 15.9265 2.41929 15.8517C2.09666 15.7997 1.79597 15.6555 1.55342 15.4365C1.31086 15.2175 1.1368 14.933 1.05219 14.6174L0.509461 12.5929C0.44288 12.3444 0.425921 12.0851 0.459554 11.83C0.493187 11.5748 0.576753 11.3288 0.705479 11.106C0.834205 10.8831 1.00557 10.6878 1.20978 10.5312C1.414 10.3746 1.64706 10.2598 1.89566 10.1933L21.7664 4.86889C22.0149 4.80222 22.2742 4.78517 22.5293 4.8187C22.7845 4.85224 23.0305 4.9357 23.2534 5.06434C23.4763 5.19297 23.6716 5.36425 23.8283 5.5684C23.985 5.77254 24.0999 6.00555 24.1665 6.25412M22.1264 6.55144L2.42516 11.8303C2.15331 11.9033 1.99167 12.183 2.06465 12.4548L2.45211 13.9013C3.28996 14.0701 4.06404 14.4695 4.68714 15.0545C5.31024 15.6395 5.7576 16.3869 5.97884 17.2125C6.20011 18.0381 6.18644 18.9091 5.93936 19.7273C5.69228 20.5456 5.22162 21.2786 4.58039 21.8438L4.96784 23.2902C5.04132 23.5621 5.32052 23.7237 5.59237 23.6507L25.2931 18.3719C25.565 18.2989 25.7266 18.0192 25.6536 17.7474L25.2667 16.3014C24.4287 16.1325 23.6546 15.7331 23.0315 15.148C22.4084 14.5628 21.9611 13.8153 21.7399 12.9897C21.5186 12.1641 21.5322 11.2932 21.7792 10.4749C22.0262 9.65666 22.4967 8.92363 23.1379 8.3584L22.7504 6.91195C22.7331 6.84724 22.7033 6.78657 22.6625 6.73342C22.6218 6.68026 22.5709 6.63566 22.5129 6.60218C22.4549 6.56869 22.3909 6.54698 22.3245 6.53827C22.2581 6.52956 22.1911 6.53404 22.1264 6.55144ZM21.4975 17.1116C21.5474 17.298 21.5601 17.4924 21.5349 17.6837C21.5096 17.875 21.447 18.0595 21.3505 18.2266C21.2539 18.3938 21.1255 18.5402 20.9723 18.6577C20.8192 18.7751 20.6445 18.8613 20.458 18.9112C20.2716 18.9611 20.0772 18.9738 19.8859 18.9486C19.6946 18.9234 19.5101 18.8607 19.343 18.7642C19.1759 18.6677 19.0294 18.5392 18.9119 18.3861C18.7945 18.2329 18.7084 18.0582 18.6584 17.8718C18.5576 17.4953 18.6105 17.0942 18.8054 16.7567C19.0004 16.4192 19.3214 16.173 19.6978 16.0722C20.0743 15.9713 20.4754 16.0242 20.8129 16.2192C21.1504 16.4141 21.3966 16.7351 21.4975 17.1116ZM20.4835 13.3262C20.5844 13.7027 20.5316 14.1038 20.3367 14.4414C20.1418 14.7789 19.8208 15.0252 19.4444 15.1261C19.0679 15.2269 18.6667 15.1741 18.3292 14.9792C17.9917 14.7844 17.7454 14.4634 17.6445 14.0869C17.5494 13.7124 17.6056 13.3155 17.8009 12.9821C17.9963 12.6488 18.3151 12.4058 18.6884 12.3057C19.0616 12.2057 19.4592 12.2567 19.7951 12.4477C20.131 12.6387 20.3786 12.9543 20.4835 13.3262ZM19.4686 9.54133C19.5186 9.72774 19.5313 9.92217 19.5061 10.1135C19.4809 10.3048 19.4183 10.4893 19.3218 10.6565C19.2253 10.8236 19.0968 10.9701 18.9437 11.0876C18.7906 11.2051 18.6159 11.2912 18.4294 11.3412C18.243 11.3911 18.0486 11.4039 17.8573 11.3787C17.6659 11.3535 17.4814 11.2909 17.3143 11.1944C17.1472 11.0979 17.0007 10.9694 16.8832 10.8163C16.7657 10.6632 16.6795 10.4884 16.6296 10.302C16.5287 9.92555 16.5815 9.52442 16.7764 9.18688C16.9713 8.84934 17.2923 8.60304 17.6687 8.50217C18.0452 8.40129 18.4464 8.4541 18.7839 8.64899C19.1214 8.84387 19.3677 9.16485 19.4686 9.54133ZM14.3926 3.10896L15.6426 4.89388C15.6609 4.92033 15.6783 4.9471 15.695 4.97421L3.73593 8.17864L11.6637 2.62746C12.0894 2.32958 12.616 2.21297 13.1276 2.30326C13.6392 2.39356 14.0946 2.68337 14.3926 3.10896Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_350_141">
        <rect
          width="27.4302"
          height="27.4302"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaTimerIcon.vue
````vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.2863 3.42879V1.14294H17.1438V3.42879H10.2863ZM12.5721 16.001H14.8579V9.14341H12.5721V16.001ZM9.72851 24.3306C8.4812 23.7873 7.39085 23.049 6.45746 22.1156C5.52407 21.1822 4.78612 20.0915 4.24362 18.8434C3.70111 17.5953 3.42947 16.2669 3.42871 14.858C3.42795 13.4492 3.69959 12.1203 4.24362 10.8715C4.78765 9.62268 5.5256 8.53233 6.45746 7.60046C7.38932 6.6686 8.48005 5.93065 9.72965 5.38662C10.9792 4.84259 12.3077 4.57095 13.715 4.57172C14.896 4.57172 16.0294 4.7622 17.1152 5.14318C18.201 5.52415 19.2201 6.07656 20.1725 6.80042L21.7726 5.20032L23.3727 6.80042L21.7726 8.40051C22.4965 9.35295 23.0489 10.3721 23.4299 11.4578C23.8109 12.5436 24.0013 13.677 24.0013 14.858C24.0013 16.2676 23.7297 17.5965 23.1864 18.8445C22.6432 20.0926 21.9052 21.183 20.9726 22.1156C20.04 23.0482 18.9492 23.7865 17.7004 24.3306C16.4516 24.8746 15.1231 25.1459 13.715 25.1443C12.3069 25.1428 10.9781 24.8716 9.72851 24.3306ZM19.3725 20.5155C20.9345 18.9535 21.7155 17.0677 21.7155 14.858C21.7155 12.6484 20.9345 10.7626 19.3725 9.20056C17.8105 7.63856 15.9247 6.85756 13.715 6.85756C11.5054 6.85756 9.61955 7.63856 8.05755 9.20056C6.49556 10.7626 5.71456 12.6484 5.71456 14.858C5.71456 17.0677 6.49556 18.9535 8.05755 20.5155C9.61955 22.0775 11.5054 22.8585 13.715 22.8585C15.9247 22.8585 17.8105 22.0775 19.3725 20.5155Z"
      fill="white"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaWorldIcon.vue
````vue
<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 7.5H17M3 12.5H17M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5C8.01088 2.5 6.10322 3.29018 4.6967 4.6967C3.29018 6.10322 2.5 8.01088 2.5 10Z"
      stroke="white"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.58322 2.5C8.17934 4.74968 7.43506 7.34822 7.43506 10C7.43506 12.6518 8.17934 15.2503 9.58322 17.5M10.4166 2.5C11.8204 4.74968 12.5647 7.34822 12.5647 10C12.5647 12.6518 11.8204 15.2503 10.4166 17.5"
      stroke="white"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
````

## File: layers/main/app/components/ha/icons/HaXIcon.vue
````vue
<template>
  <svg
    width="29"
    height="29"
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_287_95)">
      <mask
        id="mask0_287_95"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="29"
        height="29"
      >
        <path
          d="M0 0H28.9863V28.9863H0V0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_287_95)">
        <path
          d="M22.8267 1.3584H27.272L17.5616 12.485L28.9863 27.6283H20.042L13.0314 18.4458L5.01877 27.6283H0.569374L10.9547 15.7232L0 1.36047H9.17209L15.4994 9.752L22.8267 1.3584ZM21.2635 24.9615H23.7274L7.8263 3.88642H5.1844L21.2635 24.9615Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_287_95">
        <rect
          width="28.9863"
          height="28.9863"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
````

## File: layers/main/app/components/ha/HaAboutCard.vue
````vue
<!-- components/GlassCard.vue -->
<script setup lang="ts">
defineProps<{
  color: 'cyan' | 'magenta' | 'amber' | 'vermilion' | 'light-cyan' | 'light-magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
}>()
</script>

<template>
  <div :class="['glassy-box about-card', `glassy-box--${color ?? 'cyan'}`]">
    <div class="about-card__icon glassy-box__icon">
      <slot name="icon" />
    </div>
    <h3 class="title">
      <slot name="title" />
    </h3>
    <div class="card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.about-card {
  padding: 20px;

  &__icon {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    border-radius:1000px;
  }

  &__body {
    font-size: 13px;
    line-height: 1.2em;
  }
}
</style>
````

## File: layers/main/app/components/ha/HaConductCard.vue
````vue
<template>
  <div
    class="conduct-card glassy-box-2"
    :class="`conduct-card--${color}`"
  >
    <div class="conduct-card__icon">
      <slot name="icon" />
    </div>
    <div class="conduct-card__text-box">
      <p class="conduct-card__title">
        {{ title }}
      </p>
      <p class="conduct-card__text">
        <slot
          class="conduct-card__text"
          name="text"
        />
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  color: {
    type: String,
    validator: value => ['cyan', 'magenta', 'amber', 'vermilion'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.conduct-card {
    display: flex;
    gap: 24px;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 24px 36px;

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
        font-size: 20px;
        font-weight: 700;
    }

    &__text {
        font-size: 13px;
        line-height: 1em;
        color: white;
    }

    &--magenta {
        .conduct-card__icon {
            background-color: rgba(v.$vket-magenta, 0.6);
        }

        .conduct-card__title {
            color: v.$vket-magenta;
        }
    }

    &--cyan {
        .conduct-card__icon {
            background-color: rgba(v.$vket-cyan, 0.6);
        }

        .conduct-card__title {
            color: v.$vket-cyan;
        }
    }

    &--amber {
        .conduct-card__icon {
            background-color: rgba(v.$vket-amber, 0.6);
        }

        .conduct-card__title {
            color: v.$vket-amber;
        }
    }

    &--vermilion {
        .conduct-card__icon {
            background-color: rgba(v.$vket-vermilion, 0.6);
        }

        .conduct-card__title {
            color: v.$vket-vermilion;
        }
    }
}
</style>
````

## File: layers/main/app/components/ha/HaContactCard.vue
````vue
<template>
  <div
    class="contact-card glassy-box-2"
    :class="`contact-card--${color}`"
  >
    <div class="contact-card__icon">
      <slot name="icon" />
    </div>
    <p class="contact-card__title">
      {{ title }}
    </p>
    <NuxtLink class="jump-to-form">
      <p class="jump-to-form__text">
        {{ text }}<br>
      </p>
      <div class="jump-to-form__flex">
        <span class="jump-to-form__text jump-to-form__text-underline">フォームへ</span>
        <HaJumpToPageIcon class="jump-to-form__icon" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import HaJumpToPageIcon from './icons/HaJumpToPageIcon.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    validator: value => ['cyan', 'magenta', 'amber', 'vermilion'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

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
  }

  &__link {
    font-size: 14px;
    color: v.$vket-green;

    &__underline {
      text-decoration: underline;
    }
  }

  &--magenta {
      .contact-card__icon {
        background-color: rgba(v.$vket-magenta, 0.8);
      }
    }

    &--cyan {
      .contact-card__icon {
        background-color: rgba(v.$vket-cyan, 0.8);
      }
    }

    &--amber {
      .contact-card__icon {
        background-color: rgba(v.$vket-amber, 0.8);
      }
    }

    &--vermilion {
      .contact-card__icon {
        background-color: rgba(v.$vket-vermilion, 0.8);
      }
    }
}

.jump-to-form {
  display: flex;
  flex-direction: column;
  align-items: center;

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

    &--underline {
      font-size: 12px;
      text-decoration: underline;
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
  }
}
</style>
````

## File: layers/main/app/components/ha/HaDocumentLink.vue
````vue
<script setup lang="ts">
defineProps<{
  color: 'green' | 'cyan' | 'magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
  title: string
  label: 'important' | 'required' | 'Q&A'
  text: string
}>()
</script>

<template>
  <div class="document-link">
    <div :class="['document-link__left', `document-link__left--${color}`]">
      <slot name="icon" />
    </div>
    <div class="document-link__right">
      <div class="document-link__row">
        <p class="document-link__title">
          出展ガイドライン
        </p>
        <div :class="['document-link__label', `document-link__label--${label=='important' ? 'amber' : label=='required' ? 'vermilion' : label=='Q&A' ? 'magenta' : ''}`]">
          <p class="document-link__label-text">
            {{ label=='important' ? '重要' : label=='required' ? '必読' : label=='Q&A' ? 'Q&A' : '' }}
          </p>
        </div>
      </div>
      <p class="document-link__text">
        出展に必要なルール・準備事項をまとめた公式ガイド
      </p>
      <NuxtLink class="document-link__link">全文をチェック→</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.document-link {
    overflow: hidden;
    display: flex;

    min-height: 150px;
    border-radius: 20px;

    background: rgb(217 217 217 / 20%);

    @include m.tb {
      min-height: 105px;
    }

  &__left {
    position: relative;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 286px;
    height: inherit;
    border-radius: 20px 0 0 20px;

    @include m.tb {
      width: 124px;
    }

    &::before {
      content: "";

      position: absolute;
      inset: 0;

      border: 1.5px solid transparent;
      border-radius: 20px 0 0 20px;

      background-image:
        linear-gradient(
          135deg,
          rgb(255 255 255 / 30%) 20px,
          rgb(255 255 255 / 0%) 150px
        ),
        linear-gradient(
          to left,
          rgb(255 255 255 / 10%),
          rgb(255 255 255 / 10%)
        );
      background-clip: border-box, border-box;
      background-origin: border-box, border-box;

      -webkit-mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }

    &--green {
        background-color: rgba(#43ffbd, 0.4);
    }

    &--cyan {
        background-color: rgba(v.$vket-cyan, 0.4);
    }

    &--magenta {
        background-color: rgba(v.$vket-magenta, 0.4);
    }

    &__icon {
      width: 40px;
      height: 40px;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
    justify-content: center;

    width: 100px;
    height: inherit;
    padding: 18px 22px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

    &__title {
        font-size: 20px;
        font-weight: 700;
        color: white;
    }

    &__text {
        font-size: 14px;
        color: white;
    }

    &__link {
        font-size: 12px;
        color: #43ffbd;
        text-decoration: underline;
    }

    &__label {
        width: fit-content;
        padding: 3px 5px;
        border-radius: 6px;

        &--amber {
            background-color: rgba(v.$vket-amber, 0.6);
        }

        &--vermilion {
            background-color: rgba(v.$vket-vermilion, 0.6);
        }

        &--magenta {
            background-color: rgba(v.$vket-magenta, 0.6);
        }
    }

    &__label-text {
        font-size: 14px;
        font-weight: 400;
        color: white;
    }
}
</style>
````

## File: layers/main/app/components/ha/HaFirstView.vue
````vue
<template>
  <div class="fv">
    <h2 class="fv__title">
      リアルとバーチャルの境界を、
      <br>
      <span class="fv__title--bold">開拓せよ。</span>
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.fv{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100svw;
    height: 1100px; // FIXME: 仮置き

    &__title {
        font-size: 64px;
        font-weight: 700;
        line-height: 1.6em;
        color: v.$vket-vermilion;
        text-align: center;

        @include m.tb {
          font-size: 36px;
        }

        &--bold {
            font-size: 128px;
            font-weight: inherit;
            color: white;
            text-shadow: 0 5px 20px v.$vket-amber;

            @include m.tb {
              font-size: 96px;
            }
        }
    }
}
</style>
````

## File: layers/main/app/components/ha/HaInfoCard.vue
````vue
<script setup lang="ts">
import HaInfoIcon from './icons/HaInfoIcon.vue'
</script>

<template>
  <div class="info-card glassy-box-2">
    <div class="info-card__head">
      <div class="info-card__icon">
        <ha-info-icon />
      </div>
      <h4 class="info-card__title">
        イベント概要
      </h4>
    </div>
    <div class="info-card__body">
      <div class="info-card__items">
        <div class="info-card__item">
          <p class="info-card__label">
            開催日時
          </p>
          <p class="info-card__text">
            2026年 9月26日(土)
          </p>
        </div>
        <div class="info-card__item">
          <p class="info-card__label">
            会場
          </p>
          <p class="info-card__text">
            札幌市中央区 アスティーホール<br>(北4条西5丁目1 4F)
          </p>
        </div>
        <div class="info-card__item">
          <p class="info-card__label">
            参加費
          </p>
          <p class="info-card__text">
            チケット
          </p>
        </div>
        <div class="info-card__item">
          <p class="info-card__label">
            主催
          </p>
          <p class="info-card__text">
            VketReal in 札幌 実行委員会
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.info-card {
  display: flex;
  flex-direction: column;
  gap: 6px;

  width: 100%;
  height: 100%;
  min-height: 340px;
  padding: 24px;

  &__head {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    border-radius: 5px;

    background: rgb(30 53 91 / 100%);

    svg {
      width: 50%;
      height: 50%;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
  }

  &__body {
    flex-grow: 1;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 16px 0;
    border-bottom: 1px solid rgb(86 86 86 / 100%);

    &:last-of-type {
      border: none;
    }
  }

  &__label {
    font-size: 16px;
    font-weight: bold;
    color: v.$vket-amber;
  }

  &__text {
    font-size: 16px;
    color: white;
    text-align: right;
  }
}
</style>
````

## File: layers/main/app/components/ha/HaQuickAccessCard.vue
````vue
<!-- components/GlassCard.vue -->
<script setup lang="ts">
import HaArrowRight from './icons/HaArrowRight.vue'

defineProps<{
  color: 'cyan' | 'magenta' | 'amber' | 'vermilion' | 'light-cyan' | 'light-magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
  title: string
  label: string
}>()
</script>

<template>
  <div
    :class="['glassy-box quick-access-card', `glassy-box--${color ?? 'cyan'}`]"
  >
    <div class="quick-access-card__head">
      <div class="quick-access-card__head-left">
        <div class="glassy-box__icon">
          <slot name="icon" />
        </div>
        <div class="title-box">
          <p class="label">
            {{ label }}
          </p>
          <h3 class="title">
            {{ title }}
          </h3>
        </div>
      </div>
      <div class="quick-access-card__head-right">
        <HaArrowRight />
      </div>
    </div>
    <div class="quick-access-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.quick-access-card {
  padding: 22px 36px;

  &__head{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__head-left {
    display: flex;
    gap: 12px;
  }

  .title-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: inherit;
    padding: 4px 0;

    .label{
      font-size: 10px;
      font-weight: 700;
      line-height: 1em;
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1em;
    }
  }
}
</style>
````

## File: layers/main/app/components/ha/HaSponsorCard.vue
````vue
<template>
  <div class="sponsor-card glassy-box-2">
    <div class="sponsor-card__img">
      <img
        :src="imgSrc"
        :alt="name"
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
defineProps<{
  imgSrc?: string
  label: string
  name: string
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.sponsor-card {
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
  padding: 24px 36px;

  &__img {
    aspect-ratio: 1/1;
    width: 100%;
    margin-bottom: 12px;
    background-color: gray;

    img {
        width: 100%;
    }
  }

  &__label {
    margin-bottom: 12px;
    font-size: 12px;
    line-height: 1em;
    color: white;
  }

  &__name {
    font-size: 24px;
    font-weight: 700;
    line-height: 1em;
    color: white;
  }
}
</style>
````

## File: layers/main/app/components/ha/HaTicketCard.vue
````vue
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

<script setup lang="ts">
defineProps<{
  title: string
  desc: string
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
````

## File: layers/main/app/components/ho/HoTheHeader.vue
````vue
<i18n lang="yaml">
ja:
  mainlogo: ロゴ名サービス名
en:
  mainlogo: logo name
</i18n>

<template>
  <header class="ho-the-header" />
</template>

<script lang="ts" setup>
/*
 * const props = withDefaults(
 *   defineProps<{
 *   hoge: boolean
 *   fuga?: string
 * }>(),
 * {
 *   hoge: false
 * })
 */
</script>

<style scoped lang="scss">
// .ho-the-header{}
</style>
````

## File: layers/main/app/components/ht/HtAccessSection.vue
````vue
<script setup lang="ts">
import HaInfoCard from '../ha/HaInfoCard.vue'
</script>

<template>
  <HaSectionTitle
    title="アクセス"
    label="access"
  />
  <div class="access-flex mb-30">
    <div class="access-flex__left map-container" />
    <HaInfoCard class="access-flex__right" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.access-flex {
    display: flex;
    gap: 40px;

    @include m.tb {
      flex-direction: column;
    }

    &__left {
        background-color: #ffffff70;

        @include m.tb {
          min-height: 480px;
        }
    }

    &__left, &__right {
        width: 100%;
    }
}

.mb-30 {
    margin-bottom: 120px;
}
</style>
````

## File: layers/main/app/components/ht/HtCodeOfConductSection.vue
````vue
<script setup lang="ts">
import HaConductCard from '../ha/HaConductCard.vue'
import HaCamera from '../ha/icons/HaCameraIcon.vue'
import HaDangerIcon from '../ha/icons/HaDangerIcon.vue'
import HaHeartIcon from '../ha/icons/HaHeartIcon.vue'
import HaShieldIcon from '../ha/icons/HaShieldIcon.vue'
</script>

<template>
  <HaSectionTitle
    title="行動規範"
    label="CODE OF CONDUCT"
  />
  <p class="subtitle subtitle--left mb-24">
    すべての参加者が安全で楽しい時間を過ごせるよう、<br>
    以下の行動規範を守ってください。
  </p>
  <div class="conduct-grid mb-15">
    <HaConductCard
      title="互いを尊重しましょう"
      color="magenta"
    >
      <template #icon>
        <HaHeartIcon />
      </template>
      <template #text>
        すべての参加者の多様性を尊重し、<br>ハラスメントや差別的な行為は禁止です。
      </template>
    </HaConductCard>
    <HaConductCard
      title="撮影マナーを守りましょう"
      text="descriptiondescriptiondescription"
      color="cyan"
    >
      <template #icon>
        <HaCamera />
      </template>
      <template #text>
        他の参加者を撮影する際は必ず許可を取り、<br>撮影禁止エリアでは撮影をお控えください。
      </template>
    </HaConductCard>
    <HaConductCard
      title="安全に配慮しましょう"
      text="descriptiondescriptiondescription"
      color="amber"
    >
      <template #icon>
        <HaDangerIcon />
      </template>
      <template #text>
        会場内では走らない、通路をふさがないなど、<br>安全な行動を心掛けてください。
      </template>
    </HaConductCard>
    <HaConductCard
      title="スタッフの指示に従いましょう"
      text="descriptiondescriptiondescription"
      color="vermilion"
    >
      <template #icon>
        <HaShieldIcon />
      </template>
      <template #text>
        スタッフの指示に従い、<br>問題があれば速やかにスタッフにお知らせください。
      </template>
    </HaConductCard>
  </div>
  <button class="glassy-button-3 conduct__button">
    詳細を確認
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.mb-15 {
  margin-bottom: 60px;
}

.conduct-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  width: 100%;
  margin-right: auto;
  margin-left:auto;

  @include m.tb {
    grid-template-columns: 1fr;
    width: 60%;
  }
}

.conduct {
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 185px;
    height: 57px;
    margin: 0 auto;

    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;

    background-color: #e5b5ff3b;

    @include m.tb {
      width: 130px;
      height: 40px;
    }
  }
}
</style>
````

## File: layers/main/app/components/ht/HtContactSection.vue
````vue
<script setup lang="ts">
import HaContactCard from '../ha/HaContactCard.vue'
import HaDangerIcon from '../ha/icons/HaDangerIcon.vue'
</script>

<template>
  <HaSectionTitle
    title="お問い合わせ"
    label="CONTACT"
  />
  <p class="subtitle subtitle--left mb-24">
    持続可能なイベント開催のため、<br>
    チケット制でのご参加にご協力をお願いいたします。<br>
    チケットは複数種類を用意予定です。
  </p>
  <div class="Contact-grid">
    <HaContactCard
      title="個人向けお問い合わせ"
      text="一般の方からのお問い合わせはこちら"
      color="amber"
    >
      <template #icon>
        <HaDangerIcon />
      </template>
    </HaContactCard>
    <HaContactCard
      title="法人向けお問い合わせ"
      text="企業・法人の方からのお問い合わせはこちら"
      color="cyan"
    >
      <template #icon>
        <HaDangerIcon />
      </template>
    </HaContactCard>
    <HaContactCard
      title="広報向けお問い合わせ"
      text="メディア・広報関連のお問い合わせはこちら"
      color="magenta"
      class="Contact-grid__item--full-width"
    >
      <template #icon>
        <HaDangerIcon />
      </template>
    </HaContactCard>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.Contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;

  &__item {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
````

## File: layers/main/app/components/ht/HtQandASection.vue
````vue
<script setup lang="ts">
import HaAccordionItem from '../ha/HaAccordionItem.vue'

const items = [
  { id: 1, title: 'Vket Real in 札幌とはどのようなイベントですか？', contents: ['Vket Real in 札幌は、世界最大級のメタバースイベント「バーチャルマーケットから派生した、北海道の有志XRクリエイターが主催するリアルイベントです。', 'VRSNSユーザーがバーチャルの姿のままリアルの場で集い、交流し、新たな文化を創造する場を目指しています。'] },
  { id: 2, title: 'Vket Real in 札幌とはどのようなイベントですか？', contents: ['内容内容内容内容'] },
  { id: 3, title: 'Vket Real in 札幌とはどのようなイベントですか？', contents: ['内容内容内容内容'] },
]
</script>

<template>
  <HaSectionTitle
    title="よくある質問"
    label="Q&A"
  />
  <HaAccordionItem :items="items">
    <template #content="{ item }">
      <p
        v-for="(content, index) in item.contents"
        :key="`${item.id}-${index}`"
      >
        {{ content }}
      </p>
    </template>
  </HaAccordionItem>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px;
}

.ticket-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 275px 275px;
  gap: 12px 24px;

  &__item {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
````

## File: layers/main/app/components/ht/HtSponsorsAndPartnersSection.vue
````vue
<script setup lang="ts">
import HaSponsorCard from '../ha/HaSponsorCard.vue'
</script>

<template>
  <HaSectionTitle
    title="ご協力"
    label="SPONSORS & PARTNERS"
  />
  <div class="sponsor-grid">
    <HaSponsorCard
      label="企業出展"
      name="〇〇〇 様"
    />
    <HaSponsorCard
      label="企業出展"
      name="〇〇〇 様"
    />
    <HaSponsorCard
      label="企業出展"
      name="〇〇〇 様"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.sponsor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;

  @include m.tb {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
````

## File: layers/main/app/components/ht/HtTicketSection.vue
````vue
<script setup lang="ts">
import HaTicketCard from '../ha/HaTicketCard.vue'
</script>

<template>
  <HaSectionTitle
    title="チケット"
    label="tickets"
  />
  <p class="subtitle subtitle--left mb-24">
    持続可能なイベント開催のため、<br>
    チケット制でのご参加にご協力をお願いいたします。<br>
    チケットは複数種類を用意予定です。
  </p>
  <div class="ticket-grid">
    <HaTicketCard
      title="チケット①"
      desc="descriptiondescriptiondescription"
    />
    <HaTicketCard
      title="チケット②"
      desc="descriptiondescriptiondescription"
    />
    <HaTicketCard
      title="チケット③"
      desc="descriptiondescriptiondescription"
      class="ticket-grid__item--full-width"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.ticket-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 275px 275px;
  gap: 12px 24px;

  @include m.tb {
    grid-template-rows: 166px 166px;
    gap: 12px 16px;
  }

  &__item {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
````

## File: layers/main/app/composables/useApi.ts
````typescript
/**
 * Nuxt3 FWにおける API composables。
 *
 * @packageDocumentation
 */

import type { UseFetchOptions } from 'nuxt/app'
import { useFetch } from 'nuxt/app'
import type { FetchOptions } from 'ofetch'
import { ref } from 'vue'
import type { RepositoryKey } from '@/utils/factory'
import { repositoryFactory } from '@/utils/factory'

export const fetcher = (
  path: string,
  options: UseFetchOptions<FetchOptions>,
) => {
  return useFetch(path, options)
}

const _getRepo = <K extends RepositoryKey>(endpoint: K) => {
  return repositoryFactory.get(endpoint)
}

export default function useApi<K extends RepositoryKey>(endpoint: K) {
  const repository = ref(_getRepo(endpoint))
  return {
    repository,
  }
}
````

## File: layers/main/app/layouts/default.vue
````vue
<template>
  <div class="layout -default">
    <HoTheHeader />
    <slot />
    <HoTheFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout.-default {
  overflow-x: hidden;
}
</style>
````

## File: layers/main/app/layouts/top.vue
````vue
<template>
  <div class="layout -top">
    <HoTheHeader />
    <slot />
    <HoTheFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout.-top {
  overflow-x: hidden;
}
</style>
````

## File: layers/main/app/middleware/.gitkeep
````

````

## File: layers/main/app/models/json.ts
````typescript
/**
 * @group For Developers
 * @category Type Definitions
 * @module Json
 * @reference https://zod.dev/?id=json-type
 */

import { z } from 'zod/v3'

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
type Literal = z.infer<typeof literalSchema>
type JsonType = Literal | { [key: string]: JsonType } | JsonType[]
export const jsonSchema: z.ZodType<JsonType> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
)
export type Json = z.infer<typeof jsonSchema>
````

## File: layers/main/app/models/todo.ts
````typescript
import { z } from 'zod/v3'
import { integral } from '#base/app/utils/zod'

export const todoSchema = z.object({
  userId: integral, // NOTE: バックエンドの仕様が不安定な場合は、integralで型を広く持っておこう
  id: integral,
  title: z.string(),
  completed: z.boolean(),
})

export type Todo = z.infer<typeof todoSchema>
````

## File: layers/main/app/pages/index.vue
````vue
<template>
  <HtTop />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'top',
})
</script>
````

## File: layers/main/app/plugins/gtm.client.ts
````typescript
import { createGtm } from '@gtm-support/vue-gtm'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  createGtm({ id: config.public?.gtmId, enabled: true })
})
````

## File: layers/main/app/plugins/runtimeConfig.ts
````typescript
import { defineNuxtPlugin } from 'nuxt/app'
import type { RuntimeConfig } from 'nuxt/schema'

/**
 * 型を退化されたruntimeConfig。
 * [[requireRuntimeConfig]]のために、退化されました。
 */
let runtimeConfig: RuntimeConfig | undefined

export default defineNuxtPlugin(({ $config }) => {
  if ($config === undefined) {
    throw new TypeError('@/plugins/runtimeConfig failed.')
  }
  runtimeConfig = $config
})

type Config = Record<string, string | undefined>
type ProcessEnv = Config & {
  public?: Config
}
/**
 * useRuntimeConfig()が使えないときに使う、同等な関数。
 */
export const requireRuntimeConfig: () => ProcessEnv | RuntimeConfig = () => {
  if (runtimeConfig !== undefined) {
    return runtimeConfig
  }

  // playwrightテスト用
  if (process?.env !== undefined) {
    return process.env
  }

  throw new TypeError('@/plugins/runtimeConfig: Not satisfied.')
}
````

## File: layers/main/app/repositories/.gitkeep
````

````

## File: layers/main/app/test/composables/useApi.spec.ts
````typescript
// NOTE: そもそももっといいテストあれば是非
import { test, expect, vi } from 'vitest'
import type { UseFetchOptions } from 'nuxt/app'
import type { FetchOptions } from 'ofetch'
import useApi, { fetcher } from '@/composables/useApi'

vi.mock('nuxt/app', async (importOriginal) => {
  const actual = await importOriginal<typeof import('nuxt/app')>()
  return {
    ...actual,
    // NOTE: 本テストにおいて実際にAPI叩くわけではなく、useFetchをすげ替えたいのでダミーとなるmock作成
    useFetch: vi.fn((path: string, options: UseFetchOptions<FetchOptions>) => {
      return { path, options }
    }),
  }
})

test('useApi', () => {
  // NOTE: useApiで使用できるRepositoryKeyを入れた際にオブジェクトが返ってくること。この場合useApi('hoge')など存在しない場合はテストが落ちる
  const useApiExample = useApi('example').repository.value
  const expectObj = { get: {} }
  expect(useApiExample).toMatchObject(expectObj)
})

test('fetcher', () => {
  const path = '/example'
  const options = {}
  // useFetchが発火することを確認。戻り値はmockの戻り値とする
  expect(fetcher(path, options)).toStrictEqual({ path, options })
})
````

## File: layers/main/app/test/utils/@types/auto-imports.d.ts
````typescript
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by unplugin-auto-import
// biome-ignore lint: disable
export {}
declare global {
  const EffectScope: typeof import('vue')['EffectScope']
  const abortNavigation: typeof import('#app')['abortNavigation']
  const addRouteMiddleware: typeof import('#app')['addRouteMiddleware']
  const cancelIdleCallback: typeof import('#app')['cancelIdleCallback']
  const clearError: typeof import('#app')['clearError']
  const clearNuxtData: typeof import('#app')['clearNuxtData']
  const clearNuxtState: typeof import('#app')['clearNuxtState']
  const computed: typeof import('vue')['computed']
  const createApp: typeof import('vue')['createApp']
  const createError: typeof import('#app')['createError']
  const customRef: typeof import('vue')['customRef']
  const defineAppConfig: typeof import('#app')['defineAppConfig']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const defineI18nConfig: typeof import('#i18n')['defineI18nConfig']
  const defineI18nLocale: typeof import('#i18n')['defineI18nLocale']
  const defineI18nRoute: typeof import('#i18n')['defineI18nRoute']
  const defineNuxtComponent: typeof import('#app')['defineNuxtComponent']
  const defineNuxtLink: typeof import('#app')['defineNuxtLink']
  const defineNuxtPlugin: typeof import('#app')['defineNuxtPlugin']
  const defineNuxtRouteMiddleware: typeof import('#app')['defineNuxtRouteMiddleware']
  const definePayloadPlugin: typeof import('#app')['definePayloadPlugin']
  const definePayloadReducer: typeof import('#app')['definePayloadReducer']
  const definePayloadReviver: typeof import('#app')['definePayloadReviver']
  const effectScope: typeof import('vue')['effectScope']
  const getAppManifest: typeof import('#app')['getAppManifest']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const getRouteRules: typeof import('#app')['getRouteRules']
  const h: typeof import('vue')['h']
  const inject: typeof import('vue')['inject']
  const isNuxtError: typeof import('#app')['isNuxtError']
  const isPrerendered: typeof import('#app')['isPrerendered']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const loadPayload: typeof import('#app')['loadPayload']
  const markRaw: typeof import('vue')['markRaw']
  const navigateTo: typeof import('#app')['navigateTo']
  const nextTick: typeof import('vue')['nextTick']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeRouteLeave: typeof import('#app')['onBeforeRouteLeave']
  const onBeforeRouteUpdate: typeof import('#app')['onBeforeRouteUpdate']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onNuxtReady: typeof import('#app')['onNuxtReady']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const onWatcherCleanup: typeof import('vue')['onWatcherCleanup']
  const prefetchComponents: typeof import('#app')['prefetchComponents']
  const preloadComponents: typeof import('#app')['preloadComponents']
  const preloadPayload: typeof import('#app')['preloadPayload']
  const preloadRouteComponents: typeof import('#app')['preloadRouteComponents']
  const prerenderRoutes: typeof import('#app')['prerenderRoutes']
  const provide: typeof import('vue')['provide']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const refreshNuxtData: typeof import('#app')['refreshNuxtData']
  const reloadNuxtApp: typeof import('#app')['reloadNuxtApp']
  const requestIdleCallback: typeof import('#app')['requestIdleCallback']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const setPageLayout: typeof import('#app')['setPageLayout']
  const setResponseStatus: typeof import('#app')['setResponseStatus']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const showError: typeof import('#app')['showError']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const toValue: typeof import('vue')['toValue']
  const triggerRef: typeof import('vue')['triggerRef']
  const unref: typeof import('vue')['unref']
  const updateAppConfig: typeof import('#app')['updateAppConfig']
  const useAppConfig: typeof import('#app')['useAppConfig']
  const useAsyncData: typeof import('#app')['useAsyncData']
  const useAttrs: typeof import('vue')['useAttrs']
  const useBrowserLocale: typeof import('#i18n')['useBrowserLocale']
  const useCookie: typeof import('#app')['useCookie']
  const useCookieLocale: typeof import('#i18n')['useCookieLocale']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useError: typeof import('#app')['useError']
  const useFetch: typeof import('#app')['useFetch']
  const useI18n: typeof import('vue-i18n')['useI18n']
  const useId: typeof import('vue')['useId']
  const useLazyAsyncData: typeof import('#app')['useLazyAsyncData']
  const useLazyFetch: typeof import('#app')['useLazyFetch']
  const useLocaleHead: typeof import('#i18n')['useLocaleHead']
  const useLocalePath: typeof import('#i18n')['useLocalePath']
  const useLocaleRoute: typeof import('#i18n')['useLocaleRoute']
  const useModel: typeof import('vue')['useModel']
  const useNuxtApp: typeof import('#app')['useNuxtApp']
  const useNuxtData: typeof import('#app')['useNuxtData']
  const useRequestEvent: typeof import('#app')['useRequestEvent']
  const useRequestFetch: typeof import('#app')['useRequestFetch']
  const useRequestHeaders: typeof import('#app')['useRequestHeaders']
  const useRequestURL: typeof import('#app')['useRequestURL']
  const useRoute: typeof import('#app')['useRoute']
  const useRouteBaseName: typeof import('#i18n')['useRouteBaseName']
  const useRouter: typeof import('#app')['useRouter']
  const useRuntimeConfig: typeof import('#app')['useRuntimeConfig']
  const useSlots: typeof import('vue')['useSlots']
  const useState: typeof import('#app')['useState']
  const useSwitchLocalePath: typeof import('#i18n')['useSwitchLocalePath']
  const useTemplateRef: typeof import('vue')['useTemplateRef']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { Component, ComponentPublicInstance, ComputedRef, DirectiveBinding, ExtractDefaultPropTypes, ExtractPropTypes, ExtractPublicPropTypes, InjectionKey, PropType, Ref, MaybeRef, MaybeRefOrGetter, VNode, WritableComputedRef } from 'vue'
  import('vue')
}
````

## File: layers/main/app/test/utils/@types/components.d.ts
````typescript
/* eslint-disable */
// @ts-nocheck
// Generated by unplugin-vue-components
// Read more: https://github.com/vuejs/core/pull/3399
export {}

/* prettier-ignore */
declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}
````

## File: layers/main/app/test/utils/api.spec.ts
````typescript
import { describe, it, expect, vi } from 'vitest'
import type { NitroFetchRequest } from 'nitropack'
import api from '@/utils/api'

// NOTE: src/utils/api.tsのテストとして当該ファイルがimportしているファイルからの変数「requireRuntimeConfig」をモックする。
vi.mock('#base/app/plugins/runtimeConfig', () => {
  return {
    default: vi.fn(() => ({})),
    requireRuntimeConfig: vi.fn(() => {
      // NOTE: api.tsのテストとしてrequireRuntimeConfigが{public.baseUrl}としてダミーURLを返すだけの処理を行うようにモックする
      return {
        public: {
          baseUrl: '/test-api',
        },
      }
    }),
  }
})

// NOTE: 本テストにおいて実際にAPI叩くわけではなく、useFetchをすげ替えたいのでダミーとなるmock作成
vi.mock('#base/app/plugins/fetch', () => {
  return {
    default: vi.fn(() => ({})),
    pluginFetchApi: vi.fn((path: string, options: NitroFetchRequest) => {
      return { path, options }
    }),
  }
})

// NOTE: 本テストにおいて実際にAPI叩くわけではなく、useFetchをすげ替えたいのでダミーとなるmock作成
vi.mock('ofetch', () => {
  return {
    $fetch: vi.fn((path: string, options: NitroFetchRequest) => {
      return { path, options }
    }),
  }
})

describe('api', () => {
  // NOTE: api.getの返却値のテストとして、引数のpathやfetchOptionを入力して、返却値として期待するexpectObjと同等かテストする。その際、onRequestとonResponseは複雑化するので、空オブジェクトで省略としてtoMatchObjectで合格するか検査する。
  it('get', async () => {
    const expectObj = {
      options: {
        baseURL: '/test-api',
        method: 'GET',
        onRequest: {},
        onResponse: {},
        retry: 2,
      },
      path: '/example',
    }
    const path = '/example'
    const fetchOptions = {}
    const result = await api('get', path, fetchOptions)
    expect(result).toMatchObject(expectObj)
  })
  it('post', async () => {
    // NOET: 以下getと同様にテストする。methodはgetではなく、相送信methodに準じた値に変化するので注意
    const expectObj = {
      options: {
        baseURL: '/test-api',
        method: 'POST',
        onRequest: {},
        onResponse: {},
        retry: 2,
      },
      path: '/example',
    }
    const path = '/example'
    const fetchOptions = {}
    const result = await api('post', path, fetchOptions)
    expect(result).toMatchObject(expectObj)
  })
  it('put', async () => {
    const expectObj = {
      options: {
        baseURL: '/test-api',
        method: 'PUT',
        onRequest: {},
        onResponse: {},
        retry: 2,
      },
      path: '/example',
    }
    const path = '/example'
    const fetchOptions = {}
    const result = await api('put', path, fetchOptions)
    expect(result).toMatchObject(expectObj)
  })
  it('patch', async () => {
    const expectObj = {
      options: {
        baseURL: '/test-api',
        method: 'PATCH',
        onRequest: {},
        onResponse: {},
        retry: 2,
      },
      path: '/example',
    }
    const path = '/example'
    const fetchOptions = {}
    const result = await api('patch', path, fetchOptions)
    expect(result).toMatchObject(expectObj)
  })
  it('delete', async () => {
    const expectObj = {
      options: {
        baseURL: '/test-api',
        method: 'DELETE',
        onRequest: {},
        onResponse: {},
        retry: 2,
      },
      path: '/example',
    }
    const path = '/example'
    const fetchOptions = {}
    const result = await api('delete', path, fetchOptions)
    expect(result).toMatchObject(expectObj)
  })
})
````

## File: layers/main/app/test/utils/factory.spec.ts
````typescript
import { describe, expect, it } from 'vitest'
import exampleRepository from '#base/app/repositories/exampleRepository'
import {
  defaultRepositories,
  defaultRepositoryFactory,
} from '#base/app/utils/default-factory'

describe('defaultRepositoryFactory', () => {
  it('should return the correct repository when a valid key is provided', () => {
    const repository = defaultRepositoryFactory.get('example')
    expect(repository).toBe(exampleRepository)
  })
})

describe('defaultRepositories', () => {
  it('should contain the example repository', () => {
    expect(defaultRepositories.example).toBe(exampleRepository)
  })
})
````

## File: layers/main/app/test/utils/i18n.spec.ts
````typescript
import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

test('getI18nArray takes a list from vue-i18n dict', () => {
  const i18n = createI18n({
    locale: 'ja',
    messages: {
      ja: { list: ['a', 'b', 'c'] },
      en: { list: ['a', 'b', 'c'] },
    },
  })

  // useI18nがコンポーネントのsetup内でのみしか動かないので、コンポーネントを介してテストをする
  mount(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (defineComponent as any)({
      template: '<p>Nuxt ha iizo</p>',
      setup: () => {
        const i18n = useI18n()
        expect(getI18nArray(i18n, 'list')).toEqual(['a', 'b', 'c'])
      },
    }),
    {
      global: {
        plugins: [i18n],
      },
    },
  )
})
````

## File: layers/main/app/test/setup.ts
````typescript
import { vi } from 'vitest'

// Type declarations for global mocks - range and useSlots are handled by auto-imports

// Global mock for all icon imports
vi.mock('~icons/ri/close-line', () => ({
  default: {
    name: 'RiCloseLine',
    template: '<svg class="icon"><path /></svg>',
    props: ['class'],
  },
}))

// Mock Nuxt composables using vi.mock to avoid conflicts with auto-imports
vi.mock('#app/composables/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const messages: Record<string, string> = {
        next: 'Next',
        prev: 'Prev',
      }
      return messages[key] || key
    }),
    locale: { value: 'ja' },
  })),
}))

// Basic Nuxt app mocks used by plugins and middleware
vi.mock('nuxt/app', async (importOriginal) => {
  const actual = await importOriginal<typeof import('nuxt/app')>()
  const mockI18n = { locale: { value: 'ja' } }

  return {
    ...actual,
    defineNuxtPlugin: (plugin: unknown) => plugin,
    defineNuxtRouteMiddleware:
      actual.defineNuxtRouteMiddleware ?? ((fn: unknown) => fn),
    useNuxtApp: () => {
      const nuxtApp = actual.useNuxtApp?.()
      if (!nuxtApp) {
        return { $i18n: mockI18n }
      }
      return new Proxy(nuxtApp, {
        get(target, property, receiver) {
          if (property === '$i18n') {
            return mockI18n
          }
          return Reflect.get(target, property, receiver)
        },
      })
    },
  }
})

vi.mock('#app', async (importOriginal) => {
  const actual = await importOriginal<typeof import('#app')>()
  const mockI18n = { locale: { value: 'ja' } }

  return {
    ...actual,
    defineNuxtPlugin: (plugin: unknown) => plugin,
    defineNuxtRouteMiddleware:
      actual.defineNuxtRouteMiddleware ?? ((fn: unknown) => fn),
    useNuxtApp: () => {
      const nuxtApp = actual.useNuxtApp?.()
      if (!nuxtApp) {
        return { $i18n: mockI18n }
      }
      return new Proxy(nuxtApp, {
        get(target, property, receiver) {
          if (property === '$i18n') {
            return mockI18n
          }
          return Reflect.get(target, property, receiver)
        },
      })
    },
  }
})

vi.mock('#app/composables/useRoute', () => ({
  useRoute: vi.fn(() => ({
    path: '/test',
    query: { page: '1' },
  })),
}))

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>()
  return {
    ...actual,
    nextTick: vi.fn().mockResolvedValue(undefined),
  }
})

// Global utility functions for tests - range and useSlots handled by auto-imports

// HTMLDialogElement mock for jsdom
if (!global.HTMLDialogElement) {
  global.HTMLDialogElement = class HTMLDialogElement extends HTMLElement {
    open = false
    returnValue = ''

    showModal = vi.fn(() => {
      this.open = true
    })

    close = vi.fn(() => {
      this.open = false
    })

    show = vi.fn(() => {
      this.open = true
    })

    requestClose = vi.fn()

    override addEventListener() {}

    override removeEventListener() {}
  }
}
````

## File: layers/main/app/utils/api.ts
````typescript
import type { FetchOptions } from 'ofetch'
import type { Method } from '#base/app/utils/default-api'
import { defaultApi } from '#base/app/utils/default-api'

export type { Method }

export default (
  method: Method,
  path: string,
  fetchOptions: FetchOptions = {},
) => {
  switch (method) {
    case 'GET':
    case 'get':
      return defaultApi.get(path, fetchOptions)
    case 'POST':
    case 'post':
      return defaultApi.post(path, fetchOptions)
    case 'PUT':
    case 'put':
      return defaultApi.put(path, fetchOptions)
    case 'PATCH':
    case 'patch':
      return defaultApi.patch(path, fetchOptions)
    case 'DELETE':
    case 'delete':
      return defaultApi.delete(path, fetchOptions)
    default:
      return defaultApi.get(path, fetchOptions)
  }
}
````

## File: layers/main/app/utils/factory.ts
````typescript
import { type MakeRepository, defaultRepositories } from '#base/app/utils/default-factory'
import type { Method } from '@/utils/api'

export type Repository = MakeRepository<Method>
export type Repositories = Record<string, Repository>

export const repositories = {
  ...defaultRepositories,
  // Add non-default repositories here
} as const satisfies Repositories

export type RepositoryKey = keyof typeof repositories

export const repositoryFactory = {
  get: <K extends keyof typeof repositories>(name: K) => repositories[name],
}
````

## File: layers/main/app/utils/i18n.ts
````typescript
import type { VueMessageType, Composer, UseI18nOptions } from 'vue-i18n'

/**
 * 引数未指定にすると、普通に`const i18n = useI18n()`とすると入ってくる型になる。
 * 型引数の使い方については、そのままuseI18nの型引数の指定方法を参照のこと。
 */
export type UseI18nReturnType<Options extends UseI18nOptions = UseI18nOptions>
  = Composer<
    NonNullable<Options['messages']>,
    NonNullable<Options['datetimeFormats']>,
    NonNullable<Options['numberFormats']>,
    Options['locale'] extends unknown ? string : Options['locale']
  >

/**
 * @example
 * ```ts
 * import { useI18n } from 'vue-i18n'
 * const i18n = useI18n() // messagesは `{ [locale]: { list: ['a', 'b', 'c'] } }` とする
 * const list = getI18nArray(i18n, 'list') // ['a', 'b', 'c']
 * ```
 */
export const getI18nArray = (i18n: UseI18nReturnType, key: string): string[] =>
  Object.entries<VueMessageType>(i18n.tm(key)).map(([, term]) => i18n.rt(term))
````

## File: layers/main/app/error.vue
````vue
<i18n lang="yaml">
ja:
  title: "エラーが発生しました"
  back_home: "ホームに戻る"
  back_previous: "前のページに戻る"
  error_404: "ページが見つかりません"
  error_500: "サーバーエラー"
  error_other: "予期しないエラー"
  description_404: "お探しのページは見つかりませんでした。URLをご確認いただくか、ホームページに戻ってもう一度お試しください。"
  description_500: "サーバーに問題が発生しています。しばらく時間をおいてから再度お試しください。"
  description_other: "申し訳ございませんが、予期しないエラーが発生しました。"
  details: "エラー内容"
en:
  title: "An error occurred"
  back_home: "Back to Home"
  back_previous: "Go Back"
  error_404: "Page Not Found"
  error_500: "Server Error"
  error_other: "Unexpected Error"
  description_404: "The page you are looking for could not be found. Please check the URL or return to the home page and try again."
  description_500: "There is a problem with the server. Please try again after some time."
  description_other: "We apologize, but an unexpected error has occurred."
  details: "Error Details"
</i18n>

<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-icon">
        <div class="error-code">
          {{ error.statusCode }}
        </div>
      </div>

      <h1 class="error-title">
        {{ getErrorTitle() }}
      </h1>

      <p class="error-description">
        {{ getErrorDescription() }}
      </p>

      <div class="error-actions">
        <button
          class="error-button -primary"
          @click="handleClearError"
        >
          {{ t('back_home') }}
        </button>

        <button
          class="error-button -secondary"
          @click="goBack"
        >
          {{ t('back_previous') }}
        </button>
      </div>

      <div class="error-details">
        <details v-if="error.message">
          <summary>{{ t('details') }}</summary>
          <pre class="error-message">{{ error.message }}</pre>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()

const getErrorTitle = (): string => {
  if (props.error.statusCode === 404) {
    return t('error_404')
  }
  if (props.error.statusCode === 500) {
    return t('error_500')
  }
  return t('error_other')
}

const getErrorDescription = (): string => {
  if (props.error.statusCode === 404) {
    return t('description_404')
  }
  if (props.error.statusCode === 500) {
    return t('description_500')
  }
  return t('description_other')
}

const handleClearError = async (): Promise<void> => {
  await clearError({ redirect: '/' })
}

const goBack = async (): Promise<void> => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    await navigateTo('/')
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.error-page {
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  padding: v.space(4);

  color: #333;

  background-color: #f8f9fa;
}

.error-container {
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.error-icon {
  margin-bottom: v.space(6);
}

.error-code {
  display: inline-block;

  width: 120px;
  height: 120px;
  margin: 0 auto v.space(4);
  border: 4px solid #dc3545;
  border-radius: 50%;

  font-size: 48px;
  font-weight: bold;
  line-height: 112px;
  color: #dc3545;

  background-color: rgba(#dc3545, 0.1);

  @include m.sp {
    width: 80px;
    height: 80px;
    font-size: 32px;
    line-height: 72px;
  }
}

.error-title {
  margin-bottom: v.space(4);
  font-size: 32px;
  font-weight: bold;
  color: #212529;

  @include m.sp {
    font-size: 24px;
  }
}

.error-description {
  margin-bottom: v.space(8);
  font-size: 16px;
  line-height: 1.6;
  color: #6c757d;

  @include m.sp {
    margin-bottom: v.space(6);
    font-size: 14px;
  }
}

.error-actions {
  display: flex;
  gap: v.space(4);
  justify-content: center;
  margin-bottom: v.space(8);

  @include m.sp {
    flex-direction: column;
    align-items: center;
  }
}

.error-button {
  cursor: pointer;

  padding: v.space(3) v.space(6);
  border: 2px solid transparent;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 500;
  text-decoration: none;

  transition: all 0.3s ease;

  @include m.sp {
    width: 100%;
    max-width: 280px;
  }

  &.-primary {
    border-color: #007bff;
    color: #fff;
    background-color: #007bff;

    @include m.hover {
      border-color: #0056b3;
      background-color: #0056b3;
    }
  }

  &.-secondary {
    border-color: #6c757d;
    color: #6c757d;
    background-color: transparent;

    @include m.hover {
      color: #fff;
      background-color: #6c757d;
    }
  }
}

.error-details {
  margin-top: v.space(6);
  text-align: left;

  details {
    padding: v.space(2);
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: #fff;

    summary {
      cursor: pointer;
      margin-bottom: v.space(2);
      font-weight: 500;
      color: #007bff;

      @include m.hover {
        color: #0056b3;
      }
    }
  }
}

.error-message {
  overflow-x: auto;

  padding: v.space(3);
  border-radius: 4px;

  font-family: monospace;
  font-size: 12px;
  line-height: 1.4;
  color: #495057;

  background-color: #f8f9fa;

  @include m.sp {
    font-size: 11px;
  }
}
</style>
````

## File: layers/main/config/models/EnvType.ts
````typescript
/**
 * nuxt.config.tsのためのモジュール。
 *
 * @packageDocumentation
 */

export type EnvType = 'local' | 'development' | 'staging' | 'production'

export const allEnvTypes = [
  'local',
  'development',
  'staging',
  'production',
] as const

export function isEnvType(x: unknown): x is EnvType {
  const envTypes: readonly unknown[] = allEnvTypes
  return envTypes.includes(x)
}

export function ensureEnvType(x: unknown): asserts x is EnvType {
  if (!isEnvType(x)) {
    throw new TypeError('Not an EnvType.')
  }
}

export type Env = Record<string, string | undefined>

/**
 * baseEnv.VITE_OUTPUT_ENVを読みだします。
 * これが未指定の場合は'local'にフォールバックします。
 * これが不明な値（EnvTypeでない）場合は例外を送出します。
 *
 * ```typescript
 * const envType = readEnvType(process.env)
 * ```
 */
export function readEnvType(baseEnv: Env): EnvType {
  if (baseEnv.VITE_OUTPUT_ENV === undefined) {
    console.error('No VITE_OUTPUT_ENV is set.')
    return 'local'
  }

  ensureEnvType(baseEnv.VITE_OUTPUT_ENV)
  return baseEnv.VITE_OUTPUT_ENV
}
````

## File: layers/main/config/appConfig.ts
````typescript
/**
 * app.config.tsのためのモジュール。
 *
 * @packageDocumentation
 */

import type { EnvType } from './models/EnvType'

/**
 * ```typescript
 * const appConfig = getAppConfigOfEnvType('local')
 * ```
 */
export function getAppConfigOfEnvType(envType: EnvType) {
  switch (envType) {
    case 'local':
      return getLocal()
    case 'development':
      return getDevelopment()
    case 'staging':
      return getStaging()
    case 'production':
      return getProduction()
  }
}

function getLocal() {
  return {}
}

function getDevelopment() {
  return {}
}

function getStaging() {
  return {}
}

function getProduction() {
  return {}
}
````

## File: layers/main/config/runtimeConfig.ts
````typescript
/**
 * nuxt.config.tsのためのモジュール。
 *
 * @packageDocumentation
 */

import type { EnvType } from './models/EnvType'

export function getRuntimeConfigOfEnvType(envType: EnvType) {
  switch (envType) {
    case 'local':
      return getLocal(envType)
    case 'development':
      return getDevelopment(envType)
    case 'staging':
      return getStaging(envType)
    case 'production':
      return getProduction(envType)
  }
}

const commonPrivate = {} as const

const commonPublic = {
  gtmId: 'GTM-XXXXXXX',
  apiPrefix: process.env.NUXT_API_PREFIX ?? '/api/v1',
} as const

function getLocal(envType: EnvType) {
  return {
    ...commonPrivate,

    public: {
      ...commonPublic,
      outputEnv: envType,
      url: 'http://localhost:3000',
      baseUrl: 'http://localhost:3000',
      httpBinUrl: 'http://localhost:3003',
    },
  } as const
}

function getDevelopment(envType: EnvType) {
  return {
    ...commonPrivate,

    public: {
      ...commonPublic,
      outputEnv: envType,
      url: 'http://localhost:3000',
      baseUrl: 'http://localhost:3000',
    },
  } as const
}

function getStaging(envType: EnvType) {
  return {
    ...commonPrivate,

    public: {
      ...commonPublic,
      outputEnv: envType,
      url: '',
      baseUrl: '',
    },
  } as const
}

function getProduction(envType: EnvType) {
  return {
    ...commonPrivate,

    public: {
      ...commonPublic,
      gtmId: 'GTM-XXXXXXX',
      outputEnv: envType,
      url: '',
      baseUrl: '',
    },
  } as const
}
````

## File: layers/main/i18n/locales/en.json
````json
{
  "hello": "Hello!",
  "language": "language"
}
````

## File: layers/main/i18n/locales/ja.json
````json
{
  "hello": "こんにちは！",
  "language": "言語"
}
````

## File: layers/main/i18n/i18n.config.ts
````typescript
/*
 * note: i18n by nuxt-i18n i18nの不具合があればこのファイルから参照する
 * ref: https://v8.i18n.nuxtjs.org/
 */
import type { NuxtI18nOptions } from '@nuxtjs/i18n'
import Cookies from 'universal-cookie'
import en from './locales/en.json'
import ja from './locales/ja.json'

const cookie = new Cookies()
const jaLanguage = 'ja'
const enLanguage = 'en'
const cookieKey = 'VUEI18N_MANUAL_LOCALE'
const isBrowserLanguageJa = import.meta.client
  ? navigator?.language?.startsWith(jaLanguage)
  : false
const isBrowserLanguageEn = import.meta.client
  ? navigator?.language?.startsWith(enLanguage)
  : false
const defaultLanguageFromCookie = import.meta.client
  ? cookie.get(cookieKey) ?? null
  : ''
const defaultLanguage
  = defaultLanguageFromCookie === jaLanguage
    ? jaLanguage
    : defaultLanguageFromCookie === enLanguage
      ? enLanguage
      : isBrowserLanguageJa
        ? jaLanguage
        : isBrowserLanguageEn
          ? enLanguage
          : jaLanguage

// settings for nuxt-i18n v9~
export const nuxtI18nOptions: NuxtI18nOptions = {
  strategy: 'prefix_and_default',
  locales: [
    {
      code: jaLanguage,
      language: 'ja-JP',
      file: 'ja.json',
      isCatchallLocale: true,
    },
    {
      code: enLanguage,
      language: 'en-US',
      file: 'en.json',
    },
  ],
  defaultLocale: defaultLanguage,
  customRoutes: 'config',
  pages: {
    api: false,
    server: false,
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root', // recommended
    alwaysRedirect: true,
    cookieCrossOrigin: true,
    fallbackLocale: defaultLanguage,
  },
  vueI18n: '#main/i18n/i18n.config.ts',
}

export default {
  legacy: false,
  locale: defaultLanguage,
  messages: {
    ja,
    en,
  },
}
````

## File: layers/main/public/icons/mingcute_question-line.svg
````xml
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 3.33301C29.205 3.33301 36.6667 10.7947 36.6667 19.9997C36.6667 29.2047 29.205 36.6663 20 36.6663C10.795 36.6663 3.33337 29.2047 3.33337 19.9997C3.33337 10.7947 10.795 3.33301 20 3.33301ZM20 6.66634C16.4638 6.66634 13.0724 8.0711 10.572 10.5716C8.07147 13.0721 6.66671 16.4635 6.66671 19.9997C6.66671 23.5359 8.07147 26.9273 10.572 29.4278C13.0724 31.9282 16.4638 33.333 20 33.333C23.5363 33.333 26.9276 31.9282 29.4281 29.4278C31.9286 26.9273 33.3334 23.5359 33.3334 19.9997C33.3334 16.4635 31.9286 13.0721 29.4281 10.5716C26.9276 8.0711 23.5363 6.66634 20 6.66634ZM20 26.6663C20.4421 26.6663 20.866 26.8419 21.1786 27.1545C21.4911 27.4671 21.6667 27.891 21.6667 28.333C21.6667 28.775 21.4911 29.199 21.1786 29.5115C20.866 29.8241 20.4421 29.9997 20 29.9997C19.558 29.9997 19.1341 29.8241 18.8215 29.5115C18.509 29.199 18.3334 28.775 18.3334 28.333C18.3334 27.891 18.509 27.4671 18.8215 27.1545C19.1341 26.8419 19.558 26.6663 20 26.6663ZM20 10.833C21.4038 10.8331 22.7638 11.3219 23.8463 12.2157C24.9289 13.1094 25.6664 14.3522 25.9322 15.7306C26.198 17.109 25.9756 18.537 25.303 19.7692C24.6305 21.0014 23.5498 21.9609 22.2467 22.483C22.0537 22.554 21.8797 22.6686 21.7384 22.818C21.665 22.9013 21.6534 23.008 21.655 23.118L21.6667 23.333C21.6662 23.7578 21.5036 24.1664 21.212 24.4753C20.9203 24.7842 20.5218 24.9701 20.0977 24.995C19.6736 25.0199 19.2561 24.8819 18.9303 24.6092C18.6046 24.3366 18.3952 23.9498 18.345 23.528L18.3334 23.333V22.9163C18.3334 20.9947 19.8834 19.8413 21.0067 19.3897C21.4639 19.2071 21.8627 18.9035 22.1603 18.5113C22.458 18.1192 22.6432 17.6534 22.696 17.1639C22.7489 16.6745 22.6674 16.1799 22.4604 15.7332C22.2534 15.2866 21.9286 14.9048 21.5209 14.6288C21.1133 14.3528 20.6381 14.1931 20.1465 14.1668C19.655 14.1405 19.1655 14.2486 18.7307 14.4795C18.2959 14.7103 17.9322 15.0553 17.6787 15.4773C17.4252 15.8993 17.2914 16.3824 17.2917 16.8747C17.2917 17.3167 17.1161 17.7406 16.8036 18.0532C16.491 18.3657 16.0671 18.5413 15.625 18.5413C15.183 18.5413 14.7591 18.3657 14.4465 18.0532C14.134 17.7406 13.9584 17.3167 13.9584 16.8747C13.9584 15.2723 14.5949 13.7356 15.7279 12.6026C16.861 11.4695 18.3977 10.833 20 10.833Z" fill="white"/>
</svg>
````

## File: layers/main/public/_robots.txt
````
User-agent: *
Disallow:
````

## File: layers/main/server/tsconfig.json
````json
{
  "extends": "../.nuxt/tsconfig.server.json"
}
````

## File: layers/main/.nuxtrc
````
setups.@nuxt/test-utils="4.0.0"
````

## File: layers/main/.stylelintrc.mjs
````javascript
export default {
  extends: ["../../.stylelintrc.shared.mjs"],
};
````

## File: layers/main/app.config.ts
````typescript
// ref: https://v3.nuxtjs.org/guide/directory-structure/app.config
// note: Do not put any secret values inside app.config file. It is exposed to the user client bundle.

import { readEnvType } from './config/models/EnvType'
import { getAppConfigOfEnvType } from './config/appConfig'

export default defineAppConfig(
  getAppConfigOfEnvType(readEnvType(process.env)),
)
````

## File: layers/main/eslint.config.mjs
````javascript
import sharedConfig from '../../eslint.config.shared.mjs'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...sharedConfig,
)
````

## File: layers/main/tsconfig.json
````json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": [
    "./.nuxt/tsconfig.server.json",
    "./.nuxt/tsconfig.json",
    "../base/tsconfig.shared.json"
  ],
  "exclude": ["../base/**/*"]
}
````

## File: layers/main/vitest.config.mts
````typescript
import { defineVitestConfig } from '@nuxt/test-utils/config'
import path from 'path'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: '../coverage',
      reportOnFailure: true,
      allowExternal: true,
      include: ['**/*.{vue,ts}'],
      exclude: [
        'plugins/**',
        'middleware/**',
        'layouts/**',
        'test/**',
      ],
    },
    setupFiles: ['app/test/setup.ts'],
    alias: {
      '#base': path.resolve(__dirname, '../base'),
    },
  },
  resolve: {
    alias: {
      '#base': path.resolve(__dirname, '../base'),
    },
  },
})
````

## File: layers/main/app/assets/styles/style.scss
````scss
@forward 'reset';
@forward 'base';
@forward 'common';
````

## File: layers/main/app/components/ha/HaAccordionItem.vue
````vue
<script setup lang="ts">
import { ref } from 'vue'
import HaArrowDownIcon from './icons/HaChevronDownIcon.vue'

interface AccordionItem {
  id: number
  title: string
  contents: Array<string>
}

defineProps<{
  items: AccordionItem[]
}>()

const openId = ref<number | null>(null)

const toggle = (id: number) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="accordion glassy-box-2">
    <button
      v-for="item in items"
      :key="item.id"
      class="accordion-item glassy-box-2"
      :class="{ 'accordion-item--is-open': openId === item.id }"
      @click="toggle(item.id)"
    >
      <div class="accordion-item__header">
        <div class="accordion-item__left">
          <p class="accordion-item__label">
            Q{{ item.id }}
          </p>
          <p class="accordion-item__title">
            {{ item.title }}
          </p>
        </div>
        <HaArrowDownIcon class="accordion-item__icon" />
      </div>

      <div class="accordion-item__body">
        <div class="accordion-item__inner">
          <slot
            name="content"
            :item="item"
          />
        </div>
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.accordion {
    display: flex;
    flex-direction: column;
    gap: 12px;

    width: 100%;
    height: fit-content;
    padding: 70px 48px;

    @include m.tb {
      padding: 48px 24px;
      border-radius: 20px;
    }
}

.accordion-item {
    width: 100%;
    padding: 40px;

    background-color: rgb(42 63 99 / 0%);
    mix-blend-mode: plus-lighter;

    transition: background-color 1s ease;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__left {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    &__label {
      font-size: 20px;
      font-weight: 700;
      color: #258966;
    }

    &__title {
      font-size: 20px;
      font-weight: 700;
      color: white;
    }

    &__icon {
      transition: transform 0.3s ease;
    }

    &__body {
      display: grid;
      grid-template-rows: 0fr;
      padding-top: 0;
      transition: padding 0.3s ease, grid-template-rows 0.3s ease;
    }

    &__inner {
        overflow: hidden;

        padding-left: 44px;

        font-size: 16px;
        font-weight: 700;
        color: white;
        text-align: left;
    }

    &--is-open {
        background-color: rgb(42 63 99 / 60%);

        .accordion-item__icon {
          transform: rotate(180deg);
        }

        .accordion-item__body {
          grid-template-rows: 1fr;
          padding-top: 80px;
        }
    }
}

.glassy-box-2{
    position: relative;
    border-radius: 20px;
    box-shadow: inset rgb(70 132 255 / 35%) 0 0 8px 4px;

    &::before {
      width: 100%;
      height: 100%;
    }
}
</style>
````

## File: layers/main/app/components/ha/HaSectionTitle.vue
````vue
<script setup lang="ts">
defineProps<{
  label: string
  title: string
}>()
</script>

<template>
  <div class="section-title">
    <div class="section-title__line" />
    <div class="section-title__flex">
      <div class="section-title__text-box">
        <p class="section-title__label">
          {{ label }}
        </p>
        <h2 class="section-title__text">
          {{ title }}
        </h2>
      </div>
      <div class="section-title__controls">
        <slot name="controls" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.section-title {
  position: relative;
  margin-bottom: 96px;
  padding-top: 16px;

  &__line {
    position: relative;

    overflow: hidden;

    width: 100%;
    height: 2px;
    margin-bottom: 4px;

    // 点
    &::before {
      content: '';

      position: absolute;
      top: 0;
      left: 0;

      width: 2px;
      height: 2px;

      background: v.$vket-amber;
    }

    &::after {
      content: '';

      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
      margin-left: 12px;

      background: linear-gradient(to right, v.$vket-amber 0%, v.$vket-vermilion 100%);
    }
  }

  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-size: 12px;
    color: v.$vket-amber;
    letter-spacing: 0.1em;

    @include m.tb {
      font-size: 10px;
    }
  }

  &__text {
    font-size: 48px;
    font-weight: 700;
    line-height: 1em;
    color: #fff;

    @include m.tb {
      font-size: 32px;
    }
  }

  &__controls {
    display: flex;
    gap: 4px;
    align-items: center;
  }
}
</style>
````

## File: layers/main/app/components/ho/HoTheFooter.vue
````vue
<script setup lang="ts">
import HaXIcon from '../ha/icons/HaXIcon.vue'
</script>

<!-- <i18n lang="yaml">
ja:
  mainlogo: ロゴ名サービス名
en:
  mainlogo: logo name
</i18n> -->

<template>
  <footer class="footer">
    <div class="footer__upper">
      <div class="footer__left">
        <img
          src=""
          alt=""
          class="footer__logo"
        >
        <nav class="footer__nav">
          <NuxtLink class="footer__link">利用規約</NuxtLink>
          <NuxtLink class="footer__link">プライバシー</NuxtLink>
          <NuxtLink class="footer__link">行動規範</NuxtLink>
          <NuxtLink class="footer__link">出展ガイドライン</NuxtLink>
          <NuxtLink class="footer__link">出展規約</NuxtLink>
        </nav>
      </div>
      <div class="footer__right">
        <HaXIcon />
      </div>
    </div>
    <div class="footer__divider" />
    <div class="footer__lower">
      <p class="footer__copy">
        🄫 2026 VketReal in 札幌 実行委員会. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 88px 105px 0;
  border-radius: 40px 40px 0 0;
  background-color: rgb(25 25 25 / 100%);

  &__upper {
    display: flex;
    justify-content: space-between;
    padding-bottom: 48px;
  }

  &__logo {
    width: 120px;
    height: 90px;
    margin-bottom: 40px;
    background-color: gray;
  }

  &__nav{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__link {
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;
    text-decoration: underline;
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color:#8f8f8f;
  }

  &__lower {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 78px;
  }

  &__copy {
    font-family: Inter, sans-serif;
    font-size: 12px;
    color: white;
  }
}
</style>
````

## File: layers/main/app/components/ht/HtExhibitionSection.vue
````vue
<script setup lang="ts">
import HaAboutCard from '../ha/HaAboutCard.vue'
import HaDocumentLink from '../ha/HaDocumentLink.vue'
import HaBalanceIcon from '../ha/icons/HaBalanceIcon.vue'
import HaCommunityIcon from '../ha/icons/HaCommunityIcon.vue'
import HaOpenBookIcon from '../ha/icons/HaOpenBookIcon.vue'
import HaQuestionIcon from '../ha/icons/HaQuestionIcon.vue'
import HaStarShineIcon from '../ha/icons/HaStarShineIcon.vue'
import HaWorldIcon from '../ha/icons/HaWorldIcon.vue'
</script>

<template>
  <HaSectionTitle
    title="出展情報"
    label="exhibition"
  />
  <p class="subtitle">
    出展カテゴリ
  </p>
  <div class="card-flex mb-24">
    <HaAboutCard
      class="child"
      color="amber"
    >
      <template #icon>
        <HaStarShineIcon />
      </template>
      <template #title>
        サークル出展
      </template>
      <template #body>
        VRクリエイターによるアイテムやグッズの展示・販売ブースです。3Dプリント作品、イラスト、同人誌など幅広いジャンルで出店できます。
      </template>
    </HaAboutCard>
    <HaAboutCard
      class="child"
      icon-url="/icons/tabler_world.svg"
      color="light-cyan"
    >
      <template #icon>
        <HaWorldIcon />
      </template>
      <template #title>
        一般展示
      </template>
      <template #body>
        XR技術やクリエイティブ作品の展示を行うブースです。デモ体験やワークショップなど、来場者が参加できる企画も歓迎します。
      </template>
    </HaAboutCard>
    <HaAboutCard
      class="child"
      icon-url="/icons/boxicons_community.svg"
      color="light-magenta"
    >
      <template #icon>
        <HaCommunityIcon />
      </template>
      <template #title>
        企業出展
      </template>
      <template #body>
        企業・法人向けの出展ブースです。最新XRコンテンツの体験提供や、製品・サービスのプロモーションにご活用いただけます。
      </template>
    </HaAboutCard>
  </div>
  <p class="subtitle">
    出展者向けリソース
  </p>
  <div class="link-list">
    <HaDocumentLink
      title="出展ガイドライン"
      label="important"
      color="green"
      text="出展に必要なルール・準備事項をまとめた公式ガイド"
      class="child"
    >
      <template #icon>
        <HaOpenBookIcon />
      </template>
    </HaDocumentLink>
    <HaDocumentLink
      title="出展規約"
      label="required"
      color="cyan"
      text="出展者が遵守すべき規約・利用条件"
      class="child"
    >
      <template #icon>
        <HaBalanceIcon />
      </template>
    </HaDocumentLink>
    <HaDocumentLink
      title="出展ガイドライン"
      label="Q&A"
      color="magenta"
      text="出展に必要なルール・準備事項をまとめた公式ガイド"
      class="child"
    >
      <template #icon>
        <HaQuestionIcon />
      </template>
    </HaDocumentLink>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.card-flex {
  display: flex;
  gap: 32px;
  justify-content: center;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @include m.tb {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .child {
    width: 320px;

    @include m.tb {
      width: 60%;
    }
  }
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @include m.tb {
    align-items: center;
  }

  .child {
    @include m.tb {
      width: 60%;
    }
  }
}
</style>
````

## File: layers/main/app/components/ht/HtScheduleSection.vue
````vue
<script setup lang="ts">
import HaSunIcon from '../ha/icons/HaSunIcon.vue'
import HaSunsetIcon from '../ha/icons/HaSunsetIcon.vue'
</script>

<template>
  <HaSectionTitle
    title="開催スケジュール"
    label="schedule"
  />

  <div class="schedule mb-24">
    <div class="schedule__left">
      <div class="schedule__icon-box">
        <HaSunIcon />
      </div>
      <span class="schedule__line" />
      <div class="schedule__icon-box">
        <HaSunsetIcon />
      </div>
    </div>
    <div class="schedule__right">
      <div class="schedule__item">
        <p class="schedule__time">
          10:00
        </p>
        <p class="schedule__content">
          会場・受付開始
        </p>
      </div>
      <div class="schedule__item">
        <p class="schedule__time">
          10:30
        </p>
        <p class="schedule__content">
          オープニングセレモニー
        </p>
      </div>
      <div class="schedule__item">
        <p class="schedule__time">
          11:00
        </p>
        <p class="schedule__content">
          展示・即売会開始
        </p>
      </div>
      <div class="schedule__item schedule__item--1h">
        <p class="schedule__time">
          12:00
        </p>
        <p class="schedule__content">
          XR体験ブースオープン
        </p>
      </div>
      <div class="schedule__item schedule__item--1h">
        <p class="schedule__time">
          13:00
        </p>
        <p class="schedule__content">
          スペシャルトークセッション
        </p>
      </div>
      <div class="schedule__item schedule__item--15h">
        <p class="schedule__time">
          14:30
        </p>
        <p class="schedule__content">
          スペシャルトークセッション
        </p>
      </div>
      <div class="schedule__item schedule__item--2h">
        <p class="schedule__time">
          16:00
        </p>
        <p class="schedule__content">
          スペシャルライブ
        </p>
      </div>
      <div class="schedule__item schedule__item--1h">
        <p class="schedule__time">
          18:00
        </p>
        <p class="schedule__content">
          閉場
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.schedule {
  display: flex;

  &__left {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;

    width: 80px;

    @include m.tb {
      width: 104px;
    }
  }

  &__icon-box {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 80px;
    padding: 16px;
  }

  &__icon {
    width: 100%;
    height: 100%;
  }

  &__line {
    flex-grow: 1;
    width: 1px;
    height: 100px;
    background-color: white;
  }

  &__right {
    flex-grow: 1;
    padding: 100px 0;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 100px;
    border-top: 2px solid white;

    &:last-of-type {
      border-bottom: 2px solid white;
    }

    &--1h {
      height: 150px;
    }

    &--15h {
      height: 200px;
    }
  }

  &__time {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }

  &__content {
    font-size: 20px;
    font-weight: 700;
    color: white;
  }
}
</style>
````

## File: layers/main/nuxt.config.ts
````typescript
import { defineNuxtConfig } from 'nuxt/config'
import path from 'path'
import { readEnvType } from './config/models/EnvType'
import { getRuntimeConfigOfEnvType } from './config/runtimeConfig'
import { nuxtI18nOptions } from './i18n/i18n.config'

type MetaInfo = {
  title: string
  description: string
  robots: string
  siteName: string
  ogImageUrl: string
  ogUrl: string
  twitterSite: string
  twitterCreator: string
}

const NUXT_ENV_OUTPUT_ENV = readEnvType(process.env)
const runtimeConfig = getRuntimeConfigOfEnvType(NUXT_ENV_OUTPUT_ENV)
const cssUrls = [`@/assets/styles/style.scss`]
const srcDir = 'app'
const isSsr = false
const checkTypeCheckOnBuild = true
const needAnalyze = NUXT_ENV_OUTPUT_ENV === 'local'
const needSourcemap = NUXT_ENV_OUTPUT_ENV !== 'production'
const enableDebug = NUXT_ENV_OUTPUT_ENV === 'local'

const meta: MetaInfo = {
  title: '',
  description: '',
  robots: NUXT_ENV_OUTPUT_ENV === 'production' ? 'all' : 'none',
  siteName: '',
  ogImageUrl: `${runtimeConfig.public.url}/images/ogp.jpg`,
  ogUrl: runtimeConfig.public.url,
  twitterSite: 'https://x.com/',
  twitterCreator: 'https://x.com/',
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: path.resolve(__dirname, '../base'),
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/content',
  ],
  ssr: isSsr,

  imports: {
    dirs: ['utils/types/**'],
    global: false,
  },

  app: {
    head: {
      meta: [
        { name: 'robots', content: meta.robots },
        {
          name: 'description',
          content: meta.description,
        },
        {
          property: 'og:site_name',
          content: meta.siteName,
        },
        {
          property: 'og:url',
          content: meta.ogUrl,
        },
        {
          property: 'og:title',
          content: meta.title,
        },
        {
          property: 'og:description',
          content: meta.description,
        },
        {
          property: 'og:image',
          content: meta.ogImageUrl,
        },
        {
          name: 'twitter:site',
          content: meta.twitterSite,
        },
        {
          name: 'twitter:creator',
          content: meta.twitterCreator,
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${runtimeConfig.public.url}/favicon.ico`,
        },
      ],
    },
  },

  css: cssUrls,

  content: {
    watch: {
      enabled: true,
    },
    build: {
      markdown: {
        toc: {
          depth: 4,
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
            sepia: 'monokai',
          },
        },
        remarkPlugins: {
          'remark-gfm': {
            singleTilde: false,
          },
        },
      },
    },
    experimental: {
      nativeSqlite: true,
    },
  },

  runtimeConfig,
  dir: {
    public: path.resolve(__dirname, './public'),
  },
  rootDir: __dirname,
  srcDir: `${srcDir}/`,

  alias: {
    '#base': path.resolve(__dirname, '../base'),
    '#main': __dirname,
    '@': path.resolve(__dirname, './app'),
  },

  ignore: [
    '.output',
    '**/test/*.{js,ts,jsx,tsx}',
    '**/*.{spec,test}.{js,ts,jsx,tsx}',
    '**/-*.*',
  ],

  build: {
    analyze: needAnalyze,
  },

  sourcemap: {
    server: needSourcemap,
    client: needSourcemap,
  },

  compatibilityDate: '2024-04-03',

  typescript: {
    typeCheck: checkTypeCheckOnBuild,
  },

  debug: process.env.VITEST === 'true' ? false : enableDebug,

  googleFonts: {
    families: {
      'Noto+Sans+JP': [100, 300, 400, 500, 700, 900],
      'Inter': [100, 300, 400, 500, 700, 900],
    },
    display: 'swap',
  },

  i18n: nuxtI18nOptions,

  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 300,
      }
    }
  }
})
````

## File: layers/main/package.json
````json
{
  "name": "vket-boilerplate-nuxt-main",
  "private": true,
  "type": "module",
  "version": "1.0.1",
  "packageManager": "bun@1.3.9",
  "scripts": {
    "postinstall": "if [ -x ../base/node_modules/.bin/nuxt ]; then ../base/node_modules/.bin/nuxt prepare; elif command -v nuxt >/dev/null 2>&1; then nuxt prepare; else echo 'skip nuxt prepare: nuxt not installed'; fi",
    "dev": "cross-env VITE_OUTPUT_ENV=\"$target\" nuxt dev",
    "dev:local": "cross-env VITE_OUTPUT_ENV=local nuxt dev",
    "build": "cross-env VITE_OUTPUT_ENV=\"$target\" nuxt build",
    "build:local": "cross-env VITE_OUTPUT_ENV=local nuxt build",
    "build:staging": "cross-env VITE_OUTPUT_ENV=staging nuxt build",
    "generate": "cross-env VITE_OUTPUT_ENV=\"$target\" nuxt generate",
    "generate:local": "cross-env VITE_OUTPUT_ENV=local nuxt generate",
    "preview": "nuxt preview",
    "typecheck": "cross-env VITE_OUTPUT_ENV=local nuxt typecheck",
    "analyze": "cross-env VITE_OUTPUT_ENV=local nuxt analyze",
    "lint": "bun lint:eslint && bun lint:stylelint",
    "lint:eslint": "eslint --cache --cache-strategy content './app'",
    "lint:stylelint": "stylelint --cache --cache-strategy content './app/**/*.{css,scss,sass,vue}'",
    "fix": "bun fix:eslint && bun fix:stylelint",
    "fix:eslint": "eslint --cache --cache-strategy content --fix './app'",
    "fix:stylelint": "stylelint --cache-strategy content --fix './app/**/*.{css,scss,sass,vue}'",
    "fix-openapi-models": "baseDir='./app/models/openapi' ext='\\.ts' cmd='eslint --cache --cache-strategy content --fix ./app/models/openapi' bun exec-if-file-exists",
    "test:ut": "cmd='vitest run --dir ./app/test' bun exec-test",
    "test:watch": "cmd='vitest --dir ./app/test' bun exec-test",
    "test:ui": "cmd='vitest --ui --dir ./app/test' bun exec-test",
    "test:coverage": "cmd='vitest run --dir ./app/test --coverage' bun exec-test",
    "exec-test": "baseDir='./app/test' ext='\\.spec\\.ts' bun exec-if-file-exists",
    "exec-if-file-exists": "[ \"$(find $baseDir | grep \"${ext}$\" | wc -l)\" -gt 0 ] && $cmd || true",
    "package-update": "bunx npm-check-updates -i",
    "clean-install": "bun run ../../scripts/clean_install.js",
    "allclean-install": "bun run ../../scripts/clean_install.js all"
  },
  "dependencies": {
    "@nuxt/content": "^3.12.0",
    "vket-boilerplate-nuxt-base": "workspace:*"
  }
}
````

## File: layers/main/app/assets/styles/_common.scss
````scss
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.glassy-box {
  position: relative;
  padding: 22px 36px;
  border-radius: 20px;

  // グラスモーフィズム的な表現のための疑似要素
  &::after {
    pointer-events: none;
    content: '';

    position: absolute;
    inset: 0;

    padding: 1px;
    border-radius: inherit;

    background: rgb(88 88 88);

    mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  &--cyan {
    box-shadow: 0 0 20px 0 rgba(v.$vket-cyan, 0.4) inset;

    .glassy-box__icon {
        background: rgba(v.$vket-cyan, 0.4);
    }

    >.title{
        color: v.$vket-cyan;
    }

    .title-box .label{
        color: v.$vket-cyan;
    }
  }

  &--light-cyan {
    box-shadow: 0 0 20px 0 rgba(v.$vket-cyan, 0.4) inset;

    .glassy-box__icon {
        background: rgba(v.$vket-cyan, 0.4);
    }

    >.title{
        color: v.$vket-light-cyan;
    }

    .title-box .label{
        color: v.$vket-cyan;
    }
  }

  &--magenta {
    box-shadow: 0 0 20px 0 rgba(v.$vket-magenta, 0.4) inset;

    .glassy-box__icon {
        background: rgba(v.$vket-magenta, 0.4);
    }

    >.title {
        color: v.$vket-magenta;
    }

    .title-box .label{
        color: v.$vket-magenta;
    }
  }

  &--light-magenta {
    box-shadow: 0 0 20px 0 rgba(v.$vket-magenta, 0.4) inset;

    .glassy-box__icon {
        background: rgba(v.$vket-magenta, 0.4);
    }

    >.title {
        color: v.$vket-light-magenta;
    }

    .title-box .label{
        color: v.$vket-magenta;
    }
  }

  &--amber {
    box-shadow: 0 0 20px 0 rgba(v.$vket-amber, 0.4) inset;

    .glassy-box__icon {
        background: rgba(v.$vket-amber, 0.4);
    }

    >.title{
        color: v.$vket-amber;
    }

    .title-box .label{
        color: v.$vket-amber;
    }
  }

  &--vermilion {
    box-shadow: 0 0 20px 0 rgba(v.$vket-vermilion, 0.4) inset;

    .glassy-box__icon {
        background: rgba(v.$vket-vermilion, 0.4);
    }

    >.title{
        color: v.$vket-vermilion;
    }

    .title-box .label{
        color: v.$vket-vermilion;
    }
  }

  >.title {
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 1.2em;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 54px;
    height: 54px;
    border-radius: 20px;

    svg{
        height: 50%;
    }
  }
}

.glassy-box-2{
  position: relative;
  border-radius: 20px;
  box-shadow: inset rgb(70 132 255 / 35%) 0 0 16px 4px;
  
  &::before {
    pointer-events: none;
    content:"";

    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;

    width: inherit;
    height: inherit;
    border: 1px solid transparent;
    border-radius: inherit;

    background-image:
    linear-gradient(
        135deg,
        rgb(255 255 255 / 65%) 20px,
        rgb(255 255 255 / 15%) 40px
    ),
    linear-gradient(
        315deg,
        rgb(255 255 255 / 65%) 20px,
        rgb(255 255 255 / 15%) 40px
    );
    background-clip: border-box, border-box;
    background-origin: border-box, border-box;

    -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0) border-box;
    mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0) border-box;
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
}

.glassy-box-3{
    position: relative;
    border-radius: 20px;
    box-shadow: inset rgb(black, 0.2) 0 0 16px 4px;
    
    &::before {
      pointer-events: none;
      content:"";

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      border: 2px solid transparent;
      border-radius: inherit;

      background-image:
      linear-gradient(
          45deg,
          rgb(v.$base-background-color, 0.8) 10px,
          rgb(v.$base-background-color, 0) 20px
      ),
      linear-gradient(
          225deg,
          rgb(v.$base-background-color, 0.8) 10px,
          rgb(v.$base-background-color, 0) 20px
      ),
      linear-gradient(
          135deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 30%) 20px,
      ),
      linear-gradient(
          315deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 30%) 20px,
      );
      background-clip: border-box, border-box, border-box, border-box;
      background-origin: border-box, border-box, border-box, border-box;

      -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) border-box;
      mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
}

.glassy-button-3 {
    position: relative;
    border-radius: 1000px;
    background-color: rgb(217 217 217 / 20%);
    box-shadow: inset rgb(black, 0.2) 0 0 16px 4px;
    
    &::before {
      pointer-events: none;
      content:"";

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: inherit;
      height: inherit;
      border: 1px solid transparent;
      border-radius: inherit;

      background-image:
      linear-gradient(
          45deg,
          rgb(v.$base-background-color, 0.8) 10px,
          rgb(v.$base-background-color, 0) 20px
      ),
      linear-gradient(
          225deg,
          rgb(v.$base-background-color, 0.8) 10px,
          rgb(v.$base-background-color, 0) 20px
      ),
      linear-gradient(
          135deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 30%) 20px,
      ),
      linear-gradient(
          315deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 30%) 20px,
      );
      background-clip: border-box, border-box, border-box, border-box;
      background-origin: border-box, border-box, border-box, border-box;

      -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) border-box;
      mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
}

.subtitle {
  width: fit-content;
  margin: 0 auto 42px;

  font-size: 20px;
  font-weight: 700;
  line-height: 1.5em;
  color: white;
  text-align: center;

  @include m.tb {
    font-size: 16px;
  }

  &--left {
    text-align: left;
  }
}

/* swiper.js */
.custom-swiper-pagination {
	display: flex;
	gap: 6px;
	justify-content: center;
	margin-top: 60px;

	.swiper-pagination-bullet {
		width: 16px;
		height: 16px;
		border-radius: 10px;
		background-color: rgb(30 53 91 / 100%);
        
        &.swiper-pagination-bullet-active {
            background-color: rgb(94 130 190 / 100%);
        }
	}
}
````

## File: layers/main/app/components/ht/HtAboutSection.vue
````vue
<script setup lang="ts">
import HaCard from '../ha/HaAboutCard.vue'
import HaCommunityIcon from '../ha/icons/HaCommunityIcon.vue'
import HaStarShineIcon from '../ha/icons/HaStarShineIcon.vue'
import HaWorldIcon from '../ha/icons/HaWorldIcon.vue'
</script>

<template>
  <HaSectionTitle
    title="VketReal in 札幌とは"
    label="about"
  />
  <div
    class="description"
    style="width: 750px;"
  >
    世界最大級のメタバースイベント「バーチャルマーケット(Vket)」から派生した、「バーチャルの姿のままリアルに飛び出す！」リアルイベント。<br>北海道の有志XRクリエイターが主催し、札幌で開催します。
  </div>
  <div class="info-flex mb-24">
    <div class="info-flex__child">
      <p class="info-flex__number info-flex__number--amber">
        500名+
      </p>
      <p class="info-flex__label">
        過去の来場者数
      </p>
    </div>
    <div class="info-flex__child">
      <p class="info-flex__number info-flex__number--cyan">
        50+
      </p>
      <p class="info-flex__label">
        出展サークル数
      </p>
    </div>
    <div class="info-flex__child">
      <p class="info-flex__number info-flex__number--magenta">
        6回
      </p>
      <p class="info-flex__label">
        開催回数
      </p>
    </div>
  </div>

  <div class="card-flex mb-24">
    <HaCard
      class="child"
      color="amber"
    >
      <template #icon>
        <HaStarShineIcon />
      </template>
      <template #title>
        バーチャル姿のまま<br>リアルで体験
      </template>
      <template #body>
        アバターとしての生き方を大切にする人々が<br>リアルの場で集い、交流し、共に<br>クリエイティブな未来を気付く場です。
      </template>
    </HaCard>
    <HaCard
      class="child"
      color="cyan"
    >
      <template #icon>
        <HaWorldIcon />
      </template>
      <template #title>
        VRの世界で活躍する<br>クリエイターの出展
      </template>
      <template #body>
        VRとリアルを行き来しながら活躍する<br>クリエイターの作品展示や、新たなXR技術を<br>活用したインタラクティブな企画を展開！
      </template>
    </HaCard>
    <HaCard
      class="child"
      color="light-magenta"
    >
      <template #icon>
        <HaCommunityIcon />
      </template>
      <template #title>
        遊んで、買って、<br>楽しめる企業ブース
      </template>
      <template #body>
        各企業ブースでは最新XRコンテンツを体験でき、<br>ここでしか手に入らない限定グッズも<br>販売されるかも？
      </template>
    </HaCard>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.description {
  margin: 0 auto 96px;

  font-size: 20px;
  font-weight: 700;
  line-height: 1.5em;
  color: white;
  text-align: center;

  @include m.tb {
    max-width: 555px;
    font-size: 16px;
  }
}

.info-flex {
  display: flex;
  gap: 32px;
  justify-content: center;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @include m.tb {
    flex-direction: column;
    align-items: center;
  }

  &__child{
    width: 320px;
  }

  &__number{
    margin-bottom: 4px;

    font-size: 64px;
    font-weight: 700;
    line-height: 1em;
    text-align: center;
    letter-spacing: normal;
    white-space: nowrap;

    &--cyan{
      color: v.$vket-cyan;
    }

    &--amber{
      color: v.$vket-amber;
    }

    &--magenta{
      color: v.$vket-magenta;
    }
  }

  &__label{
    font-size: 16px;
    font-weight: 400;
    color: v.$vket-emerald;
    text-align: center;
  }
}

.card-flex {
  display: flex;
  gap: 32px;
  justify-content: center;

  @include m.tb {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  .child {
    width: 320px;

    @include m.tb {
      width: 60%;
    }
  }
}
</style>
````

## File: layers/main/app/components/ht/HtNewsSection.vue
````vue
<script setup lang="ts">
import HmSwiper from '../hm/HmSwiper.vue'
import HaChevronLeft from '../ha/icons/HaChevronLeft.vue'
import HaChevronRight from '../ha/icons/HaChevronRight.vue'

import type { Swiper as SwiperType } from 'swiper'

const worksSwiperRef = ref<{ swiperInstance: SwiperType | null } | null>(null)

// 親側でリアクティブな状態として持つ
const isBeginning = ref(true)
const isEnd = ref(false)

const onSlideChange = (newIsBeginning: boolean, newIsEnd: boolean) => {
  isBeginning.value = newIsBeginning
  isEnd.value = newIsEnd
}
</script>

<template>
  <HaSectionTitle
    title="お知らせ"
    label="news"
  >
    <template #controls>
      <button
        :disabled="isBeginning"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isBeginning }"
        @click="worksSwiperRef?.swiperInstance?.slidePrev()"
      >
        <HaChevronLeft />
      </button>
      <button
        :disabled="isEnd"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isEnd }"
        @click="worksSwiperRef?.swiperInstance?.slideNext()"
      >
        <HaChevronRight />
      </button>
    </template>
  </HaSectionTitle>

  <HmSwiper
    ref="worksSwiperRef"
    :_slides-per-view="1.4"
    class="mb-24"
    @slide-change="onSlideChange"
  />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.custom-swiper-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  border-radius: 100px;

  background-color: #1e355b;

  &.is-disabled {
    opacity: 0.6;
    background-color: transparent;
  }
}
</style>
````

## File: layers/main/app/app.vue
````vue
<i18n lang="yaml">
  ja:
    site:
      title: Vket Boilerplate Nuxt
      title_template: "{title} - HIKKY Web Frontend"
      description: Vketのサイト開発で活用しているボイラープレート
  en:
    site:
      title: Vket Boilerplate Nuxt
      title_template: "{title} - HIKKY Web Frontend"
      description: A boilerplate used for Vket site development
</i18n>

<template>
  <Head>
    <Link
      rel="alternate"
      hreflang="ja"
      :href="currentJaFullPath"
    />
    <Link
      rel="alternate"
      hreflang="en"
      :href="currentEnFullPath"
    />
    <Link
      rel="alternate"
      hreflang="x-default"
      :href="currentJaFullPath"
    />
    <template v-if="currentLang === 'ja'">
      <Link
        rel="canonical"
        :href="currentJaFullPath"
      />
    </template>
    <template v-if="currentLang === 'en'">
      <Link
        rel="canonical"
        :href="currentEnFullPath"
      />
    </template>
  </Head>
  <Body class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<script lang="ts" setup>
const route = useRoute()
const i18n = useI18n()
const currentFullPath = ref(`${useRuntimeConfig().public.url}${route.fullPath}`)
const currentLang = ref(i18n.locale.value)

const currentJaFullPath = computed(() => {
  if (currentLang.value === 'ja') {
    return currentFullPath.value
  } else {
    return currentFullPath.value
      .replace(/\/en(\/|$)/, '/')
      .replace(/\/{2,}/, '/')
  }
})

const currentEnFullPath = computed(() => {
  if (currentLang.value === 'en') {
    return currentFullPath.value
  } else {
    const path = route.fullPath.endsWith('/')
      ? route.fullPath
      : `${route.fullPath}/`
    return `${useRuntimeConfig().public.url}/en${path}`
  }
})

useHeadSafe({
  htmlAttrs: {
    lang: currentLang.value,
  },
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? i18n.t('site.title_template', { title: titleChunk })
      : i18n.t('site.title')
  },
  meta: [
    {
      name: 'description',
      content: i18n.t('site.description'),
    },
    {
      property: 'og:description',
      content: i18n.t('site.description'),
    },
    {
      property: 'og:site_name',
      content: i18n.t('site.title'),
    },
  ],
})
</script>
````

## File: layers/main/app/assets/styles/_variables.scss
````scss
/* color palette */
$violet: #b760eb; // Sidebar button
$blue: #3ff; // button02, tag, link hover, #33FFFF
$blue-1: #0c98da; // Sidebar button
$yellow: #ffba00; // button01 hover, text link hover
$orange: #ff8500; // button01, tag
$green: #69b756; // Sidebar button
$green-1: #47c6ae; // Sidebar button
$green-2: #1b5e68; // form focus
$red: #c43232; // alert
$red-1: #46212a; // form error
$pink: #ff4e8e; // button03, tag
$pink-1: #f86464; // Sidebar button
$gray: #737477; // Button disabled BG
$black: #111827; // Body BG
$black-1: #020e1c; // Header Footer BG
$navy: #101e3c; // Sub BG
$navy-1: #17385d; // Item Card BG
$navy-2: #19477f; // Line
$white: #fff;
$white-1: rgba(#fff, 0.7);

/* vket color palette */
$vket-dark-navy: #0f1b2e;
$vket-cyan: #00d9ff;
$vket-magenta: #ff006e;
$vket-amber: #ffa500;
$vket-vermilion: #ff4500;
$vket-emerald: #43ffbd;
$vket-white: #fff;
$vket-gray: #a0a0a0;
$vket-dark-purple: #2d1b4e; // デザイン要件定義には「薄紫」と記載されている
$vket-pink: #ff1493;
$vket-yellow-green: #7fff00;
$vket-cherry-blossom: #ffb7c5;
$vket-rich-navy: #001a4d;
$vket-lime: #0f0;
$vket-orange: #ff8c00;
$vket-light-blue: #00bfff;
$vket-deep-navy: #0a0f1a;
$vket-light-purple: #dda0dd;
$vket-ice-blue: #b0e0e6;
$vket-light-cyan: #6dd3ff;
$vket-light-magenta: #ff82b8;
$vket-green: #258966;


/* スタイルガイドにないcolor */
$gray-1: #d1d1d1;
$gray-2: #505050;
$gray-3: #ffffff4d; // button
$green-3: #33ffff80; // button
$green-4: #228d92; // button
$green-5: #2bc6ca; // button
$blue-2: #353e49;
$black-undercoat: rgb(0 0 0 / 70%);

/* text color */
$text-body: #fff;
$text-link: #9a9daa;
$text-note: #737477;
$box-shadow: 5px 5px 5px rgba($gray-2, 0.2);

/* SNS Brand Colors */
$twitter: #1d9bf0;
$facebook: #1877f2;
$discord: #5865f2;
$note: #41c9b4;
$instagram-gradation: linear-gradient(to right, #febd1c, #f50200, #c10098);

/* color role */
$primary-color: $orange;
$primary-hover-color: $yellow;
$secondary-color: $blue;
$secondary-hover-color: $pink;
$base-background-color: #0f1b2e;
$base-font-color: $vket-white;
$sub-font-color: $vket-gray;
$font-color-note: $text-note;
$font-color-link: $text-link;
$font-color-headline: $black;
$font-color-placeholder: $text-link;
$base-link-color: $text-link;
$base-link-hover-color: $blue;
$primary-button-default-color: $orange;
$primary-button-active-color: $yellow;
$secondary-button-default-color: $blue;
$secondary-button-active-color: $pink;
$button-disabled-color: $gray;

/* early spring */
$spring-background-color: $vket-dark-navy;
$spring-accent-color-1: $vket-pink;
$spring-accent-color-2: $vket-yellow-green;
$spring-accent-color-3: $vket-cherry-blossom;

/* summer */
$summer-background-color: $vket-rich-navy;
$summer-accent-color-1: $vket-lime;
$summer-accent-color-2: $vket-orange;
$summer-accent-color-3: $vket-light-blue;

/* autumn */
$autumn-background-color: $vket-dark-navy;
$autumn-accent-color-1: $vket-cyan;
$autumn-accent-color-2: $vket-magenta;
$autumn-accent-color-3: $vket-vermilion;

/* winter */
$winter-background-color: $vket-deep-navy;
$winter-accent-color-1: $vket-white;
$winter-accent-color-2: $vket-light-purple;
$winter-accent-color-3: $vket-ice-blue;

/* font-settings */
// 参考： https://ics.media/entry/200317/
$base-font-family: 'Noto Sans JP', '游ゴシック', sans-serif;
$base-font-weight: 400;
$base-font-size: 16px;
$h1-font-size: 4rem;
$h2-font-size: 3rem;
$h3-font-size: 2rem;
$body-font-size: 1rem;
$caption-font-size: 14px; // FIXME: base-font-sizeを10pxとして1.4remとすべきかもしれない。レスポンシブ対応によるbase-font-sizeの変動についてデザイナーに仕様を確認してフォントサイズの管理方法を決める。

/* content width */
$pc-content-max-width: 1920px;
$pc-content-medium-width: 1280px;
$pc-content-min-width: 1080px;
$sp-query-width: 500px;
$xs-query-width: 370px;
$media-query-width: 769px;
$side-menu-width: 90px;
$side-menu-height-sp: 64px;

// topページ用に追加
$pc-content-body-width: 1470px;

/* content height */
$header-height-pc: 80px;
$header-height-sp: 60px;
$mypage-header-height-pc: 72px;
$mypage-header-height-sp: 72px;

/* space-settings */
$space-base: 16px;
$space-unit: 4px;

/* vket space settings */
$margin-between-sections-pc: 80px;
$margin-between-sections-tablet: 60px;
$margin-between-sections-sp: 40px;
$padding-card-pc: 24px;
$padding-card-sp: 16px;

@function space($value) {
  @return $value * $space-unit;
}

/* z-index-settings */
$zindex-main: 1;
$zindex-dialog: 100;
$zindex-mypage-header: 200;
$zindex-side-menu: $zindex-mypage-header + 1;
$zindex-footer: $zindex-mypage-header + 2;
$zindex-header: $zindex-mypage-header + 3;
$zindex-side-menu-button: $zindex-mypage-header + 4;
$zindex-toast: 300;
$zindex-loading: 400;

// todo: extend.scss 作成するか記述場所決める

/* 各ページタイトルのデザイン */
%title {
  display: flex;
  font-size: 24px;

  &::before {
    content: '';

    display: block;

    width: 5px;
    margin-right: space(2);
    border-radius: 6px;

    background: $orange;
  }
}

/* スクロールバーのデザイン */
// note: scrollbar-color はソリッドカラーのみ指定可能なので一応旧構文で書いている
%scroll-bar {
  // 幅
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  // 背景
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px $green-4;
  }

  // ボタン
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: $green-5;
  }
}
````

## File: layers/main/app/components/ht/HtQuickAccessSection.vue
````vue
<template>
  <HaSectionTitle
    title="参加者向け重要情報"
    label="quick access"
  />
  <div class="grid2x">
    <HaQuickAccessCard
      class="grid2x__child"
      color="cyan"
      title="開催日"
      label="DATE"
    >
      <template #icon>
        <HaCalendarIcon />
      </template>
      <template #body>
        <p />
      </template>
    </HaQuickAccessCard>
    <HaQuickAccessCard
      class="grid2x__child"
      color="magenta"
      title="会場"
      label="LOCATION"
    >
      <template #icon>
        <HaMapPinIcon />
      </template>
      <template #body>
        <p />
      </template>
    </HaQuickAccessCard>
    <HaQuickAccessCard
      class="grid2x__child"
      color="amber"
      title="チケット"
      label="TICKETS"
    >
      <template #icon>
        <HaTicketIcon />
      </template>
      <template #body>
        <p />
      </template>
    </HaQuickAccessCard>
    <HaQuickAccessCard
      class="grid2x__child"
      color="vermilion"
      title="スケジュール"
      label="SCHEDULE"
      icon-url="/icons/material-symbols_timer-outline.svg"
    >
      <template #icon>
        <HaTimerIcon />
      </template>
      <template #body>
        <p />
      </template>
    </HaQuickAccessCard>
  </div>
</template>

<script setup lang="ts">
import HaQuickAccessCard from '../ha/HaQuickAccessCard.vue'
import HaCalendarIcon from '../ha/icons/HaCalendarIcon.vue'
import HaMapPinIcon from '../ha/icons/HaMapPinIcon.vue'
import HaTicketIcon from '../ha/icons/HaTicketIcon.vue'
import HaTimerIcon from '../ha/icons/HaTimerIcon.vue'
</script>

<style lang="scss" scoped>
.grid2x {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 20px;

    &__child {
        height: 100%;
        min-height: 280px; // FIXME: 適当な値を入れている
    }
}
</style>
````

## File: layers/main/app/components/ht/HtTop.vue
````vue
<i18n lang="yaml">
ja:
  hoge: ほげ
en:
  hoge: hoge
</i18n>

<template>
  <main class="ht-top">
    <HaFirstView />
    <section id="quick-access">
      <HtQuickAccessSection />
    </section>

    <section id="about">
      <HtAboutSection />
    </section>

    <section id="news">
      <HtNewsSection />
    </section>

    <section id="contents">
      <HtContentsSection />
    </section>

    <section id="schedule">
      <HtScheduleSection />
    </section>

    <section id="exhibition">
      <HtExhibitionSection />
    </section>

    <section id="access">
      <HtAccessSection />
    </section>

    <section id="ticket">
      <HtTicketSection />
    </section>

    <section id="qa">
      <HtQandASection />
    </section>

    <section id="code-of-conduction">
      <HtCodeOfConductSection />
    </section>

    <section id="related-events">
      <HtRelatedEventsSection />
    </section>

    <section id="sponsors-and-partners">
      <HtSponsorsAndPartnersSection />
    </section>

    <section id="contact">
      <HtContactSection />
    </section>
  </main>
</template>

<script setup lang="ts">
import HaFirstView from '../ha/HaFirstView.vue'
import HtAboutSection from './HtAboutSection.vue'
import HtQuickAccessSection from './HtQuickAccessSection.vue'
import HtNewsSection from './HtNewsSection.vue'
import HtScheduleSection from './HtScheduleSection.vue'
import HtExhibitionSection from './HtExhibitionSection.vue'
import HtAccessSection from './HtAccessSection.vue'
import HtTicketSection from './HtTicketSection.vue'
import HtQandASection from './HtQandASection.vue'
import HtCodeOfConductSection from './HtCodeOfConductSection.vue'
import HtSponsorsAndPartnersSection from './HtSponsorsAndPartnersSection.vue'
import HtContactSection from './HtContactSection.vue'
import HtContentsSection from './HtContentsSection.vue'
import HtRelatedEventsSection from './HtRelatedEventsSection.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ht-top {
  width: 100%;
  height: 100%;
  background-color: v.$base-background-color;
}

section {
  padding: 0 136px 108px;

  @include m.tb {
    padding: 0 24px 72px;
  }
}
</style>
````
