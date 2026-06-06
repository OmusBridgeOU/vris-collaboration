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
