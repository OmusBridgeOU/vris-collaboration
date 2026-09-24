<i18n lang="yaml">
ja:
  venue: 会場内：
  closed: 開催期間外
  noInfo: 情報無し
  available: 余裕あり
  moderate: やや混雑
  busy: 混雑
  loading: 混雑状況取得中…
  error: 混雑状況を取得できません
en:
  venue: 'Venue: '
  closed: Outside event hours
  noInfo: No Information
  available: Available
  moderate: Moderately crowded
  busy: Crowded
  loading: Loading crowd status…
  error: Crowd status unavailable
</i18n>

<script lang="ts" setup>
import { computed } from 'vue'
import HaAstyError from '../ha/buildings/HaAstyError.vue'
import HaAstyLevel1 from '../ha/buildings/HaAstyLevel1.vue'
import HaAstyLevel2 from '../ha/buildings/HaAstyLevel2.vue'
import HaAstyLevel3 from '../ha/buildings/HaAstyLevel3.vue'
import HaAstyLoading from '../ha/buildings/HaAstyLoading.vue'
import HaAstyUnable from '../ha/buildings/HaAstyUnable.vue'
import HaShimmer from '../ha/HaShimmer.vue'
import { useCrowdData } from '~/composables/useCrowdData'

const { t } = useI18n()

defineProps<{
  name: string
}>()

// NOTE: 状態判定ロジックはHaCrowdInfo.vueと完全に同一のものを使用している。
const { isLoading, isError, crowdData, isBeforeEventStart } = useCrowdData()
const crowdStatus = computed(() => {
  if (isError.value) return 'error'
  if (isBeforeEventStart.value) return 'closed'
  if (crowdData.value?.value1 === -1) return 'noInfo' // API未登録
  if (isLoading.value || !crowdData.value) return 'loading'
  return ({ 1: 'available', 2: 'moderate', 3: 'busy' } as const)[crowdData.value.value1] ?? 'error'
})

const STATUS_COLOR: Record<ReturnType<typeof crowdStatus.value extends never ? never : () => string>, string> = {
  error: 'gray',
  closed: 'gray',
  noInfo: 'gray',
  loading: 'gray',
  available: 'emgreen',
  moderate: 'amber',
  busy: 'vermilion',
}
const statusColor = computed(() => STATUS_COLOR[crowdStatus.value])
</script>

<template>
  <div
    class="glassy-box-4 glassy-box-4--blue crowd-level-card"
  >
    <div class="crowd-level-card__head">
      <div class="crowd-level-card__text-box">
        <p
          class="crowd-level-card__name"
        >
          {{ name }}
        </p>
      </div>
      <HaShimmer
        :loading="isLoading"
        as="div"
        :class="`crowd-level-card__status-box crowd-level-card__status-box--${statusColor}`"
      >
        <!-- <div class="crowd-level-card__icon-box">
          <template v-if="isError">
            <HaPeopleFillIcon />
            <HaQuestionIcon />
          </template>
          <template v-else-if="fillCount == 0">
            <HaPeopleUnableIcon />
          </template>
          <template v-else>
            <HaPeopleFillIcon
              v-for="i in fillCount"
              :key="`fill-${i}`"
            />
            <HaPeopleIcon
              v-for="i in 3 - fillCount"
              :key="`empty-${i}`"
            />
          </template>
        </div> -->
        <p
          class="crowd-level-card__status-text"
          data-testid="crowd-status-text"
        >
          {{ t(crowdStatus) }}
        </p>
      </HaShimmer>
    </div>
    <div class="crowd-level-card__body">
      <div class="crowd-level-card__image">
        <HaAstyLoading v-if="isLoading" />
        <HaAstyError v-else-if="isError" />
        <template v-else>
          <HaAstyUnable v-show="statusColor == 'gray'" />
          <HaAstyLevel1 v-show="statusColor == 'emgreen'" />
          <HaAstyLevel2 v-show="statusColor == 'amber'" />
          <HaAstyLevel3 v-show="statusColor == 'vermilion'" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.crowd-level-card {
  display: flex;
  flex-direction: column;
  padding: 24px 18px 24px 32px;

  @include m.tb {
    padding: 16px;
  }

  &__head {
    display: flex;
    gap: 8px;
    justify-content: space-between;
    width: 100%;
  }

  &__text-box {
    width: fit-content;
  }

  &__name {
    font-size: 32px;
    font-weight: 900;
    line-height: 1em;

    @include m.tb {
      font-size: 18px;
    }
  }

  &__icon-box {
    display: flex;
    flex-shrink: 0;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &__status-box {
    display: flex;
    flex-wrap: nowrap;
    gap: 12px;
    align-items: center;

    height: fit-content;
    padding: 10px 18px;
    border-radius: 20px;

    @include m.tb {
      padding: 6px 12px;
    }
  }

  &__status-text {
    font-size: 20px;
    font-weight: 600;
    line-height: 100%;
    text-wrap: nowrap;

    @include m.tb {
      font-size: 14px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    align-items: center;
    justify-content: flex-end;

    height: 160px;

    @include m.tb {
      height: 100px;
    }
  }

  &__image {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 200px;

    @include m.tb {
      width: 140px;
    }

    svg {
      width: 100%;
    }
  }

  &__footer {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
  }

  &__carousel {
    display: flex;
    flex-grow: 1;
    height: 14px;
  }

  &__carousel-inner {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    transition: width 0.6s ease;

    &--1-1 {
      width: 100%;
    }

    &--1-2 {
      width: 50%;
    }

    &--1-4 {
      width: 25%;
    }
  }

  &__text {
    width: 4em;
    font-size: 16px;
    line-height: 1em;

    @include m.tb {
      font-size: 14px;
    }
  }
}

.crowd-level-card__status-box {
  &--emgreen {
    background-color: v.$vket-emgreen;
  }

  &--amber {
    background-color: v.$vket-amber;
  }

  &--gray {
    background-color: v.$vket-gray;
  }

  &--vermilion {
    background-color: v.$vket-vermilion;
  }
}
</style>
