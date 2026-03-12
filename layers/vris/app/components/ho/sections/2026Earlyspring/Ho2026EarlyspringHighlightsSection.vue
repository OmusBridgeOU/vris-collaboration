<i18n lang="yaml">
ja:
  highlights:
    eyebrow: Contents
    title: 当日のコンテンツを一部紹介！
    lead: ticket
    cards:
      item1:
        accent: Exhibition
        title: パラリアルクリエイター in SAPPORO
        description: 今回も、北海道のクリエイターによるさまざまなグッズや企画が登場！
      item2:
        accent: Talks
        title: Parareal Lightning Talks
        description: XRスタジオでの演出アリ！北海道の技術者やクリエイターによる、ここだけのLTセッション！
      item3:
        accent: Foods & Drinks
        title: 飲食しながら楽しめる！
        description: VketReal in 札幌に飲食ブースが登場！バーチャルとも連携？オフ会・新年会気分で楽しめる！交流を深めるチャンスに！
      item4:
        accent: Other
        title: 他にも企画が盛りだくさん
        description: フォトスポットやライブイベント、ラジオ企画など、たのしい企画が盛りだくさん！
en:
  highlights:
    eyebrow: Contents
    title: Four Ways Virtual Spills Into Sapporo
    cards:
      item1:
        accent: Exhibitions
        title: Parareal Creator in SAPPORO
        description: XR demos, 3D avatar exhibits, and merch all in one place—feel the creators’ energy in early spring.
      item2:
        accent: Talks
        title: Parareal Lightning Talks
        description: With XR studio production! Special LT sessions by Hokkaido-based creators and technologists.
      item3:
        accent: Foods & Drinks
        title: Enjoy Food & Drinks!
        description: Food & drink booths make their debut at VketReal in Sapporo! Enjoy a virtual-linked off-party and New Year’s gathering atmosphere! A great chance to mingle!
      item4:
        accent: Others
        title: More Exciting Plans
        description: Photo spots, live events, radio programs, and more!
</i18n>

<template>
  <section
    id="highlights"
    class="ha-section ha-highlights"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('highlights.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('highlights.title') }}
      </h2>
    </div>
    <div class="cards">
      <article
        v-for="card in highlightCards"
        :key="card.title"
        class="card"
      >
        <span class="accent">{{ card.accent }}</span>
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
      </article>
    </div>
    <img
      class="image"
      alt="会場マップ"
      src="/images/2026EarlySpring/map.png"
    />
    <div class="highlight-carousel">
      <HmSlider
        slidename="highlight-contents"
        :itemsId="contentItemIds"
        :amount="contentItems.length"
        :arrow="true"
        :pagination="true"
        :loop="true"
        :center="true"
        :page="false"
        :autoplay="true"
        :interval="4200"
        gapPc="20px"
        gapSp="14px"
        widthPc="100%"
        widthSp="100%"
        :duration="400"
        easing="ease-out"
        :draggable="true"
        :slidesPerViewPc="3"
        :slidesPerViewSp="1"
      >
        <template #item>
          <HmSliderItem
            v-for="item in contentItems"
            :id="item.id"
            :key="item.id"
          >
            <button
              class="slide-card-button"
              type="button"
              :aria-label="item.alt"
              @click="openContentDialog(item)"
            >
              <figure class="slide-card">
                <div class="slide-card__media">
                  <img
                    :src="item.src"
                    :alt="item.alt"
                    loading="lazy"
                  >
                </div>
                <figcaption class="slide-card__caption">
                  {{ item.caption }}
                </figcaption>
              </figure>
            </button>
          </HmSliderItem>
        </template>
        <template #pagination>
          <span class="pagination-dot" />
        </template>
        <template #navigationprevious>
          <span class="nav-arrow">‹</span>
        </template>
        <template #navigationnext>
          <span class="nav-arrow">›</span>
        </template>
      </HmSlider>
    </div>

    <HaDialogElement
      ref="contentDialog"
      closedby="any"
      @close="handleDialogClose"
    >
      <template #inner>
        <div
          v-if="selectedContent"
          class="content-dialog"
        >
          <div class="content-dialog__media">
            <img
              :src="selectedContent.src"
              :alt="selectedContent.alt"
            >
          </div>
          <p class="content-dialog__caption">
            {{ selectedContent.caption }}
          </p>
        </div>
      </template>
    </HaDialogElement>
  </section>
</template>

<script setup lang="ts">
import HaDialogElement from '#base/app/components/ha/HaDialogElement.vue'
import HmSlider from '#base/app/components/hm/HmSlider.vue'
import HmSliderItem from '#base/app/components/hm/HmSliderItem.vue'
import type { ComponentPublicInstance } from 'vue'
import { computed } from 'vue'

interface HighlightCard {
  accent: string
  title: string
  description: string
}

const { t } = useI18n()

const highlightCards = computed<HighlightCard[]>(() =>
  Array.from({ length: 4 }, (_, index) => ({
    accent: t(`highlights.cards.item${index + 1}.accent`),
    title: t(`highlights.cards.item${index + 1}.title`),
    description: t(`highlights.cards.item${index + 1}.description`),
  })),
)

type ContentSlide = {
  id: string
  src: string
  alt: string
  caption: string
}

const contentItems = computed<ContentSlide[]>(() => [
  {
    id: 'content-ashiatopng',
    src: '/images/2026EarlySpring/contents/ashiatopng.png',
    alt: 'XR開拓者の足跡コーナー',
    caption: 'XR開拓者の足跡コーナー',
  },
  {
    id: 'content-card',
    src: '/images/2026EarlySpring/contents/card.png',
    alt: 'マッチングカードゲーム',
    caption: 'マッチングカードゲーム',
  },
  {
    id: 'content-kanpai',
    src: '/images/2026EarlySpring/contents/kanpai.webp',
    alt: 'バーチャルと乾杯しよう!',
    caption: 'バーチャルと乾杯しよう!',
  },
  {
    id: 'content-lt',
    src: '/images/2026EarlySpring/contents/lt.png',
    alt: 'Parareal Lightning Talks',
    caption: 'Parareal Lightning Talks',
  },
  {
    id: 'content-sonoraji',
    src: '/images/2026EarlySpring/contents/sonoraji.webp',
    alt: 'そのらじ札幌巡業スペシャル',
    caption: 'そのらじ札幌巡業スペシャル',
  },
  {
    id: 'content-stage',
    src: '/images/2026EarlySpring/contents/stage.jpeg',
    alt: 'パラリアルステージ',
    caption: 'パラリアルステージ',
  },
  {
    id: 'content-utage',
    src: '/images/2026EarlySpring/contents/utage.jpeg',
    alt: 'パラリアル宴',
    caption: 'パラリアル宴',
  },
])

const contentItemIds = computed(() => contentItems.value.map(item => item.id))

type HaDialogElementExposed = {
  openDialog: () => void
  closeDialog: () => void
}

const contentDialog = ref<ComponentPublicInstance<HaDialogElementExposed> | null>(null)
const selectedContent = ref<ContentSlide | null>(null)

const openContentDialog = async (item: ContentSlide) => {
  selectedContent.value = item
  await nextTick()
  contentDialog.value?.openDialog()
}

const handleDialogClose = () => {
  selectedContent.value = null
}
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-highlights {
  .cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: f.rem(24px);

    @include m.tb {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include m.sp {
      scroll-snap-type: x mandatory;

      overflow-x: auto;
      grid-auto-flow: column;
      grid-template-columns: repeat(4, minmax(75vw, 1fr));

      padding-bottom: f.rem(6px);

      -webkit-overflow-scrolling: touch;
    }
  }

  .image {
    display: block;
    width: 100%;
    max-width: 1100px;
    margin: f.rem(48px) auto 0;
  }

  .card {
    scroll-snap-align: center;

    position: relative;

    padding: f.rem(32px);
    border-radius: 24px;

    color: #333;

    background: v.$white;
    backdrop-filter: blur(12px);
    box-shadow: 0 20px 60px rgba(v.$navy, 0.38);

    transition: transform 0.3s ease, box-shadow 0.3s ease;

    @include m.hover {
      transform: translateY(-6px);
      box-shadow: 0 26px 80px rgba(v.$navy, 0.45);
    }

    h3 {
      margin: f.rem(16px) 0 f.rem(12px);
      font-size: clamp(f.rem(20px), 2vw, f.rem(26px));
    }

    p {
      margin: 0;
      line-height: 1.7;
      color: #333;
    }

    .accent {
      display: inline-flex;

      padding: f.rem(6px) f.rem(16px);
      border-radius: 999px;

      font-size: f.rem(12px);
      color: rgba(v.$black, 0.85);
      text-transform: uppercase;
      letter-spacing: 0.12em;

      background: rgba(v.$blue, 0.35);
    }
  }

  .highlight-carousel {
    position: relative;
    width: 100%;
    max-width: 1100px;
    margin: f.rem(48px) auto 0;

    :deep(.slider-body) {
      padding: f.rem(8px) f.rem(48px);
    }

    :deep(.slider-arrow) {
      position: absolute;
      z-index: 2;
      top: 50%;
      transform: translateY(-50%);
    }

    :deep(.button--previous) {
      left: f.rem(6px);
    }

    :deep(.button--next) {
      right: f.rem(6px);
    }

    :deep(.slider-pagination) {
      position: absolute;
      bottom: f.rem(-36px);
      left: 50%;
      transform: translateX(-50%);

      display: flex;
      gap: f.rem(8px);
    }
  }

  .slide-card-button {
    cursor: pointer;

    display: block;

    width: 100%;
    padding: 0;
    border: 0;

    text-align: left;

    background: transparent;
  }

  .slide-card {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: f.rem(10px);

    margin: 0;
    padding: f.rem(12px);
    border-radius: 18px;

    background: rgba(v.$white, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 16px 50px rgba(v.$navy, 0.22);

    &__media {
      overflow: hidden;
      aspect-ratio: 16 / 9;
      border-radius: 14px;
      background: #000;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &__caption {
      margin: 0;
      font-size: f.rem(13px);
      color: #333;
      letter-spacing: 0.01em;
    }
  }

  .pagination-dot {
    display: block;

    width: f.rem(12px);
    height: f.rem(12px);
    border: 1px solid rgba(v.$navy, 0.35);
    border-radius: 50%;

    background: rgba(v.$navy, 0.25);
  }

  .nav-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: f.rem(32px);
    height: f.rem(32px);
    border-radius: 50%;

    font-size: f.rem(18px);
    line-height: 1;
    color: #333;

    background: rgba(v.$navy, 0.08);
  }

  .content-dialog {
    display: grid;
    gap: f.rem(12px);
    justify-items: center;

    width: min(1000px, 92vw);
    margin: 0 auto;
    padding: f.rem(16px);

    &__media {
      overflow: hidden;
      display: grid;
      place-items: center;

      width: 100%;
      max-height: 80vh;

      img {
        display: block;

        width: 100%;
        height: auto;
        max-height: 80vh;

        object-fit: contain;
      }
    }

    &__caption {
      margin: 0;

      font-size: f.rem(14px);
      color: #333;
      text-align: center;
      letter-spacing: 0.01em;
    }
  }
}
</style>
