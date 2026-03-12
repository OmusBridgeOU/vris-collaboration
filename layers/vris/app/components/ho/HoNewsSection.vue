<i18n lang="yaml">
ja:
  news:
    title: おしらせ
en:
  news:
    title: Activity Report!
</i18n>

<template>
  <section
    id="news"
    ref="sectionRef"
    class="section news-section"
  >
    <div class="background" />
    <div class="section-inner">
      <h2 class="section-title">
        {{ t('news.title') }}
      </h2>
      <HoVerticalSlider
        ref="verticalSliderRef"
        :slidename="'news-slider'"
        :itemsId="cardsId"
        :amount="latestCards?.length || 0"
        :arrow="false"
        :pagination="false"
        :loop="true"
        :center="true"
        :page="false"
        :autoplay="true"
        :draggable="true"
        gapPc="20px"
        gapSp="20px"
        heightPc="80"
        heightSp="90"
        :duration="500"
        easing="ease-in-out"
        :interval="4000"
        @activeIndexChange="handleActiveIndexChange"
      >
        <template #item>
          <template v-if="latestCards.length">
            <HmSliderItem
              v-for="(card, index) in latestCards"
              :id="`news-${index}`"
              :key="`news-card-${index}`"
              :class="['slider-item', { '-active': index === activeIndex }]"
            >
              <div class="news-item">
                <h3 class="news-title">
                  {{ card && typeof card === 'object' && 'title' in card ? card.title : '' }}
                </h3>
                <time class="news-date">{{ card && typeof card === 'object' && 'meta' in card && card.meta && typeof card.meta === 'object' && 'date' in card.meta ? card.meta.date : '' }}</time>
              </div>
            </HmSliderItem>
          </template>
        </template>
      </HoVerticalSlider>
      <div class="nav-buttons-container">
        <button
          class="nav-button prev"
          :disabled="!latestCards.length"
          @click="handleNavigation('previous')"
        >
          ↑
        </button>
        <button
          class="nav-button next"
          :disabled="!latestCards.length"
          @click="handleNavigation('next')"
        >
          ↓
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useNuxtContentDocsInjectionKey } from '#vris/app/composables/useNuxtContentDocs'

const { t } = useI18n()
const nuxtContentDocs = inject(useNuxtContentDocsInjectionKey)
const activeIndex = ref(0)
const verticalSliderRef = ref()

const handleActiveIndexChange = (payload: { index: number }) => {
  activeIndex.value = payload.index
}

const handleNavigation = (direction: 'previous' | 'next') => {
  if (verticalSliderRef.value) {
    verticalSliderRef.value.moveSlider(direction)
  }
}

onMounted(() => {
  activeIndex.value = 0
})

const cards = computed(() => {
  return nuxtContentDocs?.cards.value ?? []
})

// 最新4件のニュースを取得
const latestCards = computed(() => {
  const allCards = cards.value
  if (!allCards || allCards.length === 0) return []

  // 日付でソート（新しい順）
  const sortedCards = [...allCards].sort((a, b) => {
    const dateA = a && typeof a === 'object' && 'meta' in a && a.meta && typeof a.meta === 'object' && 'date' in a.meta ? new Date(a.meta.date as string) : new Date(0)
    const dateB = b && typeof b === 'object' && 'meta' in b && b.meta && typeof b.meta === 'object' && 'date' in b.meta ? new Date(b.meta.date as string) : new Date(0)
    return dateB.getTime() - dateA.getTime()
  })

  // 最新4件のみ返す
  return sortedCards.slice(0, 4)
})

const cardsId = computed(() => {
  return latestCards.value.map((_, index) => `news-card-${index}`)
})
const sectionRef = ref<HTMLElement | null>(null)

defineExpose({
  sectionRef,
})
</script>

<style lang="scss" scoped>
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;

.section {
  scroll-snap-align: start;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: auto;
  min-height: 100dvh;
}

.background {
  position: absolute;
  z-index: 0;
  inset: 0;

  background-position: center;
  background-size: cover;
  backdrop-filter: blur(8px);
}

.section-inner {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100dvw;
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 2rem 2rem;
}

:deep(.vertical-slider-wrap) {
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 0 auto;
}

.section-title {
  margin-bottom: 3rem;

  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-shadow:
  2px 2px 4px rgb(0 0 0 / 50%),
  -2px -2px 4px rgb(0 0 0 / 50%),
  2px -2px 4px rgb(0 0 0 / 50%),
  -2px 2px 4px rgb(0 0 0 / 50%);
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.slider-item {
  --border-color: #000;
  --text-color: #000;
  --arrow-color: var(--border-color);

  padding-bottom: 40px;
  transition: all 0.3s ease;

  &.-active {
    --border-color: #00A95F;
    --text-color: #00A95F;
    --arrow-color: #00A95F;

    z-index: 1;

    .news-item {
      box-shadow: 6px 6px 0 rgb(0 0 0 / 80%);
    }

    .news-title {
      color: var(--text-color);
    }
  }
}

.news-item {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  height: 100%;
  padding: 1.2rem 1.2rem 2.5rem;
  border: 4px solid var(--border-color);
  border-radius: 16px;

  background: #fff;

  transition: all 0.3s ease;

  &::before {
    content: '';

    position: absolute;
    z-index: 1;
    bottom: -44px;
    left: 75%;
    transform: translateX(-50%);

    border: 16px solid transparent;
    border-top: 24px solid var(--arrow-color);
  }

  &::after {
    content: '';

    position: absolute;
    z-index: 2;
    bottom: -34px;
    left: 75%;
    transform: translateX(-50%);

    border: 14px solid transparent;
    border-top: 20px solid #fff;
  }

  &:hover:not(.-active) {
    border-color: #00A95F;
    box-shadow: 6px 6px 0 rgb(0 0 0 / 80%);

    &::before {
      border-top-color: #00A95F;
    }

    .news-title {
      color: #00A95F;
    }
  }
}

.news-date {
  position: absolute;
  bottom: 0.8rem;
  left: 1.2rem;

  font-family: Monaco, monospace;
  font-size: 0.75rem;
  color: #666;
  letter-spacing: 0.02em;
}

.news-title {
  margin: 0;

  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--text-color);
  text-align: center;
  letter-spacing: -0.02em;

  transition: all 0.3s ease;
}

.nav-buttons-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  margin-top: 2rem;

  visibility: hidden;
}

.nav-button {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
  border: 3px solid #000;
  border-radius: 12px;

  font-size: 1.4rem;
  color: #fff;

  background: #000;

  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #00A95F;
    color: #000;
    background: #fff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

@include m.sp {
  .section {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 1.25rem;
    line-height: 1.2;
  }

  .section-inner {
    padding: 70px 1rem 1rem;
  }

  :deep(.vertical-slider-wrap) {
    padding: 0;
  }

  .news-item {
    padding: 0.5rem 0.5rem 1.5rem;

    &::before {
      bottom: -33px;
      border-width: 12px;
      border-top-width: 18px;
    }

    &::after {
      bottom: -24px;
      border-width: 10px;
      border-top-width: 14px;
    }
  }

  .news-title {
    font-size: 1.2rem;
  }

  .news-date {
    bottom: 0.6rem;
    left: 1rem;
    font-size: 0.7rem;
  }

  .nav-buttons-container {
    gap: 0.8rem;
    margin-top: 1.5rem;
  }

  .nav-button {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}
</style>
