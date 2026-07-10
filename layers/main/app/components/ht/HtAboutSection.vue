<i18n lang="yaml">
ja:
  desc1: '「VketReal in 札幌」は、{br1}世界最大級のメタバースイベント「バーチャルマーケット」から派生した{br2}リアルイベントです。'
  desc2: 'VRSNS上で活躍する北海道ゆかりのクリエイターたちが、リアルの場に飛び出す場所をつくりたい―――{br}そんな想いから生まれた、有志主催のイベントです。北海道の有志XRクリエイターが主催し、札幌で開催します。'
  # stat1Label: '過去の来場者数'
  # stat1Unit: '名+'
  # stat2Label: '出展サークル数'
  # stat2Unit: '+'
  # stat3Label: '開催回数'
  # stat3Unit: '回'
  feature1Title: 'バーチャル姿のまま、{br}リアルで体験'
  feature1Desc: 'アバターとしての生き方を大切にする人々が{br}リアルの場で集い、交流し、共に{br}クリエイティブな未来を築く場です。'
  feature2Title: 'VRの世界で活躍する{br}クリエイターの出展'
  feature2Desc: 'VRとリアルを行き来しながら活躍する{br}クリエイターの作品展示や、新たなXR技術を{br}活用したインタラクティブな企画を展開！'
  feature3Title: '遊んで、買って、{br}楽しめる企業ブース'
  feature3Desc: '各企業ブースでは最新XRコンテンツを体験でき、{br}ここでしか手に入らない限定グッズも{br}販売されるかも？'
en:
  desc1: '"VketReal in Sapporo" is an in-person event inspired by "VirtualMarket (Vket)", one of the world''s largest events in the metaverse.'
  desc2: 'This is a community-run event, born from a simple idea: give creators from the Hokkaido VR/SNS scene a place to step into the real world. Organized by volunteer XR creators based in Hokkaido, and held in Sapporo.'
  # stat1Label: 'Total Attendees'
  # stat1Unit: '+'
  # stat2Label: 'Exhibiting Circles'
  # stat2Unit: '+'
  # stat3Label: 'Events Held'
  # stat3Unit: ''
  feature1Title: 'Experience the Event as Your Virtual Avatar'
  feature1Desc: 'A space where people who live as their avatars come together in the real world — to connect, create, and build a creative future.'
  feature2Title: 'Creators from the VR World, Exhibiting Live'
  feature2Desc: 'Discover works by creators who move between VR and the real world, alongside interactive experiences powered by the latest XR technology.'
  feature3Title: 'Explore, Shop, and Have Fun at Sponsor Booths'
  feature3Desc: 'Try out the latest XR content at each booth. You might even find limited-edition merchandise you can only get here.'
</i18n>

<script setup lang="ts">
import HaCard from '../ha/HaAboutCard.vue'
// import HaCountUpNumber from '../ha/HaCountUpNumber.vue'
import HaCommunityIcon from '../ha/icons/HaCommunityIcon.vue'
import HaStarShineIcon from '../ha/icons/HaStarShineIcon.vue'
import HaWorldIcon from '../ha/icons/HaWorldIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

// const { t } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

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
      :title="tGlobal('sectionTitle.about')"
      label="ABOUT"
    />
    <i18n-t
      keypath="desc1"
      tag="div"
      class="description description--space"
      scope="parent"
    >
      <template #br1>
        <br class="sp-none">
      </template>
      <template #br2>
        <br class="sp-none">
      </template>
    </i18n-t>
    <i18n-t
      keypath="desc2"
      tag="div"
      class="description"
      scope="parent"
    >
      <template #br>
        <br class="sp-none">
      </template>
    </i18n-t>
    <!-- <div class="info-flex">
      <div class="info-flex__child">
        <p class="info-flex__number info-flex__number--amber">
          <HaCountUpNumber
            :value="500"
            :duration="2000"
          />{{ t('stat1Unit') }}
        </p>
        <p class="info-flex__label">
          {{ t('stat1Label') }}
        </p>
      </div>
      <div class="info-flex__child">
        <p class="info-flex__number info-flex__number--cyan">
          <HaCountUpNumber
            :value="50"
            :duration="2000"
          />{{ t('stat2Unit') }}
        </p>
        <p class="info-flex__label">
          {{ t('stat2Label') }}
        </p>
      </div>
      <div class="info-flex__child">
        <p class="info-flex__number info-flex__number--magenta">
          <HaCountUpNumber
            :value="6"
            :duration="2000"
          />{{ t('stat3Unit') }}
        </p>
        <p class="info-flex__label">
          {{ t('stat3Label') }}
        </p>
      </div>
    </div> -->

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
            <i18n-t
              keypath="feature1Title"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
          <template #body>
            <i18n-t
              keypath="feature1Desc"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
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
            <i18n-t
              keypath="feature2Title"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
          <template #body>
            <i18n-t
              keypath="feature2Desc"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
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
            <i18n-t
              keypath="feature3Title"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
          <template #body>
            <i18n-t
              keypath="feature3Desc"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
        </HaCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

// 連続する3列レイアウト（info-flex, card-flex）の縦横は揃えたいので、css変数を参照させている。
// 3列2行のgridレイアウトの方が記述量は少ないが、info-flexとcard-flexは互いに無関係の情報なのでhtmlの構造上も並列にしたいため上記の方法を採用している。
$three-items-flex--template-column-width: 320px;
$three-items-flex--template-column-gap: 32px;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）

  @include m.tb {
    margin-bottom: 64px;
  }
}

.info-flex {
  display: flex;
  gap: $three-items-flex--template-column-gap;
  justify-content: center;

  width: 100%;
  margin: 0 auto 96px;

  @include m.tb {
    flex-direction: column;
    align-items: center;
  }

  &__child {
    width: $three-items-flex--template-column-width;
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
  gap: $three-items-flex--template-column-gap;
  justify-content: center;

  width: 100%;
  margin: 0 auto;

  @include m.tb {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .gsap-list__child {
    width: $three-items-flex--template-column-width;

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
