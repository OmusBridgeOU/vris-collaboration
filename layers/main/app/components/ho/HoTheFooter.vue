<script setup lang="ts">
import HaXIcon from '../ha/icons/HaXIcon.vue'

const { t } = useI18n()
</script>

<i18n lang="yaml">
ja:
  mainlogo: VketReal in 札幌 2026 Autumn
en:
  mainlogo: VketReal in Sapporo 2026 Autumn
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
          <NuxtLink
            class="footer__link"
            to="/documents/terms"
          >利用規約</NuxtLink>
          <NuxtLink
            class="footer__link"
            to="/documents/privacy-policy"
          >プライバシー</NuxtLink>
          <NuxtLink
            class="footer__link"
            to="/documents/code-of-conduct"
          >行動規範</NuxtLink>
          <NuxtLink
            class="footer__link"
            to="/documents/exhibition-guidline"
          >出展ガイドライン</NuxtLink>
          <NuxtLink
            class="footer__link"
            to="/documents/exhibition-terms"
          >出展規約</NuxtLink>
        </nav>
      </div>
      <div class="footer__x-logo">
        <HaXIcon />
      </div>
    </div>
    <div class="footer__divider" />
    <div class="footer__lower">
      <p class="footer__copy">
        🄫 2026 VketReal in 札幌 実行委員会. All rights reserved.
      </p>
    </div>
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
    justify-content: space-between;
    padding-bottom: 48px;
  }

  &__logo-link {
    display: block;
    height: 92px;
    margin-bottom: 40px;

    @include m.tb {
      height: 72px;
    }

    @include m.sp {
      height: 46px;
    }
  }

  &__logo {
    height: 100%;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  &__link {
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;
    text-decoration: underline;

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

  &__x-logo {
    width: 30px;

    @include m.sp {
      width: 16px;
    }
  }

  &__lower {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 78px;
  }

  &__copy {
    font-family: Inter, sans-serif;
    font-size: 12px;
    color: white;

    @include m.sp {
      font-size: 8px;
    }
  }
}
</style>
