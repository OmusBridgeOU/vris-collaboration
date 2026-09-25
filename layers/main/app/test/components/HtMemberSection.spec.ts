import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import HtMemberSection from '../../components/ht/HtMemberSection.vue'

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }))
vi.mock('~/composables/useGsapFadeIn', () => ({
  useGsapFadeIn: () => ({ fadeInUp: vi.fn(), fadeInUpStagger: vi.fn() }),
}))

describe('staff credits', () => {
  it('appends the six requested credits with roles and default icons', () => {
    const wrapper = mount(HtMemberSection, {
      global: { stubs: { HaSectionTitle: true } },
    })
    const cards = wrapper.findAll('.member-card')
    expect(cards).toHaveLength(20)
    expect(cards.slice(-6).map(card => [
      card.get('.member-card__name').text(),
      card.get('.member-card__role').text(),
    ])).toEqual([
      ['ゆー', 'roles.illustrationAndDayOfStaff'],
      ['メロン', 'roles.merchandiseAndDayOfStaff'],
      ['懲戒ロリ', 'roles.merchandiseProduction'],
      ['ロボロボちゃん', 'roles.merchandiseAndDayOfStaff'],
      ['流星灯', 'roles.creatorSupport'],
      ['FoxABC', 'roles.creatorSupport'],
    ])
    for (const card of cards.slice(-6)) {
      expect(card.find('.member-card__icon--default').exists()).toBe(true)
      expect(card.find('a').exists()).toBe(false)
    }
    wrapper.unmount()
  })
})
