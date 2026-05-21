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
