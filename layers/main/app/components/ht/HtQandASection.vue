<script setup lang="ts">
import HaAccordionItem from '../ha/HaAccordionItem.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const items = [
  {
    id: 1,
    title: 'Vket Real in 札幌とはどのようなイベントですか？',
    contents: [
      'VRSNSで活躍するクリエイターが集まるリアルイベントです。',
      'HIKKYが主催するVketRealから派生した有志主催イベントです。',
    ],
  },
  {
    id: 2,
    title: 'チケットはどこで買えますか？',
    contents: ['オンラインにて事前販売予定しております。'],
  },
  {
    id: 3,
    title: '入場制限等はありますか？',
    contents: ['チケットの枚数の制限等はありません。'],
  },
  {
    id: 4,
    title: '当日券はありますか？',
    contents: ['用意する予定です。'],
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
          class="content__text"
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

.content__text {
  margin-bottom: 14px;
}
</style>
