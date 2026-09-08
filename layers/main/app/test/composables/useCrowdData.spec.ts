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
    expect(header.crowdData.value?.value1).toBe(1)
    expect(section.crowdData.value?.value1).toBe(1)
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
