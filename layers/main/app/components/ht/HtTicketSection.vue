<script setup lang="ts">
import HaTicketCard from '../ha/HaTicketCard.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.ticket-grid__item')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="チケット"
      label="tickets"
    />
    <p class="description description--left">
      持続可能なイベント開催のため、<br>
      チケット制でのご参加にご協力をお願いいたします。<br>
      チケットは複数種類を用意予定です。
    </p>
    <div
      ref="listRef"
      class="ticket-grid"
    >
      <div class="ticket-grid__item">
        <HaTicketCard
          title="チケット①"
          desc="descriptiondescriptiondescription"
        />
      </div>
      <div class="ticket-grid__item">
        <HaTicketCard
          title="チケット②"
          desc="descriptiondescriptiondescription"
        />
      </div>
      <div class="ticket-grid__item ticket-grid__item--full-width">
        <HaTicketCard
          title="チケット③"
          desc="descriptiondescriptiondescription"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ticket-grid {
  display: grid;
  grid-auto-rows: 275px;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;

  @include m.tb {
    grid-auto-rows: 166px;
    gap: 12px 16px;
  }

  @include m.sp {
    grid-template-columns: 1fr;
  }

  &__item {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
