<script setup lang="ts">
import HaXIcon from '../ha/icons/HaXIcon.vue'
</script>

<!-- <i18n lang="yaml">
ja:
  mainlogo: ロゴ名サービス名
en:
  mainlogo: logo name
</i18n> -->

<template>
  <footer class="footer">
    <div class="footer__upper">
      <div class="footer__left">
        <img
          src=""
          alt=""
          class="footer__logo"
        >
        <nav class="footer__nav">
          <NuxtLink class="footer__link">利用規約</NuxtLink>
          <NuxtLink class="footer__link">プライバシー</NuxtLink>
          <NuxtLink class="footer__link">行動規範</NuxtLink>
          <NuxtLink class="footer__link">出展ガイドライン</NuxtLink>
          <NuxtLink class="footer__link">出展規約</NuxtLink>
        </nav>
      </div>
      <div class="footer__right">
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
.footer {
  padding: 88px 105px 0;
  border-radius: 40px 40px 0 0;
  background-color: rgb(25 25 25 / 100%);

  &__upper {
    display: flex;
    justify-content: space-between;
    padding-bottom: 48px;
  }

  &__logo {
    width: 120px;
    height: 90px;
    margin-bottom: 40px;
    background-color: gray;
  }

  &__nav{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__link {
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;
    text-decoration: underline;
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color:#8f8f8f;
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
  }
}
</style>
