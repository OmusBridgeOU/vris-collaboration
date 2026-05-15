<script setup lang="ts">
import HaContactCard from '../ha/HaContactCard.vue'
import HaDangerIcon from '../ha/icons/HaDangerIcon.vue'
</script>

<template>
  <HaSectionTitle
    title="出展情報"
    label="exhibition"
  />
  <p class="subtitle subtitle--left mb-24">
    持続可能なイベント開催のため、<br>
    チケット制でのご参加にご協力をお願いいたします。<br>
    チケットは複数種類を用意予定です。
  </p>
  <div class="Contact-grid">
    <HaContactCard
      title="個人向けお問い合わせ"
      text="一般の方からのお問い合わせはこちら"
      color="amber"
    >
      <template #icon>
        <HaDangerIcon />
      </template>
    </HaContactCard>
    <HaContactCard
      title="法人向けお問い合わせ"
      text="企業・法人の方からのお問い合わせはこちら"
      color="cyan"
    >
      <template #icon>
        <HaDangerIcon />
      </template>
    </HaContactCard>
    <HaContactCard
      title="広報向けお問い合わせ"
      text="メディア・広報関連のお問い合わせはこちら"
      color="magenta"
      class="Contact-grid__item--full-width"
    >
      <template #icon>
        <HaDangerIcon />
      </template>
    </HaContactCard>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.Contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 190px 190px;
  gap: 12px 24px;

  &__item {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
