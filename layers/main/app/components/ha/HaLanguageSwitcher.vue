<script setup lang="ts">
import type { Locale } from 'vue-i18n'
import HaPullDown from './icons/HaPullDown.vue'

const { locale, locales, setLocale } = useI18n()

// 現在選択中の言語情報（表示ラベル取得用）
const availableLocales = computed(() => {
  return (locales.value ?? []).filter(l => typeof l !== 'string')
})

const currentLocaleLabel = computed(() => {
  return locale.value.toUpperCase()
})

// 開閉状態
const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

// 言語選択時の処理

// 本来i18nが想定するのは下記のような処理だが、フルリロードを挟まないためGSAPのScrollTriggerがリセットされない。
// 言語切替の頻度は高くないと予想するため、window.location.hrefを用いてフルリロードを挟むようにしている。
// const selectLocale = (code: Locale) => {
//   const path = switchLocalePath(code)
//   if (path) {
//     window.location.href = path
//   }
// }
const selectLocale = async (code: Locale) => {
  await setLocale(code)
  await nextTick()
  window.location.reload()
}

// 外側クリックで閉じる
const rootRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="rootRef"
    class="language-switcher glassy-box-4 none-hover-animation"
    :class="{ 'is-open': isOpen }"
    @click="toggleOpen"
  >
    <span class="language-switcher__current-language">{{ currentLocaleLabel }}</span>
    <HaPullDown class="language-switcher__pulldown" />

    <ul
      v-if="isOpen"
      role="listbox"
      class="language-switcher__list glassy-box-2 none-hover-animation"
      @click.stop
    >
      <li
        v-for="l in availableLocales"
        :key="l.code"
        role="option"
        :aria-selected="l.code === locale"
        class="language-switcher__list-item"
      >
        <button
          type="button"
          class="language-switcher__list-item-button none-hover-animation"
          :class="{ 'is-selected': l.code === locale }"
          @click="selectLocale(l.code)"
        >
          <span class="language-switcher__language">{{ l.name }}</span>
          <span class="language-switcher__language language-switcher__language--min">{{ l.code.toUpperCase() }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.language-switcher {
    cursor: pointer;

    position: relative;

    display: flex;
    align-items: center;

    width: fit-content;
    height: fit-content;
    padding: 8px 16px;

    &__current-language {
        margin-right: 4px;

        font-size: 12px;
        font-weight: bold;
        color: white;
        white-space: nowrap;
    }

    &__pulldown {
        flex-shrink: 0;
        width: 12px;
        height: 12px;
        transition: transform 0.2s ease;
    }

    &.is-open &__pulldown {
        transform: rotate(180deg);
    }

    &__list {
        position: absolute;
        top: 52px;
        right: 0;

        padding: 10px;

        background-color: rgb(43 43 87 / 65%);
        box-shadow: inset rgb(79 138 255 / 35%) 0 0 8px 4px;

        &::before {
            pointer-events: none;
            content: '';

            position: absolute;
            z-index: 0;
            inset: 0;

            width: 100%;
            height: 100%;
            border: 1px solid transparent;
            border-radius: inherit;

            background-image: linear-gradient(
            45deg,
            rgb(v.$base-background-color, 0.75) 10px,
            rgb(v.$base-background-color, 0) 20px
            ),
            linear-gradient(
            225deg,
            rgb(v.$base-background-color, 0.75) 10px,
            rgb(v.$base-background-color, 0) 20px
            ),
            linear-gradient(
            135deg,
            rgb(255 255 255 / 65%) 10px,
            rgb(255 255 255 / 15%) 20px
            ),
            linear-gradient(
            315deg,
            rgb(255 255 255 / 65%) 10px,
            rgb(255 255 255 / 15%) 20px
            );
            background-clip: border-box, border-box, border-box, border-box;
            background-origin: border-box, border-box, border-box, border-box;

            -webkit-mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0) border-box;
            mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0) border-box;
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
        }
    }

    &__list-item-button {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        min-width: 200px;
        padding: 10px;
        border-radius: 10px;

        &.is-selected {
            background-color: rgb(67 81 131 / 65%);
            box-shadow: inset rgb(79 138 255 / 35%) 0 0 8px 4px;
        }
    }

    &__language {
        margin-right: 40px;

        font-size: 12px;
        font-weight: bold;
        color: white;
        white-space: nowrap;

        &--min {
            margin-right: 0;
        }
    }
}
</style>
