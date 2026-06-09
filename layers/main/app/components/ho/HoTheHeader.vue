<i18n lang="yaml">
ja:
  mainlogo: VketReal in 札幌 2026 Autumn
en:
  mainlogo: VketReal in Sapporo 2026 Autumn
</i18n>

<template>
  <div
    id="gsap-header"
    class="header__wrapper"
  >
    <header class="ho-the-header">
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
            <div class="ho-the-header__hamburger-wrapper">
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
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import HaHamburgerIcon from '../ha/icons/HaHamburgerIcon.vue'
import HaAnchorLink from '../ha/HaAnchorLink.vue'
import HaCloseIcon from '../ha/icons/HaCloseIcon.vue'

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
  padding: 16px;

  @include m.tb {
    height: v.$vket-header-height-tb;
  }
}

.ho-the-header {
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  &__left {
    display: flex;
    flex-shrink: 0;
    align-items: center;

    height: 100%;
    padding-right: 32px;
    padding-left: 32px;

    @include m.tb {
      padding-right: 24px;
    padding-left: 24px;
    }
  }

  &__right {
    display: flex;
    align-items: center;

    height: 100%;
    padding-right: 40px;
    padding-left: 40px;

    @include m.tb {
      padding-right: 24px;
      padding-left: 24px;
    }

    &--pc-only {
      @include m.sp {
        display: none;
      }
    }

    &--pc-none {
      display: none;

      @include m.sp {
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
    top: 0;
    right: 0;
  }

  &__accordion {
    display: none;
    align-items: start;

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
      padding: 36px 0 14px;

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
</style>
