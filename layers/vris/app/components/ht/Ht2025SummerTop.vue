<template>
  <div
    class="ht-top"
    :class="{ '-parallax': isParallaxEnabled, '-sp': isSp, '-hybrid': isHybridMode }"
  >
    <!-- ハイブリッドモード -->
    <template v-if="isHybridMode">
      <!-- パララックススクロールエリア -->
      <div
        ref="hybridScrollArea"
        class="hybrid-scroll-area"
        @scroll="handleHybridScroll"
      >
        <!-- パララックスセクション用のスペーサー -->
        <div class="parallax-spacer"></div>

        <!-- 通常スクロールセクション -->
        <div class="normal-sections-container">
          <div
            v-for="section in normalSections"
            :key="section.id"
            :class="['normal-section', section.cssClass]"
            :style="{ '--section-bg': section.backgroundColor }"
          >
            <component
              :is="section.component"
              v-if="section.component"
              :class="section.cssClass"
            />
            <div
              v-else
              class="placeholder-content"
            >
              <h1>{{ section.name }}</h1>
              <p>{{ section.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- パララックスセクション（固定表示） -->
      <div
        ref="hybridParallaxSections"
        class="hybrid-parallax-sections"
        :style="{ width: parallaxSectionsWidth }"
      >
        <div
          v-for="section in parallaxSections"
          :key="section.id"
          :ref="(el: Element | ComponentPublicInstance | null) => setSectionRef(el)"
          :class="['fixed-section', section.cssClass]"
          :data-section-id="section.id"
          :style="{ '--section-bg': section.backgroundColor }"
        >
          <component
            :is="section.component"
            v-if="section.component"
            :class="section.cssClass"
          />
          <div
            v-else
            class="placeholder-content"
          >
            <h1>{{ section.name }}</h1>
            <p>{{ section.description }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 従来のパララックスモード -->
    <template v-else-if="isParallaxEnabled">
      <div
        ref="mainScrollArea"
        class="main-scroll-area"
        @scroll="handleScroll"
      >
        <div class="scroll-spacer"></div>
      </div>

      <div
        ref="fixedSections"
        class="fixed-sections"
        :style="{ width: sectionsWidth }"
      >
        <div
          v-for="section in randomizedSections"
          :key="section.id"
          :ref="(el: Element | ComponentPublicInstance | null) => setSectionRef(el)"
          :class="['fixed-section', section.cssClass]"
          :data-section-id="section.id"
          :style="{ '--section-bg': section.backgroundColor }"
        >
          <component
            :is="section.component"
            v-if="section.component"
            :class="section.cssClass"
          />
          <div
            v-else
            class="placeholder-content"
          >
            <h1>{{ section.name }}</h1>
            <p>{{ section.description }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 通常スクロールモード -->
    <template v-else>
      <div
        ref="normalScrollArea"
        class="normal-scroll-area"
        @scroll="handleNormalScroll"
      >
        <div
          v-for="section in randomizedSections"
          :key="section.id"
          :class="['normal-section', section.cssClass]"
          :style="{ '--section-bg': section.backgroundColor }"
        >
          <component
            :is="section.component"
            v-if="section.component"
            :class="section.cssClass"
          />
          <div
            v-else
            class="placeholder-content"
          >
            <h1>{{ section.name }}</h1>
            <p>{{ section.description }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import HoAboutSection from '#vris/app/components/ho/HoAboutSection.vue'
import HoCorporateSection from '#vris/app/components/ho/HoCorporateSection.vue'
import HoExternalSection from '#vris/app/components/ho/HoExternalSection.vue'
import HoHeroSection from '#vris/app/components/ho/HoHeroSection.vue'
import HoLineupSection from '#vris/app/components/ho/HoLineupSection.vue'
import HoMemberSection from '#vris/app/components/ho/HoMemberSection.vue'
import HoNewsSection from '#vris/app/components/ho/HoNewsSection.vue'
import HoOutlineSection from '#vris/app/components/ho/HoOutlineSection.vue'
import HoThemeSection from '#vris/app/components/ho/HoThemeSection.vue'
import HoTicketSection from '#vris/app/components/ho/HoTicketSection.vue'
import { breakpoints } from '#vris/app/composables/useBreakpoints'
import { useSectionState } from '#vris/app/composables/useSectionState'

/*
 * ========================================
 * 定数・設定定義
 * ========================================
 */

// セクション設定の型定義
interface SectionConfig {
  id: string
  name: string
  description: string
  component?: Component | string
  cssClass: string
  backgroundColor: string
}

// グラデーション背景色のプリセット
const GRADIENT_PRESETS = [
  'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
  'linear-gradient(135deg, #4ecdc4, #6ee7dd)',
  'linear-gradient(135deg, #45b7d1, #67c3e0)',
  'linear-gradient(135deg, #a78bfa, #c4b5fd)',
  'linear-gradient(135deg, #fbbf24, #fcd34d)',
  'linear-gradient(135deg, #f472b6, #f9a8d4)',
  'linear-gradient(135deg, #34d399, #6ee7b7)',
  'linear-gradient(135deg, #fb7185, #fda4af)',
  'linear-gradient(135deg, #60a5fa, #93c5fd)',
  'linear-gradient(135deg, #a855f7, #c084fc)',
  'linear-gradient(135deg, #fb923c, #fdba74)',
]

const isSp = breakpoints.smaller('sp')

// Use shared section state
const { currentSectionIndex, setCurrentSection } = useSectionState()

// ランダムに背景色を割り当てる関数
const getRandomizedBackgrounds = (): string[] => {
  const shuffled = [...GRADIENT_PRESETS].sort(() => Math.random() - 0.5)
  return shuffled
}

// 11セクションの設定
const SECTIONS_CONFIG: SectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero',
    description: 'メインビジュアル・ヒーローセクション',
    component: HoHeroSection,
    cssClass: 'hero',
    backgroundColor: '',
  },
  {
    id: 'news',
    name: 'News',
    description: 'ニュース・お知らせセクション',
    component: HoNewsSection,
    cssClass: 'news',
    backgroundColor: '',
  },
  {
    id: 'ticket',
    name: 'Ticket',
    description: 'チケット情報セクション',
    component: HoTicketSection,
    cssClass: 'ticket',
    backgroundColor: '',
  },
  {
    id: 'theme',
    name: 'Theme',
    description: 'テーマ・コンセプトセクション',
    component: HoThemeSection,
    cssClass: 'theme',
    backgroundColor: 'none',
  },
  {
    id: 'lineup',
    name: 'Lineup',
    description: 'ラインナップ・出演者セクション',
    component: HoLineupSection,
    cssClass: 'lineup',
    backgroundColor: '',
  },
  {
    id: 'about',
    name: 'About',
    description: 'イベント概要・紹介セクション',
    component: HoAboutSection,
    cssClass: 'about',
    backgroundColor: '',
  },
  {
    id: 'outline',
    name: 'Outline',
    description: 'イベント詳細・アウトラインセクション',
    component: HoOutlineSection,
    cssClass: 'outline',
    backgroundColor: '',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: '企業・スポンサーセクション',
    component: HoCorporateSection,
    cssClass: 'corporate',
    backgroundColor: '',
  },
  {
    id: 'member',
    name: 'Member',
    description: 'メンバー・スタッフセクション',
    component: HoMemberSection,
    cssClass: 'member',
    backgroundColor: '',
  },
  {
    id: 'external',
    name: 'External',
    description: '外部リンク・関連情報セクション',
    component: HoExternalSection,
    cssClass: 'external',
    backgroundColor: '',
  },
]

// スクロール制御の定数
const SCROLL_CONSTANTS = {
  TOTAL_SECTIONS: SECTIONS_CONFIG.length,
  PARALLAX_SECTIONS: 4, // パララックスで表示するセクション数 (Hero, News, Ticket, Theme)
  BASE_SCROLL_HEIGHT: 100, // 基本セクションあたりのスクロール高さ(vh)
  GPU_ACCELERATION: true, // GPU加速の使用
  SECTION_WIDTH: 100, // 各セクションの幅(vw)
}

/*
 * ========================================
 * 計算されたプロパティ
 * ========================================
 */

// セクション全体の幅
const sectionsWidth = computed(() => {
  return `${SCROLL_CONSTANTS.TOTAL_SECTIONS * SCROLL_CONSTANTS.SECTION_WIDTH}vw`
})

// パララックスセクションの幅
const parallaxSectionsWidth = computed(() => {
  return `${SCROLL_CONSTANTS.PARALLAX_SECTIONS * SCROLL_CONSTANTS.SECTION_WIDTH}vw`
})

// ハイブリッドモードかどうか
const isHybridMode = ref(true)

// パララックスセクション（最初の4つ: Hero, News, Ticket, Theme）
const parallaxSections = computed(() => {
  return randomizedSections.value.slice(0, SCROLL_CONSTANTS.PARALLAX_SECTIONS)
})

// 通常スクロールセクション（5つ目以降: Lineup〜）
const normalSections = computed(() => {
  return randomizedSections.value.slice(SCROLL_CONSTANTS.PARALLAX_SECTIONS)
})

/*
 * ========================================
 * リアクティブ変数とパフォーマンス最適化
 * ========================================
 */

const mainScrollArea = ref<HTMLElement | null>(null)
const fixedSections = ref<HTMLElement | null>(null)
const normalScrollArea = ref<HTMLElement | null>(null)
const hybridScrollArea = ref<HTMLElement | null>(null)
const hybridParallaxSections = ref<HTMLElement | null>(null)

// ランダム化された背景色を管理
const randomizedSections = ref<SectionConfig[]>([])

// 背景色をランダムに割り当ててセクションを初期化
const initializeRandomBackgrounds = () => {
  const backgrounds = getRandomizedBackgrounds()
  randomizedSections.value = SECTIONS_CONFIG.map((section, index) => {
    /*
     * GRADIENT_PRESETSには11個のアイテムがあり、SECTIONS_CONFIGも11個なので、
     * backgrounds[index]は必ず存在する
     */
    const bg = backgrounds[index]!
    // 最後のセクションはinheritを使用
    if (section.id === 'theme') {
      return {
        ...section,
        backgroundColor: 'inherit',
      }
    }
    return {
      ...section,
      backgroundColor: bg,
    }
  })
}

// パフォーマンス改善のための変数
let animationFrameId: number | null = null
const sectionElements: (HTMLElement | null)[] = []
let viewportHeight = 0
let isInitialized = false
let resizeObserver: ResizeObserver | null = null

// スクロール位置の状態管理（位置復帰問題の解決）
let lastKnownScrollTop = 0
let isResizing = false
let resizeTimeout: number | null = null

// アクセシビリティ関連のリアクティブ変数
const scrollProgress = ref(0)

/*
 * パララックス効果のオンオフ制御
 * const isParallaxEnabled = ref(!isSp.value)
 */
const isParallaxEnabled = ref(true)

// パララックス効果の切り替え関数
const toggleParallax = () => {
  isParallaxEnabled.value = !isParallaxEnabled.value

  // パララックスが無効の場合、セクションを初期位置に戻す
  if (!isParallaxEnabled.value && fixedSections.value) {
    fixedSections.value.style.transform = 'translate3d(0, 0, 0)'
  }
}

// 通常スクロールモードでのスクロール処理
const handleNormalScroll = () => {
  if (!normalScrollArea.value) return

  const scrollTop = normalScrollArea.value.scrollTop
  const scrollHeight = normalScrollArea.value.scrollHeight
  const clientHeight = normalScrollArea.value.clientHeight
  const maxScroll = scrollHeight - clientHeight

  if (maxScroll > 0) {
    // スクロール進行度を計算
    const progress = Math.min(scrollTop / maxScroll, 1)
    scrollProgress.value = Math.round(progress * 100)

    // 現在表示中のセクションを特定
    const sections = normalScrollArea.value.querySelectorAll('.normal-section')
    let currentIndex = 0

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2

      if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
        currentIndex = index
      }
    })

    setCurrentSection(currentIndex)
  }
}

// ハイブリッドモードでのスクロール処理
const handleHybridScroll = () => {
  if (!hybridScrollArea.value || !hybridParallaxSections.value || !isInitialized) return

  // アニメーションフレームで処理を制御
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  animationFrameId = requestAnimationFrame(() => {
    if (!hybridScrollArea.value || !hybridParallaxSections.value) return

    const scrollTop = hybridScrollArea.value.scrollTop
    const parallaxScrollHeight = SCROLL_CONSTANTS.PARALLAX_SECTIONS * SCROLL_CONSTANTS.BASE_SCROLL_HEIGHT * (viewportHeight / 100)

    // パララックスエリア内でのスクロールの場合
    if (scrollTop < parallaxScrollHeight) {
      const progress = Math.min(scrollTop / parallaxScrollHeight, 1)

      // パララックス効果を適用
      const { translateX, currentSection } = calculateParallaxScrollStages(progress)

      // 現在のセクションインデックスを更新
      const newSectionIndex = Math.max(0, Math.min(currentSection, SCROLL_CONSTANTS.PARALLAX_SECTIONS - 1))
      if (currentSectionIndex.value !== newSectionIndex) {
        setCurrentSection(newSectionIndex)
      }

      // GPU加速を利用した変更適用
      const transformValue = SCROLL_CONSTANTS.GPU_ACCELERATION
        ? `translate3d(-${translateX}vw, 0, 0)`
        : `translateX(-${translateX}vw)`

      if (!isResizing) {
        hybridParallaxSections.value.style.transform = transformValue
      }

      scrollProgress.value = Math.round(progress * 50) // パララックス部分は全体の50%
    } else {
      // 通常スクロールエリア内での処理
      const normalSections = hybridScrollArea.value.querySelectorAll('.normal-section')

      if (normalSections.length > 0) {
        let currentNormalIndex = 0
        normalSections.forEach((section, index) => {
          const rect = section.getBoundingClientRect()
          const viewportCenter = window.innerHeight / 2

          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            currentNormalIndex = index
          }
        })

        const newSectionIndex = SCROLL_CONSTANTS.PARALLAX_SECTIONS + currentNormalIndex
        if (currentSectionIndex.value !== newSectionIndex) {
          setCurrentSection(newSectionIndex)
        }

        // 全体の進行度を計算（パララックス部分 + 通常スクロール部分）
        const totalScrollHeight = hybridScrollArea.value.scrollHeight - hybridScrollArea.value.clientHeight
        const overallProgress = Math.min(scrollTop / totalScrollHeight, 1)
        scrollProgress.value = Math.round(50 + (overallProgress * 50)) // 50-100%の範囲
      }
    }

    // スクロール位置を記録
    lastKnownScrollTop = scrollTop
  })
}

// セクション参照の設定
const setSectionRef = (el: Element | ComponentPublicInstance | null) => {
  if (!el) return

  // v-for内では直接indexが取得できないため、data属性からindexを取得
  if ('nodeType' in el) {
    const element = el as HTMLElement
    const sectionId = element.dataset.sectionId
    const index = SECTIONS_CONFIG.findIndex(section => section.id === sectionId)
    if (index !== -1) {
      sectionElements[index] = element
    }
  } else if ('$el' in el) {
    const component = el
    const element = component.$el as HTMLElement
    const sectionId = element.dataset.sectionId
    const index = SECTIONS_CONFIG.findIndex(section => section.id === sectionId)
    if (index !== -1) {
      sectionElements[index] = element
    }
  }
}

/*
 * ========================================
 * スクロール制御ロジック
 * ========================================
 */

const handleScroll = () => {
  if (!mainScrollArea.value || !fixedSections.value || !isInitialized) return

  // アニメーションフレームで処理を制御
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  animationFrameId = requestAnimationFrame(() => {
    if (!mainScrollArea.value || !fixedSections.value) return

    const scrollTop = mainScrollArea.value.scrollTop
    const maxScroll = mainScrollArea.value.scrollHeight - mainScrollArea.value.clientHeight

    if (maxScroll <= 0) return

    // スクロール位置を記録（位置復帰問題の防止）
    lastKnownScrollTop = scrollTop

    // スクロール進行度（0-1）
    const progress = Math.min(scrollTop / maxScroll, 1)

    // アクセシビリティ用の進行度更新
    scrollProgress.value = Math.round(progress * 100)

    // シンプル化されたスクロール計算
    const { translateX, currentSection } = calculateScrollStages(progress)

    // 現在のセクションインデックスを更新
    const newSectionIndex = Math.max(0, Math.min(currentSection, SCROLL_CONSTANTS.TOTAL_SECTIONS - 1))
    if (currentSectionIndex.value !== newSectionIndex) {
      setCurrentSection(newSectionIndex)
    }

    // GPU加速を利用した高速変更適用（スムーシネス改善）
    const transformValue = SCROLL_CONSTANTS.GPU_ACCELERATION
      ? `translate3d(-${translateX}vw, 0, 0)`
      : `translateX(-${translateX}vw)`

    // パララックス効果が有効かつリサイズ中でない場合のみ変更を適用
    if (isParallaxEnabled.value && !isResizing) {
      fixedSections.value.style.transform = transformValue
    }
  })
}

// イージング関数（よりスムーズな動きのため）
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// シンプルで安定したスクロール計算
const calculateScrollStages = (progress: number) => {
  const totalSections = SCROLL_CONSTANTS.TOTAL_SECTIONS
  const sectionWidth = SCROLL_CONSTANTS.SECTION_WIDTH

  // イージングを適用してスムーズに
  const easedProgress = easeInOutCubic(progress)
  const translateX = easedProgress * (totalSections - 1) * sectionWidth

  // 現在のセクションインデックスを計算
  const currentSectionFloat = progress * (totalSections - 1)
  const currentSectionIndex = Math.floor(currentSectionFloat)
  const sectionProgress = currentSectionFloat - currentSectionIndex

  // 境界値の確実な制限
  const finalTranslateX = Math.max(0, Math.min(translateX, (totalSections - 1) * sectionWidth))

  return {
    translateX: finalTranslateX,
    currentSection: currentSectionIndex,
    sectionProgress,
  }
}

// ハイブリッドモード用のパララックススクロール計算
const calculateParallaxScrollStages = (progress: number) => {
  const parallaxSections = SCROLL_CONSTANTS.PARALLAX_SECTIONS
  const sectionWidth = SCROLL_CONSTANTS.SECTION_WIDTH

  // イージングを適用してスムーズに
  const easedProgress = easeInOutCubic(progress)
  const translateX = easedProgress * (parallaxSections - 1) * sectionWidth

  // 現在のセクションインデックスを計算
  const currentSectionFloat = progress * (parallaxSections - 1)
  const currentSectionIndex = Math.floor(currentSectionFloat)
  const sectionProgress = currentSectionFloat - currentSectionIndex

  // 境界値の確実な制限
  const finalTranslateX = Math.max(0, Math.min(translateX, (parallaxSections - 1) * sectionWidth))

  return {
    translateX: finalTranslateX,
    currentSection: currentSectionIndex,
    sectionProgress,
  }
}

/*
 * ========================================
 * 初期化とライフサイクル
 * ========================================
 */

const initializeOptimizations = () => {
  let scrollArea: HTMLElement | null

  if (isHybridMode.value) {
    scrollArea = hybridScrollArea.value
  } else if (isParallaxEnabled.value) {
    scrollArea = mainScrollArea.value
  } else {
    scrollArea = normalScrollArea.value
  }

  if (!scrollArea) return

  // ビューポート高さの取得
  viewportHeight = scrollArea.clientHeight

  isInitialized = true
}

onMounted(() => {
  // 背景色をランダムに初期化
  initializeRandomBackgrounds()

  // 最適化された初期化
  void nextTick(() => {
    initializeOptimizations()
    adjustScrollArea()

    // リサイズオブザーバーでビューポート変更を監視（位置復帰問題の解決）
    let observeTarget: HTMLElement | null

    if (isHybridMode.value) {
      observeTarget = hybridScrollArea.value
    } else if (isParallaxEnabled.value) {
      observeTarget = mainScrollArea.value
    } else {
      observeTarget = normalScrollArea.value
    }

    if (observeTarget && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        // リサイズ中フラグを設定してスクロール処理を一時停止
        isResizing = true

        if (resizeTimeout) {
          clearTimeout(resizeTimeout)
        }

        resizeTimeout = window.setTimeout(() => {
          // スクロール位置を保持したまま再初期化
          const savedScrollTop = lastKnownScrollTop

          initializeOptimizations()
          adjustScrollArea()

          // スクロール位置を復元して位置復帰を防止
          const currentScrollArea = isHybridMode.value
            ? hybridScrollArea.value
            : (isParallaxEnabled.value ? mainScrollArea.value : normalScrollArea.value)
          if (currentScrollArea && savedScrollTop > 0) {
            currentScrollArea.scrollTop = savedScrollTop
          }

          isResizing = false
        }, 150) // デバウンスでパフォーマンス向上
      })
      resizeObserver.observe(observeTarget)
    }
  })
})

onBeforeUnmount(() => {
  // クリーンアップ
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }

  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }

  isResizing = false
})

const adjustScrollArea = () => {
  if (isHybridMode.value) {
    // ハイブリッドモードの場合
    if (!hybridScrollArea.value) return

    // パララックス部分の高さを計算
    const parallaxHeight = SCROLL_CONSTANTS.PARALLAX_SECTIONS * SCROLL_CONSTANTS.BASE_SCROLL_HEIGHT
    const parallaxSpacer = hybridScrollArea.value.querySelector('.parallax-spacer') as HTMLElement
    if (parallaxSpacer) {
      parallaxSpacer.style.height = `${parallaxHeight}vh`
    }
  } else if (isParallaxEnabled.value) {
    // 従来のパララックスモードの場合
    if (!mainScrollArea.value) return

    const baseSectionsHeight = SCROLL_CONSTANTS.TOTAL_SECTIONS * SCROLL_CONSTANTS.BASE_SCROLL_HEIGHT
    const totalScrollHeight = baseSectionsHeight

    const spacer = mainScrollArea.value.querySelector('.scroll-spacer') as HTMLElement
    if (spacer) {
      spacer.style.height = `${totalScrollHeight}vh`
    }
  }
  // 通常スクロールモードは動的な高さ計算が不要
}

// 外部からアクセス可能な機能をエクスポート
defineExpose({
  toggleParallax,
  isParallaxEnabled: readonly(isParallaxEnabled),
})
</script>

<style lang="scss" scoped>
.ht-top {
  position: relative;

  overflow: hidden;

  width: 100vw;
  height: 100dvh;

  background-image: url('/images/2025Summer/kv.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  &.-sp {
    background-image: url('/images/2025Summer/kv-sp.png');
    background-position: center;
    background-size: cover;
  }

  &.-hybrid {
    /* ハイブリッドモード用のスタイル */
  }
}

.hybrid-scroll-area {
  position: absolute;
  z-index: 15; // パララックスセクションより上に配置してスクロールを優先
  top: 0;
  left: 0;

  overflow: hidden auto;

  width: 100%;
  height: 100%;

  .parallax-spacer {
    pointer-events: auto; // スクロール可能にする
    width: 100%;
    background: transparent; // 透明にしてスクロールエリアが見えるように
  }

  .normal-sections-container {
    position: relative;
    z-index: 1;

    .normal-section {
      position: relative;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 100%;
      min-height: 100dvh;

      &::before {
        content: '';

        position: absolute;
        z-index: -1;
        inset: 0;

        opacity: 0.5;
        background: var(--section-bg);
      }

      .placeholder-content {
        width: 100%;
        max-width: 800px;
        text-align: center;

        h1 {
          margin-bottom: 1rem;
          font-size: 3rem;
          color: white;
          text-shadow: 0 2px 4px rgb(0 0 0 / 30%);
        }

        p {
          margin-bottom: 2rem;
          font-size: 1.5rem;
          color: white;
          text-shadow: 0 1px 2px rgb(0 0 0 / 30%);
        }
      }
    }
  }
}

.hybrid-parallax-sections {
  pointer-events: none; // 全体的にクリックを無効化
  will-change: transform;

  position: absolute;
  z-index: 10; // スクロールエリアより下に配置
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);

  display: flex;
  flex-direction: row;

  height: 100dvh;

  perspective: 1000px;
  backface-visibility: hidden;

  transition: transform 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  .fixed-section {
    position: relative;

    display: flex;
    flex: 0 0 100vw;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    height: 100dvh;

    &::before {
      pointer-events: none; // 背景はクリック無効
      content: '';

      position: absolute;
      z-index: -1;
      inset: 0;

      opacity: 0.5;
      background: var(--section-bg);
    }

    // インタラクティブ要素だけクリック可能にする
    button, a, [role="button"], [tabindex],
    .ha-link, .hm-button, .button, .btn,
    input, select, textarea {
      pointer-events: auto !important;
    }

    h1 {
      margin-bottom: 1rem;
      font-size: 3rem;
      color: white;
      text-shadow: 0 2px 4px rgb(0 0 0 / 30%);
    }

    p {
      margin-bottom: 2rem;
      font-size: 1.5rem;
      color: white;
      text-shadow: 0 1px 2px rgb(0 0 0 / 30%);
    }

    .content-item {
      width: 100%;
      max-width: 600px;
      margin: 0.5rem 0;
      padding: 1rem;
      border-radius: 8px;

      color: white;
      text-align: center;

      background: rgb(255 255 255 / 20%);
    }

    .placeholder-content {
      width: 100%;
      max-width: 800px;
      text-align: center;
    }
  }
}

.main-scroll-area {
  position: absolute;
  z-index: 20; // セクションより上に配置
  top: 0;
  left: 0;

  overflow: hidden auto;

  width: 100%;
  height: 100%;

  .scroll-spacer {
    // 高さは動的に計算
    width: 100%;
    background: rgb(255 0 0 / 10%); // デバッグ用の薄い背景
  }
}

.normal-scroll-area {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  overflow: hidden auto;
  overscroll-behavior: contain;

  width: 100%;
  height: 100%;

  .normal-section {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 100dvh;

    &::before {
      content: '';

      position: absolute;
      z-index: -1;
      inset: 0;

      opacity: 0.5;
      background: var(--section-bg);
    }

    .placeholder-content {
      width: 100%;
      max-width: 800px;
      text-align: center;

      h1 {
        margin-bottom: 1rem;
        font-size: 3rem;
        color: white;
        text-shadow: 0 2px 4px rgb(0 0 0 / 30%);
      }

      p {
        margin-bottom: 2rem;
        font-size: 1.5rem;
        color: white;
        text-shadow: 0 1px 2px rgb(0 0 0 / 30%);
      }
    }
  }
}

.fixed-sections {
  will-change: transform; // GPU加速を有効化

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0); // ハードウェア加速を強制

  display: flex;
  flex-direction: row;

  // width は computed プロパティで動的設定
  height: 100dvh;

  perspective: 1000px; // 3D変換の最適化
  backface-visibility: hidden; // レンダリング最適化

  // スムーズなスクロール遷移
  transition: transform 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  .fixed-section {
    position: relative;

    display: flex;
    flex: 0 0 100vw; // 各セクションは100vw幅
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    height: 100dvh;

    &::before {
      content: '';

      position: absolute;
      z-index: -1;
      inset: 0;

      opacity: 0.5;
      background: var(--section-bg);
    }

    h1 {
      margin-bottom: 1rem;
      font-size: 3rem;
      color: white;
      text-shadow: 0 2px 4px rgb(0 0 0 / 30%);
    }

    p {
      margin-bottom: 2rem;
      font-size: 1.5rem;
      color: white;
      text-shadow: 0 1px 2px rgb(0 0 0 / 30%);
    }

    .content-item {
      width: 100%;
      max-width: 600px;
      margin: 0.5rem 0;
      padding: 1rem;
      border-radius: 8px;

      color: white;
      text-align: center;

      background: rgb(255 255 255 / 20%);
    }

    .placeholder-content {
      width: 100%;
      max-width: 800px;
      text-align: center;
    }
  }
}
</style>
