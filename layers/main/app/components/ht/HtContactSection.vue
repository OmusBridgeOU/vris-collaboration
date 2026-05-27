<script setup lang="ts">
import HaContactCard from '../ha/HaContactCard.vue'
import HaDangerIcon from '../ha/icons/HaDangerIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.contact-grid__child')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="お問い合わせ"
      label="CONTACT"
    />
    <div class="Contact-grid">
      <HaContactCard
        title="個人向けお問い合わせ"
        text="一般の方からのお問い合わせはこちら"
        color="amber"
        class="contact-grid__child"
      >
        <template #icon>
          <HaDangerIcon />
        </template>
      </HaContactCard>
      <HaContactCard
        title="法人向けお問い合わせ"
        text="企業・法人の方からのお問い合わせはこちら"
        color="cyan"
        class="contact-grid__child"
      >
        <template #icon>
          <HaDangerIcon />
        </template>
      </HaContactCard>
      <HaContactCard
        title="広報向けお問い合わせ"
        text="メディア・広報関連のお問い合わせはこちら"
        color="magenta"
        class="contact-grid__child contact-grid__child--full-width"
      >
        <template #icon>
          <HaDangerIcon />
        </template>
      </HaContactCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;

  @include m.sp {
    grid-template-columns: 1fr;
  }

  &__child {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
