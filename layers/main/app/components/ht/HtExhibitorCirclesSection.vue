<script setup lang="ts">
import HaCircleCard from '@/components/ha/HaCircleCard.vue'
import { exhibitorCircles } from '@/data/exhibitorCircles'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.exhibitor-circles-section__grid-item')
  fadeInUpStagger(Array.from(items))
})

const { t: tGlobal } = useI18n()
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="tGlobal('sectionTitle.exhibitorCircles')"
      label="CIRCLES"
    />
    <div
      ref="listRef"
      class="exhibitor-circles-section__grid"
    >
      <div
        v-for="circle in exhibitorCircles"
        :key="circle.name"
        class="exhibitor-circles-section__grid-item"
      >
        <HaCircleCard
          :name="circle.name"
          :href="circle.href"
          :img-src="circle.imgSrc"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.exhibitor-circles-section{
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 30px;
    margin: 0 auto;

    @include m.tb {
      grid-template-columns: 1fr 1fr;
      max-width: 720px;
    }

    @include m.sp {
      grid-template-columns: 1fr;
      max-width: 360px;
    }
  }
}
</style>
