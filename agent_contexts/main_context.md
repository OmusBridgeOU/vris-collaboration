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
          _functions.scss
          _markdown.scss
          _mixins.scss
          _reset.scss
          _toast.scss
          _variables.scss
          style.scss
      components/
        ha/
          .gitkeep
          HaFireworks.vue
          HaFirstView.vue
          HaGlassCard.vue
          HaSectionTitle.vue
        hm/
          .gitkeep
        ho/
          HoTheFooter.vue
          HoTheHeader.vue
        ht/
          HtQuickAccessSection.vue
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
        ep_right.svg
        f7_tickets.svg
        line-md_calendar.svg
        material-symbols_timer-outline.svg
        mingcute_map-pin-line.svg
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

## File: layers/main/app/components/ha/HaFirstView.vue
````vue
<template>
  <div class="fv">
    <h2 class="fv__title">リアルとバーチャルの境界を、<br/><span class="fv__title--bold">開拓せよ。</span></h2>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
.fv{
    width: 100svw;
    height: 1100px; // FIXME: 仮置き
    display: flex;
    justify-content: center;
    align-items: center;

    &__title {
        font-weight: 700;
        font-size: 64px;
        line-height: 1.6em;
        color: v.$vket-vermilion;
        text-align: center;

        &--bold {
            font-weight: inherit;
            font-size: 128px;
            color: white;
            text-shadow: 0px 5px 20px v.$vket-amber;
        }
    }
}
</style>
````

## File: layers/main/app/components/ha/HaGlassCard.vue
````vue
<!-- components/GlassCard.vue -->
<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'link',
  color: 'cyan' | 'magenta' | 'amber' | 'vermilion', // @/assets/styles/_variables.scssの`card color`と命名を合わせている
  title: string,
  label: string,
  iconUrl?: string,
  iconRadius?: number | 'full',
}>()
</script>

<template>
  <div :class="['glass-card', `glass-card--${color ?? 'cyan'}`]">
    <div class="glass-card__head">
      <div class="glass-card__head-left">
        <div v-if="iconUrl" :class="['icon-box', `icon-box--${color ?? 'cyan'}`]">
            <img :src="iconUrl" :alt="title">
        </div>
        <div class="title-box">
            <p :class="['label', `label--${color ?? 'cyan'}`]">
                {{label}}
            </p>
            <h3 class="title">
                {{title}}
            </h3>
        </div>
      </div>
      <span class="glass-card__head-right" v-if="variant=='link'">
        <img src="/icons/ep_right.svg">
      </span>
    </div>
    <div class="glass-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.glass-card {
  position: relative;
  border-radius: 20px;
  padding: 22px 36px;

  // グラスモーフィズム的な表現のための疑似要素
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px; // ボーダーの太さ
    background: rgb(88, 88, 88);
    mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  &--cyan {
    box-shadow: 0px 0px 20px 0px rgba(v.$vket-cyan, 0.4) inset;
  }

  &--magenta {
    box-shadow: 0px 0px 20px 0px rgba(v.$vket-magenta, 0.4) inset;
  }

  &--amber {
    box-shadow: 0px 0px 20px 0px rgba(v.$vket-amber, 0.4) inset;
  }

  &--vermilion {
    box-shadow: 0px 0px 20px 0px rgba(v.$vket-vermilion, 0.4) inset;
  }

  &--info {
    border-color: rgba(45, 212, 191, 0.2);
  }

  &--warning {
    border-color: rgba(251, 191, 36, 0.2);
  }

  // glass-card-head
  &__head{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__head-left {
    display: flex;
    gap: 12px;
  }

  &__head-right {
    
  }

  .icon-box{
    height: 54px;
    width: 54px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
        height: 50%;
    }

    &--cyan {
        background: rgba(v.$vket-cyan, 0.4);
    }

    &--magenta {
        background: rgba(v.$vket-magenta, 0.4);
    }

    &--amber {
        background: rgba(v.$vket-amber, 0.4);
    }

    &--vermilion {
        background: rgba(v.$vket-vermilion, 0.4);
    }
  }

  .title-box{
    height: 100%;
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .label{
      font-size: 10px;
      font-weight: 700;
      line-height: 1em;

      &--cyan {
        color: v.$vket-cyan;
      }

      &--magenta {
        color: v.$vket-magenta;
      }

      &--amber {
        color: v.$vket-amber;
      }

      &--vermilion {
        color: v.$vket-vermilion;
      }
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
    <p class="section-title__label">{{ label }}</p>
    <h2 class="section-title__text">{{ title }}</h2>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
.section-title {
  position: relative;
  padding-top: 16px;
  margin-bottom: 96px;

  &__line {
    height: 2px;
    width: 100%;
    margin-bottom: 2px;
    position: relative;
    overflow: hidden;

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
      height: 2px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      margin-left: 12px;
      background: linear-gradient(to right, v.$vket-amber 0%, v.$vket-vermilion 100%);
    }
  }

  &__label {
    font-size: 12px;
    letter-spacing: 0.1em;
    color: v.$vket-amber;
    margin-bottom: 4px;
  }

  &__text {
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
  }
}
</style>
````

## File: layers/main/app/components/ht/HtQuickAccessSection.vue
````vue
<template>
    <HaSectionTitle title="参加者向け重要情報" label="QUICK ACCESS" />
      <div class="grid2x">
        <HaGlassCard class="grid2x__child" variant="link" color="cyan" title="開催日" label="DATE" iconUrl="/icons/line-md_calendar.svg">
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
        <HaGlassCard class="grid2x__child" variant="link" color="magenta" title="会場" label="LOCATION" iconUrl="/icons/mingcute_map-pin-line.svg">
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
        <HaGlassCard class="grid2x__child" variant="link" color="amber" title="チケット" label="TICKETS" iconUrl="/icons/f7_tickets.svg">
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
        <HaGlassCard class="grid2x__child" variant="link" color="vermilion" title="スケジュール" label="SCHEDULE" iconUrl="/icons/material-symbols_timer-outline.svg">
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
      </div>
</template>
````

## File: layers/main/public/icons/ep_right.svg
````xml
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.2344 12.8676H4.28924C4.06173 12.8676 3.84353 12.958 3.68265 13.1189C3.52178 13.2798 3.4314 13.498 3.4314 13.7255C3.4314 13.953 3.52178 14.1712 3.68265 14.3321C3.84353 14.4929 4.06173 14.5833 4.28924 14.5833H20.2344L13.9748 20.8375C13.8134 20.9989 13.7228 21.2178 13.7228 21.4461C13.7228 21.6743 13.8134 21.8932 13.9748 22.0546C14.1362 22.216 14.3551 22.3067 14.5834 22.3067C14.8116 22.3067 15.0305 22.216 15.1919 22.0546L22.9125 14.334C22.9927 14.2543 23.0564 14.1595 23.0999 14.055C23.1433 13.9506 23.1657 13.8386 23.1657 13.7255C23.1657 13.6124 23.1433 13.5004 23.0999 13.3959C23.0564 13.2915 22.9927 13.1967 22.9125 13.1169L15.1919 5.39635C15.112 5.31644 15.0171 5.25304 14.9127 5.2098C14.8083 5.16655 14.6964 5.14429 14.5834 5.14429C14.4703 5.14429 14.3584 5.16655 14.254 5.2098C14.1496 5.25304 14.0547 5.31644 13.9748 5.39635C13.8949 5.47626 13.8315 5.57113 13.7883 5.67555C13.745 5.77996 13.7228 5.89187 13.7228 6.00488C13.7228 6.1179 13.745 6.22981 13.7883 6.33422C13.8315 6.43863 13.8949 6.5335 13.9748 6.61341L20.2344 12.8676Z" fill="#43FFBD"/>
</svg>
````

## File: layers/main/public/icons/f7_tickets.svg
````xml
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_350_141)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.166 6.25412L24.7303 8.35938C24.8054 8.64034 24.8009 8.93667 24.7173 9.21522C24.6336 9.49377 24.4741 9.74355 24.2566 9.93662L24.1807 10.0003C23.8068 10.2919 23.5257 10.6858 23.3713 11.1342C23.2169 11.5825 23.1959 12.066 23.311 12.526C23.426 12.986 23.672 13.4027 24.0193 13.7256C24.3665 14.0485 24.8 14.2637 25.2671 14.345L25.3729 14.3612C25.6689 14.3999 25.9466 14.5255 26.1712 14.7221C26.3957 14.9188 26.5568 15.1775 26.6342 15.4658L27.2088 17.6092C27.2755 17.8578 27.2925 18.117 27.259 18.3722C27.2255 18.6273 27.142 18.8734 27.0134 19.0962C26.8847 19.3191 26.7135 19.5145 26.5093 19.6712C26.3052 19.8278 26.0722 19.9428 25.8236 20.0094L5.95141 25.3338C5.44951 25.4681 4.9148 25.3976 4.46488 25.1377C4.01496 24.8779 3.68669 24.4499 3.55225 23.948L3.01197 21.9314C2.93174 21.6313 2.9348 21.315 3.02085 21.0165C3.10689 20.7179 3.27266 20.4485 3.50033 20.2371L3.58017 20.1686C3.94623 19.8699 4.21812 19.4718 4.36309 19.0222C4.50805 18.5725 4.51991 18.0906 4.39722 17.6343C4.27453 17.1781 4.02254 16.7671 3.6716 16.4508C3.32067 16.1345 2.88576 15.9265 2.41929 15.8517C2.09666 15.7997 1.79597 15.6555 1.55342 15.4365C1.31086 15.2175 1.1368 14.933 1.05219 14.6174L0.509461 12.5929C0.44288 12.3444 0.425921 12.0851 0.459554 11.83C0.493187 11.5748 0.576753 11.3288 0.705479 11.106C0.834205 10.8831 1.00557 10.6878 1.20978 10.5312C1.414 10.3746 1.64706 10.2598 1.89566 10.1933L21.7664 4.86889C22.0149 4.80222 22.2742 4.78517 22.5293 4.8187C22.7845 4.85224 23.0305 4.9357 23.2534 5.06434C23.4763 5.19297 23.6716 5.36425 23.8283 5.5684C23.985 5.77254 24.0999 6.00555 24.1665 6.25412M22.1264 6.55144L2.42516 11.8303C2.15331 11.9033 1.99167 12.183 2.06465 12.4548L2.45211 13.9013C3.28996 14.0701 4.06404 14.4695 4.68714 15.0545C5.31024 15.6395 5.7576 16.3869 5.97884 17.2125C6.20011 18.0381 6.18644 18.9091 5.93936 19.7273C5.69228 20.5456 5.22162 21.2786 4.58039 21.8438L4.96784 23.2902C5.04132 23.5621 5.32052 23.7237 5.59237 23.6507L25.2931 18.3719C25.565 18.2989 25.7266 18.0192 25.6536 17.7474L25.2667 16.3014C24.4287 16.1325 23.6546 15.7331 23.0315 15.148C22.4084 14.5628 21.9611 13.8153 21.7399 12.9897C21.5186 12.1641 21.5322 11.2932 21.7792 10.4749C22.0262 9.65666 22.4967 8.92363 23.1379 8.3584L22.7504 6.91195C22.7331 6.84724 22.7033 6.78657 22.6625 6.73342C22.6218 6.68026 22.5709 6.63566 22.5129 6.60218C22.4549 6.56869 22.3909 6.54698 22.3245 6.53827C22.2581 6.52956 22.1911 6.53404 22.1264 6.55144ZM21.4975 17.1116C21.5474 17.298 21.5601 17.4924 21.5349 17.6837C21.5096 17.875 21.447 18.0595 21.3505 18.2266C21.2539 18.3938 21.1255 18.5402 20.9723 18.6577C20.8192 18.7751 20.6445 18.8613 20.458 18.9112C20.2716 18.9611 20.0772 18.9738 19.8859 18.9486C19.6946 18.9234 19.5101 18.8607 19.343 18.7642C19.1759 18.6677 19.0294 18.5392 18.9119 18.3861C18.7945 18.2329 18.7084 18.0582 18.6584 17.8718C18.5576 17.4953 18.6105 17.0942 18.8054 16.7567C19.0004 16.4192 19.3214 16.173 19.6978 16.0722C20.0743 15.9713 20.4754 16.0242 20.8129 16.2192C21.1504 16.4141 21.3966 16.7351 21.4975 17.1116ZM20.4835 13.3262C20.5844 13.7027 20.5316 14.1038 20.3367 14.4414C20.1418 14.7789 19.8208 15.0252 19.4444 15.1261C19.0679 15.2269 18.6667 15.1741 18.3292 14.9792C17.9917 14.7844 17.7454 14.4634 17.6445 14.0869C17.5494 13.7124 17.6056 13.3155 17.8009 12.9821C17.9963 12.6488 18.3151 12.4058 18.6884 12.3057C19.0616 12.2057 19.4592 12.2567 19.7951 12.4477C20.131 12.6387 20.3786 12.9543 20.4835 13.3262ZM19.4686 9.54133C19.5186 9.72774 19.5313 9.92217 19.5061 10.1135C19.4809 10.3048 19.4183 10.4893 19.3218 10.6565C19.2253 10.8236 19.0968 10.9701 18.9437 11.0876C18.7906 11.2051 18.6159 11.2912 18.4294 11.3412C18.243 11.3911 18.0486 11.4039 17.8573 11.3787C17.6659 11.3535 17.4814 11.2909 17.3143 11.1944C17.1472 11.0979 17.0007 10.9694 16.8832 10.8163C16.7657 10.6632 16.6795 10.4884 16.6296 10.302C16.5287 9.92555 16.5815 9.52442 16.7764 9.18688C16.9713 8.84934 17.2923 8.60304 17.6687 8.50217C18.0452 8.40129 18.4464 8.4541 18.7839 8.64899C19.1214 8.84387 19.3677 9.16485 19.4686 9.54133ZM14.3926 3.10896L15.6426 4.89388C15.6609 4.92033 15.6783 4.9471 15.695 4.97421L3.73593 8.17864L11.6637 2.62746C12.0894 2.32958 12.616 2.21297 13.1276 2.30326C13.6392 2.39356 14.0946 2.68337 14.3926 3.10896Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_350_141">
<rect width="27.4302" height="27.4302" fill="white"/>
</clipPath>
</defs>
</svg>
````

## File: layers/main/public/icons/line-md_calendar.svg
````xml
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7255 4.5752H21.7321C22.3611 4.5752 22.8758 5.0899 22.8758 5.71899V21.7321C22.8758 22.3611 22.3611 22.8758 21.7321 22.8758H5.71899C5.0899 22.8758 4.5752 22.3611 4.5752 21.7321V5.71899C4.5752 5.0899 5.0899 4.5752 5.71899 4.5752H13.7255Z" stroke="white" stroke-width="1.61546" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.74866 5.18958H23.1428V9.27717H4.74866V5.18958Z" fill="white"/>
<path d="M8.00659 4.57518V2.2876M19.4445 4.57518V2.2876" stroke="white" stroke-width="1.61546" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00659 12.5817H19.4445" stroke="white" stroke-width="1.61546" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00659 17.1569H16.0131" stroke="white" stroke-width="1.61546" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
````

## File: layers/main/public/icons/material-symbols_timer-outline.svg
````xml
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2863 3.42879V1.14294H17.1438V3.42879H10.2863ZM12.5721 16.001H14.8579V9.14341H12.5721V16.001ZM9.72851 24.3306C8.4812 23.7873 7.39085 23.049 6.45746 22.1156C5.52407 21.1822 4.78612 20.0915 4.24362 18.8434C3.70111 17.5953 3.42947 16.2669 3.42871 14.858C3.42795 13.4492 3.69959 12.1203 4.24362 10.8715C4.78765 9.62268 5.5256 8.53233 6.45746 7.60046C7.38932 6.6686 8.48005 5.93065 9.72965 5.38662C10.9792 4.84259 12.3077 4.57095 13.715 4.57172C14.896 4.57172 16.0294 4.7622 17.1152 5.14318C18.201 5.52415 19.2201 6.07656 20.1725 6.80042L21.7726 5.20032L23.3727 6.80042L21.7726 8.40051C22.4965 9.35295 23.0489 10.3721 23.4299 11.4578C23.8109 12.5436 24.0013 13.677 24.0013 14.858C24.0013 16.2676 23.7297 17.5965 23.1864 18.8445C22.6432 20.0926 21.9052 21.183 20.9726 22.1156C20.04 23.0482 18.9492 23.7865 17.7004 24.3306C16.4516 24.8746 15.1231 25.1459 13.715 25.1443C12.3069 25.1428 10.9781 24.8716 9.72851 24.3306ZM19.3725 20.5155C20.9345 18.9535 21.7155 17.0677 21.7155 14.858C21.7155 12.6484 20.9345 10.7626 19.3725 9.20056C17.8105 7.63856 15.9247 6.85756 13.715 6.85756C11.5054 6.85756 9.61955 7.63856 8.05755 9.20056C6.49556 10.7626 5.71456 12.6484 5.71456 14.858C5.71456 17.0677 6.49556 18.9535 8.05755 20.5155C9.61955 22.0775 11.5054 22.8585 13.715 22.8585C15.9247 22.8585 17.8105 22.0775 19.3725 20.5155Z" fill="white"/>
</svg>
````

## File: layers/main/public/icons/mingcute_map-pin-line.svg
````xml
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.7255 4.57511C13.2749 4.57511 12.8287 4.66387 12.4124 4.83631C11.9961 5.00875 11.6178 5.26151 11.2992 5.58014C10.9805 5.89877 10.7278 6.27704 10.5553 6.69336C10.3829 7.10967 10.2941 7.55587 10.2941 8.00649C10.2941 8.4571 10.3829 8.9033 10.5553 9.31962C10.7278 9.73593 10.9805 10.1142 11.2992 10.4328C11.6178 10.7515 11.9961 11.0042 12.4124 11.1767C12.8287 11.3491 13.2749 11.4379 13.7255 11.4379C14.6356 11.4379 15.5084 11.0763 16.1519 10.4328C16.7954 9.78933 17.1569 8.91654 17.1569 8.00649C17.1569 7.09643 16.7954 6.22365 16.1519 5.58014C15.5084 4.93663 14.6356 4.57511 13.7255 4.57511ZM8.00656 8.00649C8.00678 6.92443 8.31398 5.86463 8.89247 4.95019C9.47096 4.03575 10.297 3.30419 11.2747 2.84047C12.2523 2.37676 13.3415 2.19992 14.4156 2.33049C15.4898 2.46107 16.5049 2.8937 17.343 3.57814C18.181 4.26258 18.8078 5.17074 19.1503 6.19715C19.4929 7.22355 19.5372 8.32608 19.2782 9.37668C19.0192 10.4273 18.4674 11.3828 17.687 12.1324C16.9066 12.8819 15.9295 13.3946 14.8693 13.6111V19.4444C14.8693 19.7477 14.7488 20.0387 14.5343 20.2532C14.3198 20.4677 14.0289 20.5882 13.7255 20.5882C13.4222 20.5882 13.1312 20.4677 12.9167 20.2532C12.7022 20.0387 12.5817 19.7477 12.5817 19.4444V13.6111C11.29 13.3474 10.129 12.6455 9.29526 11.6242C8.46154 10.6029 8.00629 9.32488 8.00656 8.00649ZM10.8535 18.415C10.8762 18.5635 10.8695 18.7151 10.8336 18.8611C10.7977 19.007 10.7334 19.1445 10.6444 19.2656C10.5554 19.3867 10.4434 19.489 10.3148 19.5668C10.1862 19.6446 10.0435 19.6963 9.89496 19.7189C8.43319 19.9408 7.27225 20.2782 6.50934 20.6511C5.11391 21.3339 6.74496 21.8246 7.59594 22.09C9.11375 22.5647 11.2812 22.8758 13.7255 22.8758C16.1698 22.8758 18.3373 22.5647 19.8551 22.09C20.7118 21.8223 22.3371 21.3351 20.9417 20.6511C20.1788 20.2782 19.0178 19.9419 17.5561 19.7189C17.4059 19.6983 17.2612 19.648 17.1306 19.571C17 19.494 16.886 19.3918 16.7953 19.2703C16.7045 19.1489 16.6388 19.0106 16.602 18.8635C16.5652 18.7164 16.558 18.5635 16.5808 18.4136C16.6036 18.2637 16.656 18.1198 16.7349 17.9903C16.8138 17.8609 16.9177 17.7484 17.0405 17.6595C17.1633 17.5705 17.3026 17.5068 17.4502 17.4722C17.5978 17.4376 17.7508 17.4326 17.9004 17.4576C19.4879 17.6978 20.8994 18.0833 21.9482 18.5968C22.9593 19.0921 24.0196 19.9259 24.0196 21.1601C24.0196 22.0877 23.4203 22.7614 22.837 23.1926C20.3778 25.0089 16.6262 25.1633 13.7255 25.1633C11.1154 25.1633 8.7077 24.8339 6.91424 24.2735C5.4845 23.8274 3.4314 22.9467 3.4314 21.1601C3.4314 19.9248 4.49169 19.0921 5.5028 18.598C6.55166 18.0833 7.96424 17.699 9.54953 17.4576C9.69809 17.4349 9.84968 17.4416 9.99564 17.4775C10.1416 17.5134 10.279 17.5776 10.4001 17.6667C10.5212 17.7557 10.6236 17.8677 10.7014 17.9963C10.7792 18.1249 10.8308 18.2664 10.8535 18.415Z" fill="white"/>
</svg>
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
$base-background-color: $black;
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

## File: layers/main/app/assets/styles/style.scss
````scss
@forward 'reset';
@forward 'base';
````

## File: layers/main/app/components/ha/.gitkeep
````

````

## File: layers/main/app/components/hm/.gitkeep
````

````

## File: layers/main/app/components/ho/HoTheFooter.vue
````vue
<i18n lang="yaml">
ja:
  mainlogo: ロゴ名サービス名
en:
  mainlogo: logo name
</i18n>

<template>
  <footer class="ho-the-footer" />
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
// .ho-the-footer {}
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

## File: layers/main/app/components/ht/HtTop.vue
````vue
<i18n lang="yaml">
ja:
  hoge: ほげ
en:
  hoge: hoge
</i18n>

<template>
  <div class="ht-top">
    <HaFirstView />
    <section id="quick-access" class="section">
      <HaSectionTitle title="参加者向け重要情報" label="QUICK ACCESS" />
      <div class="grid2x">
        <HaGlassCard class="grid2x__child" variant="link" color="cyan" title="開催日" label="DATE" iconUrl="/icons/line-md_calendar.svg">
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
        <HaGlassCard class="grid2x__child" variant="link" color="magenta" title="会場" label="LOCATION" iconUrl="/icons/mingcute_map-pin-line.svg">
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
        <HaGlassCard class="grid2x__child" variant="link" color="amber" title="チケット" label="TICKETS" iconUrl="/icons/f7_tickets.svg">
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
        <HaGlassCard class="grid2x__child" variant="link" color="vermilion" title="スケジュール" label="SCHEDULE" iconUrl="/icons/material-symbols_timer-outline.svg">
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
      </div>
    </section>

    <section class="section" id="about">
      <HaSectionTitle title="VketReal in 札幌とは" label="about" />
      <div class="section__description" style="width: 750px;">
        世界最大級のメタバースイベント「バーチャルマーケット(Vket)」から派生した、「バーチャルの姿のままリアルに飛び出す！」リアルイベント。<br/>北海道の有志XRクリエイターが主催し、札幌で開催します。
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import HaFirstView from '../ha/HaFirstView.vue';
import HaGlassCard from '../ha/HaGlassCard.vue';
import HaSectionTitle from '../ha/HaSectionTitle.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ht-top {
  width: 100%;
  height: 100%;
}

.section {
  padding: 0 136px 108px;

  &__description {
    text-align: center;
    color: white;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.5em;
    margin: 0 auto 96px;
  }
}

#quick-access{
  // TODO: common.scssなどに移動すべき
  .grid2x {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    row-gap: 32px;

    &__child {
      min-height: 280px; //FIXME: 適当な値を入れている
      height: 100%;
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
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
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
