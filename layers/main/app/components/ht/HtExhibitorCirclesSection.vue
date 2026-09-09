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

type CircleItem = {
  name: string
  href?: string
  imgSrc?: string
}

const circles: CircleItem[] = [
  { name: 'わんぱくおにぎり' },
  { name: 'Aquange - 羽澄愛', href: 'https://x.com/hazumi_ai', imgSrc: '/images/2026Autumn/circles/Aquange_-_羽澄愛.jpg' },
  { name: 'PoteSuto', href: 'https://x.com/PoteSuto29', imgSrc: '/images/2026Autumn/circles/PoteSuto.png' },
  { name: '赤糸の裁縫箱', href: 'https://x.com/akaito3418', imgSrc: '/images/2026Autumn/circles/赤糸の裁縫箱.png' },
  { name: 'ゆるくる工房', href: 'https://x.com/kurumi_vr?s=11' },
  { name: '貧弱な描きおき部屋', href: 'https://lit.link/hinjyakumatsuge', imgSrc: '/images/2026Autumn/circles/貧弱な描きおき部屋.png' },
  { name: 'しろの里' },
  { name: 'Interlunium（インテルニウム）', href: 'https://interlunium-vrc.sakura.ne.jp/index.html', imgSrc: '/images/2026Autumn/circles/Interlunium_インテルニウム.png' },
  { name: 'ようよう制作', href: 'https://youyou2002.booth.pm/', imgSrc: '/images/2026Autumn/circles/ようよう制作.png' },
  { name: 'わにちゃのおみせ', href: 'https://victoryshop.booth.pm/', imgSrc: '/images/2026Autumn/circles/わにちゃのおみせ.png' },
  { name: 'メタバースソーラン', href: 'https://x.com/GoldsanV', imgSrc: '/images/2026Autumn/circles/メタバースソーラン.png' },
  { name: 'てんまるぱせり、。' },
  { name: 'VketReal in 広島 実行委員会', href: 'https://www.vrih.jp/links/', imgSrc: '/images/2026Autumn/circles/VketReal_in_広島_実行委員会.png' },
  { name: 'まろに屋' },
  { name: 'やきなす00', href: 'https://x.com/yakinasu00', imgSrc: '/images/2026Autumn/circles/やきなす00.jpeg' },
  { name: 'AmasukaLabo', href: 'https://x.com/amasuka_vrc', imgSrc: '/images/2026Autumn/circles/AmasukaLabo.png' },
  { name: 'にんぎょのくるぶし', href: 'https://kikei.booth.pm/', imgSrc: '/images/2026Autumn/circles/にんぎょのくるぶし.png' },
  { name: 'VRアートを楽しむ会' },
  { name: '北海道大学メタバース研究会', href: 'https://x.com/HU_Metaverse', imgSrc: '/images/2026Autumn/circles/北海道大学メタバース研究会.jpg' },
  { name: 'メタバースパブリックラボ' },
  { name: '北海道科学大学メタバースプロジェクト', imgSrc: '/images/2026Autumn/circles/北海道科学大学メタバースプロジェクト.png' },
  { name: '北海道情報大学 湯村研究室', href: 'https://x.com/yumulab', imgSrc: '/images/2026Autumn/circles/北海道情報大学_湯村研究室.png' },
  { name: 'わくわく犬プール', href: 'https://x.com/1nupool', imgSrc: '/images/2026Autumn/circles/わくわく犬プール.png' },
  { name: 'VRホビーロボット集会' },
  { name: 'VRC 3Dスキャン同好会', href: 'https://lit.link/3DSCANCLUB', imgSrc: '/images/2026Autumn/circles/VRC_3Dスキャン同好会.PNG' },
  { name: 'v-entry.app', href: 'https://v-entry.app/', imgSrc: '/images/2026Autumn/circles/v-entry_app.jpeg' },
  { name: 'ひかるのノースランドCHANNEL' },
  { name: 'きっポジの遊び場' },
  { name: 'まいけるさんすたじお' },
  { name: '#リアルサイズアバター写真展' },
  { name: 'SYNR', href: 'https://x.com/synr_vrc', imgSrc: '/images/2026Autumn/circles/SYNR.png' },
  { name: 'VRC Avatar Collection', href: 'https://x.com/VRC_AvaColle', imgSrc: '/images/2026Autumn/circles/VRC_Avatar_Collection.png' },
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
