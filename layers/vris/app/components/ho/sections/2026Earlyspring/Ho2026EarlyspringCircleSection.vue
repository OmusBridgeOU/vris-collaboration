<i18n lang="yaml">
ja:
  circle:
    eyebrow: 出展サークル
    title: パラリアルクリエイター in SAPPORO 出展サークル
    lead: パラリアルクリエイター in SAPPOROの出展サークル一覧を紹介します。
    items:
      1: わにちゃのお店
      2: 赤糸の裁縫箱
      3: しろの里
      4: ガジェット愛好会
      5: 貧弱な描きおき部屋
      6: A-PxL
      7: 北海道大学メタバース研究会
      8: VRホビーロボット集会
      9: 永遠者工房
      10: PoteSuto
      11: OUCC
      12: VRアートを楽しむ会
      13: Sakana Ext.
en:
  circle:
    eyebrow: Circles
    title: Circles  for Parareal Creator in SAPPORO
    lead: Circle visuals for VketReal mini in Sapporo 2026 Early Spring.
    items:
      1: わにちゃのお店
      2: 赤糸の裁縫箱
      3: しろの里
      4: ガジェット愛好会
      5: 貧弱な描きおき部屋
      6: A-PxL
      7: 北海道大学メタバース研究会
      8: VRホビーロボット集会
      9: 永遠者工房
      10: PoteSuto
      11: OUCC
      12: VRアートを楽しむ会
      13: Sakana Ext.
</i18n>

<template>
  <section
    id="circle"
    class="ha-section ha-circle"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('circle.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('circle.title') }}
      </h2>
      <p class="ha-section__lead">
        {{ t('circle.lead') }}
      </p>
    </div>

    <div class="slider-shell">
      <HmSlider
        class="circle-slider"
        slidename="circle-slider"
        :itemsId="itemIds"
        :amount="circles.length"
        :arrow="true"
        :pagination="true"
        :loop="true"
        :center="true"
        :page="false"
        :autoplay="true"
        :interval="1000"
        gapPc="24px"
        gapSp="16px"
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
            v-for="circle in shuffledCircles"
            :id="circle.id"
            :key="circle.id"
          >
            <button
              class="circle-card-button"
              type="button"
              :aria-label="circle.caption"
              @click="openCircleDialog(circle)"
            >
              <figure class="circle-card">
                <div class="circle-media">
                  <img
                    :src="circle.src"
                    :alt="circle.caption"
                    loading="lazy"
                  />
                </div>
                <figcaption class="circle-caption">
                  {{ circle.caption }}
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
      ref="circleDialog"
      closedby="any"
      @close="handleDialogClose"
    >
      <template #inner>
        <div
          v-if="selectedCircle"
          class="circle-dialog"
        >
          <div class="circle-dialog__media">
            <img
              :src="selectedCircle.src"
              :alt="selectedCircle.caption"
            >
            <template v-if="selectedCircle.src2">
              <img
                :src="selectedCircle.src2"
                :alt="selectedCircle.caption"
                loading="lazy"
              />
            </template>
          </div>
          <p class="circle-dialog__caption">
            {{ selectedCircle.caption }}
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

interface CircleVisual {
  id: string
  src: string
  src2?: string
  caption: string
}

const { t } = useI18n()

const circles = computed<CircleVisual[]>(() => [
  {
    id: 'circle-1',
    src: '/images/2026EarlySpring/circles/kv/1.png',
    src2: '/images/2026EarlySpring/circles/catalog/1.png',
    caption: t('circle.items.1'),
  },
  {
    id: 'circle-2',
    src: '/images/2026EarlySpring/circles/kv/2.png',
    caption: t('circle.items.2'),
  },
  {
    id: 'circle-3',
    src: '/images/2026EarlySpring/circles/kv/3.png',
    src2: '/images/2026EarlySpring/circles/catalog/3.png',
    caption: t('circle.items.3'),
  },
  {
    id: 'circle-4',
    src: '/images/2026EarlySpring/circles/kv/4.png',
    src2: '/images/2026EarlySpring/circles/catalog/4.png',
    caption: t('circle.items.4'),
  },
  {
    id: 'circle-5',
    src: '/images/2026EarlySpring/circles/kv/5.png',
    src2: '/images/2026EarlySpring/circles/catalog/5.png',
    caption: t('circle.items.5'),
  },
  {
    id: 'circle-6',
    src: '/images/2026EarlySpring/circles/kv/6.png',
    caption: t('circle.items.6'),
  },
  {
    id: 'circle-7',
    src: '/images/2026EarlySpring/circles/kv/7.png',
    caption: t('circle.items.7'),
  },
  {
    id: 'circle-8',
    src: '/images/2026EarlySpring/circles/kv/8.png',
    caption: t('circle.items.8'),
  },
  { id: 'circle-9',
    src: '/images/noimage16-9.png',
    caption: t('circle.items.9'),
  },
  { id: 'circle-10',
    src: '/images/noimage16-9.png',
    caption: t('circle.items.10'),
  },
  { id: 'circle-11',
    src: '/images/noimage16-9.png',
    caption: t('circle.items.11'),
  },
  { id: 'circle-12',
    src: '/images/noimage16-9.png',
    caption: t('circle.items.12'),
  },
  { id: 'circle-13',
    src: '/images/2026EarlySpring/circles/kv/13.png',
    caption: t('circle.items.13'),
  },
])

const shuffledCircles = computed(() => {
  const array = [...circles.value]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] as [CircleVisual, CircleVisual]
  }
  return array
})

const itemIds = computed(() => circles.value.map(circle => circle.id))

type HaDialogElementExposed = {
  openDialog: () => void
  closeDialog: () => void
}

const circleDialog = ref<ComponentPublicInstance<HaDialogElementExposed> | null>(null)
const selectedCircle = ref<CircleVisual | null>(null)

const openCircleDialog = async (circle: CircleVisual) => {
  selectedCircle.value = circle
  await nextTick()
  circleDialog.value?.openDialog()
}

const handleDialogClose = () => {
  selectedCircle.value = null
}
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-circle {
  display: flex;
  flex-direction: column;
  gap: f.rem(28px);

  .ha-section__heading {
    margin-bottom: 0;
  }
}

.circle-slider {
  width: auto;
}

.slider-shell {
  position: relative;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;

  :deep(.slider-body) {
    position: relative;
    padding: f.rem(6px) f.rem(48px);
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
    bottom: f.rem(-40px);
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    gap: f.rem(8px);
  }
}

.circle-card-button {
  cursor: pointer;

  display: block;

  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;

  text-align: left;

  background: transparent;
}

.circle-card {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: f.rem(12px);

  height: 100%;
  margin: 0;
  padding: f.rem(12px);
  border-radius: 20px;

  background: rgba(v.$white, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 16px 50px rgba(v.$navy, 0.22);

  .circle-media {
    overflow: hidden;

    aspect-ratio: 16 / 9;
    width: 100%;
    height: 100%;
    border-radius: 16px;

    background: #000;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .circle-caption {
    margin: 0;
    font-size: f.rem(14px);
    color: #333;
    letter-spacing: 0.01em;
  }
}

.circle-dialog {
  display: grid;
  gap: f.rem(12px);
  justify-items: center;

  width: min(1000px, 92vw);
  margin: 0 auto;
  padding: f.rem(16px);

  .circle-dialog__media {
    overflow: hidden;
    overflow-y: scroll;
    display: grid;
    gap: 8px;
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

  .circle-dialog__caption {
    margin: 0;

    font-size: f.rem(14px);
    color: #333;
    text-align: center;
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

@include m.sp {
  .ha-circle {
    gap: f.rem(22px);
  }

  .slider-shell {
    max-width: 100%;
  }

  .circle-card {
    padding: f.rem(10px);
    border-radius: 16px;

    .circle-caption {
      font-size: f.rem(13px);
    }
  }

  .circle-media {
    aspect-ratio: 16 / 9;
  }

  .nav-arrow {
    width: f.rem(28px);
    height: f.rem(28px);
    font-size: f.rem(16px);
  }
}
</style>
