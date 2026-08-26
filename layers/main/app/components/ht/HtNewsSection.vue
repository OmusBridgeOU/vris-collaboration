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
        class="glassy-button"
        to="/news"
      >
        <span class="news__button-text">
          {{ tGlobal("viewAll") }}
        </span>
        <HaArrowRightIcon class="glassy-button news__button-icon" />
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
