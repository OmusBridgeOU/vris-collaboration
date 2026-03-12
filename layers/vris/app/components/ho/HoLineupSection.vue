<i18n lang="yaml">
ja:
  lineup:
    title: ラインナップ
    title1: 🗼 当日イベント 7/21(月) 🎤
    title2: 🍺 前日イベント 7/20(日) 🍖

en:
  lineup:
    title: Lineup
    title1: 🗼 Main Event 🎤
    title2: 🍺 Pre-event 🍖
</i18n>

<template>
  <section
    id="lineup"
    ref="sectionRef"
    class="section lineup-section"
  >
    <div class="background" />
    <div class="section-inner">
      <h2 class="section-title">
        {{ t('lineup.title') }}
      </h2>
      <div class="inner-container">
        <h3 class="section-title -sub">
          {{ t('lineup.title1') }}
        </h3>
        <ul class="card-grid-list">
          <li
            v-for="card in lineupData.mainEvent"
            :key="card.id"
            class="card-item"
            :class="{ '-disabled': card.isDisabled }"
          >
            <HaLink
              v-if="!card.isDisabled"
              :to="card.link"
              :blank="card.isExternal"
              class="card-link"
            >
              <div class="lineup-card">
                <div class="card-image">
                  <img
                    :src="card.image"
                    :alt="card.title"
                    loading="lazy"
                  >
                </div>
                <div class="card-content">
                  <h4 class="card-title">
                    {{ card.title }}
                  </h4>
                </div>
              </div>
            </HaLink>
            <div
              v-else
              class="card-disabled"
            >
              <div class="lineup-card -disabled">
                <div class="card-image">
                  <img
                    :src="card.image"
                    :alt="card.title"
                    loading="lazy"
                  >
                  <div class="disabled-overlay">
                    <span class="disabled-text">準備中</span>
                  </div>
                </div>
                <div class="card-content">
                  <h4 class="card-title">
                    {{ card.title }}
                  </h4>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <h3 class="section-title -sub">
          {{ t('lineup.title2') }}
        </h3>
        <ul class="card-grid-list">
          <li
            v-for="card in lineupData.preEvent"
            :key="card.id"
            class="card-item"
            :class="{ '-disabled': card.isDisabled }"
          >
            <HaLink
              v-if="!card.isDisabled"
              :to="card.link"
              :blank="card.isExternal"
              class="card-link"
            >
              <div class="lineup-card">
                <div class="card-image">
                  <img
                    :src="card.image"
                    :alt="card.title"
                    loading="lazy"
                  >
                </div>
                <div class="card-content">
                  <h4 class="card-title">
                    {{ card.title }}
                  </h4>
                </div>
              </div>
            </HaLink>
            <div
              v-else
              class="card-disabled"
            >
              <div class="lineup-card -disabled">
                <div class="card-image">
                  <img
                    :src="card.image"
                    :alt="card.title"
                    loading="lazy"
                  >
                  <div class="disabled-overlay">
                    <span class="disabled-text">準備中</span>
                  </div>
                </div>
                <div class="card-content">
                  <h4 class="card-title">
                    {{ card.title }}
                  </h4>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// カードデータの型定義
interface LineupCard {
  id: string
  title: string
  image: string
  link: string
  isExternal?: boolean
  isDisabled?: boolean
}

interface LineupData {
  mainEvent: LineupCard[]
  preEvent: LineupCard[]
}

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

// ラインナップカードのサンプルデータ
const lineupData = ref<LineupData>({
  mainEvent: [
    {
      id: 'main-1',
      title: '展示・即売会@さっぽろテレビ塔',
      image: '/images/2025Summer/lineup/exhibition.png',
      link: '/docs/2025summer/parareal-creators',
      isExternal: false,
      isDisabled: false,
    },
    {
      id: 'main-2',
      title: 'スペシャルライブ！！',
      image: '/images/2025Summer/lineup/vketreal_stage_milia.jpg',
      link: '/docs/2025summer/special-live',
      isExternal: false,
      isDisabled: false,
    },
    {
      id: 'main-3',
      title: '札幌マップ&デジタルスタンプラリー',
      image: '/images/2025Summer/lineup/stamp.jpg',
      link: '/docs/2025summer/stamp',
      isExternal: true,
      isDisabled: false,
    },
    {
      id: 'main-4',
      title: 'さっぽろテレビ塔AR@STYLY',
      image: '/images/2025Summer/lineup/photospot.png',
      link: '/docs/2025summer/photospot',
      isExternal: false,
      isDisabled: false,
    },
  ],
  preEvent: [
    {
      id: 'pre-1',
      title: 'メタのみ@札幌',
      image: '/images/2025Summer/lineup/metanomi.jpeg',
      link: 'https://t.livepocket.jp/e/melanoma_sapporo',
      isExternal: true,
      isDisabled: false,
    },
    {
      id: 'pre-2',
      title: 'DJ Party in VketReal SAPPORO',
      image: '/images/2025Summer/lineup/dj-trim.jpeg',
      link: 'https://twipla.jp/events/680855',
      isExternal: true,
      isDisabled: false,
    },
    {
      id: 'pre-3',
      title: '[来場無料!] ぶっちゃけどうなの？！メタバース',
      image: '/images/2025Summer/lineup/talk-1.jpg',
      link: '/docs/2025summer/talk-event',
      isExternal: false,
      isDisabled: false,
    },
  ],
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

  &.-sub {
    margin-bottom: 1.5rem;

    font-size: 2rem;
    font-weight: normal;
    color: #000;
    text-shadow: none;
  }
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

.card-grid-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  width: 100%;
  max-width: 800px;
  margin: 0 auto 2rem;
  padding: 0;

  list-style: none;
}

.card-item {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.lineup-card {
  position: relative;

  overflow: hidden;

  border: 3px solid #000;
  border-radius: 12px;

  background: #fff;
  box-shadow: 4px 4px 0 rgb(0 0 0 / 10%);

  transition: all 0.3s ease;

  &:hover {
    border-color: #00A95F;
    box-shadow: 6px 6px 0 rgb(0 0 0 / 20%);
  }
}

.card-image {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .lineup-card:hover & img {
    transform: scale(1.05);
  }
}

.card-content {
  padding: 1rem;
  text-align: center;
}

.card-title {
  margin: 0;

  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  color: #000;

  transition: color 0.3s ease;

  .lineup-card:hover & {
    color: #00A95F;
  }
}

// 非活性カードのスタイリング
.card-item.-disabled {
  .card-item:hover & {
    transform: none;
  }
}

.card-disabled {
  cursor: not-allowed;
  display: block;
  color: inherit;
  text-decoration: none;
}

.lineup-card.-disabled {
  border-color: #ccc;
  opacity: 0.6;
  filter: grayscale(0.5);
  box-shadow: 2px 2px 0 rgb(0 0 0 / 10%);

  &:hover {
    transform: none;
    border-color: #ccc;
    box-shadow: 2px 2px 0 rgb(0 0 0 / 10%);
  }

  .card-title {
    color: #666;
  }
}

.disabled-overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(0 0 0 / 70%);
  backdrop-filter: blur(2px);
}

.disabled-text {
  padding: 0.5rem 1rem;
  border: 2px solid #fff;
  border-radius: 8px;

  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 2px rgb(0 0 0 / 80%);

  background: rgb(0 0 0 / 50%);
}

@include m.sp {
  .section-inner {
    padding: 70px 1rem 1rem;
  }

  .section-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.2;

    &.-sub {
      font-size: 1rem;
    }
  }

  .inner-container {
    padding: 0.5rem;
  }

  .card-grid-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 100%;
    margin-bottom: 1.5rem;
  }

  .card-image {
    height: 160px;
  }

  .card-content {
    padding: 0.75rem;
  }

  .card-title {
    font-size: 1rem;
  }

  .disabled-text {
    padding: 0.4rem 0.8rem;
    font-size: 1rem;
  }
}
</style>
