// app/test/composables/useCrowdData.spec.ts
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'

const EVENT_START = new Date('2026-09-26T10:00:00+09:00') // 本番コードと同じ開催日時

// EVENT_STARTを基準に前後の日時を生成
const BEFORE_EVENT = new Date(EVENT_START.getTime() - 1000) // 1秒前
const AFTER_EVENT = new Date(EVENT_START.getTime() + 1000) // 1秒後

// モジュールスコープの状態を都度リセットするため、動的importを使う
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

// 混雑度レベルに応じて適切な処理分岐が出来るか
describe('crowdLevel（computed）', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  test('開催前はcrowdLevelが強制的に0になる', async () => {
    vi.setSystemTime(BEFORE_EVENT)
    const { useCrowdData } = await importFresh()
    const { crowdLevel } = useCrowdData()
    expect(crowdLevel.value).toBe(0)
  })

  test('開催後・APIレスポンス前はcrowdLevelがnullになる', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    const { useCrowdData } = await importFresh()
    const { crowdLevel } = useCrowdData()
    expect(crowdLevel.value).toBeNull()
  })

  test('APIがvalue:1を返したときcrowdLevelが1になる', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ timestamp: AFTER_EVENT.toISOString(), value: 1 }),
      }),
    ))
    const { useCrowdData } = await importFresh()
    const { crowdLevel, fetchCrowdData } = useCrowdData()
    await fetchCrowdData()
    expect(crowdLevel.value).toBe(1)
  })

  test('APIがvalue:2を返したときcrowdLevelが2になる', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ timestamp: AFTER_EVENT.toISOString(), value: 2 }),
      }),
    ))
    const { useCrowdData } = await importFresh()
    const { crowdLevel, fetchCrowdData } = useCrowdData()
    await fetchCrowdData()
    expect(crowdLevel.value).toBe(2)
  })

  test('APIがvalue:3を返したときcrowdLevelが3になる', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ timestamp: AFTER_EVENT.toISOString(), value: 3 }),
      }),
    ))
    const { useCrowdData } = await importFresh()
    const { crowdLevel, fetchCrowdData } = useCrowdData()
    await fetchCrowdData()
    expect(crowdLevel.value).toBe(3)
  })
})

// データフェッチの仕様は適切か
// NOTE: 仕様変更に合わせてテストコードも修正する必要がある
describe('リトライ制御', () => {
  beforeEach(() => vi.useFakeTimers())
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

  test('APIエラーがMAX_RETRY_COUNT(5)回に達したときisErrorがtrueになる', async () => {
    vi.setSystemTime(AFTER_EVENT)
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: false }),
    ))
    const { useCrowdData } = await importFresh()
    const { isError, fetchCrowdData } = useCrowdData()

    await fetchCrowdData()
    for (let i = 0; i < 5; i++) {
      await vi.advanceTimersByTimeAsync(30_000)
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
    for (let i = 0; i < 5; i++) {
      await vi.advanceTimersByTimeAsync(30_000)
    }

    expect(isLoading.value).toBe(false)
  })

  test('APIエラーがMAX_RETRY_COUNT(5)回を超えてもfetchは6回以上呼ばれない', async () => {
    vi.setSystemTime(AFTER_EVENT)
    const fetchMock = vi.fn(() => Promise.resolve({ ok: false }))
    vi.stubGlobal('fetch', fetchMock)

    const { useCrowdData } = await importFresh()
    const { fetchCrowdData } = useCrowdData()

    await fetchCrowdData()
    expect(fetchMock).toHaveBeenCalledTimes(1)

    for (let i = 0; i < 5; i++) {
      await vi.advanceTimersByTimeAsync(30_000)
    }
    expect(fetchMock).toHaveBeenCalledTimes(6)

    await vi.advanceTimersByTimeAsync(30_000)
    expect(fetchMock).toHaveBeenCalledTimes(6)
  })
})
