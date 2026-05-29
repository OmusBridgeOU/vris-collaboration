<script setup lang="ts">
import HaConductCard from '../ha/HaConductCard.vue'
import HaCamera from '../ha/icons/HaCameraIcon.vue'
import HaDangerIcon from '../ha/icons/HaDangerIcon.vue'
import HaHeartIcon from '../ha/icons/HaHeartIcon.vue'
import HaShieldIcon from '../ha/icons/HaShieldIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.conduct-grid__child')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="行動規範"
      label="CODE OF CONDUCT"
    />
    <p class="description description--left">
      すべての参加者が安全で楽しい時間を過ごせるよう、<br>
      以下の行動規範を守ってください。
    </p>
    <div
      ref="listRef"
      class="conduct-grid mb-15"
    >
      <div class="conduct-grid__child">
        <HaConductCard
          title="互いを尊重しましょう"
          color="magenta"
        >
          <template #icon>
            <HaHeartIcon />
          </template>
          <template #text>
            すべての参加者の多様性を尊重し、<br>ハラスメントや差別的な行為は禁止です。
          </template>
        </HaConductCard>
      </div>
      <div class="conduct-grid__child">
        <HaConductCard
          title="撮影マナーを守りましょう"
          text="descriptiondescriptiondescription"
          color="cyan"
        >
          <template #icon>
            <HaCamera />
          </template>
          <template #text>
            他の参加者を撮影する際は必ず許可を取り、<br>撮影禁止エリアでは撮影をお控えください。
          </template>
        </HaConductCard>
      </div>
      <div class="conduct-grid__child">
        <HaConductCard
          title="安全に配慮しましょう"
          text="descriptiondescriptiondescription"
          color="amber"
        >
          <template #icon>
            <HaDangerIcon />
          </template>
          <template #text>
            会場内では走らない、通路をふさがないなど、<br>安全な行動を心掛けてください。
          </template>
        </HaConductCard>
      </div>
      <div class="conduct-grid__child">
        <HaConductCard
          title="スタッフの指示に従いましょう"
          text="descriptiondescriptiondescription"
          color="vermilion"
        >
          <template #icon>
            <HaShieldIcon />
          </template>
          <template #text>
            スタッフの指示に従い、<br>問題があれば速やかにスタッフにお知らせください。
          </template>
        </HaConductCard>
      </div>
    </div>
    <button class="glassy-button-3 conduct__button">
      詳細を確認
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.mb-15 {
  margin-bottom: 60px;

  @include m.sp {
    margin-bottom: 48px;
  }
}

.conduct-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @include m.tb {
    grid-template-columns: 1fr;
    width: 60%;
  }

  @include m.sp {
    width: 100%;
  }
}

.conduct {
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 185px;
    height: 57px;
    margin: 0 auto;

    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;

    background-color: #e5b5ff3b;

    @include m.tb {
      width: 130px;
      height: 40px;
    }
  }
}
</style>
