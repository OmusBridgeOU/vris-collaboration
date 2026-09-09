type CrowdLevel = -2 | -1 | 1 | 2 | 3 // -2: 開催期間前, -1: API未登録, 0: 開催期間外, 1~3: 混雑度

// 混雑度データ型
export interface CrowdData {
  value1: CrowdLevel
  value2: CrowdLevel
  updated_at: string | null
}

// --- モジュールスコープの内部制御変数 -----------------------------------
// 今後、同一ページにこのモジュールスコープを使用する複数コンポ―ネントを設置しても良いように
// 1つのブラウザタブ内でポーリング処理を一元管理するための制御フラグを用意している。
let timerId: ReturnType<typeof setTimeout> | null = null
let isFetching = false // Fetch実行中フラグ（同時多重fetch防止）
let retryCount = 0
let activeInstanceCount = 0 // このcomposableを呼び出しているコンポーネントの数（参照カウント）

// FetchURL
const endpoint = 'https://vris-26autumn-visitor-counter-api.skmt3p.workers.dev/api/v1/crowd-status'

// 開催日時を指定
const EVENT_START = new Date('2026-09-26T10:00:00+09:00')

// FIXME: setTimeoutの遅延値は内部的に32bit符号付き整数(最大約24.8日)を超えると仕様上オーバーフローし、ほぼ即座に発火してしまう。※ 下記の通り対策済み
// 対策として開催日時までの残り時間が長い場合は、この値を上限として何度か再スケジュールしながら近づいていく。
const MAX_TIMEOUT_MS = 20 * 24 * 60 * 60 * 1000 // 20日

export function isBeforeEvent(): boolean {
  return new Date() < EVENT_START
}

export function useCrowdData() {
  // ページ内の複数箇所から呼び出されても同じ内容が見えるように、refではなくuseStateで管理している。
  const crowdData = useState<CrowdData | null>('crowd-status:data', () => null)
  const isLoading = useState<boolean>('crowd-status:is-loading', () => true)
  const isError = useState<boolean>('crowd-status:is-error', () => false)
  const isBeforeEventStart = useState<boolean>('crowd-status:is-before-event', () => isBeforeEvent())

  // データフェッチの仕様
  const NORMAL_INTERVAL_MS = 60 * 1000
  const RETRY_INTERVAL_MS = 5 * 1000
  const MAX_RETRY_COUNT = 5

  async function fetchCrowdData() {
    if (isBeforeEventStart.value) return // 開催前はfetchしない
    if (isFetching) return // fetchの多重実行を防ぐ
    isFetching = true

    try {
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`Visitor Counter API: HTTP ${res.status}`)

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
      } else {
        // リトライ上限に達した場合、通常間隔まで更新頻度を落として回し続けている。
        schedule(NORMAL_INTERVAL_MS)
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

  // 開催日時までの残り時間を、setTimeoutのオーバーフロー上限を超えないよう分割しながら再帰的にスケジュールする。
  function scheduleEventStart() {
    const msUntilStart = EVENT_START.getTime() - Date.now()

    if (msUntilStart <= 0) {
      isBeforeEventStart.value = false
      fetchCrowdData()
      return
    }

    const delay = Math.min(msUntilStart, MAX_TIMEOUT_MS)
    if (timerId !== null) clearTimeout(timerId)
    timerId = setTimeout(scheduleEventStart, delay)
  }

  onMounted(() => {
    activeInstanceCount++

    // 既に他のインスタンスがfetch/タイマーを主導している場合は、同じuseStateを参照しているので何もしなくてよい。
    if (activeInstanceCount > 1) return

    if (isBeforeEventStart.value) {
      // 開催期間前はfetchを行わないため、表示側が状態を判別できるよう
      // crowdData自体に開催期間前を示す値(-2)をセットしておく。
      crowdData.value = { value1: -2, value2: -2, updated_at: null }

      // ページ表示中にイベント開催日時に到達しても問題ないように、
      // 開催時刻にデータフェッチをスケジュール
      scheduleEventStart()
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
    activeInstanceCount--

    // まだ他のインスタンスが生きている場合は、ポーリングを止めない
    if (activeInstanceCount > 0) return

    if (timerId !== null) {
      clearTimeout(timerId)
      timerId = null
    }
  })

  return { isLoading, isError, crowdData, isBeforeEventStart, fetchCrowdData }
}
