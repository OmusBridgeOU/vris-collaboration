<script setup lang="ts">
import HaSectionTitle from '../ha/HaSectionTitle.vue'

// import { useCrowdData } from '~/composables/useCrowdData' // 本番用
import { useCrowdData } from '~/composables/useMockCrowdData'
import HmCrowdLevelCard from '../hm/HmCrowdLevelCard.vue'
// テスト用
const { isLoading, isError, fillCount, statusText, statusColor }
  = useCrowdData()
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
  <div class="crowd-levels__grid">
    <HmCrowdLevelCard
      label="メイン会場"
      name="アスティーホール"
      :fill-count="fillCount"
      :building="1"
      :status-color="statusColor"
      :is-loading="isLoading"
      :status-text="statusText"
    />
    <HmCrowdLevelCard
      label="サブ会場"
      name="Deep-tech CORE SAPPORO"
      :fill-count="fillCount"
      :building="2"
      :status-color="statusColor"
      :is-loading="isLoading"
      :status-text="statusText"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px;
}

.crowd-levels {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;

    @include m.tb {
      grid-template-columns: 1fr;
    }
  }
}
</style>
