<script setup lang="ts">
import HaInfoIcon from './icons/HaInfoIcon.vue'
</script>

<template>
  <div class="info-card glassy-box-2 none-hover-animation">
    <div class="info-card__head">
      <div class="info-card__icon">
        <HaInfoIcon />
      </div>
      <h4 class="info-card__title">
        会場概要
      </h4>
    </div>
    <div class="info-card__body">
      <div class="info-card__items">
        <div class="info-card__item">
          <p class="info-card__label">
            会場名
          </p>
          <p class="info-card__text">
            アスティ45 4F アスティホール
          </p>
        </div>
        <div class="info-card__item">
          <p class="info-card__label">
            住所
          </p>
          <p class="info-card__text">
            〒060-0004 <br class="tb-only">北海道札幌市中央区北4条西5丁目1
          </p>
        </div>
        <div class="info-card__item">
          <p class="info-card__label">
            アクセス
          </p>
          <p class="info-card__text">
            地下鉄さっぽろ駅より地下鉄直結・徒歩3分
            <br>JR札幌駅南口より徒歩5分
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.info-card {
  display: flex;
  flex-direction: column;
  gap: 6px;

  width: 100%;
  height: 100%;
  min-height: 340px;
  padding: 32px;

  background-color: rgb(18 33 59 / 60%);

  @include m.tb {
    padding: 24px;
  }

  &__head {
    display: flex;
    gap: 24px;
    align-items: center;

    @include m.sp {
      gap: 8px;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    border-radius: 5px;

    background: rgb(30 53 91 / 100%);

    @include m.sp {
      width: 28px;
      height: 28px;
    }

    svg {
      width: 60%;
      height: 60%;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
  }

  &__body {
    flex-grow: 1;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid rgb(86 86 86 / 100%);

    &:last-of-type {
      border: none;
    }
  }

  &__label {
    padding-right: 16px;

    font-size: 16px;
    font-weight: bold;
    color: v.$vket-amber;
    white-space: nowrap;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__text {
    font-size: 16px;
    color: white;
    text-align: right;

    @include m.sp {
      font-size: 14px;
    }
  }
}
</style>
