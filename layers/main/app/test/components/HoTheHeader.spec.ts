import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import HoTheHeader from '../../components/ho/HoTheHeader.vue'
import HaCrowdInfo from '../../components/ha/HaCrowdInfo.vue'
import { useCrowdData } from '../../composables/useCrowdData'
import type { CrowdData } from '../../composables/useCrowdData'

vi.mock('../../composables/useCrowdData', () => ({
  useCrowdData: vi.fn(),
}))

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }))

const crowdData = ref<CrowdData | null>({ value1: 1, value2: 1, updated_at: null })
const isLoading = ref(false)
const isError = ref(false)
const isBeforeEventStart = ref(false)
const wrappers: ReturnType<typeof mount>[] = []

function mountHeader() {
  const wrapper = mount(HoTheHeader, {
    attachTo: document.body,
    props: { navLinks: [{ type: 'link', href: '/news', text: 'News' }] },
    global: {
      stubs: {
        HaLanguageSwitcher: true,
        HaHamburgerIcon: true,
        HaCloseIcon: true,
      },
    },
  })
  wrappers.push(wrapper)
  return wrapper
}

beforeEach(() => {
  crowdData.value = { value1: 1, value2: 1, updated_at: null }
  isLoading.value = false
  isError.value = false
  isBeforeEventStart.value = false
  vi.mocked(useCrowdData).mockReturnValue({
    crowdData,
    isLoading,
    isError,
    isBeforeEventStart,
    fetchCrowdData: vi.fn(),
  })
})

afterEach(() => {
  wrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('header crowd status', () => {
  test.each([
    [-1, 'noInfo'],
    [1, 'venueavailable'],
    [2, 'venuemoderate'],
    [3, 'venuebusy'],
  ] as const)('shows value1 %s as %s', (value1, label) => {
    crowdData.value = { value1, value2: value1, updated_at: null }
    const wrapper = mountHeader()
    const crowdInfo = wrapper.getComponent(HaCrowdInfo)
    expect(crowdInfo.text()).toBe(label)
    expect(crowdInfo.get('.ha-crowd-info__dot').attributes('aria-hidden')).toBe('true')
  })

  test('shows loading when crowdData is not yet fetched', () => {
    crowdData.value = null
    const wrapper = mountHeader()
    expect(wrapper.getComponent(HaCrowdInfo).text()).toBe('loading')
  })

  test('shows closed before the event without synthetic crowd data', () => {
    crowdData.value = null
    isBeforeEventStart.value = true
    expect(mountHeader().getComponent(HaCrowdInfo).text()).toBe('closed')
  })

  test('does not show stale availability after a fetch error', () => {
    isError.value = true
    expect(mountHeader().getComponent(HaCrowdInfo).text()).toBe('error')
  })

  test('shows loading rather than a previous level while initially loading', () => {
    isLoading.value = true
    expect(mountHeader().getComponent(HaCrowdInfo).text()).toBe('loading')
  })
})

describe('header navigation', () => {
  test('opens the controlled panel, and Escape closes it and restores focus', async () => {
    const wrapper = mountHeader()
    const button = wrapper.get('.ho-the-header__hamburger')
    const panel = wrapper.get('#header-navigation')
    expect(button.attributes('aria-controls')).toBe('header-navigation')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(panel.attributes('inert')).toBeDefined()

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(panel.attributes('inert')).toBeUndefined()

    await panel.trigger('keydown', { key: 'Escape' })
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(button.element)
  })

  test('closes after following a navigation link', async () => {
    const wrapper = mountHeader()
    const button = wrapper.get('.ho-the-header__hamburger')
    await button.trigger('click')
    await wrapper.get('.ho-the-header__accordion-link').trigger('click')
    expect(button.attributes('aria-expanded')).toBe('false')
  })
})
