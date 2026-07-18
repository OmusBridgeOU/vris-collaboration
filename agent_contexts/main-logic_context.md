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
- Only files matching these patterns are included: layers/main/app/utils/**/*, layers/main/app/composables/**/*, layers/main/app/models/**/*, layers/main/app/repositories/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
layers/
  main/
    app/
      composables/
        useApi.ts
        useCrowdData.ts
        useGsapFadeIn.ts
        useMockCrowdData.ts
      models/
        json.ts
        todo.ts
      repositories/
        .gitkeep
      utils/
        api.ts
        factory.ts
        i18n.ts
```

# Files

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

## File: layers/main/app/repositories/.gitkeep
````

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

## File: layers/main/app/composables/useMockCrowdData.ts
````typescript
// 10秒おきにランダムなステータスを表示する（表示更新テスト用）
import { ref, onMounted, onUnmounted } from 'vue'

type CrowdLevel = 0 | 1 | 2 | 3

export function useCrowdData() {
  const crowdData = ref<{ timestamp: string, value: CrowdLevel } | null>(null)
  const isLoading = ref(true)
  const isError = ref(false)

  const CROWD_LEVEL_TEXT: Record<CrowdLevel, string> = {
    0: '開催期間外',
    1: '余裕あり',
    2: 'やや混雑',
    3: '混雑',
  }

  const CROWD_LEVEL_COLOR: Record<CrowdLevel, string> = {
    0: 'gray',
    1: 'emgreen',
    2: 'amber',
    3: 'vermilion',
  }

  const MOCK_INTERVAL_MS = 3 * 1000 // 10秒
  const MOCK_INITIAL_DELAY_MS = 10 * 1000 // 初回ローディング 10秒
  const crowdLevel = computed<CrowdLevel | null>(() => crowdData.value?.value ?? null)
  const fillCount = computed(() => crowdLevel.value ?? 0)
  const statusText = computed(() => isLoading.value ? '取得中' : crowdLevel.value !== null ? CROWD_LEVEL_TEXT[crowdLevel.value] : '')
  const statusColor = computed(() => isLoading.value ? 'purple' : crowdLevel.value !== null ? CROWD_LEVEL_COLOR[crowdLevel.value] : '')

  let timerId: ReturnType<typeof setInterval> | null = null
  let initialTimerId: ReturnType<typeof setTimeout> | null = null // 追加

  function generateMock() {
    console.log('取得：ダミー')
    crowdData.value = {
      timestamp: new Date().toISOString(),
      value: (Math.floor(Math.random() * 3) + 1) as CrowdLevel,
    }
    isLoading.value = false
    isError.value = false
  }

  onMounted(() => {
    // 10秒後に初回データ取得 → その後3秒おきに更新
    initialTimerId = setTimeout(() => {
      generateMock()
      timerId = setInterval(generateMock, MOCK_INTERVAL_MS)
    }, MOCK_INITIAL_DELAY_MS)
  })

  onUnmounted(() => {
    if (initialTimerId !== null) clearTimeout(initialTimerId) // 追加
    if (timerId !== null) clearInterval(timerId)
  })

  return { crowdData, isLoading, isError, crowdLevel, fillCount, statusText, statusColor }
}
````

## File: layers/main/app/composables/useGsapFadeIn.ts
````typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useGsapFadeIn = () => {
  const fadeInUp = (
    target: string | Element | Ref<unknown>,
    options?: { delay?: number, duration?: number, distance?: number },
  ) => {
    const el = isRef(target) ? target.value as Element | null : target
    if (!el) return

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: options?.distance ?? 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el as Element,
          start: 'top 75%',
          once: true,
        },
      },
    )
  }

  // 複数要素を順番にアニメーション（stagger）
  const fadeInUpStagger = (
    targets: string | Element[],
    options?: { stagger?: number, duration?: number, delay?: number, distance?: number },
  ) => {
    gsap.fromTo(
      targets,
      { opacity: 0, y: options?.distance ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: 'power2.out',
        stagger: options?.stagger ?? 0.15,
        scrollTrigger: {
          trigger: (typeof targets === 'string' ? targets : targets[0]) as Element,
          start: 'top 85%',
          once: true,
        },
      },
    )
  }

  // FirstViewのスクロールに連動してblurをかける
  const firstViewBlur = (
    target: string | Element | Ref<Element | null>,
    options?: { maxBlur?: number },
  ) => {
    gsap.registerPlugin(ScrollTrigger)

    const el = isRef(target) ? target.value : target
    if (!el) return

    gsap.to(el, {
      filter: `blur(${options?.maxBlur ?? 14}px)`,
      ease: 'none',
      scrollTrigger: {
        trigger: el as Element,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  // FirstViewが画面外に出たらヘッダーを出現させる
  const headerRevealOnScroll = (
    target: string | Element | Ref<Element | null>,
    trigger: string | Element | Ref<Element | null>,
    options?: { duration?: number },
  ) => {
    gsap.registerPlugin(ScrollTrigger)

    const targetEl = isRef(target) ? target.value : target
    const triggerEl = isRef(trigger) ? trigger.value : trigger
    if (!targetEl || !triggerEl) return

    gsap.fromTo(
      targetEl,
      { yPercent: -100, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: options?.duration ?? 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerEl as Element,
          start: '20% top',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }

  // FirstViewが100px〜200pxスクロールされる間に対象要素をフェードアウトさせる
  const fadeOutOnScroll = (
    target: string | Element | Ref<Element | null>,
    trigger: string | Element | Ref<Element | null>,
  ) => {
    gsap.registerPlugin(ScrollTrigger)

    const targetEl = isRef(target) ? target.value : target
    const triggerEl = isRef(trigger) ? trigger.value : trigger
    if (!targetEl || !triggerEl) return

    gsap.fromTo(
      targetEl,
      { autoAlpha: 1 },
      {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'ease',
        scrollTrigger: {
          trigger: triggerEl as Element,
          start: `top top-=100`,
          toggleActions: 'play none none reverse',
          onLeave: () => gsap.set(targetEl, { display: 'none' }),
          onEnterBack: () => gsap.set(targetEl, { display: '' }),
        },
      },
    )
  }

  // ScrollTriggerを全て破棄（ページ離脱時に呼ぶ）
  const destroyScrollTriggers = () => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  }

  return {
    fadeInUp,
    fadeInUpStagger,
    firstViewBlur,
    headerRevealOnScroll,
    fadeOutOnScroll,
    destroyScrollTriggers,
  }
}
````

## File: layers/main/app/composables/useCrowdData.ts
````typescript
type CrowdLevel = 0 | 1 | 2 | 3 // 0: 開催期間外, 1~3: 混雑度

// FIXME: 本APIでは建物別にvalueがあるので、要変更
interface ReadResponse {
  timestamp: string
  value: CrowdLevel
}

let timerId: ReturnType<typeof setTimeout> | null = null
let isFetching = false // Fetch実行中フラグ（開発者ツールを用いたリトライ攻撃対策）
let retryCount = 0

// 開催日時を指定
const EVENT_START = new Date('2026-09-26T10:00:00+09:00')

export function isBeforeEvent(): boolean {
  return new Date() < EVENT_START
}

export function useCrowdData() {
  const crowdData = ref<ReadResponse | null>(null)
  const isLoading = ref(true)
  const isError = ref(false)
  const isBeforeEventStart = ref(isBeforeEvent()) // 開催期間外はデータフェッチ自体させたくないため、フロントエンド側でも開催期間外フラグを用意している。

  // データフェッチの仕様
  const NORMAL_INTERVAL_MS = 5 * 60 * 1000
  const RETRY_INTERVAL_MS = 3 * 1000
  const MAX_RETRY_COUNT = 5

  const crowdLevel = computed<CrowdLevel | null>(() => {
    if (isBeforeEventStart.value) return 0 // 念のため、開催期間外は強制的に0
    return crowdData.value?.value ?? null
  })

  async function fetchCrowdData() {
    if (isBeforeEventStart.value) return // 開催前はfetchしない
    if (isFetching) return // fetchの多重実行を防ぐ
    isFetching = true

    try {
      const res = await fetch('/external/read')
      if (!res.ok) throw new Error()
      crowdData.value = await res.json()
      isError.value = false
      retryCount = 0
      schedule(NORMAL_INTERVAL_MS)
    } catch (e) {
      if (import.meta.dev) {
        console.error('混雑情報の取得に失敗しました', e)
      }
      isError.value = true
      if (retryCount < MAX_RETRY_COUNT) {
        retryCount++
        schedule(RETRY_INTERVAL_MS)
      }
    } finally {
      isLoading.value = false
      isFetching = false
    }
  }

  function schedule(ms: number) {
    if (timerId !== null) clearTimeout(timerId)
    timerId = setTimeout(fetchCrowdData, ms)
  }

  onMounted(() => {
    if (isBeforeEventStart.value) {
      const msUntilStart = EVENT_START.getTime() - Date.now()

      // ページ表示中にイベント開催日時に到達しても問題ないように、開催時刻にデータフェッチをスケジュール
      timerId = setTimeout(() => {
        isBeforeEventStart.value = false
        fetchCrowdData()
      }, msUntilStart)
      isLoading.value = false // 開催期間前である表示を出すため、ローディングを即解除
      return
    }
    if (timerId !== null) {
      clearTimeout(timerId)
      timerId = null
    }
    fetchCrowdData()
  })

  onUnmounted(() => {
    if (timerId !== null) clearTimeout(timerId)
  })

  return { isLoading, isError, crowdLevel, fetchCrowdData }
}
````
