<i18n lang="yaml">
ja:
  roles:
    role1: '広報・ステージイベント企画'
    role2: '実行委員長'
    role3: 'PM'
    role4: 'SNS運用'
    role5: '企画・エンジニアリング'
    role6: '裏方雑務'
    role7: '当日運営'
    role8: 'デザイン制作'
    role9: '広報'
    role10: 'グッズ企画・運用'
    role11: 'webアプリ開発'
en:
  roles:
    role1: 'role1'
    role2: 'role2'
    role3: 'role3'
    role4: 'role4'
    role5: 'role5'
    role6: 'role6'
    role7: 'role7'
    role8: 'role8'
    role9: 'role9'
    role10: 'role10'
    role11: 'role11'
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
    name: 'Milia',
    iconUrl: '/member-icons/milia.webp',
    role: t('roles.role1'),
    xLink: 'https://x.com/xmiliax',
    instagramLink: '',
  },
  {
    id: 2,
    name: 'A-kun',
    iconUrl: '/member-icons/a-kun.webp',
    role: t('roles.role2'),
    xLink: 'https://x.com/A919515',
    instagramLink: '',
  },
  {
    id: 3,
    name: 'R.D.Sakamoto',
    iconUrl: '/member-icons/skmt3p.webp',
    role: t('roles.role3'),
    xLink: 'https://x.com/skmt3p',
    instagramLink: '',
  },
  {
    id: 4,
    name: 'ふららん',
    iconUrl: '/member-icons/furarann.webp',
    role: t('roles.role4'),
    xLink: 'https://x.com/furarann_VR37',
    instagramLink: '',
  },
  {
    id: 5,
    name: 'luft',
    iconUrl: '/member-icons/luft.webp',
    role: t('roles.role5'),
    xLink: 'https://x.com/luft256',
    instagramLink: '',
  },
  {
    id: 6,
    name: 'ハチヤ',
    iconUrl: '/member-icons/hatiya.webp',
    role: t('roles.role6'),
    xLink: 'https://x.com/h4tiyA',
    instagramLink: '',
  },
  {
    id: 7,
    name: 'Tsubaki',
    iconUrl: '/member-icons/tsubaki.webp',
    role: t('roles.role7'),
    xLink: 'https://x.com/Tsubaki_HIUVR',
    instagramLink: '',
  },
  {
    id: 8,
    name: 'おのでらりな',
    iconUrl: '/member-icons/rina-onodera.webp',
    role: t('roles.role8'),
    xLink: 'https://x.com/studiococoon_',
    instagramLink: '',
  },
  {
    id: 9,
    name: '七草睦月',
    iconUrl: '/member-icons/nanakusa-mutsuki.webp',
    role: t('roles.role9'),
    xLink: 'https://x.com/nanakusamutsuki',
    instagramLink: '',
  },
  {
    id: 10,
    name: 'youyou',
    iconUrl: '',
    role: t('roles.role10'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 11,
    name: 'samy',
    iconUrl: '',
    role: t('roles.role11'),
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
      <HaMemberCard
        v-for="item in items"
        :key="item.id"
        class="member-section__grid-item"
        v-bind="item"
      />
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
