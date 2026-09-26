<i18n lang="yaml">
ja:
  roles:
    executiveChair: '実行委員長'
    projectManager: 'PM'
    generalSupport: '裏方雑務'
    snsManagement: 'SNS運用'
    publicRelations: '広報'
    prAndStageEvent: '広報・ステージイベント企画'
    planningAndEngineering: '企画・エンジニアリング'
    merchandisePlanning: 'グッズ企画・運用'
    webAppDevelopment: 'webアプリ開発'
    dayOfOperations: '当日運営'
    artDirector: 'アートディレクター'
    keyVisualIllustration: 'KV・イラスト制作'
    webDevelopment: 'Web開発'
    illustrationAndDayOfStaff: 'イラスト制作・当日スタッフ'
    merchandiseAndDayOfStaff: 'グッズ制作・当日スタッフ'
    merchandiseProduction: 'グッズ制作'
    creatorSupport: 'クリエイターサポート'
    photographyStaff: '撮影スタッフ'
    dayOfStaff: '当日スタッフ'
en:
  roles:
    executiveChair: 'Executive Chair'
    projectManager: 'Project Manager'
    generalSupport: 'General Support'
    snsManagement: 'Social Media Management'
    publicRelations: 'Public Relations'
    prAndStageEvent: 'PR & Stage Event Planning'
    planningAndEngineering: 'Planning & Engineering'
    merchandisePlanning: 'Merchandise Planning & Operations'
    webAppDevelopment: 'Web App Development'
    dayOfOperations: 'Day-of Operations'
    artDirector: 'Art Director'
    keyVisualIllustration: 'Key Visual & Illustration'
    webDevelopment: 'Web Development'
    illustrationAndDayOfStaff: 'Illustration & Event Staff'
    merchandiseAndDayOfStaff: 'Merchandise Production & Event Staff'
    merchandiseProduction: 'Merchandise Production'
    creatorSupport: 'Creator Support'
    photographyStaff: 'Photography Staff'
    dayOfStaff: 'Event Staff'
</i18n>

<script setup lang="ts">
import HaMemberCard from '@/components/ha/HaMemberCard.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.member-section__grid-item')
  fadeInUpStagger(Array.from(items))
})

const { t } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

const items = computed(() => [
  {
    id: 1,
    name: 'A-kun',
    iconUrl: '/member-icons/a-kun.webp',
    role: t('roles.executiveChair'),
    xLink: 'https://x.com/A919515',
    instagramLink: '',
  },
  {
    id: 2,
    name: 'R.D.Sakamoto',
    iconUrl: '/member-icons/skmt3p.webp',
    role: t('roles.projectManager'),
    xLink: 'https://x.com/skmt3p',
    instagramLink: '',
  },
  {
    id: 3,
    name: 'ハチヤ',
    iconUrl: '/member-icons/hatiya.webp',
    role: t('roles.generalSupport'),
    xLink: 'https://x.com/h4tiyA',
    instagramLink: '',
  },
  {
    id: 4,
    name: 'ふららん',
    iconUrl: '/member-icons/furarann.webp',
    role: t('roles.snsManagement'),
    xLink: 'https://x.com/furarann_VR37',
    instagramLink: '',
  },
  {
    id: 5,
    name: '七草睦月',
    iconUrl: '/member-icons/nanakusa-mutsuki.webp',
    role: t('roles.publicRelations'),
    xLink: 'https://x.com/nanakusamutsuki',
    instagramLink: '',
  },
  {
    id: 6,
    name: 'Milia',
    iconUrl: '/member-icons/milia.webp',
    role: t('roles.prAndStageEvent'),
    xLink: 'https://x.com/xmiliax',
    instagramLink: '',
  },

  {
    id: 7,
    name: 'luft',
    iconUrl: '/member-icons/luft.webp',
    role: t('roles.planningAndEngineering'),
    xLink: 'https://x.com/luft256',
    instagramLink: '',
  },
  {
    id: 8,
    name: 'youyou',
    iconUrl: '/member-icons/youyou.webp',
    role: t('roles.merchandisePlanning'),
    xLink: 'https://x.com/youyou0147',
    instagramLink: '',
  },
  {
    id: 10,
    name: 'samy',
    iconUrl: '/member-icons/samy.webp',
    role: t('roles.webAppDevelopment'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 9,
    name: 'Tsubaki',
    iconUrl: '/member-icons/tsubaki.jpeg',
    role: t('roles.dayOfOperations'),
    xLink: 'https://x.com/Tsubaki_HIUVR',
    instagramLink: '',
  },
  {
    id: 11,
    name: 'おのでらりな',
    iconUrl: '/member-icons/rina-onodera.webp',
    role: t('roles.artDirector'),
    xLink: 'https://x.com/studiococoon_',
    instagramLink: '',
  },
  {
    id: 12,
    name: 'なだ',
    iconUrl: '/member-icons/otyano.webp',
    role: t('roles.keyVisualIllustration'),
    xLink: 'https://x.com/otyano8',
    instagramLink: '',
  },
  {
    id: 13,
    name: 'aj8d',
    iconUrl: '/member-icons/aj8d.webp',
    role: t('roles.webDevelopment'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 14,
    name: 'L.ami',
    iconUrl: '/member-icons/lami.webp',
    role: t('roles.webDevelopment'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 15,
    name: 'ゆー',
    iconUrl: '/member-icons/yu.png',
    role: t('roles.illustrationAndDayOfStaff'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 16,
    name: 'メロン',
    iconUrl: '/member-icons/melon.png',
    role: t('roles.merchandiseAndDayOfStaff'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 17,
    name: '懲戒ロリ',
    iconUrl: '',
    role: t('roles.merchandiseProduction'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 18,
    name: 'ロボロボちゃん',
    iconUrl: '',
    role: t('roles.merchandiseAndDayOfStaff'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 19,
    name: '流星灯',
    iconUrl: '/member-icons/ryuseito.webp',
    role: t('roles.creatorSupport'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 20,
    name: 'FoxABC',
    iconUrl: '/member-icons/foxabc.webp',
    role: t('roles.creatorSupport'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 21,
    name: '白石葵',
    iconUrl: '',
    role: t('roles.photographyStaff'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 22,
    name: '腹そう',
    iconUrl: '/member-icons/harasou.webp',
    role: t('roles.dayOfStaff'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 23,
    name: 'みかん氏',
    iconUrl: '/member-icons/mikan.png',
    role: t('roles.dayOfStaff'),
    xLink: 'https://x.com/Mikan_sub5212',
    instagramLink: '',
  },
  {
    id: 24,
    name: 'ASU',
    iconUrl: '/member-icons/asu.jpg',
    role: t('roles.dayOfStaff'),
    xLink: 'https://x.com/ASU_1115_VRC',
    instagramLink: '',
  },
  {
    id: 25,
    name: 'RB-C',
    iconUrl: '/member-icons/rb-c.png',
    role: t('roles.dayOfStaff'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 26,
    name: 't-Andou',
    iconUrl: '',
    role: t('roles.dayOfStaff'),
    xLink: '',
    instagramLink: '',
  },
])
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="tGlobal('sectionTitle.members')"
      label="MEMBERS"
    />
    <div
      ref="listRef"
      class="member-section__grid"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="member-section__grid-item"
      >
        <HaMemberCard
          v-bind="item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.member-section{
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
