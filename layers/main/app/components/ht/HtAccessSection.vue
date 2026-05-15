<script setup lang="ts">
import HaInfoCard from '../ha/HaInfoCard.vue'
</script>

<template>
  <HaSectionTitle
    title="アクセス"
    label="access"
  />
  <div class="flex-2 mb-30">
    <div class="flex-2__left map-container" />
    <HaInfoCard class="flex-2__right" />
  </div>
</template>

<style lang="scss" scoped>
.flex-2 {
    display: flex;
    gap: 40px;

    &__left {
        background-color: #ffffff70;
    }

    &__left, &__right {
        width: 100%;
    }
}

.mb-30 {
    margin-bottom: 120px;
}
</style>
