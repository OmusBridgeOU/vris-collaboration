// 10秒おきにランダムなステータスを表示する（表示更新テスト用）
import { ref, onMounted, onUnmounted } from 'vue'
import type { CrowdData } from '~/composables/useCrowdData'

const MOCK_INTERVAL_MS = 3 * 1000 // 3秒おきに更新
const MOCK_INITIAL_DELAY_MS = 10 * 1000 // 初回ローディング 10秒

export function useMockCrowdData() {
  const crowdData = ref<CrowdData | null>(null)
  const isLoading = ref(true)
  const isError = ref(false)
  const isBeforeEventStart = ref(false) // モックでは開催期間外の状態は扱わないため常にfalse

  let timerId: ReturnType<typeof setInterval> | null = null
  let initialTimerId: ReturnType<typeof setTimeout> | null = null

  function generateMock() {
    console.log('取得：ダミー')
    const randomLevel = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3
    crowdData.value = {
      value1: randomLevel,
      value2: randomLevel,
      updated_at: new Date().toISOString(),
    }
    isLoading.value = false
    isError.value = false
  }

  // 本物のcomposableと同じインターフェースを保つためのダミー実装。
  // モックでは即座にgenerateMockを呼び直すことで、手動リフレッシュのような見た目にしている。
  async function fetchCrowdData() {
    generateMock()
  }

  onMounted(() => {
    // 10秒後に初回データ取得 → その後3秒おきに更新
    initialTimerId = setTimeout(() => {
      generateMock()
      timerId = setInterval(generateMock, MOCK_INTERVAL_MS)
    }, MOCK_INITIAL_DELAY_MS)
  })

  onUnmounted(() => {
    if (initialTimerId !== null) clearTimeout(initialTimerId)
    if (timerId !== null) clearInterval(timerId)
  })

  return { isLoading, isError, crowdData, isBeforeEventStart, fetchCrowdData }
}
