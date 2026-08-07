<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="glassy-box-4 glassy-box-4--radius-min circle-card">
    <p class="circle-card__name">
      {{ name }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.circle-card{
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 20px;

  @include m.sp {
    padding: 16px;
  }

  &__name {
    width: 100%;

    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: white;
    text-align: center;
    overflow-wrap: anywhere;

    @include m.sp {
      font-size: 16px;
    }
  }
}
</style>
