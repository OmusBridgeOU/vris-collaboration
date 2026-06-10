<i18n lang="yaml">
ja:
  nav:
    top: トップ
    privacy: プライバシーポリシー
    guideline: 出展ガイドライン
    terms: 出展規約
    twitter: 公式X
    2025Summer: VketReal in 札幌 2025 Summer
    contact: お問い合わせ
    company: 法人問い合わせ
    press: 広報問い合わせ
    pressrelease: プレスリリース
    ltGuideline: LT登壇ガイドライン
    faq: よくある質問（FAQ）
    codeOfConduct: 行動規範
  button:
    ticket_purchase: チケット購入
  message:
    check_announcement: イベントに一般参加される方は、一般参加者向けVketReal in 札幌 2025 Summer ガイドをチェック！
    2025summer_closed: "VketReal in 札幌 2025 Summerは大盛況のなか、閉幕いたしました。ご参加いただきありがとうございました！"
    2026Evennt_guide:  VketReal mini in 札幌 2026 Early Springイベントガイドはこちら
en:
  nav:
    top: Top
    privacy: Privacy Policy
    guideline: Exhibition Guidelines
    terms: Exhibition Terms
    twitter: Official X
    2025Summer: VketReal in Sapporo 2025 Summer
    contact: Contact Us
    company: Corporate Inquiry
    press: Press Inquiry
    pressrelease: Press Release
    ltGuideline: LT Guidelines
    faq: FAQ
    codeOfConduct: Code of Conduct
  button:
    ticket_purchase: Buy Tickets
  message:
    check_announcement: If you are participating in the event as a general attendee, please check the VketReal in Sapporo 2025 Summer Guide for General Attendees!
    2025summer_closed: "VketReal in Sapporo 2025 Summer has concluded successfully. Thank you for your participation!"
    2026Evennt_guide: Here is the event guide for VketReal mini in Sapporo 2026 Early Spring
</i18n>

<template>
  <header
    class="header"
    :class="{ 'header--transparent': isHeaderTransparent }"
  >
    <div class="header-inner">
      <HaLink
        to="/"
        class="logo"
      >
        <HaImage
          src="/images/logo-noyear.png"
          alt="VketReal in SAPPRORO"
          class="logo-image"
        >
        </haimage>
      </HaLink>
      <template v-if="showMenu">
        <div class="header-controls">
          <button
            class="lang-button"
            :aria-label="`言語を${currentLocale === 'ja' ? '英語' : '日本語'}に切り替える`"
            @click="toggleLanguage"
          >
            {{ currentLocale === 'ja' ? '日本語' : 'English' }}
          </button>
          <!-- NOTE: チケットボタン -->
          <!-- <HaLink
            to="https://t.livepocket.jp/e/vketreal_vris"
            class="ticket-button"
            force-anchor-link
            blank
          >
            {{ t('button.ticket_purchase') }}
          </HaLink> -->
          <button
            class="menu-button"
            :class="{ 'menu-button--active': isMenuOpen }"
            :aria-expanded="isMenuOpen"
            :aria-label="isMenuOpen ? '閉じる' : 'メニューを開く'"
            aria-controls="navigation-menu"
            @click="toggleMenu"
          >
            <span class="menu-button__line" />
            <span class="menu-button__line" />
            <span class="menu-button__line" />
          </button>
        </div>
        <nav
          id="navigation-menu"
          class="nav"
          :class="{ 'nav--open': isMenuOpen }"
          role="navigation"
          :aria-hidden="!isMenuOpen"
        >
          <ul class="nav-list">
            <li
              v-for="item in navigationItems"
              :key="item.key"
              class="nav-item"
            >
              <component
                :is="item.external ? 'a' : HaLink"
                :to="item.external ? undefined : item.path"
                :href="item.external ? item.path : undefined"
                :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener noreferrer' : undefined"
                @click="toggleMenu"
              >
                {{ t(`nav.${item.key}`) }}
              </component>
            </li>
          </ul>
        </nav>
      </template>
    </div>
    <template v-if="isShowGuideBar">
      <HaLink
        class="guide"
        :to="guidePath"
      >
        <HmButton class="button">
          <span class="text">
            <span class="text-content">{{ guideBarText }}</span>
            <span class="text-content">{{ guideBarText }}</span>
          </span>
        </HmButton>
      </HaLink>
    </template>
  </header>
</template>

<script setup lang="ts">
import HaLink from '#base/app/components/ha/HaLink.vue'

const { t, locale, setLocale } = useI18n()
const route = useRoute()

const isMenuOpen = ref(false)
const currentLocale = computed(() => locale.value)

const navigationItems = [
  { key: 'top', path: '/' },
  { key: '2025Summer', path: '/2025Summer' },
  { key: 'privacy', path: '/docs/privacy-policy' },
  { key: 'codeOfConduct', path: '/docs/code-of-conduct' },
  { key: 'guideline', path: '/docs/2026early-spring/exhibition-guideline' },
  { key: 'terms', path: '/docs/2026early-spring/exhibition-terms' },
  { key: 'ltGuideline', path: '/docs/2026early-spring/lt-guideline' },
  { key: 'faq', path: '/docs/2026early-spring/faq' },
  { key: 'pressrelease', path: 'https://presswalker.jp/company/14682', external: true },
  { key: 'twitter', path: 'https://x.com/vketreal_vris', external: true },
  { key: 'contact', path: 'https://forms.gle/hnsfBRRnQZq4hLQP7', external: true },
  { key: 'company', path: 'https://forms.gle/FuVGEQK23zbFuqgM8', external: true },
  { key: 'press', path: 'https://forms.gle/GNQfz8mVaENsDK4M9', external: true },
]

defineProps({
  isHeaderTransparent: {
    type: Boolean,
    default: false,
  },
  showMenu: {
    type: Boolean,
    default: true,
  },
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleLanguage = async () => {
  if (locale.value === 'ja') {
    await setLocale('en')
  } else {
    await setLocale('ja')
  }
}

const isShowGuideBar = computed(() => {
  return route.path.includes('/2025Summer') || route.path === '/'
})

const guideBarText = computed(() => {
  return route.path.includes('/2025Summer') ? t('message.2025summer_closed') : t('message.2026Evennt_guide')
})

const guidePath = computed(() => {
  return route.path.includes('/2025Summer') ? '/' : '/docs/2026early-spring/event-notification'
})
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/_variables' as v;
@use '#vris/app/assets/styles/_mixins' as m;

.header {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;

  width: 100%;
  padding: 1rem 0.5rem;

  background: rgb(255 255 255 / 90%);
  backdrop-filter: blur(10px);

  transition: background-color 0.3s ease;

  @include m.sp {
    padding: 0.75rem 0.5rem;
  }

  &--transparent {
    background: rgb(255 255 255 / 50%);
  }

  &-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;

    @include m.sp {
      padding: 0;
    }
  }
}

.logo {
  &-image {
    width: auto;
    height: 40px;

    @include m.sp {
      height: 30px;
    }
  }
}

.header-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.lang-button {
  cursor: pointer;

  padding: 0.5rem 1rem;
  border: 1px solid #000;
  border-radius: 4px;

  font-size: 0.875rem;
  color: #000;

  background: none;

  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: #000;
  }

  @include m.sp {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
}

.ticket-button {
  cursor: pointer;

  display: inline-block;

  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;

  font-size: 0.875rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;

  background: #00A95F;

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    background: #008a4e;
  }

  @include m.sp {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
}

.menu-button {
  cursor: pointer;

  position: relative;
  z-index: 1001;

  display: block;

  margin: -0.5rem;
  padding: 0.5rem;
  border: none;

  background: none;

  @include m.sp {
    margin: -0.375rem;
    padding: 0.375rem;
  }

  &__line {
    display: block;

    width: 24px;
    height: 2px;
    margin: 5px 0;

    background: #000;

    transition: 0.3s;
  }

  &--active {
    .menu-button__line {
      &:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(100%);

  display: block;

  width: 100%;
  height: 100vh;
  padding-top: 80px;

  background: rgb(255 255 255 / 98%);
  backdrop-filter: blur(20px);

  transition: transform 0.3s ease;

  @include m.sp {
    padding-top: 60px;
  }

  &--open {
    transform: translateX(0);
    overflow-y: auto;
  }

  &-list {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    max-height: calc(100vh - 80px);
    padding: 2rem;

    list-style: none;

    @include m.sp {
      gap: 0.25rem;
      max-height: calc(100vh - 60px);
      padding: 1.5rem;
    }
  }

  &-item {
    text-align: center;

    a {
      display: block;

      padding: 1rem;
      border-radius: 20px;

      font-size: 1.2rem;
      font-weight: bold;
      color: #000;
      text-decoration: none;

      transition: all 0.3s ease;

      @include m.sp {
        padding: 0.875rem 1rem;
        font-size: 1.1rem;
      }

      &:hover {
        color: #00A95F;
        background: rgb(0 169 95 / 10%);
      }

      &.router-link-active {
        transform: translateY(-2px);
        color: #00A95F;
        background: rgb(0 169 95 / 10%);
      }
    }
  }
}

.header > .guide {
  position: fixed;
  z-index: -1;
  bottom: -32px;
  left: 0;

  width: 100vw;
  height: 32px;

  > .button {
    overflow: hidden;
    width: 100%;
    height: 100%;

    > .text {
      will-change: transform;

      display: inline-block;

      padding-left: 100%;

      white-space: nowrap;

      animation: marquee 20s linear infinite;

      > .text-content {
        display: inline-block;
        padding-right: 50px; // テキスト間のスペース
      }
    }
  }
}

@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-100%, 0);
  }
}

// SP版でアニメーション速度調整
@include m.sp {
  .header > .guide > .button > .text {
    animation-duration: 15s;
  }
}

// prefers-reduced-motion対応
@media (prefers-reduced-motion: reduce) {
  .header > .guide > .button > .text {
    padding-left: 0;
    animation: none;
  }
}
</style>
