<script setup lang="ts">
import HaCommingSoon from '../ha/HaCommingSoon.vue'
import HaSectionTitle from '../ha/HaSectionTitle.vue'

// import HaSponsorCard from '../ha/HaSponsorCard.vue'

// // GSAP
// import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

// const sectionRef = ref<HTMLElement | null>(null)
// const listRef = ref<HTMLElement | null>(null)
// const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

// onMounted(() => {
//   fadeInUp(sectionRef)
//   if (!listRef.value) return
//   const items = listRef.value.querySelectorAll('.sponsor-grid__child')
//   fadeInUpStagger(Array.from(items))
// })
</script>

<template>
  <HaSectionTitle
    title="ご協力"
    label="SPONSORS & PARTNERS"
  />
  <HaCommingSoon />
  <!-- <div ref="sectionRef">
    <HaSectionTitle
      title="ご協力"
      label="SPONSORS & PARTNERS"
    />
    <div
      ref="listRef"
      class="sponsor-grid"
    >
      <div class="sponsor-grid__child">
        <HaSponsorCard
          label="企業出展"
          name="〇〇〇 様"
        />
      </div>
      <div class="sponsor-grid__child">
        <HaSponsorCard
          label="企業出展"
          name="〇〇〇 様"
        />
      </div>
      <div class="sponsor-grid__child">
        <HaSponsorCard
          label="企業出展"
          name="〇〇〇 様"
        />
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.sponsor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;

  @include m.tb {
    grid-template-columns: 1fr 1fr;
  }

  @include m.sp {
    gap: 20px;
  }
}
</style>
