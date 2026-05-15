<script setup lang="ts">
import HaSponsorCard from '../ha/HaSponsorCard.vue'
</script>

<template>
  <HaSectionTitle
    title="ご協力"
    label="SPONSORS & PARTNERS"
  />
  <div class="sponsor-grid">
    <HaSponsorCard
      label="企業出展"
      name="〇〇〇 様"
    />
    <HaSponsorCard
      label="企業出展"
      name="〇〇〇 様"
    />
    <HaSponsorCard
      label="企業出展"
      name="〇〇〇 様"
    />
  </div>
</template>

<style lang="scss" scoped>
.sponsor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
}
</style>
