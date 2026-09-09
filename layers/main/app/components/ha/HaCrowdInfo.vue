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

<template>
  <div
    class="ha-crowd-info glassy-box-4 glassy-box-4--radius-full none-hover-animation"
    :class="`ha-crowd-info--${crowdStatus}`"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <span
      class="ha-crowd-info__dot"
      aria-hidden="true"
    />
    <span class="ha-crowd-info__text">
      <span v-if="showsVenue">{{ t('venue') }}</span><strong>{{ t(crowdStatus) }}</strong>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCrowdData } from '~/composables/useCrowdData'

const { t } = useI18n()

const { isLoading, isError, crowdData } = useCrowdData()
const crowdStatus = computed(() => {
  if (isError.value) return 'error'
  if (crowdData.value?.value1 === -2) return 'closed' // 開催期間前
  if (crowdData.value?.value1 === -1) return 'noInfo' // API未登録
  if (isLoading.value || !crowdData.value) return 'loading'
  return ({ 1: 'available', 2: 'moderate', 3: 'busy' } as const)[crowdData.value.value1]
})
const showsVenue = computed(() =>
  crowdStatus.value === 'available'
  || crowdStatus.value === 'moderate'
  || crowdStatus.value === 'busy',
)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ha-crowd-info {
    --crowd-color: #{v.$vket-gray};
    --crowd-shadow-color: rgb(0 0 0 / 25%);

    position: absolute;
    z-index: 4;
    top: 58px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: flex-start;
    justify-self: center;

    box-sizing: border-box;
    width: auto;
    min-width: 172px;
    height: 40px;
    padding: 6px 12px;

    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
    color: v.$vket-rich-navy;
    white-space: nowrap;

    box-shadow:
        0 4px 12px -2px var(--crowd-shadow-color),
        inset rgb(22 0 120 / 20%) 0 0 12px 0;

    @include m.tb {
        top: 32px;
        font-size: 14px;
    }

    @include m.sp {
        top: 90px;
        left: 16px;
        transform: none;

        min-width: 160px;

        font-size: 13px;
    }

    &--available {
        --crowd-color: #{v.$vket-emerald};
        --crowd-shadow-color: rgb(67 255 189 / 45%);
    }

    &--moderate {
        --crowd-color: #{v.$vket-amber};
        --crowd-shadow-color: rgb(255 165 0 / 45%);
    }

    &--busy {
        --crowd-color: #{v.$vket-vermilion};
        --crowd-shadow-color: rgb(255 69 0 / 45%);
    }

    &--closed,
    &--loading,
    &--error {
        --crowd-color: #{v.$vket-gray};
        --crowd-shadow-color: rgb(0 0 0 / 25%);
    }

    &--available,
    &--moderate,
    &--busy {
        strong {
        color: var(--crowd-color);
        }
    }

    &__dot {
        flex: 0 0 28px;

        width: 28px;
        height: 28px;
        border-radius: 50%;

        background-color: var(--crowd-color);
        box-shadow: 0 3px 8px -1px var(--crowd-shadow-color);

        @include m.tb {
            flex-basis: 26px;
            width: 26px;
            height: 26px;
        }

        @include m.sp {
            flex-basis: 24px;
            width: 24px;
            height: 24px;
        }
    }

    &__text {
        overflow: hidden;
        font-weight: 900;
        text-overflow: ellipsis;
    }
}
</style>
