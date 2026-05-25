<script setup lang="ts">
import HaSectionTitle from '../ha/HaSectionTitle.vue'
import { useCrowdData } from '~/composables/useCrowdData'
import HmCrowdLevelCard from '../hm/HmCrowdLevelCard.vue'

const { isLoading, isError, crowdLevel } = useCrowdData()
</script>

<template>
  <HaSectionTitle
    title="混雑状況"
    label="crowd-levels"
  />
  <div class="crowd-levels__grid">
    <HmCrowdLevelCard
      label="メイン会場"
      name="アスティーホール"
      :building="1"
      :is-error="isError"
      :is-loading="isLoading"
      :crowd-level="crowdLevel"
    />
    <HmCrowdLevelCard
      label="サブ会場"
      name="Deep-tech CORE SAPPORO"
      :building="2"
      :is-error="isError"
      :is-loading="isLoading"
      :crowd-level="crowdLevel"
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
