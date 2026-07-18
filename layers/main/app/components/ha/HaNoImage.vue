<template>
  <div
    class="no-image"
  >
    <p class="no-image__text">
      no image
    </p>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background-color: rgb(18 33 59 / 60%);

  &__text {
    font-size: 20px;
    font-weight: bold;
    color: white;
    white-space: nowrap;

    @include m.tb {
      font-size: 16px;
    }

    @include m.sp {
      font-size: 14px;
    }
  }
}
</style>
