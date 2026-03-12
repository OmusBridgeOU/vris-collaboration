<template>
  <div class="ht-top">
    <!-- Loading Screen -->
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="loading-screen"
      >
        <HaLoadingIcon :size="80" />
        <p class="loading-text">
          {{ $t('loading') || 'Loading...' }}
        </p>
      </div>
    </Transition>
    <HoTheHeader
      :isHeaderTransparent="isHeaderTransparent"
      :currentSection="currentSectionIndex"
      :sections="sections"
      @scrollTo="handleSectionChange"
    />
    <main class="main">
      <!-- 単独セクション -->
      <HoHeroSection
        id="hero"
        ref="heroSection"
        class="section"
      />
      <HoNewsSection
        id="news"
        ref="newsSection"
        class="section"
      />
      <HoAboutSection
        id="about"
        ref="aboutSection"
        class="section"
      />
      <HoThemeSection
        id="theme"
        ref="themeSection"
        class="section"
      />

      <HoOutlineSection
        id="outline"
        ref="outlineSection"
        class="section"
      />

      <HoTicketSection
        id="ticket"
        ref="ticketSection"
        class="section"
      />

      <HoLineupSection
        id="lineup"
        ref="lineupSection"
        class="section"
      />

      <HoExhibitionSection
        id="exhibition"
        ref="exhibitionSection"
        class="section"
      />

      <HoCorporateSection
        id="corporate"
        ref="corporateSection"
        class="section"
      />

      <HoMemberSection
        id="member"
        ref="memberSection"
        class="section"
      />

      <HoExternalSection
        id="external"
        ref="externalSection"
        class="section"
      />
    </main>
    <HaImage
      src="/images/2025Summer/character.png"
      alt="Vketちゃん - クリックでトップに戻る"
      title="トップに戻る"
      class="character-image"
      @click="scrollToTop"
    />
    <HoTheFooter />
  </div>
</template>

<script setup lang="ts">
import type { Section } from '#vris/app/types/section'
import { SECTIONS } from '#vris/app/types/section'

const isLoading = ref(true)

// セクションのref定義
const heroSection = ref<HTMLElement | null>(null)
const newsSection = ref<HTMLElement | null>(null)
const aboutSection = ref<HTMLElement | null>(null)
const themeSection = ref<HTMLElement | null>(null)
const outlineSection = ref<HTMLElement | null>(null)
const ticketSection = ref<HTMLElement | null>(null)
const lineupSection = ref<HTMLElement | null>(null)
const exhibitionSection = ref<HTMLElement | null>(null)
const corporateSection = ref<HTMLElement | null>(null)
const memberSection = ref<HTMLElement | null>(null)
const externalSection = ref<HTMLElement | null>(null)

/*
 * 3Dトランスフォーム用の状態管理（現在は直接DOM操作で実装）
 * const sectionTransforms = ref<Record<string, { translateX: number; opacity: number; scale: number }>>({
 *   outline: { translateX: 0, opacity: 1, scale: 1 },
 *   ticket: { translateX: 0, opacity: 1, scale: 1 },
 *   lineup: { translateX: 0, opacity: 1, scale: 1 },
 *   exhibition: { translateX: 0, opacity: 1, scale: 1 },
 *   corporate: { translateX: 0, opacity: 1, scale: 1 },
 *   member: { translateX: 0, opacity: 1, scale: 1 },
 *   external: { translateX: 0, opacity: 1, scale: 1 },
 * })
 */

// セクション内の現在のページ

// セクション管理
const sections = Array.from(SECTIONS)
const currentSection = ref<Section>('hero')
const currentSectionIndex = computed(() => sections.indexOf(currentSection.value))

// ヘッダーの透明度制御
const isHeaderTransparent = ref(true)

// セクションにスクロール
const scrollToSection = (sectionId: Section) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// ヘッダーからのセクション変更処理
const handleSectionChange = (index: number) => {
  const newSection = SECTIONS[index]
  if (newSection) {
    scrollToSection(newSection)
    currentSection.value = newSection
  }
}

// ページトップにスムーススクロール
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// セクション監視用のIntersectionObserver
let sectionObserver: IntersectionObserver | null = null

const setupSectionObserver = () => {
  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const sectionId = entry.target.id as Section
        if (SECTIONS.includes(sectionId)) {
          currentSection.value = sectionId
        }
      }
    })
  }

  const observerOptions: IntersectionObserverInit = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-20% 0px',
  }

  sectionObserver = new IntersectionObserver(observerCallback, observerOptions)

  // 各セクションを監視対象に追加
  SECTIONS.forEach((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      sectionObserver?.observe(element)
    }
  })
}

// 統一されたスクロール処理
const handleUnifiedScroll = () => {
  // ヘッダー透過状態の更新
  isHeaderTransparent.value = window.scrollY < 100
}

onMounted(async () => {
  // 画像のプリロード
  const images = ['/images/2025Summer/kv.png', '/images/2025Summer/kv-sp.png', '/images/2025Summer/logo.png', '/images/2025Summer/character.png']
  const imagePromises = images.map((src) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = resolve
      img.onerror = resolve // エラーでも続行
      img.src = src
    })
  })

  // 最低0.5秒はローディングを表示
  await Promise.all([
    Promise.all(imagePromises),
    new Promise(resolve => setTimeout(resolve, 500)),
  ])

  isLoading.value = false

  // window.addEventListener('scroll', handleScroll) // 統一されたスクロール処理で代替

  // Intersection Observer設定（削除済み）

  /*
   * 統一されたスクロール処理を設定
   * window.addEventListener('wheel', handleGlobalWheel, { passive: false }) // パララックス効果により不要
   */
  window.addEventListener('scroll', handleUnifiedScroll)

  // セクション監視を設定
  setupSectionObserver()
})

onBeforeUnmount(() => {
  // window.removeEventListener('scroll', handleScroll) // 統一されたスクロール処理で代替

  // セクション監視のクリーンアップ
  if (sectionObserver) {
    sectionObserver.disconnect()
    sectionObserver = null
  }

  /*
   * 統一されたスクロール処理のクリーンアップ
   * window.removeEventListener('wheel', handleGlobalWheel) // パララックス効果により不要
   */
  window.removeEventListener('scroll', handleUnifiedScroll)
})
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/variables' as v;
@use '#vris/app/assets/styles/mixins' as m;

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-15px) rotate(2deg);
  }

  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-screen {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: #111827;

  .loading-text {
    font-size: 1.2rem;
    font-weight: 500;
    color: #fff;
    opacity: 0.8;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.ht-top {
  scroll-behavior: smooth;

  overflow-y: scroll;

  height: 100vh;

  background-color: #000;
  background-image: url('/images/2025Summer/kv.png');
  background-attachment: fixed;
  background-position: center;
  background-size: contain;

  @include m.sp {
    background-image: url('/images/2025Summer/kv-sp.png');
    background-size: cover
  }
}

.main {
  flex: 1;

  > .section {
    max-width: 100dvw;
    max-height: 100%;
    padding: 72px 2rem 7.5rem;
  }
}

.character-image {
  cursor: pointer;

  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;

  width: 128px;
  height: auto;

  opacity: 0.5;

  transition: opacity 0.3s ease;
  animation: float 4s ease-in-out infinite;

  &:hover {
    opacity: 1;
  }

  @include m.sp {
    right: 0;
    bottom: 0;
    width: 80px;
    height: auto;
  }
}
</style>
