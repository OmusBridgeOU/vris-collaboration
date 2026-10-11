import { describe, expect, test, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import HoTheHeader from '../../components/ho/HoTheHeader.vue'

const wrappers: ReturnType<typeof mount>[] = []
const i18n = createI18n({ legacy: false, locale: 'en', messages: { en: {} }, missing: (_locale, key) => key })

function mountHeader() {
  const wrapper = mount(HoTheHeader, {
    attachTo: document.body,
    props: { navLinks: [{ type: 'link', href: '/news', text: 'News' }] },
    global: {
      plugins: [i18n],
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

afterEach(() => {
  wrappers.splice(0).forEach(wrapper => wrapper.unmount())
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

describe('attendee guide navigation', () => {
  test('appends the external guide and closes the menu after selection', async () => {
    const wrapper = mountHeader()
    const button = wrapper.get('.ho-the-header__hamburger')
    await button.trigger('click')
    const links = wrapper.findAll('.ho-the-header__accordion-link')
    const guide = links[links.length - 1]!
    expect(guide.text()).toBe('Attendee Guide')
    expect(guide.attributes('href')).toBe('https://skmt3p.notion.site/VketReal-in-2026-Autumn-3d828ff7298b8187990ee8dd7876964b')
    expect(guide.attributes('target')).toBe('_blank')
    expect(guide.attributes('rel')).toBe('noopener noreferrer')
    await guide.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('false')
  })
})
