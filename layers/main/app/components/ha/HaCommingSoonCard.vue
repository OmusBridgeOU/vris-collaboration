<template>
  <div
    class="comming-soon-card glassy-box-2"
  >
    <p class="comming-soon-card__en">
      comming soon
    </p>
    <p class="comming-soon-card__jp">
      続報をお待ちください...
    </p>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.comming-soon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 460px;

  background-color: rgb(18 33 59);

  @include m.tb {
    min-height: 380px;
  }

  @include m.sp {
    min-height: 340px;
  }

  &__en {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
}

&__jp {
    font-size: 14px;
    font-weight: 400;
    text-align: center;
}
}
</style>
