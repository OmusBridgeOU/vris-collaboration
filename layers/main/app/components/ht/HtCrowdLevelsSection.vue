<script setup lang="ts">
import HaSectionTitle from '../ha/HaSectionTitle.vue'
import HmCrowdLevelCard from '../hm/HmCrowdLevelCard.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()
onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="混雑状況"
      label="crowd-levels"
    />
    <div class="crowd-levels__grid">
      <HmCrowdLevelCard
        name="アスティーホール"
      />
    </div>
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
