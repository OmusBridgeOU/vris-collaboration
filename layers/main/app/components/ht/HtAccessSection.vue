<script setup lang="ts">
import HaInfoCard from '../ha/HaInfoCard.vue'

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
      title="アクセス"
      label="access"
    />
    <div class="access-flex">
      <div class="access-flex__left map-container" />
      <HaInfoCard class="access-flex__right" />
    </div>
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

  @include m.sp {
    gap: 22px;
  }

  &__left {
    background-color: #ffffff70;

    @include m.tb {
      min-height: 480px;
    }

    @include m.sp {
      min-height: 150px;
    }
  }

  &__left,
  &__right {
    width: 100%;
  }
}

.mb-30 {
  margin-bottom: 120px;
}
</style>
