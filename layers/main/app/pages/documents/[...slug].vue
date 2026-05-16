<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
definePageMeta({
  layout: 'top',
})
</script>

<template>
  <div class="md-document">
    <div class="md-document__card">
      <div class="md-document__inner">
        <ContentRenderer
          v-if="page"
          :value="page"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.md-document {
  padding: 48px 32px;

  &__card {
    position: relative;

    padding-top: 90px;
    border-radius: 20px;

    background-color: rgb(217 217 217 / 20%);
    box-shadow: inset rgb(black, 0.2) 0 0 16px 4px;

    &::before {
      pointer-events: none;
      content:"";

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      border-radius: inherit;

      background-image:
      linear-gradient(
          45deg,
          rgb(v.$base-background-color, 0.8) 10px,
          rgb(v.$base-background-color, 0) 20px
      ),
      linear-gradient(
          225deg,
          rgb(v.$base-background-color, 0.8) 10px,
          rgb(v.$base-background-color, 0) 20px
      ),
      linear-gradient(
          135deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 15%) 20px,
      ),
      linear-gradient(
          315deg,
          rgb(255 255 255 / 75%) 10px,
          rgb(255 255 255 / 15%) 20px,
      );
      background-clip: border-box, border-box, border-box, border-box;
      background-origin: border-box, border-box, border-box, border-box;

      -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) border-box;
      mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  &__inner {
    max-width: 910px;
    margin: 0 auto;
  }

  :deep(h1) {
    font-size: 1.8rem;
    color: white;
    text-align: center;
  }

  :deep(h2) {
    margin-top: 2rem;
    border-bottom: 2px solid #333;
    font-size: 1.5rem;
    color: white;

    a{
      color: inherit;
    }
  }

  :deep(p) {
    line-height: 1.8;
  }

  :deep(.section-a) {
    h2 {
      color: red;
    }
  }

  :deep(.section-b) {
    h2 {
      color: blue;
    }
  }

  :deep(hr) {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid #999;
  }
}
</style>
