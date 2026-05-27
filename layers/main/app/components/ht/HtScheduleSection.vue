<script setup lang="ts">
import HaSunIcon from '../ha/icons/HaSunIcon.vue'
import HaSunsetIcon from '../ha/icons/HaSunsetIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="開催スケジュール"
      label="schedule"
    />

    <div class="schedule">
      <div class="schedule__left">
        <div class="schedule__icon-box">
          <HaSunIcon />
        </div>
        <span class="schedule__line" />
        <div class="schedule__icon-box">
          <HaSunsetIcon />
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
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.schedule {
  display: flex;

  &__left {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;

    width: 80px;

    @include m.tb {
      width: 104px;
    }

    @include m.sp {
      width: 84px;
    }
  }

  &__icon-box {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 80px;

    @include m.sp {
      width: 74px;
      height: 74px;
    }
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

    @include m.sp {
      padding: 38px 0;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 100px;
    border-top: 2px solid white;

    @include m.sp {
      height: 44px;
      border-width: 1px;
    }

    &:last-of-type {
      border-bottom: 2px solid white;

      @include m.sp {
        border-width: 1px;
      }
    }

    &--1h {
      height: 150px;

      @include m.sp {
        height: 62px;
      }
    }

    &--15h {
      height: 200px;

      @include m.sp {
        height: 74px;
      }
    }
  }

  &__time {
    font-size: 16px;
    font-weight: 700;
    color: white;

    @include m.sp {
      font-size: 10px;
    }
  }

  &__content {
    font-size: 20px;
    font-weight: 700;
    color: white;

    @include m.sp {
      font-size: 12px;
    }
  }
}
</style>
