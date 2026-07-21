<i18n lang="yaml">
ja:
  mainlogo: VketReal in 札幌 2026 Autumn
  maintenance: 本サイトはメンテナンス中です。もうしばらくお待ちください！
en:
  mainlogo: VketReal in Sapporo 2026 Autumn
  maintenance: 本サイトはメンテナンス中です。もうしばらくお待ちください！
</i18n>

<template>
  <header
    id="gsap-header"
    class="ho-the-header"
  >
    <div class="ho-the-header__inner">
      <div class="ho-the-header__left glassy-box-4 glassy-box-4--radius-full none-hover-animation">
        <a
          href="/"
          class="ho-the-header__logo-link"
        >
          <img
            class="ho-the-header__logo"
            src="/vketreal_in_sapporo_logo_light.png"
            :alt="t('mainlogo')"
          >
        </a>
      </div>

      <div class="ho-the-header__accordion-wrapper--inner">
        <div class="ho-the-header__accordion-wrapper">
          <div
            class="ho-the-header__right glassy-box-4 none-hover-animation ho-the-header__accordion"
            :class="{ 'is-open': isPanelOpen }"
          >
            <div class="ho-the-header__hamburger-wrapper">
              <HaLanguageSwitcher />
              <button
                class="ho-the-header__hamburger"
                :aria-label="isPanelOpen ? 'メニューを閉じる' : 'メニューを開く'"
                :aria-expanded="isPanelOpen"
                @click="isPanelOpen = !isPanelOpen"
              >
                <HaHamburgerIcon
                  v-show="!isPanelOpen"
                  class="ho-the-header__hamburger-icon"
                  :class="{ 'is-open': isPanelOpen }"
                />
                <HaCloseIcon
                  v-show="isPanelOpen"
                  class="ho-the-header__hamburger-icon"
                  :class="{ 'is-open': isPanelOpen }"
                />
              </button>
            </div>
            <div class="ho-the-header__accordion-body">
              <nav class="ho-the-header__accordion-nav">
                <ul class="ho-the-header__accordion-ul">
                  <li
                    v-for="link in navLinks"
                    :key="link.href"
                    class="ho-the-header__accordion-li"
                  >
                    <a
                      v-if="link.type === 'link'"
                      :href="link.href"
                      class="ho-the-header__accordion-link"
                      @click="isPanelOpen = false"
                    >{{ link.text }}</a>
                    <HaAnchorLink
                      v-else
                      class="ho-the-header__accordion-link"
                      :href="link.href"
                      :text="link.text"
                      @clicked="isPanelOpen = false"
                    />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="ho-the-header__right ho-the-header__right--pc-only glassy-box-4 glassy-box-4--radius-full none-hover-animation">
        <nav class="ho-the-header__nav">
          <ul class="ho-the-header__ul">
            <li
              v-for="link in navLinks"
              :key="link.href"
              class="ho-the-header__li"
            >
              <a
                v-if="link.type === 'link'"
                :href="link.href"
                class="ho-the-header__link"
              >{{ link.text }}</a>
              <HaAnchorLink
                v-else
                class="ho-the-header__link"
                :href="link.href"
                :text="link.text"
              />
            </li>
          </ul>
        </nav>
        <HaLanguageSwitcher />
      </div>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HaHamburgerIcon from '../ha/icons/HaHamburgerIcon.vue'
import HaAnchorLink from '../ha/HaAnchorLink.vue'
import HaCloseIcon from '../ha/icons/HaCloseIcon.vue'
import HaLanguageSwitcher from '../ha/HaLanguageSwitcher.vue'

const { t } = useI18n()

export type NavLink
  = | { type: 'link', href: string, text: string }
    | { type: 'anchor', href: string, text: string }

defineProps<{
  navLinks: NavLink[]
}>()

const isPanelOpen = ref(false)
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

$vket-header-height-pc--real: v.$vket-header-height-pc - v.$vket-header-vertical-padding-pc * 2;
$vket-header-height-tb--real: v.$vket-header-height-tb - v.$vket-header-vertical-padding-tb * 2;
$vket-header-height-sp--real: v.$vket-header-height-sp - v.$vket-header-vertical-padding-sp * 2;

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
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  box-sizing: border-box;
  width: 100svw;
  height: fit-content;
  margin: v.$vket-header-vertical-padding-pc auto 0;
  padding: 0 v.$pc-content-body-padding;

  @include m.tb {
    margin-top: v.$vket-header-vertical-padding-tb;
    padding: 0 24px;
  }

  @include m.sp {
    padding: 0 16px;
  }

  &__inner {
    position: relative;

    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    width: 100%;
    max-width: v.$pc-content-body-width - v.$pc-content-body-padding * 2;
    height: $vket-header-height-pc--real;

    @include m.tb {
      height: $vket-header-height-tb--real;
    }

    @include m.sp {
      height: $vket-header-height-sp--real;
    }
  }

  &__left {
    display: flex;
    flex-shrink: 0;
    align-items: center;

    height: 100%;
    padding-right: 32px;
    padding-left: 32px;

    box-shadow: inset rgb(22 0 120 / 30%) 0 0 12px 0;

    @include m.tb {
      padding-right: 24px;
      padding-left: 24px;
    }
  }

  &__right {
    display: flex;
    gap: 24px;
    align-items: center;

    height: 100%;
    padding-right: 24px;
    padding-left: 32px;

    box-shadow: inset rgb(22 0 120 / 20%) 0 0 12px 0;

    @include m.tb {
      gap: 0;
      padding-right: 24px;
      padding-left: 24px;
    }

    &--pc-only {
      @include m.tb {
        display: none;
      }
    }

    &--pc-none {
      display: none;

      @include m.tb {
        display: flex;
      }
    }
  }

  &__logo {
    height: 50px;

    @include m.tb {
      height: 36px;
    }
  }

  // PC用ナビ
  &__nav {
    @include m.tb {
      display: none;
    }
  }

  &__ul {
    display: flex;
    gap: 24px;
    align-items: center;
    list-style: none;
  }

  &__link {
    font-weight: 700;
    color: white;
    text-decoration: none;
  }

  &__accordion-wrapper {
    position: relative;
  }

  &__accordion-wrapper--inner {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
  }

  &__accordion {
    display: none;
    flex-direction: column;
    align-items: end;

    width: fit-content;
    height: fit-content;
    min-height: 50px;
    padding: 0;
    border-radius: 25px;

    @include m.tb {
      display: flex;
    }

    &-body {
      display: grid;
      grid-template-columns: 0fr;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease, grid-template-columns 0.3s ease;

      > nav {
        overflow: hidden;
      }
    }

    &.is-open &-body {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }

    &-ul {
      display: flex;
      flex-direction: column;

      margin: 0;
      padding: 12px;

      list-style: none;
    }

    &-link {
      display: block;

      padding: 12px 24px;

      font-size: 15px;
      color: white;
      text-decoration: none;
      white-space: nowrap;
    }
  }

  &__hamburger-wrapper {
    display: flex;
    align-items: center;
    padding: 7px;
  }

  // ハンバーガーボタン
  &__hamburger {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    height: 36px;
    padding: 0;

    &-icon {
      display: block;
      width: 22px;
      height: 22px;
      color: white;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .maintenance-banner__track {
    padding-left: 0;
    animation: none;
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
</style>
