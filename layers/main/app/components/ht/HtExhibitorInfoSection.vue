<i18n lang="yaml">
ja:
  subtitle1: '出展概要'
  subtitle2: '募集スケジュール'
  overviewRow1Label: '出展費用'
  overviewRow1Value: '1スペース 3,000円'
  overviewRow2Label: '参加可能人数'
  overviewRow2Value: '1スペースにつき2名'
  overviewRow3Label: '出展内容'
  overviewRow3Value: 'グッズ・書籍頒布・作品展示など'
  description: 'また、今回のサークル募集は二回に分けて行います。{br1}二次申し込みについては一次申し込みの結果、出展枠に余裕がある場合のみ開催します。{br1}確実に出展したいという方は、ぜひ一次申し込み期間中にご応募ください。'
  primaryTitle: '一次申し込み（先着順）'
  primaryRow1Label: '募集期間'
  primaryRow1Value: '6月1日(月) ～ 6月18日(木)'
  primaryRow2Label: '当選発表'
  primaryRow2Value: '6月26日(金)'
  secondaryTitle: '二次申し込み（抽選）'
  secondaryRow1Label: '募集期間'
  secondaryRow1Value: '7月13日(月) ～ 7月30日(木)'
  secondaryRow2Label: '当選発表'
  secondaryRow2Value: '8月7日(金)'
en:
  subtitle1: 'Exhibition Overview'
  subtitle2: 'Application Schedule'
  overviewRow1Label: 'Booth Fee'
  overviewRow1Value: '3,000 JPY per space'
  overviewRow2Label: 'Number of Participants'
  overviewRow2Value: '2 people per space'
  overviewRow3Label: 'Exhibition Content'
  overviewRow3Value: 'Goods, books, artwork display, etc.'
  description: 'This time, circle applications will be accepted in two rounds.{br1}The second round will only be held if there are remaining spaces{br2}after the results of the first round.{br3}If you would like to secure a spot, we recommend applying during the first round.'
  primaryTitle: 'First Round{br}(First-Come, First-Served)'
  primaryRow1Label: 'Application Period'
  primaryRow1Value: 'Mon, June 1 - Thu, June 18'
  primaryRow2Label: 'Results Announcement'
  primaryRow2Value: 'Fri, June 26'
  secondaryTitle: 'Second Round{br}(Lottery)'
  secondaryRow1Label: 'Application Period'
  secondaryRow1Value: 'Mon, July 13 - Thu, July 30'
  secondaryRow2Label: 'Results Announcement'
  secondaryRow2Value: 'Fri, August 7'
</i18n>

<script setup lang="ts">
import HaSectionTitle from '../ha/HaSectionTitle.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="tGlobal('sectionTitle.exhibitorInfo')"
      label="EXHIBITOR INFO"
    />

    <p class="subtitle subtitle--cyan">
      {{ t('subtitle1') }}
    </p>
    <div class="exhibitor-info__table glassy-box-4 glassy-box-4--blue mb-15">
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label exhibitor-info__label--cyan">
          {{ t('overviewRow1Label') }}
        </p>
        <p class="exhibitor-info__text">
          {{ t('overviewRow1Value') }}
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label exhibitor-info__label--cyan">
          {{ t('overviewRow2Label') }}
        </p>
        <p class="exhibitor-info__text">
          {{ t('overviewRow2Value') }}
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label exhibitor-info__label--cyan">
          {{ t('overviewRow3Label') }}
        </p>
        <p class="exhibitor-info__text">
          {{ t('overviewRow3Value') }}
        </p>
      </div>
    </div>

    <p class="subtitle subtitle--amber">
      {{ t('subtitle2') }}
    </p>

    <p class="exhibitor-info__description mb-8">
      <i18n-t
        keypath="description"
        tag="span"
        scope="parent"
      >
        <template #br1>
          <br>
        </template>
      </i18n-t>
    </p>

    <div class="grid-exhibitor-info">
      <div class="grid-exhibitor-info__table glassy-box-4 glassy-box-4--blue">
        <div class="grid-exhibitor-info__table-line grid-exhibitor-info__table-line--cyan" />
        <p class="grid-exhibitor-info__table-title mb-4">
          {{ t('primaryTitle') }}
        </p>
        <div class="grid-exhibitor-info__table-item">
          <p class="grid-exhibitor-info__label">
            {{ t('primaryRow1Label') }}
          </p>
          <p class="grid-exhibitor-info__label">
            {{ t('primaryRow1Value') }}
          </p>
        </div>
        <div class="grid-exhibitor-info__table-item">
          <p class="grid-exhibitor-info__label">
            {{ t('primaryRow2Label') }}
          </p>
          <p class="grid-exhibitor-info__label">
            {{ t('primaryRow2Value') }}
          </p>
        </div>
      </div>

      <div class="grid-exhibitor-info__table glassy-box-4 glassy-box-4--blue">
        <div class="grid-exhibitor-info__table-line grid-exhibitor-info__table-line--magenta" />
        <p class="grid-exhibitor-info__table-title mb-4">
          {{ t('secondaryTitle') }}
        </p>
        <div class="grid-exhibitor-info__table-item">
          <p class="grid-exhibitor-info__label">
            {{ t('secondaryRow1Label') }}
          </p>
          <p class="grid-exhibitor-info__label">
            {{ t('secondaryRow1Value') }}
          </p>
        </div>
        <div class="grid-exhibitor-info__table-item">
          <p class="grid-exhibitor-info__label">
            {{ t('secondaryRow2Label') }}
          </p>
          <p class="grid-exhibitor-info__label">
            {{ t('secondaryRow2Value') }}
          </p>
        </div>
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
  &__table {
    padding: 0 40px;

    @include m.sp {
      padding: 0 24px;
    }
  }

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
    padding: 32px 0;
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
    font-weight: bold;
    color: white;

    &--cyan {
      color: v.$vket-cyan;
    }

    &--amber {
      color: v.$vket-amber;
    }

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
    line-height: 1.8em;
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

.grid-exhibitor-info {
  display: flex;
  gap: 36px;

  @include m.tb {
    flex-direction: column;
    gap: 20px;
  }

  &__table {
    position: relative;
    flex-grow: 1;
    padding: 32px 32px 8px;

    @include m.sp {
      padding: 24px 24px 8px;
    }
  }

  &__table-line {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    width: calc(100% - 32px * 2);
    height: 1px;

    &--cyan {
      background-color: v.$vket-cyan;
    }

    &--magenta {
      background-color: v.$vket-magenta;
    }
  }

  &__table-title {
    margin-bottom: 24px;

    font-size: 24px;
    font-weight: bold;
    line-height: 1.2em;
    color: white;

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
    padding: 24px 0;
    border-bottom: 1px solid white;

    @include m.tb {
      padding: 16px 0;
    }

    &:last-of-type {
      border: none;
    }
  }

  &__label {
    font-size: 18px;
    font-weight: bold;
    color: white;

    &--cyan {
      color: v.$vket-cyan;
    }

    &--amber {
      color: v.$vket-amber;
    }

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
}
</style>
