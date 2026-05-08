<template>
  <HaSectionTitle
    title="開催スケジュール"
    label="SCHEDULE"
  />

  <div class="schedule mb-24">
    <div class="schedule__left">
      <div class="schedule__icon-box">
        <img
          class="schedule__icon"
          src="/icons/flowbite_sun-outline.svg"
          alt=""
        >
      </div>
      <span class="schedule__line" />
      <div class="schedule__icon-box">
        <img
          class="schedule__icon"
          src="/icons/tabler_sunset-2.svg"
          alt=""
        >
      </div>
    </div>
    <div class="schedule__right">
      <div class="schedule__item">
        <p class="schedule__time">
          10:00
        </p>
        <p class="schedule__content">
          会場・受付開始
        </p>
      </div>
      <div class="schedule__item">
        <p class="schedule__time">
          10:30
        </p>
        <p class="schedule__content">
          オープニングセレモニー
        </p>
      </div>
      <div class="schedule__item">
        <p class="schedule__time">
          11:00
        </p>
        <p class="schedule__content">
          展示・即売会開始
        </p>
      </div>
      <div class="schedule__item schedule__item--1h">
        <p class="schedule__time">
          12:00
        </p>
        <p class="schedule__content">
          XR体験ブースオープン
        </p>
      </div>
      <div class="schedule__item schedule__item--1h">
        <p class="schedule__time">
          13:00
        </p>
        <p class="schedule__content">
          スペシャルトークセッション
        </p>
      </div>
      <div class="schedule__item schedule__item--15h">
        <p class="schedule__time">
          14:30
        </p>
        <p class="schedule__content">
          スペシャルトークセッション
        </p>
      </div>
      <div class="schedule__item schedule__item--2h">
        <p class="schedule__time">
          16:00
        </p>
        <p class="schedule__content">
          スペシャルライブ
        </p>
      </div>
      <div class="schedule__item schedule__item--1h">
        <p class="schedule__time">
          18:00
        </p>
        <p class="schedule__content">
          閉場
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.schedule {
  display: flex;

  &__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
  }

  &__icon-box {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 80px;
    padding: 16px;
  }

  &__icon {
    width: 100%;
    height: 100%;
  }

  &__line {
    flex-grow: 1;
    width: 1px;
    height: 100px;
    background-color: white;
  }

  &__right {
    flex-grow: 1;
    padding: 100px 0;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 100px;
    border-top: 2px solid white;

    &:last-of-type {
      border-bottom: 2px solid white;
    }

    &--1h {
      height: 150px;
    }

    &--15h {
      height: 200px;
    }
  }

  &__time {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }

  &__content {
    font-size: 20px;
    font-weight: 700;
    color: white;
  }
}
</style>
