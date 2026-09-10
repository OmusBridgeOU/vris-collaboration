<script setup lang="ts">
// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'
import HaYoutubeEmbed from '../ha/HaYoutubeEmbed.vue'
import HaJumpToPageIcon from '../ha/icons/HaJumpToPageIcon.vue'

const { t: tGlobal } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <HaSectionTitle
    :title="tGlobal('sectionTitle.collaborativeEvent')"
    label="COLLABORATIVE EVENT"
  />
  <div ref="sectionRef">
    <HaYoutubeEmbed
      class="collaborative-event__movie"
      video-id="mlGii_DdBbs"
      autoplay
      loop
      muted
    />
    <img
      src="/partners-and-sponsors/nomaps-2026.svg"
      alt=""
      class="nomaps-logo"
    >
    <i18n-t
      keypath="collaborativeEvent.nomaps.text1"
      tag="p"
      scope="global"
      class="collaborative-event__text collaborative-event__text--center"
    >
      <template #br>
        <br>
      </template>
    </i18n-t>
    <a
      class="collaborative-event__link"
      href="https://no-maps.jp/2026"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="collaborative-event-link__flex">
        <span class="collaborative-event-link__text">
          {{ tGlobal('learnMore') }}
        </span>
        <HaJumpToPageIcon class="collaborative-event-link__icon" />
      </div>
    </a>
    <img
      src="/collaborativeEvents1_thumbnail.jpg"
      alt=""
      class="collaborative-event__image collaborative-event__restrict-width"
    >
    <i18n-t
      keypath="collaborativeEvent.nomaps.text2"
      tag="p"
      scope="global"
      class="collaborative-event__text collaborative-event__restrict-width"
    >
      <template #br>
        <br>
      </template>
    </i18n-t>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.collaborative-event {
  &__movie {
    width: 100%;
    margin-bottom: 64px;

    @include m.sp {
      margin-bottom: 32px;
    }
  }

  &__text {
    font-size: 16px;
    text-align: center;
    text-align: left;

    &--center {
      text-align: center;
    }
  }

  &__image {
    display: block;
    margin-bottom: 24px;
  }

  &__restrict-width {
    width: 1080px;
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
  }

  &__link {
    display: block;
    width: fit-content;
    margin: 0 auto 64px;
    color: white;

    @include m.sp {
      margin-bottom: 32px;
    }
  }

  &-link__flex {
    display: flex;
    gap: 8px;
    align-items: center;
    border-bottom: 1px solid v.$vket-green;
  }

  &-link__text {
    font-size: 16px;
    color: v.$vket-green;
  }

  &-link__icon {
    width: 16px;
    height: 16px;
  }
}

.nomaps-logo {
  display: block;

  width: 600px;
  max-width: 80vw;
  margin-right: auto;
  margin-bottom: 64px;
  margin-left: auto;

    @include m.sp {
      margin-bottom: 32px;
    }
}
</style>
