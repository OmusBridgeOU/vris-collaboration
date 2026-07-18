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
    iconUrl: '',
    role: t('roles.webAppDevelopment'),
    xLink: 'https://x.com/samy_hrin',
    instagramLink: '',
  },
  {
    id: 9,
    name: 'Tsubaki',
    iconUrl: '/member-icons/tsubaki.webp',
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
