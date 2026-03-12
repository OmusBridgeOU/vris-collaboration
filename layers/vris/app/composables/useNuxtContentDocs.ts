import { InjectionKey } from 'vue'

const DOCS_COLLECTION = 'docs'
const CARDS_COLLECTION = 'cards'

export const useNuxtContentDocs = () => {
  const content = useState<unknown>(() => null)
  const cards = useState<unknown[]>(() => [])

  const setContentDocs = (content_: unknown) => {
    content.value = content_
  }

  const setCards = (cards_: unknown[]) => {
    cards.value = cards_
  }

  const removeContentDocs = () => {
    content.value = null
  }

  const removeCards = () => {
    cards.value = []
  }

  const fetchContentDocs = async (path: string, key: string = `docs-${path}`) => {
    return useAsyncData(key, async () => {
      try {
        return await queryCollection(DOCS_COLLECTION).path(path).first()
      } catch (error) {
        console.error('Collection query failed:', error)
      }
      console.warn('No content found for path:', path)
      return null
    })
  }

  // cardsフォルダの中身を全て取得する
  const fetchCards = async () => {
    return useAsyncData('cards', async () => {
      try {
        return await queryCollection(CARDS_COLLECTION).all() || []
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        // cardsコレクションが未配置の場合は静かにスキップ
        const isMissingTable = message.includes('no such table') || message.includes('_content_cards')
        if (process.dev && !isMissingTable) {
          console.warn('Cards collection query failed:', error)
        }
        return []
      }
    })
  }

  return {
    content,
    setContentDocs,
    removeContentDocs,
    fetchContentDocs,
    cards,
    setCards,
    removeCards,
    fetchCards,
  }
}

export const useNuxtContentDocsInjectionKey: InjectionKey<ReturnType<typeof useNuxtContentDocs>> = Symbol('useNuxtContentDocs')
