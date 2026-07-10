<script setup lang="ts">
import HaInfoIcon from './icons/HaInfoIcon.vue'

const { t } = useI18n()

const brSlots = ['br', 'br1', 'br2', 'br3']

interface InfoItem {
  labelKey: string
  textKey: string
  brClass?: string
}

defineProps<{
  titleKey: string
  items: InfoItem[]
}>()
</script>

<template>
  <div class="info-card glassy-box-2 none-hover-animation">
    <div class="info-card__head">
      <div class="info-card__icon">
        <HaInfoIcon />
      </div>
      <h4 class="info-card__title">
        {{ t(titleKey) }}
      </h4>
    </div>
    <div class="info-card__body">
      <div class="info-card__items">
        <div
          v-for="item in items"
          :key="item.labelKey"
          class="info-card__item"
        >
          <p class="info-card__label">
            {{ t(item.labelKey) }}
          </p>
          <p class="info-card__text">
            <i18n-t
              :keypath="item.textKey"
              tag="span"
              scope="global"
            >
              <template
                v-for="slot in brSlots"
                #[slot]=""
                :key="slot"
              >
                <br :class="item.brClass">
              </template>
            </i18n-t>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.info-card {
  display: flex;
  flex-direction: column;
  gap: 6px;

  width: 100%;
  height: 100%;
  min-height: 340px;
  padding: 32px;

  background-color: rgb(18 33 59 / 60%);

  @include m.tb {
    padding: 24px;
  }

  &__head {
    display: flex;
    gap: 24px;
    align-items: center;

    @include m.sp {
      gap: 8px;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    border-radius: 5px;

    background: rgb(30 53 91 / 100%);

    @include m.sp {
      width: 28px;
      height: 28px;
    }

    svg {
      width: 60%;
      height: 60%;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
  }

  &__body {
    flex-grow: 1;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid rgb(86 86 86 / 100%);

    &:last-of-type {
      border: none;
    }
  }

  &__label {
    margin-right: 16px;

    font-size: 16px;
    font-weight: bold;
    color: v.$vket-amber;
    white-space: nowrap;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__text {
    font-size: 16px;
    color: white;
    text-align: right;

    @include m.sp {
      font-size: 14px;
    }
  }
}
</style>
