/*
 * Shared section state management
 * Global state - single instance across the app
 */
const globalCurrentSectionIndex = ref(0)

export const useSectionState = () => {
  const currentSectionIndex = globalCurrentSectionIndex
  const sections = [
    'hero',
    'news',
    'ticket',
    'theme',
    'lineup',
    'about',
    'outline',
    'corporate',
    'member',
    'external',
  ]

  const setCurrentSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      currentSectionIndex.value = index
    }
  }

  const getCurrentSectionName = () => {
    return sections[currentSectionIndex.value] || sections[0]
  }

  return {
    currentSectionIndex: readonly(currentSectionIndex),
    sections: readonly(sections),
    setCurrentSection,
    getCurrentSectionName,
  }
}
