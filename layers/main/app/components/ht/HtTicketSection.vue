<script setup lang="ts">
import HaTicketCard from '../ha/HaTicketCard.vue'
</script>

<template>
  <HaSectionTitle
    title="チケット"
    label="tickets"
  />
  <p class="subtitle subtitle--left mb-24">
    持続可能なイベント開催のため、<br>
    チケット制でのご参加にご協力をお願いいたします。<br>
    チケットは複数種類を用意予定です。
  </p>
  <div class="ticket-grid">
    <HaTicketCard
      title="チケット①"
      desc="descriptiondescriptiondescription"
    />
    <HaTicketCard
      title="チケット②"
      desc="descriptiondescriptiondescription"
    />
    <HaTicketCard
      title="チケット③"
      desc="descriptiondescriptiondescription"
      class="ticket-grid__item--full-width"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.ticket-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 275px 275px;
  gap: 12px 24px;

  @include m.tb {
    grid-template-rows: 166px 166px;
    gap: 12px 16px;
  }

  &__item {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
