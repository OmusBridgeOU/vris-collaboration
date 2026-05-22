<script lang="ts" setup>
import HaAstyLevel1 from '../ha/buildings/HaAstyLevel1.vue'
import HaAstyLevel2 from '../ha/buildings/HaAstyLevel2.vue'
import HaAstyLevel3 from '../ha/buildings/HaAstyLevel3.vue'
import HaAstyLoading from '../ha/buildings/HaAstyLoading.vue'
import HaAstyUnable from '../ha/buildings/HaAstyUnable.vue'
import HaDTCLevel1 from '../ha/buildings/HaDTCLevel1.vue'
import HaDTCLevel2 from '../ha/buildings/HaDTCLevel2.vue'
import HaDTCLevel3 from '../ha/buildings/HaDTCLevel3.vue'
import HaDTCLoading from '../ha/buildings/HaDTCLoading.vue'
import HaDTCUnable from '../ha/buildings/HaDTCUnable.vue'
import HaPeopleFillIcon from '../ha/icons/HaPeopleFillIcon.vue'
import HaPeopleIcon from '../ha/icons/HaPeopleIcon.vue'
import HaPeopleUnableIcon from '../ha/icons/HaPeopleUnableIcon.vue'
import HaQuestionIcon from '../ha/icons/HaQuestionIcon.vue'

type CrowdLevel = 0 | 1 | 2 | 3 // 0: 開催期間外, 1~3: 混雑度

const props = defineProps<{
  label: string
  name: string
  isLoading: boolean
  building: 1 | 2
  crowdLevel: CrowdLevel | null
}>()

const CROWD_LEVEL_TEXT: Record<CrowdLevel, string> = {
  0: '期間外',
  1: '余裕あり',
  2: 'やや混雑',
  3: '混雑',
}

const CROWD_LEVEL_COLOR: Record<CrowdLevel, string> = {
  0: 'gray',
  1: 'emgreen',
  2: 'amber',
  3: 'vermilion',
}

const statusText = computed(() =>
  props.isLoading
    ? '取得中'
    : props.crowdLevel !== null
      ? CROWD_LEVEL_TEXT[props.crowdLevel]
      : '',
)

const statusColor = computed(() =>
  props.isLoading
    ? 'purple'
    : props.crowdLevel !== null
      ? CROWD_LEVEL_COLOR[props.crowdLevel]
      : '',
)

const fillCount = computed(() => props.crowdLevel ?? 0)
</script>

<template>
  <div
    class="glassy-box-4 crowd-level-card"
    :class="`crowd-level-card--${statusColor}`"
  >
    <div class="crowd-level-card__head">
      <div class="crowd-level-card__text-box">
        <p class="crowd-level-card__label">
          {{ label }}
        </p>
        <p class="crowd-level-card__name">
          {{ name }}
        </p>
      </div>
      <div class="crowd-level-card__status-box">
        <div class="crowd-level-card__icon-box">
          <template v-if="isLoading">
            <HaPeopleIcon />
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
        </div>
        <p
          class="crowd-level-card__status-text"
          data-testid="crowd-status-text"
        >
          {{ statusText }}
        </p>
      </div>
    </div>
    <div class="crowd-level-card__body">
      <div class="crowd-level-card__image">
        <template v-if="building == 1">
          <HaAstyLoading v-if="isLoading" />
          <template v-else>
            <HaAstyUnable v-show="statusColor == 'gray'" />
            <HaAstyLevel1 v-show="statusColor == 'emgreen'" />
            <HaAstyLevel2 v-show="statusColor == 'amber'" />
            <HaAstyLevel3 v-show="statusColor == 'vermilion'" />
          </template>
        </template>
        <template v-else-if="building == 2">
          <HaDTCLoading v-if="isLoading" />
          <template v-else>
            <HaDTCUnable v-show="statusColor == 'gray'" />
            <HaDTCLevel1 v-show="statusColor == 'emgreen'" />
            <HaDTCLevel2 v-show="statusColor == 'amber'" />
            <HaDTCLevel3 v-show="statusColor == 'vermilion'" />
          </template>
        </template>
      </div>
      <div class="crowd-level-card__footer">
        <p class="crowd-level-card__text">
          混雑状況
        </p>
        <div class="crowd-level-card__carousel glassy-carousel">
          <div
            class="crowd-level-card__carousel-inner glassy-carousel"
            :class="`glassy-carousel crowd-level-card__carousel-inner--${
              isLoading || fillCount == 0 || fillCount == 3
                ? '1-1'
                : fillCount == 1
                  ? '1-4'
                  : fillCount == 2
                    ? '1-2'
                    : ''
            }`"
          />
        </div>
        <p class="crowd-level-card__text">
          {{
            isLoading
              ? '取得中'
              : fillCount == 0
                ? '期間外'
                : fillCount == 1
                  ? '低'
                  : fillCount == 2
                    ? '中'
                    : fillCount == 3
                      ? '高'
                      : ''
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.crowd-level-card {
  display: flex;
  flex-direction: column;
  padding: 24px 18px 24px 32px;

  &--emgreen {
    .crowd-level-card__status-box {
      background-color: v.$vket-emgreen;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-emgreen, 0.75);
    }
  }

  &--amber {
    .crowd-level-card__status-box {
      background-color: v.$vket-amber;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-amber, 0.75);
    }
  }

  &--gray {
    .crowd-level-card__status-box {
      background-color: v.$vket-gray;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-gray, 0.75);
    }
  }

  &--purple {
    .crowd-level-card__status-box {
      background-color: v.$vket-purple;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-purple, 0.75);
    }
  }

  &--vermilion {
    .crowd-level-card__status-box {
      background-color: v.$vket-vermilion;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-vermilion, 0.75);
    }
  }

  &__head {
    display: flex;
    gap: 8px;
    justify-content: space-between;
  }

  &__text-box {
    width: fit-content;
  }

  &__label {
    font-size: 14px;
    font-weight: 700;
  }

  &__name {
    font-size: 32px;
    font-weight: 900;
  }

  &__icon-box {
    display: flex;
    flex-shrink: 0;
  }

  &__status-box {
    display: flex;
    gap: 12px;
    align-items: center;

    width: fit-content;
    height: fit-content;
    padding: 10px 18px;
    border-radius: 20px;
  }

  &__status-text {
    font-size: 20px;
    font-weight: 600;
    line-height: 100%;
    text-wrap: nowrap;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    align-items: center;
    justify-content: flex-end;
  }

  &__image {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 50%;

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
  }
}
</style>
