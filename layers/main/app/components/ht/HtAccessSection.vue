<script setup lang="ts">
import HaInfoCard from '../ha/HaInfoCard.vue'
</script>

<template>
  <HaSectionTitle
    title="アクセス"
    label="access"
  />
  <div class="access-flex mb-30">
    <div class="access-flex__left map-container" />
    <HaInfoCard class="access-flex__right" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.access-flex {
    display: flex;
    gap: 40px;

    @include m.tb {
      flex-direction: column;
    }

    &__left {
        background-color: #ffffff70;

        @include m.tb {
          min-height: 480px;
        }
    }

    &__left, &__right {
        width: 100%;
    }
}

.mb-30 {
    margin-bottom: 120px;
}
</style>
