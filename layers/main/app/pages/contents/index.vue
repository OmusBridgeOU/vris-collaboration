<script lang="ts" setup>
import HaContentCard from '~/components/ha/HaContentCard.vue'
import HaPageTitle from '~/components/ha/HaPageTitle.vue'

definePageMeta({
  layout: 'list',
})

const { t: tGlobal } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: tGlobal('contents.1.title'),
    imgSrc: '',
    href: 'https://archived.vris.jp/',
    text: tGlobal('contents.1.text'),
  },
])
</script>

<template>
  <div class="contents-list">
    <div class="contents-list__card">
      <div class="contents-list__inner">
        <HaPageTitle
          label="contents"
          title="企画・コンテンツ"
          class="contents-list__item--full-width"
        />
        <HaContentCard
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
        <SwiperSlide
          key="comming-soon"
        >
          <HaCommingSoonCard />
        </SwiperSlide>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.contents-list {
  padding: v.$vket-header-height-pc 32px;

  @include m.tb {
    padding: v.$vket-header-height-tb 12px;
  }

  @include m.sp {
    padding: v.$vket-header-height-sp 12px;
  }

  &__card {
    position: relative;

    padding: 64px 24px 90px;
    border-radius: 50px;

    background-color: rgb(217 217 217 / 20%);
    box-shadow: inset rgb(black, 0.2) 0 0 16px 4px;

    @include m.sp {
      padding: 50px 12px;
    }

    &::before {
      pointer-events: none;
      content: '';

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
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
          rgb(255 255 255 / 15%) 20px
        ),
        linear-gradient(
          315deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 15%) 20px
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
  }

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    max-width: 1080px;
    margin: 0 auto;

    @include m.tb {
      grid-template-columns: 1fr 1fr;
      max-width: 520px;
    }

    @include m.sp {
      grid-template-columns: 1fr;
      max-width: none;
    }
  }

  &__item--full-width {
    grid-column: 1 / -1;
  }
}
</style>
