// モジュールスコープ
type CrowdLevel = 0 | 1 | 2 | 3

interface ReadResponse {
  timestamp: string
  value: CrowdLevel
}

let timerId: ReturnType<typeof setTimeout> | null = null
let isFetching = false // Fetch実行中フラグ（開発者ツールを用いたリトライ攻撃対策）
let retryCount = 0

// 開催日時までは特別表示
const EVENT_START = new Date('2026-06-01T00:00:00+09:00') // 開催日時を指定

function isBeforeEvent(): boolean {
  return new Date() < EVENT_START
}

export function useCrowdData() {
  const crowdData = ref<ReadResponse | null>(null)
  const isLoading = ref(true)
  const isError = ref(false)
  const isBeforeEventStart = ref(isBeforeEvent()) // 開催日時までは特別表示

  const NORMAL_INTERVAL_MS = 5 * 60 * 1000 // 通常時 : 5分に1回
  const RETRY_INTERVAL_MS = 30 * 1000 // 取得エラー時 : 30秒に回
  const MAX_RETRY_COUNT = 5 // 取得エラーが続く場合は5回までリトライ

  const CROWD_LEVEL_TEXT: Record<CrowdLevel, string> = {
    0: '期間外',
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

  const crowdLevel = computed<CrowdLevel | null>(() => {
    if (isBeforeEventStart.value) return 0 // 開催期間外は強制的に0
    return crowdData.value?.value ?? null
  })
  const fillCount = computed(() => crowdLevel.value ?? 0)
  const statusText = computed(() => isLoading.value ? '取得中' : crowdLevel.value !== null ? CROWD_LEVEL_TEXT[crowdLevel.value] : '')
  const statusColor = computed(() => crowdLevel.value !== null ? CROWD_LEVEL_COLOR[crowdLevel.value] : '')

  async function fetchCrowdData() {
    if (isBeforeEventStart.value) return // 開催前はfetchしない
    if (isFetching) return // 多重実行を防ぐ
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

      // 取得エラーが続く場合は5回までリトライ
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
      // 開催開始時刻になったらフラグを更新してfetchを開始する
      const msUntilStart = EVENT_START.getTime() - Date.now()
      timerId = setTimeout(() => {
        isBeforeEventStart.value = false
        isLoading.value = false // ローディングを解除してcrowdLevel=0を表示
        fetchCrowdData()
      }, msUntilStart)

      isLoading.value = false // 開催前はローディングを解除
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

  return { crowdData, isLoading, isError, crowdLevel, fillCount, statusText, statusColor }
}
