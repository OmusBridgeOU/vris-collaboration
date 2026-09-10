<script setup lang="ts">
import HaArrowRightIcon from '../ha/icons/HaArrowRightIcon.vue'
import HmContentsSwiper from '../hm/HmContentsSwiper.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t: tGlobal } = useI18n()

const NOTE_PROGRAMS = 'https://note.com/vris/n/n880e9b3364f9'
const NOTE_GOODS = 'https://note.com/vris/n/n017807ce1d33'

// Official programs — images from note.com/vris/n/n880e9b3364f9 (goods image from n017807ce1d33)
const items = computed(() => [
  {
    id: 1,
    title: tGlobal('contents.1.title'),
    href: NOTE_PROGRAMS,
    imgSrc: '/images/2026Autumn/contents/contents-1-parareal.png',
    text: tGlobal('contents.1.text'),
  },
  {
    id: 2,
    title: tGlobal('contents.2.title'),
    href: NOTE_PROGRAMS,
    imgSrc: '/images/2026Autumn/contents/contents-2-matching.png',
    text: tGlobal('contents.2.text'),
  },
  {
    id: 3,
    title: tGlobal('contents.3.title'),
    href: NOTE_PROGRAMS,
    imgSrc: '/images/2026Autumn/contents/contents-3-message.png',
    text: tGlobal('contents.3.text'),
  },
  {
    id: 4,
    title: tGlobal('contents.4.title'),
    href: NOTE_PROGRAMS,
    imgSrc: '/images/2026Autumn/contents/contents-4-showcase.png',
    text: tGlobal('contents.4.text'),
  },
  {
    id: 5,
    title: tGlobal('contents.5.title'),
    href: NOTE_PROGRAMS,
    imgSrc: '/images/2026Autumn/contents/contents-5-avatar.png',
    text: tGlobal('contents.5.text'),
  },
  {
    id: 6,
    title: tGlobal('contents.6.title'),
    href: NOTE_GOODS,
    imgSrc: '/images/2026Autumn/contents/contents-6-goods.png',
    text: tGlobal('contents.6.text'),
  },
  {
    id: 7,
    title: tGlobal('contents.7.title'),
    href: NOTE_PROGRAMS,
    imgSrc: '',
    text: tGlobal('contents.7.text'),
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
    :title="tGlobal('sectionTitle.contents')"
    label="CONTENTS"
  >
    <template #controls>
      <NuxtLink
        class="glassy-button"
        to="/contents"
      >
        <span class="contents__button-text">
          {{ tGlobal("viewAll") }}
        </span>
        <HaArrowRightIcon class="glassy-button contents__button-icon" />
      </NuxtLink>
    </template>
  </HaSectionTitle>
  <div
    ref="sectionRef"
    class="contents__swiper-wrap"
  >
    <HmContentsSwiper
      class="contents__swiper"
      :items="items"
      :_slides-per-view="1"
      :_breakpoints="{
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.contents {
  // Match NEWS: keep slides inside the content column
  &__swiper-wrap {
    overflow: hidden;
  }

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