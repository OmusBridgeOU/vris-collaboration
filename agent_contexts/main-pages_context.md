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
        top.vue
      pages/
        documents/
          [...slug].vue
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

## File: layers/main/app/layouts/default.vue
```vue
<template>
  <div class="layout -default">
    <HoTheHeader :nav-links="[]"/>
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

const navLinks: NavLink[] = [{ type: 'link', href: '/', text: 'TOPページ' }]
</script>

<style lang="scss" scoped>
.layout.-top {
  overflow-x: hidden;
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

const navLinks: NavLink[] = [
  { type: 'link', href: '/', text: 'TOPページ' },
  { type: 'anchor', href: 'quick-access', text: '参加者向け重要情報' },
  { type: 'anchor', href: 'about', text: 'VketReal in 札幌とは' },
  { type: 'anchor', href: 'news', text: 'お知らせ' },
  { type: 'anchor', href: 'contents', text: '企画・コンテンツ' },
  { type: 'anchor', href: 'schedule', text: '開催スケジュール' },
  { type: 'anchor', href: 'exhibition', text: '出展情報' },
  { type: 'anchor', href: 'access', text: 'アクセス' },
  { type: 'anchor', href: 'tickets', text: 'チケット' },
  { type: 'anchor', href: 'qa', text: 'よくある質問' },
  { type: 'anchor', href: 'code-of-conduct', text: '行動規範' },
  { type: 'anchor', href: 'related-events', text: '関連イベント' },
  { type: 'anchor', href: 'sponsors-and-partners', text: 'ご協力' },
  { type: 'anchor', href: 'contact', text: 'お問い合わせ' },
]
</script>

<style lang="scss" scoped>
.layout.-top {
  overflow-x: hidden;
}
</style>
```

## File: layers/main/app/pages/documents/[...slug].vue
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
