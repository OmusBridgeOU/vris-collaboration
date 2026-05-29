<script setup lang="ts">
/*
  canvas最上部のランダムな位置から、ランダムな角度でランダムな色の長方形を一定間隔で収縮させながら落下させている。
*/
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

// 調整可能なパラメータ
const CONFIG = {
  particleCount: 80,
  fallSpeed: 2,
  maxAngle: 15,
  maxRotation: 65,
  width: 12,
  height: 8,
  flipInterval: 500,
} as const

// 型定義
interface Confetti {
  x: number
  y: number
  vx: number
  vy: number
  hue: number
  scaleY: number
  scaleDirection: number
  flipTimer: number
  rotation: number
}

// 状態管理
let animationId: number | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let visibilityHandler: (() => void) | null = null
let scaleFactor: number = 1
let confetti: Confetti[] = []

// ユーティリティ
function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// 紙吹雪を1個生成（canvas最上部からスタート）
function createConfetti(canvasWidth: number): Confetti {
  const sign = Math.random() < 0.5 ? 1 : -1
  const angleRad = ((random(0, CONFIG.maxAngle) * Math.PI) / 180) * sign
  const speed = CONFIG.fallSpeed * scaleFactor

  return {
    x: random(0, canvasWidth),
    y: -CONFIG.height,
    vx: Math.sin(angleRad) * speed,
    vy: Math.cos(angleRad) * speed,
    hue: Math.floor(random(0, 360)),
    scaleY: 1,
    scaleDirection: -1,
    flipTimer: performance.now() + CONFIG.flipInterval,
    rotation:
      (random(-1 * CONFIG.maxRotation, CONFIG.maxRotation) * Math.PI) / 180,
  }
}

// 再開時にflipTimerをばらつかせてリセット（これがないと収縮タイミングが同期してしまう）
function resetFlipTimers() {
  const now = performance.now()
  confetti.forEach((c) => {
    c.flipTimer = now + random(0, CONFIG.flipInterval * 2)
  })
}

// アニメーションのメイン処理
function startAnimation(canvas: HTMLCanvasElement) {
  if (animationId !== null) return

  const ctx = canvas.getContext('2d')!

  // 初期状態では、パーティクルを画面内のランダムな高さに配置
  if (confetti.length === 0) {
    const now = performance.now()
    confetti = Array.from({ length: CONFIG.particleCount }, () => {
      const c = createConfetti(canvas.width)
      c.y = random(0, canvas.height)
      c.flipTimer = now + random(0, CONFIG.flipInterval * 2)
      return c
    })
  }

  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const now = performance.now()
    const w = CONFIG.width * scaleFactor
    const h = CONFIG.height * scaleFactor

    confetti.forEach((c) => {
      c.x += c.vx
      c.y += c.vy

      // 回転アニメーション（収縮アニメーションによる疑似的なもの）：flipTimerごとに折り返す
      if (now >= c.flipTimer) {
        c.scaleDirection *= -1
        c.flipTimer = now + CONFIG.flipInterval
      }

      c.scaleY += c.scaleDirection * 0.05
      c.scaleY = Math.max(0.1, Math.min(1, c.scaleY))

      // 光の反射表現（回転アニメーションに合わせて輝度を変化させることによる疑似的なもの）
      const lightness = 30 + c.scaleY * 40

      // 画面下に出たら最上部に戻す
      if (c.y > canvas.height + h) {
        const next = createConfetti(canvas.width)
        Object.assign(c, next)
      }

      ctx.save()
      ctx.translate(c.x, c.y)
      ctx.rotate(c.rotation)
      ctx.scale(1, c.scaleY)
      ctx.fillStyle = `hsl(${c.hue}, 90%, ${lightness}%)`
      ctx.fillRect(-w / 2, -h / 2, w, h)
      ctx.restore()
    })
  }

  function animate() {
    animationId = requestAnimationFrame(animate)
    updateConfetti()
  }

  animate()
}

// 停止・リサイズ
function stopAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement
  if (!parent) return
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight
}

// ライフサイクル
onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const width = window.innerWidth
  if (width < 768) {
    scaleFactor = 0.6
  } else if (width < 1024) {
    scaleFactor = 0.8
  } else {
    scaleFactor = 1.0
  }

  resizeCanvas(canvas)

  resizeObserver = new ResizeObserver(() => resizeCanvas(canvas))
  resizeObserver.observe(canvas.parentElement!)

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (entry.isIntersecting) {
        resetFlipTimers()
        startAnimation(canvas)
      } else {
        stopAnimation()
      }
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(canvas)

  visibilityHandler = () => {
    if (document.hidden) {
      stopAnimation()
    } else {
      resetFlipTimers()
      startAnimation(canvas)
    }
  }
  document.addEventListener('visibilitychange', visibilityHandler)
})

onUnmounted(() => {
  stopAnimation()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler)
    visibilityHandler = null
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="confetti-canvas"
  />
</template>

<style scoped>
.confetti-canvas {
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
</style>
