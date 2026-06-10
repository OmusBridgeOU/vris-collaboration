<script setup lang="ts">
import HaSectionTitle from '../ha/HaSectionTitle.vue'

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
      title="出展者案内"
      label="EXHIBITOR INFO"
    />

    <p class="subtitle">
      出展概要
    </p>
    <div class="exhibitor-info__table mb-15">
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          出展費用
        </p>
        <p class="exhibitor-info__label">
          1スペース 3,000円
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          参加可能人数
        </p>
        <p class="exhibitor-info__label">
          1スペースにつき2名
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          出展内容
        </p>
        <p class="exhibitor-info__label">
          グッズ・書籍頒布・作品展示など
        </p>
      </div>
    </div>

    <p class="subtitle">
      募集スケジュール
    </p>

    <p class="exhibitor-info__description mb-24">
      また、今回のサークル募集は二回に分けて行います。<br>
      二次申し込みについては一次申し込みの結果、<br class="tb-only">出展枠に余裕がある場合のみ開催します。<br>
      確実に出展したいという方は、ぜひ一次申し込み期間中にご応募ください。
    </p>

    <p class="exhibitor-info__table-title">
      一次申し込み<br class="tb-only">（先着順）
    </p>

    <div class="exhibitor-info__table mb-24">
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          募集期間
        </p>
        <p class="exhibitor-info__label">
          6月1日(月) ～ 6月18日(木)
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          当落発表
        </p>
        <p class="exhibitor-info__label">
          6月26日(金)
        </p>
      </div>
    </div>

    <p class="exhibitor-info__table-title">
      二次申し込み<br class="tb-only">（抽選）
    </p>

    <div class="exhibitor-info__table">
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          募集期間
        </p>
        <p class="exhibitor-info__label">
          7月13日(月) ～ 7月30日(木)
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          当落発表
        </p>
        <p class="exhibitor-info__label">
          8月7日(金)
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）

  @include m.tb {
    margin-bottom: 64px;
  }
}

.mb-15 {
  margin-bottom: 60px;

  @include m.sp {
    margin-bottom: 48px;
  }
}

.exhibitor-info {
  &__table-title {
    margin-bottom: 24px;

    font-size: 24px;
    font-weight: bold;
    line-height: 1.2em;
    color: white;
    text-align: center;

    @include m.tb {
      font-size: 22px;
    }

    @include m.sp {
      font-size: 16px;
    }
  }

  &__table-item {
    display: flex;
    justify-content: space-between;
    padding: 38px 0;
    border-bottom: 1px solid white;

    @include m.tb {
      padding: 24px 0;
    }

    &:last-of-type {
      border: none;
    }
  }

  &__label {
    font-size: 20px;
    color: white;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__text {
    font-size: 20px;
    color: white;
    text-align: right;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__description {
    width: fit-content;
    margin-right: auto;
    margin-left: auto;

    font-size: 20px;
    line-height: 1.2em;
    color: white;

    @include m.tb {
      font-size: 16px;
      text-align: center;
    }

    @include m.sp {
      font-size: 14px;
    }
  }
}
</style>
