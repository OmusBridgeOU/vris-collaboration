<i18n lang="yaml">
ja:
  mainlogo: VketReal in 札幌 2026 Autumn
  openMenu: メニューを開く
  closeMenu: メニューを閉じる
en:
  openMenu: Open menu
  closeMenu: Close menu
  mainlogo: VketReal in Sapporo 2026 Autumn
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

      <div
        class="ho-the-header__accordion-wrapper--inner"
        @keydown.esc="closeMenu(true)"
      >
        <div class="ho-the-header__accordion-wrapper">
          <div
            class="ho-the-header__right glassy-box-4 glassy-box-4--radius-full none-hover-animation ho-the-header__accordion"
            :class="{ 'is-open': isPanelOpen, 'is-closing': isPanelClosing }"
          >
            <div class="ho-the-header__hamburger-wrapper">
              <HaLanguageSwitcher />
              <button
                ref="menuButtonRef"
                type="button"
                class="ho-the-header__hamburger"
                :aria-label="t(isPanelOpen ? 'closeMenu' : 'openMenu')"
                aria-controls="header-navigation"
                :aria-expanded="isPanelOpen"
                @click="toggleMenu"
              >
                <HaHamburgerIcon
                  v-show="!isPanelOpen"
                  class="ho-the-header__hamburger-icon"
                  aria-hidden="true"
                  :class="{ 'is-open': isPanelOpen }"
                />
                <HaCloseIcon
                  v-show="isPanelOpen"
                  class="ho-the-header__hamburger-icon"
                  aria-hidden="true"
                  :class="{ 'is-open': isPanelOpen }"
                />
              </button>
            </div>
            <div
              id="header-navigation"
              class="ho-the-header__accordion-body"
              :inert="!isPanelOpen"
              :aria-hidden="!isPanelOpen"
            >
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
                      @click="closeMenu()"
                    >{{ link.text }}</a>
                    <HaAnchorLink
                      v-else
                      class="ho-the-header__accordion-link"
                      :href="link.href"
                      :text="link.text"
                      @clicked="closeMenu()"
                    />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <HaCrowdInfo />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HaHamburgerIcon from '../ha/icons/HaHamburgerIcon.vue'
import HaAnchorLink from '../ha/HaAnchorLink.vue'
import HaCloseIcon from '../ha/icons/HaCloseIcon.vue'
import HaLanguageSwitcher from '../ha/HaLanguageSwitcher.vue'
import HaCrowdInfo from '../ha/HaCrowdInfo.vue'

const { t } = useI18n()

export type NavLink
  = | { type: 'link', href: string, text: string }
    | { type: 'anchor', href: string, text: string }

defineProps<{
  navLinks: NavLink[]
}>()

const isPanelOpen = ref(false)
const isPanelClosing = ref(false)
const menuButtonRef = ref<HTMLButtonElement | null>(null)
let closeAnimationTimer: ReturnType<typeof setTimeout> | null = null

const closeMenu = (restoreFocus = false) => {
  if (!isPanelOpen.value) return
  isPanelOpen.value = false
  isPanelClosing.value = true

  if (closeAnimationTimer !== null) clearTimeout(closeAnimationTimer)
  closeAnimationTimer = setTimeout(() => {
    isPanelClosing.value = false
    closeAnimationTimer = null
  }, 300)

  if (restoreFocus) menuButtonRef.value?.focus()
}
const toggleMenu = () => {
  if (isPanelOpen.value) {
    closeMenu()
    return
  }

  if (closeAnimationTimer !== null) clearTimeout(closeAnimationTimer)
  closeAnimationTimer = null
  isPanelClosing.value = false
  isPanelOpen.value = true
}

onBeforeUnmount(() => {
  if (closeAnimationTimer !== null) clearTimeout(closeAnimationTimer)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

$vket-header-height-pc--real: v.$vket-header-height-pc - v.$vket-header-vertical-padding-pc * 2;
$vket-header-height-tb--real: v.$vket-header-height-tb - v.$vket-header-vertical-padding-tb * 2;

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

    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    align-items: center;

    width: 100%;
    max-width: v.$pc-content-body-width - v.$pc-content-body-padding * 2;
    height: $vket-header-height-pc--real;

    @include m.tb {
      height: $vket-header-height-tb--real;
    }

    @include m.sp {
      grid-template-columns: 1fr auto;
      gap: 12px;
      height: auto;
    }
  }

  &__left {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-self: start;

    height: $vket-header-height-pc--real;
    padding-right: 32px;
    padding-left: 32px;

    box-shadow: inset rgb(22 0 120 / 30%) 0 0 12px 0;

    @include m.tb {
      height: $vket-header-height-tb--real;
      padding-right: 24px;
      padding-left: 24px;
    }

    @include m.sp {
      padding-inline: 16px;
    }

    @include m.xs {
      padding-inline: 10px;
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

  }

  &__logo-link {
    display: flex;
  }

  &__logo {
    height: 50px;

    @include m.tb {
      height: 36px;
    }

    @include m.xs {
      height: 30px;
    }
  }

  &__accordion-wrapper {
    position: relative;
  }

  &__accordion-wrapper--inner {
    position: relative;
    z-index: 1;
    place-self: start end;
    height: $vket-header-height-pc--real;

    @include m.tb {
      height: $vket-header-height-tb--real;
    }

    @include m.sp {
      grid-area: 1 / 2;
    }
  }

  &__accordion {
    --accordion-corner-radius: calc(#{$vket-header-height-pc--real} / 2);

    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    gap: 0;
    align-items: end;

    width: fit-content;
    height: fit-content;
    min-height: $vket-header-height-pc--real;
    padding: 0;
    border-radius: var(--accordion-corner-radius);

    @include m.tb {
      --accordion-corner-radius: calc(#{$vket-header-height-tb--real} / 2);

      min-height: $vket-header-height-tb--real;
    }

    &.is-open,
    &.is-closing {
      width: max-content;
      max-width: calc(100vw - 32px);
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
    gap: 8px;
    align-items: center;

    box-sizing: border-box;
    min-height: $vket-header-height-pc--real;
    padding: 6px 12px;

    @include m.tb {
      gap: 4px;
      min-height: $vket-header-height-tb--real;
      padding: 3px 10px;
    }

    @include m.xs {
      padding-inline: 4px;
    }
  }

  // ハンバーガーボタン
  &__hamburger {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 52px;
    height: 52px;
    padding: 0;

    &:focus-visible {
      outline: 2px solid v.$vket-cyan;
      outline-offset: 2px;
    }

    &-icon {
      display: block;
      width: 40px;
      height: 40px;
      color: white;

      @include m.tb {
        width: 32px;
        height: 32px;
      }
    }

    @include m.tb {
      width: 44px;
      height: 44px;
    }
  }
}
</style>
