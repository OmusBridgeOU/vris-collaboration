<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'

// props
const props = withDefaults(
  defineProps<{
    text: string
    speed?: number
    delay?: number
  }>(),
  {
    speed: 50,
    delay: 0,
  },
)

// 状態管理
const spanRef = shallowRef<HTMLSpanElement | null>(null)
const displayText = ref('')
let timeoutId: ReturnType<typeof setTimeout> | null = null
let hasPlayed = false // 一度再生したら二度と発火しないフラグ
let intersectionObserver: IntersectionObserver | null = null

// アニメーション処理
function clearTimer() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

function startTypewriter(text: string) {
  clearTimer()
  displayText.value = ''

  let index = 0

  function typeNextChar() {
    if (index >= text.length) return
    displayText.value += text[index]
    index++
    timeoutId = setTimeout(typeNextChar, props.speed)
  }

  timeoutId = setTimeout(typeNextChar, props.delay)
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
        startTypewriter(props.text)

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
  clearTimer()
  intersectionObserver?.disconnect()
})
</script>

<template>
  <span ref="spanRef">{{ displayText }}</span>
</template>
