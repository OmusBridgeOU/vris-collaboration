<i18n lang="yaml">
ja:
  outline:
    title: イベント概要
    items:
      label1: 開催日時
      value1: 2025年7月21日(月) 11:00-18:00
      label2: 開催場所
      value2: さっぽろテレビ塔2F レンタルホール
      label3: 参加費
      value3: チケット制でのご入場となります
      label4: 主催
      value4: VketReal in 札幌 実行委員会
      label5: 特別協力
      value5: 株式会社HIKKY, 株式会社株式会社インフィニットループ
    map:
      title: アクセス
      address: 〒060-0042 北海道札幌市中央区大通西１丁目
      access: 札幌市営地下鉄 大通駅下車 27番出口すぐ。
en:
  outline:
    title: Event Details
    items:
      label1: Event Date
      value1: July 21, 2025 (Mon) 11:00-18:00
      label2: Venue
      value2: Sapporo TV Tower 2F Rental Hall
      label3: Admission Fee
      value3: Entry by ticket
      label4: Organizer
      value4: VketReal in Sapporo Executive Committee
      label5: Cooperation
      value5: HIKKY Inc., Infinite Loop Inc.
    map:
      title: Access
      address: 1 Chome-1 Odori Nishi, Chuo Ward, Sapporo, Hokkaido 060-0042
      access: 0 min walk from Sapporo Subway Odori Station Exit 27
</i18n>

<template>
  <section
    id="outline"
    ref="sectionRef"
    class="section outline-section"
  >
    <div class="background" />
    <div class="section-inner">
      <h2 class="section-title">
        {{ t('outline.title') }}
      </h2>
      <div class="inner-container">
        <div class="content-wrapper">
          <div class="info-list">
            <dl
              v-for="(item, index) in outlineItems"
              :key="index"
              class="info-item"
            >
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </dl>
          </div>
          <div class="map-container">
            <h3 class="map-title">
              {{ t('outline.map.title') }}
            </h3>
            <template v-if="!isSp">
              <div
                ref="mapFrame"
                class="map-frame"
              >
                <iframe
                  :height="mapFramePixel.height ? mapFramePixel.height : isSp ? 300 : 600"
                  :width="mapFramePixel.width ? mapFramePixel.width : isSp ? 200 : 400"
                  style="border:0"
                  load="lazy"
                  allowfullscreen
                  src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJjWSHX50pC18RMSAiw3gaBOI&key=AIzaSyCkXG_mnC4wqK9mcgZjh6VQoSRg2g-gsX8"
                ></iframe>
              </div>
            </template>
            <address class="map-address">
              {{ t('outline.map.address') }}<br>
              {{ t('outline.map.access') }}
            </address>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { breakpoints } from '#vris/app/composables/useBreakpoints'

interface OutlineItem {
  label: string
  value: string
}

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const outlineItems = computed<OutlineItem[]>(() =>
  Array.from({ length: 5 }, (_, i) => ({
    label: t(`outline.items.label${i + 1}`),
    value: t(`outline.items.value${i + 1}`),
  })),
)

const isSp = breakpoints.smaller('sp')

// map-frameのDOMのサイズを常に計測してwidthとheightを取得する
const mapFrame = ref<HTMLIFrameElement | null>(null)
const mapFramePixel = ref({ width: 0, height: 0 })
const updateMapFrameSize = () => {
  if (mapFrame.value) {
    const { width, height } = mapFrame.value.getBoundingClientRect()
    // 画面サイズに応じてwidthとheightを変更する
    mapFramePixel.value.width = width
    mapFramePixel.value.height = height
  }
}
onMounted(() => {
  updateMapFrameSize()
  window.addEventListener('resize', updateMapFrameSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMapFrameSize)
})

defineExpose({
  sectionRef,
})
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/variables' as v;
@use '#vris/app/assets/styles/mixins' as m;

.section {
  scroll-snap-align: start;

  position: relative;

  overflow-y: hidden;
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

  width: 100%;
  margin: 0 auto;
  padding: calc((100dvh - 720px) / 2) 2rem 2rem;
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

.inner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  border: 4px solid #000;
  border-radius: 16px;

  color: #000;

  background: rgb(255 255 255 / 60%);
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;

  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  dt {
    font-weight: bold;
    color: #666;
  }

  dd {
    margin: 0;
  }
}

.map-container {
  .map-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .map-frame {
    overflow: hidden;

    aspect-ratio: 16/9;
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 8px;

    background: #f5f5f5;
  }

  .map-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    font-size: 0.9rem;
    color: #999;

    background: #eee;

    &::after {
      content: 'Map';
    }
  }

  .map-address {
    font-size: 0.9rem;
    font-style: normal;
    line-height: 1.6;
    color: #000;
  }
}

@include m.sp {
  .section {
    min-height: 100dvh;
    padding: 1rem 0.5rem;
  }

  .section-inner {
    padding: 70px 1rem 1rem;
  }

  .inner-container {
    padding: 1rem;
  }

  .section-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.2;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .info-list {
    gap: 0.5rem;
      margin-bottom: 2rem;
  }

  .info-item {
    grid-template-columns: 1fr;
    gap: 0.125rem;
    padding-bottom: 0.375rem;

    dt {
      font-size: 0.75rem;
      line-height: 1.2;
      color: #999;
    }

    dd {
      font-size: 0.85rem;
      line-height: 1.3;
    }
  }

  .map-container {
    .map-title {
      margin-bottom: 0.5rem;
      font-size: 1rem;
      line-height: 1.2;
    }

    .map-frame {
      aspect-ratio: 16/7;
      height: 140px;
      margin-bottom: 0.5rem;
    }

    .map-address {
      font-size: 0.75rem;
      line-height: 1.3;

    }
  }
}
</style>
