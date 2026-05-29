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
      <div class="access-flex__left map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.8284432733867!2d141.3482173!3d43.0660756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b299fc2c5a775%3A0xe3754b24ac5c10e4!2z44Ki44K544OG44KjNDU!5e0!3m2!1sja!2sjp!4v1780036570202!5m2!1sja!2sjp"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
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

  &__left,
  &__right {
    width: 100%;
  }
}

.map-container {
  position: relative;
  background-color: #ffffff70;

  @include m.tb {
    min-height: 480px;
  }

  @include m.sp {
    min-height: 240px;
  }

  iframe {
    position: absolute;
    inset: 0;

    width: auto;
    width: 100%;
    height: auto;
    height: 100%;
    border: none;
  }
}

.mb-30 {
  margin-bottom: 120px;
}
</style>
