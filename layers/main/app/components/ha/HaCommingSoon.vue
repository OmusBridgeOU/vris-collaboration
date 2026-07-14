<template>
  <div class="comming-soon">
    <span class="comming-soon__en">comming soon</span>
    <span class="comming-soon__jp">続報をお待ちください...</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.comming-soon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 160px;
    margin: 0 auto;

    @include m.sp {
        height: 120px;
    }

    &__en {
        font-size: 48px;
        font-weight: 700;
        text-align: center;

        @include m.sp {
            font-size: 32px;
        }
    }

    &__jp {
        font-size: 14px;
        font-weight: 400;
        text-align: center;
    }
}
</style>
