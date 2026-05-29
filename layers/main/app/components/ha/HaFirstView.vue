<template>
  <div class="fv">
    <h2 class="fv__title">
      <HaTypewriterText
        class="nowrap"
        text="バーチャルとリアルの"
        :speed="80"
        :delay="500"
      />
      <HaTypewriterText
        class="nowrap"
        text="境界を、"
        :speed="80"
        :delay="1380"
      />
      <HaTypewriterText
        class="fv__title--bold"
        text="開拓せよ。"
        :speed="80"
        :delay="1900"
      />
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.fv {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100svw;
  height: 1100px;

  @include m.sp {
    height: 100svw;
  }

  &__title {
    font-size: 64px;
    font-weight: 700;
    line-height: 1.2em;
    color: v.$vket-vermilion;
    text-align: center;

    @include m.tb {
      font-size: 36px;
    }

    @include m.sp {
      max-width: 76%;
      font-size: 24px;
    }

    span {
      display: inline-block;

      @include m.tb {
        display: block;
      }
    }

    &--bold {
      display: block;

      font-size: 128px;
      font-weight: inherit;
      line-height: 100%;
      color: white;
      text-shadow: 0 5px 20px v.$vket-amber;

      @include m.tb {
        font-size: 96px;
      }

      @include m.sp {
        font-size: 48px;
      }
    }
  }
}
</style>
