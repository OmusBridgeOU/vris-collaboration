<i18n lang="yaml">
ja:
  mainlogo: ロゴ名サービス名
  maintenance: 本サイトはメンテナンス中です。もうしばらくお待ちください！
en:
  mainlogo: logo name
  maintenance: 本サイトはメンテナンス中です。もうしばらくお待ちください！
</i18n>

<template>
  <div class="header__wrapper">
    <header class="ho-the-header">
      <div class="ho-the-header__left">
        <div class="ho-the-header__logo" />
      </div>
      <div class="ho-the-header__right">
        <nav class="ho-the-header__nav">
          <ul class="ho-the-header__ul">
            <li class="ho-the-header__li">
              <a
                href=""
                class="ho-the-header__link"
              />
            </li>
            <li class="ho-the-header__li">
              <a
                href=""
                class="ho-the-header__link"
              />
            </li>
            <li class="ho-the-header__li">
              <a
                href=""
                class="ho-the-header__link"
              />
            </li>
            <li class="ho-the-header__li">
              <a
                href=""
                class="ho-the-header__link"
              />
            </li>
          </ul>
        </nav>
        <button
          class="hamburger-icon"
          aria-label="メニューを開く"
          @click="isPanelOpen = true"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <HaHamburgerIcon />
          </svg>
        </button>
      </div>
    </header>
    <div
      class="maintenance-banner"
      role="status"
      aria-live="polite"
    >
      <span class="maintenance-banner__track">
        <span class="maintenance-banner__text">{{ t('maintenance') }}</span>
        <span class="maintenance-banner__text">{{ t('maintenance') }}</span>
      </span>
    </div>
  </div>

  <div
    class="side-panel__overlay"
    :class="{ 'is-open': isPanelOpen }"
    @click="isPanelOpen = false"
  />

  <div
    class="side-panel"
    :class="{ 'is-open': isPanelOpen }"
    role="dialog"
    aria-modal="true"
  >
    <button
      class="side-panel__close"
      aria-label="メニューを閉じる"
      @click="isPanelOpen = false"
    >
      <HaCloseIcon />
    </button>
    <nav class="side-panel__nav">
      <ul class="side-panel__ul">
        <li
          v-for="link in navLinks"
          :key="link.href"
          class="side-panel__li"
        >
          <a
            v-if="link.type === 'link'"
            :href="link.href"
            class="side-panel__link"
            @click="isPanelOpen = false"
          >
            {{ link.text }}
          </a>
          <HaAnchorLink
            v-else
            class="side-panel__link"
            :href="link.href"
            :text="link.text"
            @clicked="isPanelOpen = false"
          />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import HaHamburgerIcon from '../ha/icons/HaHamburgerIcon.vue'
import HaCloseIcon from '../ha/icons/HaCloseIcon.vue'
import HaAnchorLink from '../ha/HaAnchorLink.vue'

const { t } = useI18n()

export type NavLink
  = | { type: 'link', href: string, text: string }
    | { type: 'anchor', href: string, text: string }

defineProps<{
  navLinks: NavLink[]
}>()

const isPanelOpen = ref(false)

watch(isPanelOpen, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.header__wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  width: 100%;
  height: v.$vket-header-height-pc;
  padding: 12px;

  @include m.sp {
    height: v.$vket-header-height-sp;
  }
}

.maintenance-banner {
  position: fixed;
  top: v.$vket-header-height-pc;
  left: 0;

  overflow: hidden;

  width: 100vw;
  height: 32px;

  color: white;

  background: #e6002d;

  @include m.sp {
    top: v.$vket-header-height-sp;
  }

  &__track {
    will-change: transform;

    display: inline-block;

    padding-left: 100%;

    font-size: 16px;
    font-weight: 700;
    line-height: 32px;
    white-space: nowrap;

    animation: maintenance-marquee 20s linear infinite;
  }

  &__text {
    display: inline-block;
    padding-right: 56px;
  }
}

.ho-the-header {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 8px 10px;
  border: 1px solid rgb(255 255 255 / 75%);
  border-radius: 100px;

  background-color: rgb(255 255 255 / 20%);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 16px rgb(255 255 255 / 60%),
    0 8px 12px 8px rgb(black, 0.2);

  &__logo {
    width: 36px;
    height: 36px;
    border-radius: 100px;
  }
}

.hamburger-icon {
  cursor: pointer;

  display: none;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 100px;

  background: rgb(188 188 188);

  @include m.sp {
    display: flex;
  }

  svg {
    display: block;
    width: 22px;
    height: 22px;
  }
}

.side-panel__overlay {
  pointer-events: none;

  position: fixed;
  z-index: 200;
  inset: 0;

  opacity: 0;
  background: rgb(0 0 0 / 35%);

  transition: opacity 0.3s ease;

  &.is-open {
    pointer-events: auto;
    opacity: 1;
  }
}

.side-panel {
  position: fixed;
  z-index: 300;
  top: 0;
  right: 0;
  transform: translateX(100%);

  overflow-y: auto;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  width: 100vw;
  height: 100dvh;
  padding: 24px 20px 40px;
  border-left: 1px solid rgb(255 255 255 / 15%);

  background: rgb(30 30 35 / 72%);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);

  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.is-open {
    transform: translateX(0);
  }

  &__close {
    cursor: pointer;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    align-self: flex-end;
    justify-content: center;

    width: 36px;
    height: 36px;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 25%);
    border-radius: 100px;

    background: rgb(255 255 255 / 10%);

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__nav {
    flex: 1;
    margin-top: 40px;
  }

  &__ul {
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  &__li {
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  &__link {
    display: block;

    padding: 6px;

    font-size: 14px;
    color: white;
    text-decoration: none;
  }
}

@keyframes maintenance-marquee {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-100%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .maintenance-banner__track {
    padding-left: 0;
    animation: none;
  }
}
</style>
