import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import HtMemberSection from '../../components/ht/HtMemberSection.vue'

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }))
vi.mock('~/composables/useGsapFadeIn', () => ({
  useGsapFadeIn: () => ({ fadeInUp: vi.fn(), fadeInUpStagger: vi.fn() }),
}))

describe('staff credits', () => {
  it('renders the added staff credits with their roles and assigned icons', () => {
    const wrapper = mount(HtMemberSection, {
      global: { stubs: { HaSectionTitle: true } },
    })
    const cards = wrapper.findAll('.member-card')
    expect(cards).toHaveLength(22)
    expect(cards.slice(14).map(card => [
      card.get('.member-card__name').text(),
      card.get('.member-card__role').text(),
    ])).toEqual([
      ['ゆー', 'roles.illustrationAndDayOfStaff'],
      ['メロン', 'roles.merchandiseAndDayOfStaff'],
      ['懲戒ロリ', 'roles.merchandiseProduction'],
      ['ロボロボちゃん', 'roles.merchandiseAndDayOfStaff'],
      ['流星灯', 'roles.creatorSupport'],
      ['FoxABC', 'roles.creatorSupport'],
      ['白石葵', 'roles.photographyStaff'],
      ['腹そう', 'roles.dayOfStaff'],
    ])
    const assignedIcons: Record<string, string> = {
      ゆー: '/member-icons/yu.png',
      メロン: '/member-icons/melon.png',
      FoxABC: '/member-icons/foxabc.webp',
      流星灯: '/member-icons/ryuseito.webp',
      腹そう: '/member-icons/harasou.webp',
    }
    for (const card of cards.slice(14)) {
      const icon = assignedIcons[card.get('.member-card__name').text()]
      if (icon) {
        expect(card.get('img').attributes('src')).toBe(icon)
        expect(card.find('.member-card__icon--default').exists()).toBe(false)
      } else {
        expect(card.find('.member-card__icon--default').exists()).toBe(true)
      }
      expect(card.find('a').exists()).toBe(false)
    }
    wrapper.unmount()
  })
})
