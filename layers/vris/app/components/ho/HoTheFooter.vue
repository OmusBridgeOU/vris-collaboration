<i18n lang="yaml">
ja:
  copyright: © 2025 VketReal in 札幌 実行委員会 All Rights Reserved.
  contact: お問い合わせ
  company: 法人問い合わせ
  press: 広報問い合わせ
  pressrelease: プレスリリース
  twitter: Xに行く
  privacy: プライバシーポリシー
en:
  copyright: © 2025 VketReal in SAPPORO Executive Committee All Rights Reserved.
  contact: Contact Us
  company: Corporate Inquiry
  press: Press Inquiry
  pressrelease: Press Release
  twitter: Go to X
  privacy: Privacy Policy
</i18n>

<template>
  <footer
    id="footer"
    class="footer"
  >
    <div class="footer-content">
      <div class="footer-buttons">
        <HaLink
          to="https://forms.gle/hnsfBRRnQZq4hLQP7"
          blank
          forceAnchorLink
          class="footer-button"
        >
          {{ t('contact') }}
        </HaLink>
        <HaLink
          to="https://forms.gle/FuVGEQK23zbFuqgM8"
          blank
          forceAnchorLink
          class="footer-button"
        >
          {{ t('company') }}
        </HaLink>
        <HaLink
          to="https://forms.gle/GNQfz8mVaENsDK4M9"
          blank
          forceAnchorLink
          class="footer-button"
        >
          {{ t('press') }}
        </HaLink>
      </div>
      <small class="copyright">
        {{ t('copyright') }}
      </small>
      <div class="footer-links">
        <HaLink
          to="https://x.com/vketreal_vris"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >
          {{ t('twitter') }}
        </HaLink>
        <HaLink
          to="https://presswalker.jp/company/14682"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >
          {{ t('pressrelease') }}
        </HaLink>
        <HaLink
          to="/docs/privacy-policy"
          class="footer-link"
        >
          {{ t('privacy') }}
        </HaLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/_variables' as v;
@use '#vris/app/assets/styles/_mixins' as m;

.footer {
  position: relative;

  width: 100%;
  padding: 0.75rem;

  color: #fff;
  text-align: center;

  background: #000;

  @include m.sp {
    padding: 1rem 0.5rem 1.5rem;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    max-width: 1280px;
    margin: 0 auto;
  }

  &-buttons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    @include m.sp {
      display: none;
    }
  }

  &-button {
    display: inline-block;

    padding: 0.5rem 1rem;
    border: 1px solid #fff;
    border-radius: 4px;

    font-size: 0.875rem;
    color: #fff;
    text-decoration: none;

    transition: all 0.3s ease;

    @include m.sp {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      min-height: 44px;
      padding: 0.875rem 1.5rem;

      font-size: 0.95rem;
      text-align: center;
    }

    &:hover {
      color: #000;
      background: #fff;
    }
  }

  &-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    margin-top: 0.5rem;

    font-size: 0.75rem;

    @include m.sp {
      margin-top: 0.75rem;
      font-size: 0.875rem;
    }
  }

  &-link {
    color: #fff;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }

  .copyright {
    font-size: 0.75rem;
    line-height: 1.4;

    @include m.sp {
      padding: 0 1rem;
      font-size: 0.8rem;
      line-height: 1.5;
    }
  }
}
</style>
