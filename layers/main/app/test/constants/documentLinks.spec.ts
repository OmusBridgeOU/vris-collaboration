import { describe, expect, it } from 'vitest'
import { DOCUMENT_LINKS } from '~/constants/documentLinks'

describe('DOCUMENT_LINKS', () => {
  it('uses unique public Notion URLs for every published document', () => {
    const urls = Object.values(DOCUMENT_LINKS)

    expect(new Set(urls).size).toBe(urls.length)
    expect(urls.every(url => url.startsWith('https://skmt3p.notion.site/'))).toBe(true)
  })

  it('contains every document linked from the site', () => {
    expect(Object.keys(DOCUMENT_LINKS)).toEqual([
      'participationGuide',
      'privacyPolicy',
      'codeOfConduct',
      'exhibitionGuideline',
      'exhibitionTerms',
      'corporateExhibitorGuide',
      'numberedTicket',
    ])
  })
})
