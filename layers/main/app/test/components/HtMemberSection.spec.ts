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
    expect(cards).toHaveLength(25)
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
      ['みかん氏', 'roles.dayOfStaff'],
      ['ASU', 'roles.dayOfStaff'],
      ['RB-C', 'roles.dayOfStaff'],
    ])
    const assignedIcons: Record<string, string> = {
      'ゆー': '/member-icons/yu.png',
      'メロン': '/member-icons/melon.png',
      'FoxABC': '/member-icons/foxabc.webp',
      '流星灯': '/member-icons/ryuseito.webp',
      '腹そう': '/member-icons/harasou.webp',
      'みかん氏': '/member-icons/mikan.png',
      'ASU': '/member-icons/asu.jpg',
      'RB-C': '/member-icons/rb-c.png',
    }
    const socialLinks: Record<string, string> = {
      みかん氏: 'https://x.com/Mikan_sub5212',
      ASU: 'https://x.com/ASU_1115_VRC',
    }
    for (const card of cards.slice(14)) {
      const icon = assignedIcons[card.get('.member-card__name').text()]
      if (icon) {
        expect(card.get('img').attributes('src')).toBe(icon)
        expect(card.find('.member-card__icon--default').exists()).toBe(false)
      } else {
        expect(card.find('.member-card__icon--default').exists()).toBe(true)
      }
      const socialLink = socialLinks[card.get('.member-card__name').text()]
      if (socialLink) {
        expect(card.element.tagName).toBe('A')
        expect(card.attributes('href')).toBe(socialLink)
        expect(card.attributes('target')).toBe('_blank')
        expect(card.attributes('rel')).toBe('noopener noreferrer')
      } else {
        expect(card.element.tagName).toBe('DIV')
        expect(card.find('a').exists()).toBe(false)
      }
    }
    wrapper.unmount()
  })
})
