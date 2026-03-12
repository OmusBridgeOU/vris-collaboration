<template>
  <div class="layout -top">
    <HoTheHeader
      :sections="sections"
      :currentSection="currentSection"
      :isHeaderTransparent="isHeaderTransparent"
    />
    <main class="main">
      <slot />
    </main>
    <HoTheFooter
      class="footer"
    />
  </div>
</template>

<script setup lang="ts">
import { useSectionState } from '#vris/app/composables/useSectionState'

// Use shared section state
const { currentSectionIndex, sections } = useSectionState()
const isHeaderTransparent = ref(true)

// Convert currentSectionIndex to currentSection for backward compatibility
const currentSection = computed(() => currentSectionIndex.value)
</script>

<style lang="scss" scoped>
@use "#vris/app/assets/styles/mixins" as m;

.layout.-top {
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100dvh;
  padding-top: 4rem;

  @include m.sp {
    padding-top: 3rem;
  }

  > .main {
    position: relative;
    flex: 1;
  }

  > .footer {
    position: fixed;
    z-index: 1;
    bottom: 0;
    margin-top: auto;
  }
}
</style>
