<script lang="ts" setup>
definePageMeta({
  layout: 'document',
})

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
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
@use '@/assets/styles/mixins' as m;

.md-document {
  padding: 88px 32px;

  @include m.sp {
    padding: 88px 12px;
  }

  &__card {
    position: relative;

    padding: 90px 0;
    border-radius: 20px;

    background-color: rgb(217 217 217 / 20%);
    box-shadow: inset rgb(black, 0.2) 0 0 16px 4px;

    @include m.sp {
      padding: 32px 12px;
    }

    &::before {
      pointer-events: none;
      content: '';

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      border-radius: inherit;

      background-image: linear-gradient(
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
          rgb(255 255 255 / 15%) 20px
        ),
        linear-gradient(
          315deg,
          rgb(255 255 255 / 75%) 10px,
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

  &__inner {
    max-width: 910px;
    margin: 0 auto;
  }

  :deep(h1) {
    font-size: 48px;
    color: white;
    text-align: center;

    @include m.sp {
      margin-bottom: 24px;
      font-size: 24px;
    }
  }

  :deep(h2) {
    margin-top: 6px;
    font-size: 32px;
    color: white;

    @include m.sp {
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 18px;
    }

    a {
      color: inherit;
    }
  }

  :deep(p) {
    font-size: 16px;
    line-height: 1.8;

    @include m.sp {
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 1.2;
    }
  }

  :deep(ol) {
    margin-bottom: 12px;
    padding-left: 1em;
    list-style-type: decimal;
  }

  :deep(ul) {
    margin-bottom: 12px;
    padding-left: 1em;
    list-style-type: disc;
  }

  :deep(li) {
    font-size: 16px;
    line-height: 1.8;

    @include m.sp {
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 1.2;
    }
  }

  :deep(hr) {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid #999;
  }
}
</style>
