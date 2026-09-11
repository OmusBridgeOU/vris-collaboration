<script setup lang="ts">
import HaNoteIcon from '../ha/icons/HaNoteIcon.vue'
import HaXIcon from '../ha/icons/HaXIcon.vue'
import { DOCUMENT_LINKS } from '~/constants/documentLinks'

const { t } = useI18n()

const documentLinks = [
  { key: 'participationGuide', href: DOCUMENT_LINKS.participationGuide },
  { key: 'privacyPolicy', href: DOCUMENT_LINKS.privacyPolicy },
  { key: 'codeOfConduct', href: DOCUMENT_LINKS.codeOfConduct },
  { key: 'exhibitionGuideline', href: DOCUMENT_LINKS.exhibitionGuideline },
  { key: 'exhibitionTerms', href: DOCUMENT_LINKS.exhibitionTerms },
  { key: 'numberedTicket', href: DOCUMENT_LINKS.numberedTicket },
] as const
</script>

<i18n lang="yaml">
ja:
  mainlogo: VketReal in 札幌 2026 Autumn
  documents:
    participationGuide: 一般参加ガイド
    privacyPolicy: プライバシーポリシー
    codeOfConduct: 行動規範
    exhibitionGuideline: 出展ガイドライン
    exhibitionTerms: 出展規約
    numberedTicket: 整理券番号のお知らせ
en:
  mainlogo: VketReal in Sapporo 2026 Autumn
  documents:
    participationGuide: Participation Guide
    privacyPolicy: Privacy Policy
    codeOfConduct: Code of Conduct
    exhibitionGuideline: Exhibitor Guidelines
    exhibitionTerms: Exhibitor Terms
    numberedTicket: Admission Number Updates
</i18n>

<template>
  <footer class="footer">
    <div class="footer__upper">
      <div class="footer__left">
        <a
          href="/"
          class="footer__logo-link"
        >
          <img
            class="footer__logo"
            src="/vketreal_in_sapporo_logo_light.png"
            :alt="t('mainlogo')"
          >
        </a>
        <nav class="footer__nav">
          <a
            v-for="link in documentLinks"
            :key="link.key"
            class="footer__link"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >{{ t(`documents.${link.key}`) }}</a>
        </nav>
      </div>
      <div class="footer__right">
        <a
          href="https://x.com/vketreal_vris"
          target="blank"
          rel="noopener noreferrer"
          class="footer__sns-logo"
        >
          <HaXIcon />
        </a>
        <div class="footer__logo-divider" />
        <a
          href="https://note.com/vris"
          target="blank"
          rel="noopener noreferrer"
          class="footer__sns-logo"
        >
          <HaNoteIcon class="footer__scaled-logo" />
        </a>
      </div>
    </div>
    <div class="footer__divider" />
    <p class="footer__copy">
      &copy; 2026 VketReal in 札幌 実行委員会. All rights reserved.
    </p>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as m;

.footer {
  position: relative;
  z-index: 1;

  padding: 88px 105px 0;
  border-radius: 40px 40px 0 0;

  background-color: rgb(25 25 25 / 100%);

  @include m.sp {
    padding: 52px 32px 0;
  }

  &__upper {
    display: flex;
    gap: 32px;
    justify-content: space-between;

    @include m.sp {
      flex-direction: column;
      gap: 8px;
    }
  }

  &__logo-link {
    display: block;
    height: 92px;
    margin-bottom: 64px;

    @include m.tb {
      height: 72px;
      margin-bottom: 40px;
    }

    @include m.sp {
      height: 46px;
      margin-bottom: 32px;
    }
  }

  &__logo {
    height: 100%;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding-bottom: 48px;
  }

  &__link {
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;
    text-decoration: underline;
    text-underline-offset: 3px;

    @include m.tb {
      font-size: 12px;
      text-decoration: none;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: #8f8f8f;
  }

  &__right {
    display: flex;
    gap: 24px;
    align-items: center;
    height: 32px;

    @include m.sp {
      gap: 16px;
      height: 24px;
    }
  }

  &__logo-divider {
    width: 1px;
    height: 100%;
    background-color: white;
  }

  &__sns-logo {
    height: 100%;

    svg {
      height: 100%;
    }
  }

  &__scaled-logo {
    pointer-events: none;
    transform:scale(1.8);
  }

  &__copy {
    padding: 32px 0;

    font-family: Inter, sans-serif;
    font-size: 12px;
    color: white;
    text-align: center;

    @include m.sp {
      font-size: 8px;
    }
  }
}
</style>
