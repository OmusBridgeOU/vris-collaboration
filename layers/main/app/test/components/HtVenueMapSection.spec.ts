import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import HtVenueMapSection from '../../components/ht/HtVenueMapSection.vue'

mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }))

describe('venue map', () => {
  it('opens the map and restores scrolling when closed', async () => {
    const wrapper = mount(HtVenueMapSection, {
      global: { stubs: { HaSectionTitle: true } },
    })
    const dialog = wrapper.get('dialog').element as HTMLDialogElement
    dialog.showModal = vi.fn(() => {
      dialog.open = true
    })
    dialog.close = vi.fn(() => {
      dialog.open = false
    })
    document.documentElement.style.overflow = 'scroll'

    await wrapper.get('.preview').trigger('click')
    expect(dialog.showModal).toHaveBeenCalledOnce()
    expect(document.documentElement.style.overflow).toBe('hidden')
    expect(wrapper.get('.image-container img').attributes('src')).toBe('/venue-map-2026-autumn.png')
    expect(wrapper.get('a').attributes('target')).toBe('_blank')

    await wrapper.get('.close').trigger('click')
    expect(dialog.close).toHaveBeenCalledOnce()
    expect(document.documentElement.style.overflow).toBe('scroll')

    await wrapper.get('.preview').trigger('click')
    await wrapper.get('dialog').trigger('close')
    expect(document.documentElement.style.overflow).toBe('scroll')
    dialog.open = false
    await wrapper.get('.preview').trigger('click')
    wrapper.unmount()
    expect(document.documentElement.style.overflow).toBe('scroll')
    document.documentElement.style.overflow = ''
  })
})
