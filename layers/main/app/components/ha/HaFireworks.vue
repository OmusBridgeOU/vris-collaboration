<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted } from 'vue'

const canvasRef = shallowRef<HTMLCanvasElement | null>(null)

// アニメーション管理用の変数
let animationId: number | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let visibilityHandler: (() => void) | null = null

// 花火の発射タイミング管理
let nextFireworkTime: number = 0

// 画面サイズに応じたスケール係数（起動時に1度だけ決定）
let scaleFactor: number = 1

// ユーティリティ
function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// パーティクルの型定義
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  hue: number
}

// パーティクルをstartAnimationの外で管理（再起動時にリセットされないようにする）
let particles: Particle[] = []

// 次の花火を打ち上げる時刻をセット（1〜2秒のランダムなタイミング）
function scheduleNextFirework() {
  nextFireworkTime = performance.now() + random(1000, 2000)
}

// アニメーションのメイン処理
function startAnimation(canvas: HTMLCanvasElement) {
  // 二重起動を防ぐ
  if (animationId !== null) return

  const ctx = canvas.getContext('2d')!

  // 花火を1発生成
  function createFirework() {
    const x = random(100, canvas.width - 100)
    const y = random(100, canvas.height - 100)
    const hue = Math.floor(random(0, 360))

    // 固定パーティクル（強: 24度間隔 × 15個、中: 36度間隔 × 10個、弱: 72度間隔 × 5個 = 合計30個）を設けて概形を整える
    const fixedConfig = [
      { count: 15, interval: 24, speed: 5 * scaleFactor },
      { count: 10, interval: 36, speed: 3 * scaleFactor },
      { count: 5, interval: 72, speed: 1 * scaleFactor },
    ]

    // 花火1発ごとにランダムな回転オフセット（0〜12度）
    const rotationOffset = (random(0, 12) * Math.PI) / 180

    fixedConfig.forEach(({ count, interval, speed }) => {
      Array.from({ length: count }, (_, i) => {
        const angle = (i * interval * Math.PI) / 180 + rotationOffset
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          hue,
        })
      })
    })

    // ランダムパーティクル（30個）
    for (let i = 0; i < 30; i++) {
      const angle = random(0, Math.PI * 2)
      const speed = random(1, 5) * scaleFactor

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        hue,
      })
    }

    scheduleNextFirework()
  }

  // パーティクルの更新と描画
  function updateParticles() {
    // 画面全体をクリア（背景を透過させる）
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles = particles.filter((p) => {
      p.x += p.vx
      p.y += p.vy
      p.alpha -= 0.01
      return p.alpha > 0
    })

    particles.forEach((p) => {
      ctx.beginPath()
      ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha})`
      ctx.arc(p.x, p.y, 2 * scaleFactor, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  // アニメーションループ
  function animate() {
    animationId = requestAnimationFrame(animate)
    updateParticles()

    if (performance.now() >= nextFireworkTime) {
      createFirework()
    }
  }

  animate()
}

// アニメーション停止
function stopAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

// canvasのサイズを親要素に合わせる
function resizeCanvas(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement
  if (!parent) return
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight
}

onMounted(() => {
  const canvas = canvasRef.value as HTMLCanvasElement | null
  if (!canvas) return
  const parent = canvas.parentElement
  if (!parent) return

  // 起動時に1度だけ画面幅でscaleFactorを決定
  const width = window.innerWidth
  if (width < 768) {
    scaleFactor = 0.6
  } else if (width < 1024) {
    scaleFactor = 0.8
  } else {
    scaleFactor = 1.0
  }

  resizeCanvas(canvas)

  // 親要素のリサイズを監視
  resizeObserver = new ResizeObserver(() => resizeCanvas(canvas))
  resizeObserver.observe(parent)

  // 要素の表示・非表示を監視（スクロールで画面外に出た場合）
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (entry.isIntersecting) {
        startAnimation(canvas)
      } else {
        stopAnimation()
      }
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(canvas)

  // タブの表示・非表示を監視
  visibilityHandler = () => {
    if (document.hidden) {
      stopAnimation()
    } else {
      startAnimation(canvas)
    }
  }
  document.addEventListener('visibilitychange', visibilityHandler)

  // 初回スケジュール（ここでのみ呼ぶ）
  scheduleNextFirework()
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
    class="fireworks-canvas"
  />
</template>

<style scoped>
.fireworks-canvas {
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
</style>
