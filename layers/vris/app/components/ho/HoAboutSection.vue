<i18n lang="yaml">
ja:
  about:
    title: About
    description: VketReal in 札幌 2025 Summerは、有志が主催する新しい形のVketRealです。初回となる今回のテーマは
    theme: 「バーチャルとリアルの海峡を越えろ」！
    features:
      title1: 札幌でも！「バーチャルの姿のまま」現実で体験できる
      text1: アバターとしての生き方を大切にする人々がリアルの場で集い、交流し、共にクリエイティブな未来を築く場として開催することを目指します！
      title2: 札幌でも！VRの世界で活躍するクリエイターの出展
      text2: VRとリアルを行き来しながら活躍するクリエイターの作品展示や、新たなXR技術を活用したインタラクティブな企画を展開！
      title3: 札幌でも！遊んで、買って、楽しめる企業ブース
      text3: 各企業ブースでは最新XRコンテンツを体験でき、ここでしか手に入らない限定グッズも販売されるかも？
en:
  about:
    title: About
    description: VketReal in Sapporo 2025 Summer is a new form of VketReal organized by volunteers. The theme for this time is
    theme: '"Cross the strait between virtual and real!"'
    features:
      title1: In Sapporo, Live in the real world in your Virtual Identity
      text1: This event is held to create a space where people who value their avatars and virtual life can gather, connect in the physical world, and shape a shared "creative" future.
      title2: In Sapporo, Featuring creator exhibitions from the VR world
      text2: Encounter exhibitions from creators thriving in virtual and physical reality, experience activities using latest XR technology!
      title3: In Sapporo, Play, shop, and enjoy Corporate Exhibitions
      text3: Experience latest XR contents in each Corporate Exhibitions, buy limited merchandise, join giveaways to win great surprizes!
</i18n>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="section about-section"
  >
    <div class="background" />
    <div class="section-inner">
      <h2 class="section-title">
        {{ t('about.title') }}
      </h2>
      <p class="about-description">
        {{ t('about.description') }}
        <span class="theme">
          {{ t('about.theme') }}
        </span>
      </p>
      <div
        v-if="!isSp"
        class="features-grid"
      >
        <div
          v-for="(feature, index) in features"
          :key="`feature-${index}`"
          class="slider-item"
        >
          <div class="feature-card">
            <div
              class="card-bg"
              :class="`-index-${index}`"
            />
            <h3 class="feature-title">
              {{ feature.title }}
            </h3>
            <p class="feature-text">
              {{ feature.text }}
            </p>
          </div>
        </div>
      </div>
      <HmSlider
        v-else
        :slidename="'features-slider'"
        :itemsId="featureIds"
        :amount="features.length"
        :arrow="true"
        :pagination="false"
        :loop="true"
        :center="true"
        :page="false"
        :autoplay="true"
        :draggable="true"
        gapPc="20px"
        gapSp="20px"
        widthPc="30"
        widthSp="80"
        :duration="500"
        easing="ease-in-out"
        :interval="3000"
        @activeIndexChange="handleActiveIndexChange"
      >
        <template #item>
          <HmSliderItem
            v-for="(feature, index) in features"
            :id="`feature-${index}`"
            :key="`feature-${index}`"
            :class="['slider-item', { '-active': index === activeIndex }]"
          >
            <div class="feature-card">
              <div
                class="card-bg"
                :class="`-index-${index}`"
              />
              <h3 class="feature-title">
                {{ feature.title }}
              </h3>
              <p class="feature-text">
                {{ feature.text }}
              </p>
            </div>
          </HmSliderItem>
        </template>
        <template #navigationprevious>
          <span class="nav-button prev">←</span>
        </template>
        <template #navigationnext>
          <span class="nav-button next">→</span>
        </template>
      </HmSlider>
    </div>
  </section>
</template>

<script setup lang="ts">
import { breakpoints } from '#vris/app/composables/useBreakpoints'

interface Feature {
  title: string
  text: string
}

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

const isSp = breakpoints.smaller('sp')
const handleActiveIndexChange = (payload: { index: number }) => {
  activeIndex.value = payload.index
}

onMounted(() => {
  activeIndex.value = 0
})

const features = computed<Feature[]>(() =>
  Array.from({ length: 3 }, (_, i) => ({
    title: t(`about.features.title${i + 1}`),
    text: t(`about.features.text${i + 1}`),
  })),
)

const featureIds = computed(() =>
  Array.from({ length: 3 }, (_, i) => `feature-${i}`),
)

defineExpose({
  sectionRef,
})
</script>

<style lang="scss" scoped>
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;

.background {
  position: absolute;
  z-index: 0;
  inset: 0;

  background-position: center;
  background-size: cover;
  backdrop-filter: blur(8px);
}

.section {
  scroll-snap-align: start;

  position: relative;

  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-height: 100dvh;
}

.section-inner {
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 1080px;
  height: 100vh;
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

.about-description {
  max-width: 800px;
  margin: 0 auto 4rem;

  font-size: 1.2rem;
  line-height: 1.8;
  color: #fff;
  text-align: center;
  text-shadow:
    2px 2px 4px rgb(0 0 0 / 50%),
    -2px -2px 4px rgb(0 0 0 / 50%),
    2px -2px 4px rgb(0 0 0 / 50%),
    -2px 2px 4px rgb(0 0 0 / 50%);

  > .theme {
    background: linear-gradient(transparent 50%, #00A95F 50%);
  }
}

.features-grid {
 position: relative;
 z-index: 1;

 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 2.5rem;

 width: 100%;
 margin: 0 auto;

 .slider-item {
   transform: none;
   padding: 0;
   opacity: 1;
 }

 .feature-card {
   gap: 2rem;
   height: 100%;
   min-height: 320px;
   padding: 2rem;

   &:hover {
     border-color: #00A95F;
     box-shadow: 6px 6px 0 rgb(0 0 0 / 80%);

     .card-bg {
       opacity: 0.4;
     }

     .feature-title {
       --text-color: #00A95F;
     }
   }
 }
}

.slider-item {
  --card-border-color: #000;
  --text-color: #000;
  --arrow-color: var(--border-color);

  padding-bottom: 40px;
  transition: all 0.3s ease;

  &.-active {
    --card-border-color: #00A95F;
    --text-color: #00A95F;
    --arrow-color: #00A95F;

    z-index: 1;

    .feature-card {
      box-shadow: 6px 6px 0 rgb(0 0 0 / 80%);
    }

    .card-bg {
      opacity: 0.4;
    }
  }
}

.feature-card {
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  height: 100%;
  padding: 1.5rem;
  padding-bottom: 2rem;
  border: 4px solid var(--card-border-color, #000);
  border-radius: 16px;

  background: rgb(255 255 255 / 95%);
  box-shadow: 4px 4px 0 rgb(0 0 0 / 30%);

  transition: all 0.3s ease;

}

.card-bg {
  position: absolute;
  z-index: 0;
  inset: 0;

  opacity: 0.2;
  background-position: center;
  background-size: cover;

  transition: all 0.3s ease;

  &.-index-0 {
    background-image: url('/images/2025Summer/feature-1.webp');
  }

  &.-index-1 {
    background-image: url('/images/2025Summer/feature-2.webp');
  }

  &.-index-2 {
    background-image: url('/images/2025Summer/feature-3.webp');
  }
}

.feature-title {
  position: relative;
  z-index: 1;

  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;

  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color, #000);
  text-shadow: 1px 1px 3px rgb(0 0 0 / 40%);

  background: rgb(255 255 255 / 80%);

  transition: color 0.3s ease;

  @include m.sp {
    font-size: 1rem;
  }
}

.feature-text {
  position: relative;
  z-index: 1;

  flex: 1;

  padding: 0.5rem;
  border-radius: 8px;

  font-weight: 500;
  line-height: 1.6;
  color: var(--text-color, #000);

  background: rgb(255 255 255 / 80%);

  @include m.sp {
    scrollbar-color: rgb(0 0 0 / 30%) transparent;
    scrollbar-width: thin;

    overflow-y: auto;

    max-height: 4.8em; /* line-height * 3行 */

    -webkit-overflow-scrolling: touch;

    /* Webkit用スクロールバーのスタイル */
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: rgb(0 0 0 / 30%);
    }
  }
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

  &:hover {
    border-color: #00A95F;
    color: #000;
    background: #fff;
  }

  &.prev {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &.next {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}

@include m.sp {
  .feature-card {
    height: auto;
    min-height: 200px;
    padding: 1.2rem;
    padding-bottom: 2rem;
  }

  .section-inner {
    max-width: 100dvw;
    height: 100vh;
    padding-top: 70px;
  }

  .background-before {
    transform: translateY(-67%);
  }

  .background-after {
    transform: translateY(67%);
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }

  .about-description {
    padding: 0 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
