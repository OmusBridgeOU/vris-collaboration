// セクション関連の型定義

// セクション名の定数定義
export const SECTIONS = [
  'hero',
  'news',
  'about',
  'theme',
  'outline',
  'ticket',
  'lineup',
  'exhibition',
  'corporate',
  'member',
  'external',
] as const

// セクション型
export type Section = typeof SECTIONS[number]

// セクションコンポーネントのインターフェース
export interface SectionComponent {
  sectionRef: HTMLElement | null
}

// セクション情報の型
export interface SectionInfo {
  id: Section
  title: string
  description?: string
}

// ナビゲーション関連の型
export interface NavigationItem {
  section: Section
  label: string
  href: string
}

// セクション表示状態の型
export interface SectionState {
  current: Section
  isVisible: Record<Section, boolean>
  isIntersecting: Record<Section, boolean>
}

// スクロール関連の型
export interface ScrollToOptions {
  section: Section
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  inline?: ScrollLogicalPosition
}

// セクションリフレンス管理の型
export type SectionRefs = Record<`${Section}Section`, Ref<SectionComponent | null>>

// IntersectionObserver設定の型
export interface SectionObserverOptions extends IntersectionObserverInit {
  threshold?: number | number[]
  rootMargin?: string
}

// セクション管理用のコンポーザブルの型
export interface UseSectionManager {
  currentSection: Ref<Section>
  isHeaderTransparent: Ref<boolean>
  scrollToSection: (section: Section, options?: ScrollToOptions) => void
  handleSectionChange: (index: number) => void
  getSectionIndex: (section: Section) => number
  getSectionByIndex: (index: number) => Section | undefined
}
