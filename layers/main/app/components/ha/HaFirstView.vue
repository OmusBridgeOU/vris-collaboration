<template>
  <div class="fv">
    <h2 class="fv__title">
      リアルとバーチャルの境界を、
      <br>
      <span class="fv__title--bold">開拓せよ。</span>
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.fv{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100svw;
    height: 1100px; // FIXME: 仮置き

    &__title {
        font-size: 64px;
        font-weight: 700;
        line-height: 1.6em;
        color: v.$vket-vermilion;
        text-align: center;

        @include m.tb {
          font-size: 36px;
        }

        &--bold {
            font-size: 128px;
            font-weight: inherit;
            color: white;
            text-shadow: 0 5px 20px v.$vket-amber;

            @include m.tb {
              font-size: 96px;
            }
        }
    }
}
</style>
