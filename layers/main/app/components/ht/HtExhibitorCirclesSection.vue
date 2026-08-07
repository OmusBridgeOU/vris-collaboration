<script setup lang="ts">
import HaCircleCard from '@/components/ha/HaCircleCard.vue'

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

const circles = [
  'わんぱくおにぎり',
  'Aquange - 羽澄愛',
  'PoteSuto',
  '赤糸の裁縫箱',
  'ゆるくる工房',
  '貧弱な描きおき部屋',
  'しろの里',
  'Interlunium（インテルニウム）',
  'ようよう制作',
  'わにちゃのおみせ',
  'メタバースソーラン',
  'てんまるぱせり、。',
  'VketReal in 広島 実行委員会',
  'まろに屋',
  'やきなす00',
  'AmasukaLabo',
  'にんぎょのくるぶし',
  'VRアートを楽しむ会',
  '北海道大学メタバース研究会',
  'メタバースパブリックラボ',
  '北海道科学大学メタバースプロジェクト',
  '北海道情報大学 湯村研究室',
  'わくわく犬プール',
  'VRホビーロボット集会',
  'VRC 3Dスキャン同好会',
  'v-entry.app',
  'ひかるのノースランドCHANNEL',
  'きっポジの遊び場',
  'まいけるさんすたじお',
  '#リアルサイズアバター写真展',
  'SYNR',
  'VRC Avatar Collection',
]
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
        v-for="circle in circles"
        :key="circle"
        class="exhibitor-circles-section__grid-item"
      >
        <HaCircleCard :name="circle" />
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
