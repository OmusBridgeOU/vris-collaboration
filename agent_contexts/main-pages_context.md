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
- Only files matching these patterns are included: layers/main/app/layouts/**/*, layers/main/app/pages/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
layers/
  main/
    app/
      layouts/
        default.vue
        document.vue
        list.vue
        top.vue
      pages/
        _documents/
          [...slug].vue
        contents/
          index.vue
        news/
          index.vue
        index.vue
```

# Files

## File: layers/main/app/pages/index.vue
```vue
<template>
  <HtTop />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'top',
})
</script>
```

## File: layers/main/app/pages/_documents/[...slug].vue
```vue
<script lang="ts" setup>
definePageMeta({
  layout: 'document',
})

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <div class="md-document">
    <div class="md-document__card">
      <div class="md-document__inner">
        <ContentRenderer
          v-if="page"
          :value="page"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.md-document {
  padding: 88px 32px;

  @include m.sp {
    padding: 88px 12px;
  }

  &__card {
    position: relative;

    padding: 90px 0;
    border-radius: 20px;

    background-color: rgb(217 217 217 / 20%);
    box-shadow: inset rgb(black, 0.2) 0 0 16px 4px;

    @include m.sp {
      padding: 32px 12px;
    }

    &::before {
      pointer-events: none;
      content: '';

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      border-radius: inherit;

      background-image: linear-gradient(
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
          rgb(255 255 255 / 15%) 20px
        ),
        linear-gradient(
          315deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 15%) 20px
        );
      background-clip: border-box, border-box, border-box, border-box;
      background-origin: border-box, border-box, border-box, border-box;

      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  &__inner {
    max-width: 910px;
    margin: 0 auto;
  }

  :deep(h1) {
    font-size: 48px;
    color: white;
    text-align: center;

    @include m.sp {
      margin-bottom: 24px;
      font-size: 24px;
    }
  }

  :deep(h2) {
    margin-top: 6px;
    font-size: 32px;
    color: white;

    @include m.sp {
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 18px;
    }

    a {
      color: inherit;
    }
  }

  :deep(p) {
    font-size: 16px;
    line-height: 1.8;

    @include m.sp {
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 1.2;
    }
  }

  :deep(ol) {
    margin-bottom: 12px;
    padding-left: 1em;
    list-style-type: decimal;
  }

  :deep(ul) {
    margin-bottom: 12px;
    padding-left: 1em;
    list-style-type: disc;
  }

  :deep(li) {
    font-size: 16px;
    line-height: 1.8;

    @include m.sp {
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 1.2;
    }
  }

  :deep(hr) {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid #999;
  }
}
</style>
```

## File: layers/main/app/layouts/default.vue
```vue
<template>
  <div class="layout -default">
    <HoTheHeader :nav-links="[]" />
    <slot />
    <HoTheFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout.-default {
  overflow-x: hidden;
}
</style>
```

## File: layers/main/app/layouts/document.vue
```vue
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
```

## File: layers/main/app/layouts/list.vue
```vue
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
```

## File: layers/main/app/pages/contents/index.vue
```vue
<script lang="ts" setup>
import HaContentCard from '~/components/ha/HaContentCard.vue'
import HaPageTitle from '~/components/ha/HaPageTitle.vue'

definePageMeta({
  layout: 'list',
})

const { t: tGlobal } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: tGlobal('contents.1.title'),
    imgSrc: '',
    href: 'https://archived.vris.jp/',
    text: tGlobal('contents.1.text'),
  },
])
</script>

<template>
  <div class="contents-list">
    <div class="contents-list__card">
      <div class="contents-list__inner">
        <HaPageTitle
          label="contents"
          title="企画・コンテンツ"
          class="contents-list__item--full-width"
        />
        <HaContentCard
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
        <SwiperSlide
          key="comming-soon"
        >
          <HaCommingSoonCard />
        </SwiperSlide>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.contents-list {
  padding: v.$vket-header-height-pc 32px;

  @include m.tb {
    padding: v.$vket-header-height-tb 12px;
  }

  @include m.sp {
    padding: v.$vket-header-height-sp 12px;
  }

  &__card {
    position: relative;

    padding: 64px 24px 90px;
    border-radius: 50px;

    background-color: rgb(217 217 217 / 20%);
    box-shadow: inset rgb(black, 0.2) 0 0 16px 4px;

    @include m.sp {
      padding: 50px 12px;
    }

    &::before {
      pointer-events: none;
      content: '';

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      border-radius: inherit;

      background-image: linear-gradient(
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
          rgb(255 255 255 / 15%) 20px
        ),
        linear-gradient(
          315deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 15%) 20px
        );
      background-clip: border-box, border-box, border-box, border-box;
      background-origin: border-box, border-box, border-box, border-box;

      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    max-width: 1080px;
    margin: 0 auto;

    @include m.tb {
      grid-template-columns: 1fr 1fr;
      max-width: 520px;
    }

    @include m.sp {
      grid-template-columns: 1fr;
      max-width: none;
    }
  }

  &__item--full-width {
    grid-column: 1 / -1;
  }
}
</style>
```

## File: layers/main/app/pages/news/index.vue
```vue
<script lang="ts" setup>
import HaPageTitle from '~/components/ha/HaPageTitle.vue'
import HaNewsCard from '~/components/ha/HaNewsCard.vue'

definePageMeta({
  layout: 'list',
})

const { t: tGlobal } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: tGlobal('news.1.title'),
    href: 'https://archived.vris.jp/',
    imgSrc: '/news1_thumbnail.png',
    timestamp: '2026-06-06',
  },
  {
    id: 2,
    title: tGlobal('news.2.title'),
    href: 'https://archived.vris.jp/',
    imgSrc: '/news2_thumbnail.png',
    timestamp: '2026-06-01',
  },
])
</script>

<template>
  <div class="news-list">
    <div class="news-list__card">
      <div class="news-list__inner">
        <HaPageTitle
          label="news"
          title="お知らせ"
          class="news-list__item--full-width"
        />
        <HaNewsCard
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.news-list {
  padding: v.$vket-header-height-pc 32px;

  @include m.tb {
    padding: v.$vket-header-height-tb 12px;
  }

  @include m.sp {
    padding: v.$vket-header-height-sp 12px;
  }

  &__card {
    position: relative;

    padding: 64px 24px 90px;
    border-radius: 50px;

    background-color: rgb(217 217 217 / 20%);
    box-shadow: inset rgb(black, 0.2) 0 0 16px 4px;

    @include m.sp {
      padding: 50px 12px;
    }

    &::before {
      pointer-events: none;
      content: '';

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      border-radius: inherit;

      background-image: linear-gradient(
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
          rgb(255 255 255 / 15%) 20px
        ),
        linear-gradient(
          315deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 15%) 20px
        );
      background-clip: border-box, border-box, border-box, border-box;
      background-origin: border-box, border-box, border-box, border-box;

      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    max-width: 1080px;
    margin: 0 auto;

    @include m.tb {
      grid-template-columns: 1fr 1fr;
      max-width: 520px;
    }

    @include m.sp {
      grid-template-columns: 1fr;
      max-width: none;
    }
  }

  &__item--full-width {
    grid-column: 1 / -1;
  }
}
</style>
```

## File: layers/main/app/layouts/top.vue
```vue
<template>
  <div class="layout -top">
    <HoTheHeader :nav-links="navLinks" />
    <slot />
    <HoTheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NavLink } from '../components/ho/HoTheHeader.vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n()

const navLinks = computed<NavLink[]>(() => [
  { type: 'anchor', href: 'exhibitor-info', text: t('sectionTitle.exhibitorInfo') },
  { type: 'anchor', href: 'contents', text: t('sectionTitle.contents') },
  { type: 'anchor', href: 'location-info', text: t('sectionTitle.locationInfo') },
  { type: 'anchor', href: 'qa', text: t('sectionTitle.qa--min') },
])

const { firstViewBlur, destroyScrollTriggers } = useGsapFadeIn()
const route = useRoute()

onMounted(async () => {
  await initScrollEffects()
})

// ページ遷移時に#first-viewが存在しない場合があるためrouteを監視
watch(() => route.path, () => {
  destroyScrollTriggers()
  nextTick(() => initScrollEffects())
})

onUnmounted(() => {
  destroyScrollTriggers()
})

const initScrollEffects = async () => {
  const firstView = document.querySelector('#gsap-fv')

  // #first-viewがないページ（トップ以外）では実行しない
  if (!firstView) return

  firstViewBlur(firstView)

  // DOM更新が完了したタイミングでレイアウトを再計算
  await nextTick()
  ScrollTrigger.refresh()

  // 画像・フォント等の読み込み完了後にも念のため再計算
  window.addEventListener('load', () => {
    ScrollTrigger.refresh()
  }, { once: true })
}
</script>

<style lang="scss" scoped>
.layout.-top {
  overflow: visible;
}
</style>
```
