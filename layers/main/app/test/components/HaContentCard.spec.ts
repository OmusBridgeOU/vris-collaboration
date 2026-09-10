import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import HaContentCard from '../../components/ha/HaContentCard.vue'

describe('HaContentCard', () => {
  test('renders a linked card with safe external-link attributes', () => {
    const wrapper = mount(HaContentCard, {
      props: {
        item: {
          title: 'Official program',
          href: 'https://example.com/program',
          imgSrc: '/program.png',
          text: 'Program description',
        },
      },
      global: {
        stubs: {
          HaJumpToListIcon: true,
        },
      },
    })

    const link = wrapper.get('a.content-card')
    expect(link.attributes()).toMatchObject({
      href: 'https://example.com/program',
      target: '_blank',
      rel: 'noopener noreferrer',
    })
    expect(wrapper.get('img').attributes('src')).toBe('/program.png')
    expect(wrapper.text()).toContain('Program description')
  })

  test('renders a non-linked card without link-only UI', () => {
    const wrapper = mount(HaContentCard, {
      props: {
        item: {
          title: 'Coming soon',
          imgSrc: '',
          text: '',
        },
      },
      global: {
        stubs: {
          HaNoImage: { template: '<span data-testid="fallback">fallback</span>' },
          HaJumpToListIcon: true,
        },
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('content-card--static')
    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.find('[data-testid="fallback"]').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'HaJumpToListIcon' }).exists()).toBe(false)
  })
})
