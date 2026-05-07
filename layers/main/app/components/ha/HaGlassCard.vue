<!-- components/GlassCard.vue -->
<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'link'
  color: 'cyan' | 'magenta' | 'amber' | 'vermilion' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
  title: string
  label: string
  iconUrl?: string
  iconRadius?: number | 'full'
}>()
</script>

<template>
  <div
    :class="['glass-card', `glass-card--${color ?? 'cyan'}`]"
  >
    <div class="glass-card__head">
      <div class="glass-card__head-left">
        <div
          v-if="iconUrl"
          :class="['icon-box', `icon-box--${color ?? 'cyan'}`]"
        >
          <img
            :src="iconUrl"
            :alt="title"
          >
        </div>
        <div class="title-box">
          <p :class="['label', `label--${color ?? 'cyan'}`]">
            {{ label }}
          </p>
          <h3 class="title">
            {{ title }}
          </h3>
        </div>
      </div>
      <span
        v-if="variant=='link'"
        class="glass-card__head-right"
      >
        <img src="/icons/ep_right.svg">
      </span>
    </div>
    <div class="glass-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.glass-card {
  position: relative;
  padding: 22px 36px;
  border-radius: 20px;

  // グラスモーフィズム的な表現のための疑似要素
  &::after {
    pointer-events: none;
    content: '';

    position: absolute;
    inset: 0;

    padding: 1px; // ボーダーの太さ
    border-radius: inherit;

    background: rgb(88 88 88);

    mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  &--cyan {
    box-shadow: 0 0 20px 0 rgba(v.$vket-cyan, 0.4) inset;
  }

  &--magenta {
    box-shadow: 0 0 20px 0 rgba(v.$vket-magenta, 0.4) inset;
  }

  &--amber {
    box-shadow: 0 0 20px 0 rgba(v.$vket-amber, 0.4) inset;
  }

  &--vermilion {
    box-shadow: 0 0 20px 0 rgba(v.$vket-vermilion, 0.4) inset;
  }

  &--info {
    border-color: rgb(45 212 191 / 20%);
  }

  &--warning {
    border-color: rgb(251 191 36 / 20%);
  }

  // glass-card-head
  &__head{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__head-left {
    display: flex;
    gap: 12px;
  }

//   &__head-right {

//   }

  .icon-box{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 54px;
    height: 54px;
    border-radius: 20px;

    svg{
        height: 50%;
    }

    &--cyan {
        background: rgba(v.$vket-cyan, 0.4);
    }

    &--magenta {
        background: rgba(v.$vket-magenta, 0.4);
    }

    &--amber {
        background: rgba(v.$vket-amber, 0.4);
    }

    &--vermilion {
        background: rgba(v.$vket-vermilion, 0.4);
    }
  }

  .title-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
    padding: 4px 0;

    .label{
      font-size: 10px;
      font-weight: 700;
      line-height: 1em;

      &--cyan {
        color: v.$vket-cyan;
      }

      &--magenta {
        color: v.$vket-magenta;
      }

      &--amber {
        color: v.$vket-amber;
      }

      &--vermilion {
        color: v.$vket-vermilion;
      }
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1em;
    }
  }
}
</style>
