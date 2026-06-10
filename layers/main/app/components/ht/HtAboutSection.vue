<script setup lang="ts">
import HaCard from '../ha/HaAboutCard.vue'
import HaCountUpNumber from '../ha/HaCountUpNumber.vue'
import HaCommunityIcon from '../ha/icons/HaCommunityIcon.vue'
import HaStarShineIcon from '../ha/icons/HaStarShineIcon.vue'
import HaWorldIcon from '../ha/icons/HaWorldIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.gsap-list__child')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="VketReal in 札幌とは"
      label="ABOUT"
    />
    <div class="description description--space">
      「VketReal in 札幌」は、<br class="sp-none">
      世界最大級のメタバースイベント「バーチャルマーケット」から派生した<br class="sp-none">
      リアルイベントです。
    </div>
    <div class="description">
      VRSNS上で活躍する北海道ゆかりのクリエイターたちが、
      リアルの場に飛び出す場所をつくりたい―――<br>
      そんな想いから生まれた、有志主催のイベントです。北海道の有志XRクリエイターが主催し、札幌で開催します。
    </div>
    <div class="info-flex mb-24">
      <div class="info-flex__child">
        <p class="info-flex__number info-flex__number--amber">
          <HaCountUpNumber
            :value="500"
            :duration="2000"
          />名+
        </p>
        <p class="info-flex__label">
          過去の来場者数
        </p>
      </div>
      <div class="info-flex__child">
        <p class="info-flex__number info-flex__number--cyan">
          <HaCountUpNumber
            :value="50"
            :duration="2000"
          />+
        </p>
        <p class="info-flex__label">
          出展サークル数
        </p>
      </div>
      <div class="info-flex__child">
        <p class="info-flex__number info-flex__number--magenta">
          <HaCountUpNumber
            :value="6"
            :duration="2000"
          />回
        </p>
        <p class="info-flex__label">
          開催回数
        </p>
      </div>
    </div>

    <div
      ref="listRef"
      class="card-flex"
    >
      <div class="gsap-list__child">
        <HaCard
          class="card-flex__child"
          color="amber"
        >
          <template #icon>
            <HaStarShineIcon />
          </template>
          <template #title>
            バーチャル姿のまま<br>リアルで体験
          </template>
          <template #body>
            アバターとしての生き方を大切にする人々が<br>
            リアルの場で集い、交流し、共に<br>クリエイティブな未来を気付く場です。
          </template>
        </HaCard>
      </div>
      <div class="gsap-list__child">
        <HaCard
          class="card-flex__child"
          color="cyan"
        >
          <template #icon>
            <HaWorldIcon />
          </template>
          <template #title>
            VRの世界で活躍する<br>クリエイターの出展
          </template>
          <template #body>
            VRとリアルを行き来しながら活躍する<br>クリエイターの作品展示や、新たなXR技術を<br>活用したインタラクティブな企画を展開！
          </template>
        </HaCard>
      </div>
      <div class="gsap-list__child">
        <HaCard
          class="card-flex__child"
          color="light-magenta"
        >
          <template #icon>
            <HaCommunityIcon />
          </template>
          <template #title>
            遊んで、買って、<br>楽しめる企業ブース
          </template>
          <template #body>
            各企業ブースでは最新XRコンテンツを体験でき、<br>ここでしか手に入らない限定グッズも<br>販売されるかも？
          </template>
        </HaCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）

  @include m.tb {
    margin-bottom: 64px;
  }
}

.info-flex {
  display: flex;
  gap: 32px;
  justify-content: center;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @include m.tb {
    flex-direction: column;
    align-items: center;
  }

  &__child {
    width: 320px;
  }

  &__number {
    margin-bottom: 4px;

    font-size: 64px;
    font-weight: 700;
    line-height: 1em;
    text-align: center;
    letter-spacing: normal;
    white-space: nowrap;

    @include m.sp {
      margin-bottom: 8px;
      font-size: 48px;
    }

    &--cyan {
      color: v.$vket-cyan;
    }

    &--amber {
      color: v.$vket-amber;
    }

    &--magenta {
      color: v.$vket-magenta;
    }
  }

  &__label {
    font-size: 16px;
    font-weight: 400;
    color: v.$vket-emerald;
    text-align: center;

    @include m.sp {
      font-size: 10px;
    }
  }
}

.card-flex {
  display: flex;
  gap: 32px;
  justify-content: center;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @include m.tb {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .gsap-list__child {
    width: 320px;

    @include m.tb {
      width: 60%;
    }

    @include m.sp {
      width: 100%;
    }
  }

  &__child {
    width: 100%;
    height: 100%;
  }
}
</style>
