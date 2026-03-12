<i18n lang="yaml">
ja:
  sections:
    hero: おはよー！
    news: お知らせﾀﾞﾖ-
    ticket: チケット購入！
    theme: キービジュ！
    lineup: ラインナップ！
    about: なるほど！
    outline: こんなイベント！
    corporate: ありがとー！！
    member: スタッフﾀﾞﾖー
    external: またね！
  ticketCta: チケット購入！
en:
  sections:
    hero: Hello!
    news: News!
    ticket: Buy Ticket!
    theme: Key Visual!
    lineup: Lineup
    about: About?
    outline: Outline!
    corporate: Thanks!!
    member: Members!!
    external: Bye!
  ticketCta: Buy Ticket!
</i18n>

<template>
  <div
    class="ho-vketchan"
    :class="{ '-sp': isSp, '-hovered': isHovered }"
    role="button"
    aria-label="Vket Character"
    tabindex="0"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <!-- Speech bubble -->
    <div class="speech-bubble">
      <div class="bubble-content">
        {{ displayText }}
      </div>
    </div>

    <img
      src="/images/2025Summer/character.png"
      alt="Vket Character"
      class="vketchan-image"
      loading="lazy"
    >
  </div>
</template>

<script setup lang="ts">
import { breakpoints } from '#vris/app/composables/useBreakpoints'

interface Props {
  currentSection?: number
  sections?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  currentSection: 0,
  sections: () => [],
})

const { t } = useI18n()
const isSp = breakpoints.smaller('sp')
const isHovered = ref(false)

const currentSectionName = computed(() => {
  if (!props.sections.length || props.currentSection < 0 || props.currentSection >= props.sections.length) {
    return ''
  }

  const sectionKey = props.sections[props.currentSection]
  return t(`sections.${sectionKey}`)
})

const displayText = computed(() => {
  return isHovered.value ? t('ticketCta') : currentSectionName.value
})

const handleClick = () => {
  window.open('https://t.livepocket.jp/e/vketreal_vris', '_blank')
}
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/variables' as v;
@use '#vris/app/assets/styles/mixins' as m;

.ho-vketchan {
  cursor: pointer;

  position: fixed;
  z-index: 1000;
  right: 20px;
  bottom: 20px;

  // Floating animation
  animation: float 3s ease-in-out infinite;

  .vketchan-image {
    position: relative;
    z-index: 1;

    display: block;

    width: 128px;
    height: auto;

    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &.-hovered {
    .speech-bubble .bubble-content {
      border-color: #ff6b35;
      color: #ff6b35;
      background: #fff8f5;
    }

    .speech-bubble {
      &::before {
        border-top-color: #ff6b35;
      }

      &::after {
        border-top-color: #fff8f5;
      }
    }
  }

  &.-sp {
    right: 16px;
    bottom: 16px;

    .vketchan-image {
      width: 80px;
    }

    .speech-bubble {
      right: -10px;
      bottom: 90px;

      &::before {
        right: 20px;
        bottom: -18px;
        border-width: 10px;
        border-top-width: 14px;
      }

      &::after {
        right: 22px;
        bottom: -12px;
        border-width: 8px;
        border-top-width: 10px;
      }

      .bubble-content {
        padding: 0.3rem 0.4rem;
        font-size: 0.75rem;
      }
    }
  }
}

.speech-bubble {
  position: absolute;
  z-index: 2;
  right: -20px;
  bottom: 140px;

  min-width: 120px;
  max-width: 200px;

  transition: all 0.3s ease;

  &::before {
    content: '';

    position: absolute;
    z-index: 1;
    right: 30px;
    bottom: -24px;

    border: 12px solid transparent;
    border-top: 18px solid #00A95F;
  }

  &::after {
    content: '';

    position: absolute;
    z-index: 2;
    right: 32px;
    bottom: -18px;

    border: 10px solid transparent;
    border-top: 14px solid #fff;
  }

  .bubble-content {
    position: relative;

    padding: 0.4rem 0.5rem;
    border: 3px solid #00A95F;
    border-radius: 12px;

    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.3;
    color: #00A95F;
    text-align: center;

    background: #fff;
    box-shadow: 4px 4px 0 rgb(0 0 0 / 10%);

    transition: all 0.3s ease;
  }

}

// Floating animation
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

// Responsive adjustments
@include m.sp {
  .ho-vketchan {
    right: 12px;
    bottom: 12px;

    .vketchan-image {
      width: 72px;
    }
  }
}

// Extra small screen adjustments
@media (width <= 375px) {
  .ho-vketchan {
    right: 10px;
    bottom: 10px;

    .vketchan-image {
      width: 64px;
    }

    .speech-bubble {
      right: -8px;
      bottom: 75px;
    }
  }
}
</style>
