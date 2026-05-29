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
  <div class="accordion glassy-box accordion-glassy-box none-hover-animation">
    <button
      v-for="item in items"
      :key="item.id"
      class="accordion-item glassy-box accordion-glassy-box none-hover-animation"
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
        <div class="accordion-item__icon">
          <HaChevronDownIcon />
        </div>
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

  @include m.sp {
    padding: 32px 16px;
  }
}

.accordion-item {
  width: 100%;
  padding: 40px;

  background-color: rgb(42 63 99 / 0%);
  mix-blend-mode: plus-lighter;

  transition: background-color 1s ease;

  @include m.sp {
    padding: 16px;
  }

  &__header {
    display: flex;
    gap: 16px;
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
    white-space: nowrap;

    @include m.sp {
      font-size: 16px;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: white;
    text-align: left;

    @include m.sp {
      font-size: 12px;
    }
  }

  &__icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    transition: transform 0.3s ease;

    @include m.sp {
      width: 20px;
      height: 20px;
    }
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

    @include m.sp {
      font-size: 12px;
      font-weight: normal;
    }
  }

  &--is-open {
    background-color: rgb(42 63 99 / 60%);

    .accordion-item__icon {
      transform: rotate(180deg);
    }

    .accordion-item__body {
      grid-template-rows: 1fr;
      padding-top: 80px;

      @include m.sp {
        padding-top: 32px;
      }
    }
  }
}

.accordion-glassy-box {
  box-shadow: inset rgb(70 132 255 / 35%) 0 0 8px 4px;
}
</style>
