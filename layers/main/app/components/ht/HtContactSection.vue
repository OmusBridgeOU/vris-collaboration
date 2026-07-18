<i18n lang="yaml">
ja:
  personal:
    title: '個人向けお問い合わせ'
    text: '一般の方からのお問い合わせはこちら'
  corporate:
    title: '法人向けお問い合わせ'
    text: '企業・法人の方からのお問い合わせはこちら'
  press:
    title: '広報向けお問い合わせ'
    text: 'メディア・広報関連のお問い合わせはこちら'
en:
  personal:
    title: 'For General Inquiries'
    text: 'For inquiries from individuals'
  corporate:
    title: 'For Business Inquiries'
    text: 'For inquiries from companies and organizations'
  press:
    title: 'For Press Inquiries'
    text: 'For media and press-related inquiries'
</i18n>

<script setup lang="ts">
import HaContactCard from '../ha/HaContactCard.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'
// import HaDangerIcon from '../ha/icons/HaDangerIcon.vue'

const { t } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

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
      :title="tGlobal('sectionTitle.contact')"
      label="CONTACT"
    />
    <div class="contact-grid">
      <HaContactCard
        :title="t('personal.title')"
        :text="t('personal.text')"
        href="https://docs.google.com/forms/d/e/1FAIpQLSchGlf0h1eszxPupo5aWycU_s3CAOmkP1LJP38Niiwi95KNwQ/viewform"
        color="amber"
        class="contact-grid__child"
      />
      <HaContactCard
        :title="t('corporate.title')"
        :text="t('corporate.text')"
        href="https://docs.google.com/forms/d/e/1FAIpQLSeEevGm1q7byQWd7RhGWTGYClcGthQEbWufSviyiFbcYzsd6A/viewform"
        color="cyan"
        class="contact-grid__child"
      />
      <HaContactCard
        :title="t('press.title')"
        :text="t('press.text')"
        href="https://docs.google.com/forms/d/e/1FAIpQLScmYNjxOyf1GtHVSqsRe7pFDoyfUhiSSDqJh5Q0WD40b-1LOg/viewform"
        color="magenta"
        class="contact-grid__child contact-grid__child--full-width"
      />
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
  grid-auto-rows: 150px;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  max-width: 760px;
  margin: 0 auto;

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
