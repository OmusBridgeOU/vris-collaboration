<i18n lang="yaml">
ja:
  roles:
    role1: '役割'
en:
  roles:
    role1: 'role1'
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
    name: '名前',
    iconUrl: '/kv.png',
    role: t('roles.role1'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 2,
    name: '名前',
    iconUrl: '/kv.png',
    role: t('roles.role1'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 3,
    name: '名前',
    iconUrl: '/kv.png',
    role: t('roles.role1'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 4,
    name: '名前',
    iconUrl: '/kv.png',
    role: t('roles.role1'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 5,
    name: '名前',
    iconUrl: '/kv.png',
    role: t('roles.role1'),
    xLink: '',
    instagramLink: '',
  },
  {
    id: 6,
    name: '名前',
    iconUrl: '/kv.png',
    role: t('roles.role1'),
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
    gap: 14px 28px;
    grid-template-columns: 1fr 1fr 1fr;

    max-width: 1080px;
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
