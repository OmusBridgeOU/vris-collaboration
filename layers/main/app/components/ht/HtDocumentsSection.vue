<i18n lang="yaml">
ja:
  title: ドキュメント
  description: ご来場・出展に関するガイドラインや規約をご確認いただけます。
  participationGuide: 一般参加ガイド
  numberedTicket: 整理券番号のお知らせ
  privacyPolicy: プライバシーポリシー
  codeOfConduct: 行動規範
  exhibitionGuideline: 出展ガイドライン
  exhibitionTerms: 出展規約
  corporateExhibitorGuide: 企業出展社向けご案内
en:
  title: Documents
  description: View guidelines and policies for visitors and exhibitors.
  participationGuide: Participation Guide
  numberedTicket: Admission Number Updates
  privacyPolicy: Privacy Policy
  codeOfConduct: Code of Conduct
  exhibitionGuideline: Exhibitor Guidelines
  exhibitionTerms: Exhibitor Terms
  corporateExhibitorGuide: Corporate Exhibitor Guide
</i18n>

<script setup lang="ts">
import { DOCUMENT_LINKS } from '~/constants/documentLinks'
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n({ useScope: 'local' })

const documents = [
  { key: 'participationGuide', href: DOCUMENT_LINKS.participationGuide },
  { key: 'numberedTicket', href: DOCUMENT_LINKS.numberedTicket },
  { key: 'privacyPolicy', href: DOCUMENT_LINKS.privacyPolicy },
  { key: 'codeOfConduct', href: DOCUMENT_LINKS.codeOfConduct },
  { key: 'exhibitionGuideline', href: DOCUMENT_LINKS.exhibitionGuideline },
  { key: 'exhibitionTerms', href: DOCUMENT_LINKS.exhibitionTerms },
  { key: 'corporateExhibitorGuide', href: DOCUMENT_LINKS.corporateExhibitorGuide },
] as const

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.documents-grid__link')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="t('title')"
      label="DOCUMENTS"
    />
    <p class="documents-description">
      {{ t('description') }}
    </p>
    <nav
      ref="listRef"
      class="documents-grid"
      :aria-label="t('title')"
    >
      <a
        v-for="document in documents"
        :key="document.key"
        class="documents-grid__link glassy-box-3"
        :href="document.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{{ t(document.key) }}</span>
        <span
          class="documents-grid__arrow"
          aria-hidden="true"
        >↗</span>
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.documents-description {
  margin-bottom: 28px;
  font-size: 16px;
  line-height: 1.7;
  color: white;

  @include m.sp {
    margin-bottom: 20px;
    font-size: 14px;
  }
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @include m.tb {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include m.sp {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  &__link {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;

    min-height: 88px;
    padding: 20px 24px;

    font-size: 16px;
    font-weight: 700;
    color: white;

    transition: border-color 0.2s ease, background-color 0.2s ease;

    @include m.hover {
      border-color: v.$vket-cyan;
      background-color: rgb(0 224 255 / 16%);
    }

    @include m.sp {
      min-height: 68px;
      padding: 16px 20px;
      font-size: 14px;
    }
  }

  &__arrow {
    flex-shrink: 0;
    font-size: 20px;
    color: v.$vket-cyan;
  }
}
</style>
