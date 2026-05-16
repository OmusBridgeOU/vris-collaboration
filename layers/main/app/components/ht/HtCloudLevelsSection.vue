<script setup lang="ts">
import HaSectionTitle from '../ha/HaSectionTitle.vue'
import HaPeopleFillIcon from '../ha/icons/HaPeopleFillIcon.vue'
import HaPeopleIcon from '../ha/icons/HaPeopleIcon.vue'

// 本番用
import { useCrowdData } from '~/composables/useCrowdData'
// テスト用
// import { useCrowdData } from '~/composables/useMockCrowdData'
const { isLoading, isError, fillCount, statusText, statusColor } = useCrowdData()
</script>

<template>
  <HaSectionTitle
    title="混雑状況"
    label="crowd-levels"
  />
  <p v-if="isLoading">
    読み込み中...
  </p>
  <p v-else-if="isError">
    混雑状況を取得できませんでした
  </p>
  <div
    v-else
    class="crowd-levels"
  >
    <div class="crowd-levels__head">
      <p class="crowd-levels__label">
        メイン会場
      </p>
      <p class="crowd-levels__name">
        アスティーホール
      </p>
    </div>
    <div class="crowd-levels__body">
      <img
        src="/crowd-levels/asty.png"
        alt=""
        class="crowd-levels__img"
      >
      <div
        class="crowd-levels__status-box"
        :class="`crowd-levels__status-box--${statusColor}`"
      >
        <div class="crowd-levels__icon-box">
          <HaPeopleFillIcon
            v-for="i in fillCount"
            :key="`fill-${i}`"
          />
          <HaPeopleIcon
            v-for="i in 3 - fillCount"
            :key="`empty-${i}`"
          />
        </div>
        <p class="crowd-levels__status-text">
          {{ statusText }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px;
}

.crowd-levels {
  &__head {
    text-align: center;
  }

  &__label {
    font-size: 14px;
    color: white;
  }

  &__name {
    font-size: 32px;
    color: white;
  }

  &__body {
    position: relative;
  }

  &__img {
    width: 100%;
    height: 100%;
  }

  &__status-box {
    position: absolute;
    top: 30%;
    left: 30%;

    display: flex;
    gap: 12px;
    align-items: center;

    padding: 10px 32px;
    border-radius: 22px;

    &::before {
      content: '';

      position: absolute;
      bottom: -16px;
      left: 50%;

      display: block;

      width: 0;
      height: 0;
      border-top: 20px solid v.$vket-amber;
      border-right: 14px solid transparent;
      border-left: 14px solid transparent;
    }

    &--cyan {
      background-color: v.$vket-cyan;

      &::before {
        border-top: 20px solid v.$vket-cyan;
      }
    }

    &--amber {
      background-color: v.$vket-amber;

      &::before {
        border-top: 20px solid v.$vket-amber;
      }
    }

    &--vermilion {
      background-color: v.$vket-vermilion;

      &::before {
        border-top: 20px solid v.$vket-vermilion;
      }
    }
  }

  &__icon-box {
    display: flex;
  }

  &__status-text {
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
