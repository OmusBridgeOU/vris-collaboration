<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// props
const props = withDefaults(
  defineProps<{
    value: number
    duration?: number
    delay?: number
  }>(),
  {
    duration: 2000,
    delay: 0,
  },
)

// 状態管理
const spanRef = ref<HTMLSpanElement | null>(null)
const displayValue = ref(0)
let animationId: number | null = null
let timeoutId: ReturnType<typeof setTimeout> | null = null
let hasPlayed = false
let intersectionObserver: IntersectionObserver | null = null

// アニメーション処理
function clearTimers() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

function startCountUp(targetValue: number) {
  clearTimers()
  displayValue.value = 0

  timeoutId = setTimeout(() => {
    const startTime = performance.now()

    function tick(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / props.duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4) // 最初は速く、終盤はゆっくり目標値に近づく

      displayValue.value = Math.round(eased * targetValue)

      if (progress < 1) {
        animationId = requestAnimationFrame(tick)
      }
    }

    animationId = requestAnimationFrame(tick)
  }, props.delay)
}

// ライフサイクル
onMounted(() => {
  const el = spanRef.value
  if (!el) return

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return

      // 画面内に入り、かつまだ再生していない場合のみ発火
      if (entry.isIntersecting && !hasPlayed) {
        hasPlayed = true
        startCountUp(props.value)

        // 一度再生したら監視を解除
        intersectionObserver?.disconnect()
        intersectionObserver = null
      }
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(el)
})

onUnmounted(() => {
  clearTimers()
  intersectionObserver?.disconnect()
})
</script>

<template>
  <span ref="spanRef">{{ displayValue }}</span>
</template>
