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
- Only files matching these patterns are included: layers/main/app/test/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
layers/
  main/
    app/
      test/
        components/
          HoTheHeader.spec.ts
        composables/
          useApi.spec.ts
          useCrowdData.spec.ts
        e2e/
          snapshots/
            visual/
              nuxtContent.spec.ts-snapshots/
                policy-linux.png
                terms-linux.png
          visual/
            nuxtContent.spec.ts
        utils/
          @types/
            auto-imports.d.ts
            components.d.ts
          api.spec.ts
          factory.spec.ts
          i18n.spec.ts
        setup.ts
```

# Files

## File: layers/main/app/test/components/HoTheHeader.spec.ts
```typescript
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { computed, ref } from 'vue'
import HoTheHeader from '../../components/ho/HoTheHeader.vue'
import { useCrowdData } from '../../composables/useCrowdData'

vi.mock('../../composables/useCrowdData', () => ({
  useCrowdData: vi.fn(),
}))

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }))

const crowdLevel = ref<0 | 1 | 2 | 3 | null>(1)
const isLoading = ref(false)
const isError = ref(false)
const wrappers: ReturnType<typeof mount>[] = []

function mountHeader() {
  const wrapper = mount(HoTheHeader, {
    attachTo: document.body,
    props: { navLinks: [{ type: 'link', href: '/news', text: 'News' }] },
    global: {
      stubs: {
        HaLanguageSwitcher: true,
        HaHamburgerIcon: true,
        HaCloseIcon: true,
      },
    },
  })
  wrappers.push(wrapper)
  return wrapper
}

beforeEach(() => {
  crowdLevel.value = 1
  isLoading.value = false
  isError.value = false
  vi.mocked(useCrowdData).mockReturnValue({
    crowdLevel: computed(() => crowdLevel.value),
    isLoading,
    isError,
    fetchCrowdData: vi.fn(),
  })
})

afterEach(() => {
  wrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('header crowd status', () => {
  test.each([
    [0, 'closed'],
    [1, 'venueavailable'],
    [2, 'venuemoderate'],
    [3, 'venuebusy'],
    [null, 'loading'],
  ] as const)('shows level %s as %s', (level, label) => {
    crowdLevel.value = level
    const wrapper = mountHeader()
    expect(wrapper.get('.ho-the-header__crowd').text()).toBe(label)
    expect(wrapper.get('.ho-the-header__crowd-dot').attributes('aria-hidden')).toBe('true')
  })

  test('does not show stale availability after a fetch error', () => {
    isError.value = true
    expect(mountHeader().get('.ho-the-header__crowd').text()).toBe('error')
  })

  test('shows loading rather than a previous level while initially loading', () => {
    isLoading.value = true
    expect(mountHeader().get('.ho-the-header__crowd').text()).toBe('loading')
  })
})

describe('header navigation', () => {
  test('opens the controlled panel, and Escape closes it and restores focus', async () => {
    const wrapper = mountHeader()
    const button = wrapper.get('.ho-the-header__hamburger')
    const panel = wrapper.get('#header-navigation')
    expect(button.attributes('aria-controls')).toBe('header-navigation')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(panel.attributes('inert')).toBeDefined()

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(panel.attributes('inert')).toBeUndefined()

    await panel.trigger('keydown', { key: 'Escape' })
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(button.element)
  })

  test('closes after following a navigation link', async () => {
    const wrapper = mountHeader()
    const button = wrapper.get('.ho-the-header__hamburger')
    await button.trigger('click')
    await wrapper.get('.ho-the-header__accordion-link').trigger('click')
    expect(button.attributes('aria-expanded')).toBe('false')
  })
})
```

## File: layers/main/app/test/composables/useApi.spec.ts
```typescript
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
```

## File: layers/main/app/test/e2e/visual/nuxtContent.spec.ts
```typescript
// app/test/e2e/visual/pages.spec.ts
import { test, expect } from '@playwright/test'

// テスト対象となるページ: nuxtContentを使用しているページ
const PAGES = [
  { name: 'terms', path: '/documents/terms' },
  { name: 'policy', path: '/documents/policy' },
]

for (const { name, path } of PAGES) {
  test(`${name}: ページの表示がベース画像と一致する`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot(`${name}.png`, {
      maxDiffPixelRatio: 0.02,
      fullPage: true,
    })
  })
}
```

## File: layers/main/app/test/utils/@types/auto-imports.d.ts
```typescript
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
```

## File: layers/main/app/test/utils/@types/components.d.ts
```typescript
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
```

## File: layers/main/app/test/utils/api.spec.ts
```typescript
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
```

## File: layers/main/app/test/utils/factory.spec.ts
```typescript
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
```

## File: layers/main/app/test/utils/i18n.spec.ts
```typescript
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
```

## File: layers/main/app/test/setup.ts
```typescript
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
    closedBy = ''
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
```

## File: layers/main/app/test/composables/useCrowdData.spec.ts
```typescript
// app/test/composables/useCrowdData.spec.ts
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { clearNuxtState } from '#app'

const EVENT_START = new Date('2026-09-26T10:00:00+09:00') // 本番コードと同じ開催日時

// EVENT_STARTを基準に前後の日時を生成
const BEFORE_EVENT = new Date(EVENT_START.getTime() - 1000) // 1秒前
const AFTER_EVENT = new Date(EVENT_START.getTime() + 1000) // 1秒後

// composableのデータフェッチ仕様（本番コードと合わせる）
const RETRY_INTERVAL_MS = 5_000
const NORMAL_INTERVAL_MS = 60_000
const MAX_RETRY_COUNT = 5

// モジュールスコープの状態（timerId等）を都度リセットするため、動的importを使う
async function importFresh() {
  vi.resetModules()
  return await import('~/composables/useCrowdData')
}

// 開催時刻の判定と分岐は正常か
describe('isBeforeEvent()', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  test('EVENT_STARTより1秒前はtrueを返す', async () => {
    vi.setSystemTime(BEFORE_EVENT)
    const { isBeforeEvent } = await importFresh()
    expect(isBeforeEvent()).toBe(true)
  })

  test('EVENT_STARTより1秒後はfalseを返す', async () => {
    vi.setSystemTime(AFTER_EVENT)
    const { isBeforeEvent } = await importFresh()
    expect(isBeforeEvent()).toBe(false)
  })
})

// 開催前後・APIレスポンス内容に応じてcrowdDataが適切に反映されるか
describe('crowdData / isBeforeEventStart', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    clearNuxtState() // useStateで共有される状態をテスト間でリセット
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  test('開催前はisBeforeEventStartがtrueで、crowdDataはnullのまま', async () => {
    vi.setSystemTime(BEFORE_EVENT)
    const { useCrowdData } = await importFresh()
    const { isBeforeEventStart, crowdData } = useCrowdData()

    expect(isBeforeEventStart.value).toBe(true)
    expect(crowdData.value).toBeNull()
  })

  test('開催後・APIレスポンス前はcrowdDataがnullでisLoadingがtrueのまま', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    const { useCrowdData } = await importFresh()
    const { isBeforeEventStart, crowdData, isLoading } = useCrowdData()

    expect(isBeforeEventStart.value).toBe(false)
    expect(crowdData.value).toBeNull()
    expect(isLoading.value).toBe(true)
  })

  test('APIが{value1:1, value2:2}を返したときcrowdDataに反映される', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ value1: 1, value2: 2, updated_at: AFTER_EVENT.toISOString() }),
      }),
    ))
    const { useCrowdData } = await importFresh()
    const { crowdData, fetchCrowdData } = useCrowdData()
    await fetchCrowdData()

    expect(crowdData.value?.value1).toBe(1)
    expect(crowdData.value?.value2).toBe(2)
    expect(crowdData.value?.updated_at).toBe(AFTER_EVENT.toISOString())
  })

  test('APIが{value1:2, value2:3}を返したときcrowdDataに反映される', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ value1: 2, value2: 3, updated_at: AFTER_EVENT.toISOString() }),
      }),
    ))
    const { useCrowdData } = await importFresh()
    const { crowdData, fetchCrowdData } = useCrowdData()
    await fetchCrowdData()

    expect(crowdData.value?.value1).toBe(2)
    expect(crowdData.value?.value2).toBe(3)
  })

  test('APIが{value1:-1}（API未登録）を返したときそのままcrowdDataに反映される', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ value1: -1, value2: -1, updated_at: null }),
      }),
    ))
    const { useCrowdData } = await importFresh()
    const { crowdData, fetchCrowdData } = useCrowdData()
    await fetchCrowdData()

    expect(crowdData.value?.value1).toBe(-1)
    expect(crowdData.value?.value2).toBe(-1)
    expect(crowdData.value?.updated_at).toBeNull()
  })

  test('ヘッダーとセクションの更新タイマーが互いに解除されない', async () => {
    vi.setSystemTime(AFTER_EVENT)
    const fetchMock = vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ timestamp: AFTER_EVENT.toISOString(), value: 1 }),
    }))
    vi.stubGlobal('fetch', fetchMock)
    const { useCrowdData } = await importFresh()
    const header = useCrowdData()
    const section = useCrowdData()

    await header.fetchCrowdData()
    await section.fetchCrowdData()
    expect(fetchMock).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(5 * 60 * 1000)
    expect(fetchMock).toHaveBeenCalledTimes(4)
    expect(header.crowdLevel.value).toBe(1)
    expect(section.crowdLevel.value).toBe(1)
  })
})

// データフェッチの仕様は適切か
describe('リトライ制御', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    clearNuxtState()
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  test('APIエラー時にisErrorがtrueになる', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: false }),
    ))
    const { useCrowdData } = await importFresh()
    const { isError, fetchCrowdData } = useCrowdData()

    await fetchCrowdData()

    expect(isError.value).toBe(true)
  })

  test('APIエラーがMAX_RETRY_COUNT(5)回に達してもisErrorはtrueのまま', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: false }),
    ))
    const { useCrowdData } = await importFresh()
    const { isError, fetchCrowdData } = useCrowdData()

    await fetchCrowdData()
    for (let i = 0; i < MAX_RETRY_COUNT; i++) {
      await vi.advanceTimersByTimeAsync(RETRY_INTERVAL_MS)
    }

    expect(isError.value).toBe(true)
  })

  test('APIエラーがMAX_RETRY_COUNT(5)回に達したときisLoadingがfalseになる', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: false }),
    ))
    const { useCrowdData } = await importFresh()
    const { isLoading, fetchCrowdData } = useCrowdData()

    await fetchCrowdData()
    for (let i = 0; i < MAX_RETRY_COUNT; i++) {
      await vi.advanceTimersByTimeAsync(RETRY_INTERVAL_MS)
    }

    expect(isLoading.value).toBe(false)
  })

  test('MAX_RETRY_COUNT(5)到達後はNORMAL_INTERVAL_MS(60秒)間隔でポーリングが継続する', async () => {
    vi.setSystemTime(AFTER_EVENT)
    const fetchMock = vi.fn(() => Promise.resolve({ ok: false }))
    vi.stubGlobal('fetch', fetchMock)

    const { useCrowdData } = await importFresh()
    const { fetchCrowdData } = useCrowdData()

    await fetchCrowdData()
    expect(fetchMock).toHaveBeenCalledTimes(1)

    // リトライ間隔(5秒)で5回リトライ → 通算6回呼ばれる
    for (let i = 0; i < MAX_RETRY_COUNT; i++) {
      await vi.advanceTimersByTimeAsync(RETRY_INTERVAL_MS)
    }
    expect(fetchMock).toHaveBeenCalledTimes(6)

    // リトライ上限後は停止せず、NORMAL_INTERVAL_MS間隔でポーリングを継続する
    await vi.advanceTimersByTimeAsync(NORMAL_INTERVAL_MS)
    expect(fetchMock).toHaveBeenCalledTimes(7)

    await vi.advanceTimersByTimeAsync(NORMAL_INTERVAL_MS)
    expect(fetchMock).toHaveBeenCalledTimes(8)
  })
})
```
