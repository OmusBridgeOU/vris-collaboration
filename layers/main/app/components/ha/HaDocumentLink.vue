<script setup lang="ts">
defineProps<{
  color: 'green' | 'cyan' | 'magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
  title: string
  label: 'important' | 'required' | 'Q&A'
  text: string
}>()
</script>

<template>
  <div class="document-link">
    <div :class="['document-link__left', `document-link__left--${color}`]">
      <slot name="icon" />
    </div>
    <div class="document-link__right">
      <div class="document-link__row">
        <p class="document-link__title">
          出展ガイドライン
        </p>
        <div :class="['document-link__label', `document-link__label--${label=='important' ? 'amber' : label=='required' ? 'vermilion' : label=='Q&A' ? 'magenta' : ''}`]">
          <p class="document-link__label-text">
            {{ label=='important' ? '重要' : label=='required' ? '必読' : label=='Q&A' ? 'Q&A' : '' }}
          </p>
        </div>
      </div>
      <p class="document-link__text">
        出展に必要なルール・準備事項をまとめた公式ガイド
      </p>
      <NuxtLink class="document-link__link">全文をチェック→</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.document-link {
    overflow: hidden;
    display: flex;

    min-height: 150px;
    border-radius: 20px;

    background: rgb(217 217 217 / 20%);

    @include m.tb {
      min-height: 105px;
    }

  &__left {
    position: relative;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 286px;
    height: inherit;
    border-radius: 20px 0 0 20px;

    @include m.tb {
      width: 124px;
    }

    &::before {
      content: "";

      position: absolute;
      inset: 0;

      border: 1.5px solid transparent;
      border-radius: 20px 0 0 20px;

      background-image:
        linear-gradient(
          135deg,
          rgb(255 255 255 / 30%) 20px,
          rgb(255 255 255 / 0%) 150px
        ),
        linear-gradient(
          to left,
          rgb(255 255 255 / 10%),
          rgb(255 255 255 / 10%)
        );
      background-clip: border-box, border-box;
      background-origin: border-box, border-box;

      -webkit-mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }

    &--green {
        background-color: rgba(#43ffbd, 0.4);
    }

    &--cyan {
        background-color: rgba(v.$vket-cyan, 0.4);
    }

    &--magenta {
        background-color: rgba(v.$vket-magenta, 0.4);
    }

    &__icon {
      width: 40px;
      height: 40px;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
    justify-content: center;

    width: 100px;
    height: inherit;
    padding: 18px 22px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

    &__title {
        font-size: 20px;
        font-weight: 700;
        color: white;
    }

    &__text {
        font-size: 14px;
        color: white;
    }

    &__link {
        font-size: 12px;
        color: #43ffbd;
        text-decoration: underline;
    }

    &__label {
        width: fit-content;
        padding: 3px 5px;
        border-radius: 6px;

        &--amber {
            background-color: rgba(v.$vket-amber, 0.6);
        }

        &--vermilion {
            background-color: rgba(v.$vket-vermilion, 0.6);
        }

        &--magenta {
            background-color: rgba(v.$vket-magenta, 0.6);
        }
    }

    &__label-text {
        font-size: 14px;
        font-weight: 400;
        color: white;
    }
}
</style>
