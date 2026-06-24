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
- Only files matching these patterns are included: layers/main/app/plugins/**/*, layers/main/app/middleware/**/*, layers/main/app/app.vue
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
layers/
  main/
    app/
      middleware/
        .gitkeep
        archive-redirect.global.ts
      plugins/
        gsap.client.ts
        gtm.client.ts
        runtimeConfig.ts
      app.vue
```

# Files

## File: layers/main/app/middleware/.gitkeep
```

```

## File: layers/main/app/plugins/gtm.client.ts
```typescript
import { createGtm } from '@gtm-support/vue-gtm'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  createGtm({ id: config.public?.gtmId, enabled: true })
})
```

## File: layers/main/app/plugins/runtimeConfig.ts
```typescript
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
```

## File: layers/main/app/plugins/gsap.client.ts
```typescript
// plugins/gsap.client.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
```

## File: layers/main/app/middleware/archive-redirect.global.ts
```typescript
export default defineNuxtRouteMiddleware((to) => {
  const runtimeConfig = useRuntimeConfig()

  if (process.env.VITEST === 'true') {
    return
  }

  const debugQuery = to.query.debug
  const isDebug = Array.isArray(debugQuery)
    ? debugQuery.includes('1')
    : debugQuery === '1'

  if (isDebug) {
    return
  }

  return navigateTo(runtimeConfig.public.archivedUrl, {
    external: true,
    redirectCode: 302,
  })
})
```

## File: layers/main/app/app.vue
```vue
<i18n lang="yaml">
  ja:
    site:
      title: VketReal in 札幌 2026 Autumn
      title_template: "{title} - VketReal in 札幌"
      description: VRSNSユーザーとXRクリエイターが札幌に集うリアルイベント、VketReal in 札幌 2026 Autumn。2026年9月26日(土)、アスティーホールで開催予定です。
      keywords: VketReal,札幌,2026 Autumn,VR,SNS,XR,メタバース,イベント,北海道
      author: VketReal in 札幌 実行委員会
      og_locale: ja_JP
  en:
    site:
      title: VketReal in SAPPORO 2026 Autumn
      title_template: "{title} - VketReal in SAPPORO"
      description: VketReal in SAPPORO 2026 Autumn is a real-world event for VRSNS users and XR creators in Sapporo, scheduled for September 26, 2026 at ASTY Hall.
      keywords: VketReal,Sapporo,2026 Autumn,VR,SNS,XR,metaverse,event,Hokkaido
      author: VketReal in SAPPORO Executive Committee
      og_locale: en_US
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
const runtimeConfig = useRuntimeConfig()
const currentLang = ref(i18n.locale.value)

const currentFullPath = computed(() => `${runtimeConfig.public.url}${route.fullPath}`)
const title = computed(() => i18n.t('site.title'))
const description = computed(() => i18n.t('site.description'))
const ogImageUrl = computed(() => `${runtimeConfig.public.url}/kv.png`)

const currentJaFullPath = computed(() => {
  if (currentLang.value === 'ja') {
    return currentFullPath.value
  } else {
    const path = route.fullPath.replace(/^\/en(?=\/|$)/, '') || '/'
    return `${runtimeConfig.public.url}${path}`
  }
})

const currentEnFullPath = computed(() => {
  if (currentLang.value === 'en') {
    return currentFullPath.value
  } else {
    const path = route.fullPath.endsWith('/')
      ? route.fullPath
      : `${route.fullPath}/`
    return `${runtimeConfig.public.url}/en${path}`
  }
})

useHeadSafe({
  htmlAttrs: {
    lang: currentLang.value,
  },
  title: title.value,
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? i18n.t('site.title_template', { title: titleChunk })
      : title.value
  },
  meta: [
    {
      name: 'description',
      content: description.value,
    },
    {
      property: 'og:title',
      content: title.value,
    },
    {
      property: 'og:description',
      content: description.value,
    },
    {
      property: 'og:site_name',
      content: title.value,
    },
    {
      property: 'og:url',
      content: currentFullPath.value,
    },
    {
      property: 'og:image',
      content: ogImageUrl.value,
    },
    {
      property: 'og:locale',
      content: i18n.t('site.og_locale'),
    },
    {
      name: 'twitter:title',
      content: title.value,
    },
    {
      name: 'twitter:description',
      content: description.value,
    },
    {
      name: 'twitter:image',
      content: ogImageUrl.value,
    },
    {
      name: 'keywords',
      content: i18n.t('site.keywords'),
    },
    {
      name: 'author',
      content: i18n.t('site.author'),
    },
  ],
})
</script>
```
