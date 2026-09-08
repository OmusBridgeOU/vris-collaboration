import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { computed, ref } from 'vue'
import HoTheHeader from '../../components/ho/HoTheHeader.vue'
import { useCrowdData } from '../../composables/useCrowdData'

vi.mock('../../composables/useCrowdData', () => ({
  useCrowdData: vi.fn(),
}))

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }))

const crowdLevel = ref<0 | 1 | 2 | 3 | null>(1)
const isLoading = ref(false)
const isError = ref(false)
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
  crowdLevel.value = 1
  isLoading.value = false
  isError.value = false
  vi.mocked(useCrowdData).mockReturnValue({
    crowdLevel: computed(() => crowdLevel.value),
    isLoading,
    isError,
    fetchCrowdData: vi.fn(),
  })
})

afterEach(() => {
  wrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('header crowd status', () => {
  test.each([
    [0, 'closed'],
    [1, 'venueavailable'],
    [2, 'venuemoderate'],
    [3, 'venuebusy'],
    [null, 'loading'],
  ] as const)('shows level %s as %s', (level, label) => {
    crowdLevel.value = level
    const wrapper = mountHeader()
    expect(wrapper.get('.ho-the-header__crowd').text()).toBe(label)
    expect(wrapper.get('.ho-the-header__crowd-dot').attributes('aria-hidden')).toBe('true')
  })

  test('does not show stale availability after a fetch error', () => {
    isError.value = true
    expect(mountHeader().get('.ho-the-header__crowd').text()).toBe('error')
  })

  test('shows loading rather than a previous level while initially loading', () => {
    isLoading.value = true
    expect(mountHeader().get('.ho-the-header__crowd').text()).toBe('loading')
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
