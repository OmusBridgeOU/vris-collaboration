<template>
  <a
    :href="item.href"
    target="_blank"
    rel="noopener noreferrer"
    class="content-card glassy-box-2"
  >
    <p class="content-card__title">{{ item.title }}</p>
    <p class="content-card__text">{{ item.text }}</p>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  item: { title: string, href: string, text: string }
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.content-card {
  cursor: pointer;

  display: block;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 460px;
  padding: 32px 24px;

  background-color: rgb(18 33 59 / 60%);

  @include m.tb {
    min-height: 380px;
  }

  @include m.sp {
    min-height: 340px;
  }

  &__title {
    margin-bottom: 16px;
    font-size: 20px;
    line-height: 1.2em;
    color: v.$vket-amber;

    @include m.sp {
      margin-bottom: 12px;
      font-size: 16px;
    }
  }

  &__text {
    margin-bottom: 6px;
    color: white;
  }
}
</style>
