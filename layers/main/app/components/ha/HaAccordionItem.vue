<script setup lang="ts">
import { ref } from 'vue'
import HaChevronDownIcon from './icons/HaChevronDownIcon.vue'

interface AccordionItem {
  id: number
  title: string
  contents: Array<string>
}

defineProps<{
  items: AccordionItem[]
}>()

const openId = ref<number | null>(null)

const toggle = (id: number) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="accordion glassy-box-2">
    <button
      v-for="item in items"
      :key="item.id"
      class="accordion-item glassy-box-2"
      :class="{ 'accordion-item--is-open': openId === item.id }"
      @click="toggle(item.id)"
    >
      <div class="accordion-item__header">
        <div class="accordion-item__left">
          <p class="accordion-item__label">
            Q{{ item.id }}
          </p>
          <p class="accordion-item__title">
            {{ item.title }}
          </p>
        </div>
        <HaChevronDownIcon class="accordion-item__icon" />
      </div>

      <div class="accordion-item__body">
        <div class="accordion-item__inner">
          <slot
            name="content"
            :item="item"
          />
        </div>
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.accordion {
    display: flex;
    flex-direction: column;
    gap: 12px;

    width: 100%;
    height: fit-content;
    padding: 70px 48px;

    @include m.tb {
      padding: 48px 24px;
      border-radius: 20px;
    }
}

.accordion-item {
    width: 100%;
    padding: 40px;

    background-color: rgb(42 63 99 / 0%);
    mix-blend-mode: plus-lighter;

    transition: background-color 1s ease;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__left {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    &__label {
      font-size: 20px;
      font-weight: 700;
      color: #258966;
    }

    &__title {
      font-size: 20px;
      font-weight: 700;
      color: white;
    }

    &__icon {
      transition: transform 0.3s ease;
    }

    &__body {
      display: grid;
      grid-template-rows: 0fr;
      padding-top: 0;
      transition: padding 0.3s ease, grid-template-rows 0.3s ease;
    }

    &__inner {
        overflow: hidden;

        padding-left: 44px;

        font-size: 16px;
        font-weight: 700;
        color: white;
        text-align: left;
    }

    &--is-open {
        background-color: rgb(42 63 99 / 60%);

        .accordion-item__icon {
          transform: rotate(180deg);
        }

        .accordion-item__body {
          grid-template-rows: 1fr;
          padding-top: 80px;
        }
    }
}

.glassy-box-2{
    position: relative;
    border-radius: 20px;
    box-shadow: inset rgb(70 132 255 / 35%) 0 0 8px 4px;

    &::before {
      width: 100%;
      height: 100%;
    }
}
</style>
