<script setup lang="ts">
import HaArrowRightIcon from '../ha/icons/HaArrowRightIcon.vue'
import HmNewsSwiper from '../hm/HmNewsSwiper.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t: tGlobal } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: tGlobal('news.1.title'),
    href: 'https://note.com/vris/n/nd2a52adc9c5c',
    imgSrc: '/news1_thumbnail.png',
    timestamp: '2026-06-06',
  },
  {
    id: 2,
    title: tGlobal('news.2.title'),
    href: 'https://note.com/vris/n/nd2a52adc9c5c',
    imgSrc: '/news2_thumbnail.png',
    timestamp: '2026-06-01',
  },
])

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <HaSectionTitle
    :title="tGlobal('sectionTitle.news')"
    label="NEWS"
  >
    <template #controls>
      <NuxtLink
        class="news__button"
        to="/news"
      >
        <span class="news__button-text">
          {{ tGlobal("viewAll") }}
        </span>
        <HaArrowRightIcon class="news__button-icon" />
      </NuxtLink>
    </template>
  </HaSectionTitle>
  <div ref="sectionRef">
    <HmNewsSwiper
      ref="worksSwiperRef"
      class="news__swiper"
      :items="items"
      :_slides-per-view="1"
      :_breakpoints="{
        1024: { slidesPerView: 3 }, // PC: app/assets/styles/_variables.scss v.$pc-content-min-width
        768: { slidesPerView: 2 }, // タブレット: app/assets/styles/_variables.scss v.$media-query-width
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.news {
  &__swiper {
    margin-bottom: 36px;

    @include m.tb {
      margin-bottom: 24px;
    }
  }

  &__button {
    position: relative;

    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;

    width: 140px;
    height: 48px;
    margin: 0 auto;
    border-radius: 1000px;

    background-color: #e5b5ff3b;
    backdrop-filter: blur(4px);
    box-shadow: inset rgb(black, 0.2) 0 0 16px 4px;

    transition: 0.15s transform ease;

    &::before {
      pointer-events: none;
      content: '';

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: inherit;
      height: inherit;
      border: 1px solid transparent;
      border-radius: inherit;

      background-image: linear-gradient(
          45deg,
          rgb(v.$base-background-color, 0.8) 10px,
          rgb(v.$base-background-color, 0) 20px
        ),
        linear-gradient(
          225deg,
          rgb(v.$base-background-color, 0.8) 10px,
          rgb(v.$base-background-color, 0) 20px
        ),
        linear-gradient(
          135deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 30%) 20px
        ),
        linear-gradient(
          315deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 30%) 20px
        );
      background-clip: border-box, border-box, border-box, border-box;
      background-origin: border-box, border-box, border-box, border-box;

      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }

    &:hover {
      transform: scale(1.02);
    }

    @include m.tb {
      width: 120px;
      height: 36px;
      font-size: 14px;
    }

    @include m.sp {
      margin-top: 10px;
      border-radius: 0;

      background-color: transparent;
      backdrop-filter: none;
      box-shadow: none;

      &::before{
        display: none;
      }
    }
  }

  &__button-text {
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: white;

    @include m.tb {
      font-size: 14px;
    }
  }

  &__button-icon {
    display: none;
    width: 14px;

    @include m.sp {
      display: block;
    }
  }
}
</style>
