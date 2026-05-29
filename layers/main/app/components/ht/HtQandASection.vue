<script setup lang="ts">
import HaAccordionItem from '../ha/HaAccordionItem.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const items = [
  {
    id: 1,
    title: 'Vket Real in 札幌とはどのようなイベントですか？',
    contents: [
      'Vket Real in 札幌は、世界最大級のメタバースイベント「バーチャルマーケットから派生した、北海道の有志XRクリエイターが主催するリアルイベントです。',
      'VRSNSユーザーがバーチャルの姿のままリアルの場で集い、交流し、新たな文化を創造する場を目指しています。',
    ],
  },
  {
    id: 2,
    title: 'Vket Real in 札幌とはどのようなイベントですか？',
    contents: ['内容内容内容内容'],
  },
  {
    id: 3,
    title: 'Vket Real in 札幌とはどのようなイベントですか？',
    contents: ['内容内容内容内容'],
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="よくある質問"
      label="Q&A"
    />
    <HaAccordionItem :items="items">
      <template #content="{ item }">
        <p
          v-for="(content, index) in item.contents"
          :key="`${item.id}-${index}`"
        >
          {{ content }}
        </p>
      </template>
    </HaAccordionItem>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px;
}

.ticket-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 275px 275px;
  gap: 12px 24px;

  &__item {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
