<i18n lang="yaml">
ja:
  desc1:
    - '「VketReal in 札幌」は、'
    - '__br-tb-over__'
    - '世界最大級のメタバースイベント'
    - '「バーチャルマーケット」から派生した'
    - '__br-tb-over__'
    - 'リアルイベントです。'
  desc2:
    - 'VRSNS上で活躍する'
    - '北海道ゆかりのクリエイターたちが、'
    - 'リアルの場に'
    - '飛び出す場所をつくりたい―――'
    - '__br-tb-over__'
    - 'そんな想いから生まれた、'
    - '有志主催のイベントです。'
    - '__br-tb-over__'
    - '北海道の有志XRクリエイターが主催し、'
    - '札幌で開催します。'
  feature1Title: 'バーチャル姿のまま、{br}リアルで体験'
  feature1Desc:
    - 'アバターとしての'
    - '生き方を'
    - '大切にする人々が'
    - 'リアルの場で集い、'
    - '交流し、'
    - '共に'
    - 'クリエイティブな'
    - '未来を築く場です。'
  feature2Title: 'VRの世界で活躍する{br}クリエイターの出展'
  feature2Desc:
    - 'VRとリアルを'
    - '行き来しながら'
    - '活躍する'
    - 'クリエイターの'
    - '作品展示や、'
    - '新たなXR技術を'
    - '活用した'
    - 'インタラクティブな'
    - '企画を展開！'
  feature3Title: '遊んで、買って、{br}楽しめる企業ブース'
  feature3Desc:
    - '各企業ブースでは'
    - '最新XRコンテンツ'
    - 'を体験でき、'
    - 'ここでしか'
    - '手に入らない'
    - '限定グッズも'
    - '販売されるかも？'
en:
  desc1: '"VketReal in Sapporo" is an in-person event inspired by "VirtualMarket (Vket)", one of the world largest events in the metaverse.'
  desc2: 'This is a community-run event, born from a simple idea: give creators from the Hokkaido VR/SNS scene a place to step into the real world. Organized by volunteer XR creators based in Hokkaido, and held in Sapporo.'
  feature1Title: 'Experience the Event as Your Virtual Avatar'
  feature1Desc: 'A space where people who live as their avatars come together in the real world — to connect, create, and build a creative future.'
  feature2Title: 'Creators from the VR World, Exhibiting Live'
  feature2Desc: 'Discover works by creators who move between VR and the real world, alongside interactive experiences powered by the latest XR technology.'
  feature3Title: 'Explore, Shop, and Have Fun at Sponsor Booths'
  feature3Desc: 'Try out the latest XR content at each booth. You might even find limited-edition merchandise you can only get here.'
</i18n>

<script setup lang="ts">
import HaAboutCard from '../ha/HaAboutCard.vue'
import HaI18nNowrapText from '../ha/HaI18nNowrapText.vue'
import HaCommunityIcon from '../ha/icons/HaCommunityIcon.vue'
import HaStarShineIcon from '../ha/icons/HaStarShineIcon.vue'
import HaWorldIcon from '../ha/icons/HaWorldIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t: tGlobal, tm, rt } = useI18n()

function resolveContent(key: string): string | string[] {
  // rawにはvue-i18nの内部型が入る。anyは極力使いたくないので、後から型ガードを掛けている。
  const raw: unknown = tm(key)
  if (Array.isArray(raw)) {
    return raw.map(unit => rt(unit as never))
  }

  return rt(raw as never)
}

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
      class="mb-16"
    />
    <p class="description description--space">
      <HaI18nNowrapText :content="resolveContent('desc1')" />
    </p>
    <p class="description">
      <HaI18nNowrapText :content="resolveContent('desc2')" />
    </p>

    <div
      ref="listRef"
      class="card-flex"
    >
      <div class="gsap-list__child">
        <HaAboutCard
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
                <br class="under-tb">
              </template>
            </i18n-t>
          </template>
          <template #body>
            <HaI18nNowrapText :content="resolveContent('feature1Desc')" />
          </template>
        </HaAboutCard>
      </div>
      <div class="gsap-list__child">
        <HaAboutCard
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
                <br class="under-tb">
              </template>
            </i18n-t>
          </template>
          <template #body>
            <HaI18nNowrapText :content="resolveContent('feature2Desc')" />
          </template>
        </HaAboutCard>
      </div>
      <div class="gsap-list__child">
        <HaAboutCard
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
                <br class="under-tb">
              </template>
            </i18n-t>
          </template>
          <template #body>
            <HaI18nNowrapText :content="resolveContent('feature3Desc')" />
          </template>
        </HaAboutCard>
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
  margin-bottom: 96px;

  @include m.tb {
    margin-bottom: 64px;
  }
}

.mb-16 {
  margin-bottom: 64px;

  @include m.tb {
    margin-bottom: 48px;
  }

  @include m.sp {
    margin-bottom: 24px;
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
