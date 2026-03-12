<template>
  <div class="layout -top">
    <HoTheHeader
      :sections="sections"
      :currentSection="currentSection"
      :isHeaderTransparent="isHeaderTransparent"
    />
    <slot />
    <HoTheFooter />
    <HoVketchan
      :currentSection="currentSection"
      :sections="stringSections"
    />
  </div>
</template>

<script setup lang="ts">
import HoVketchan from '#vris/app/components/ho/HoVketchan.vue'
import { useSectionState } from '#vris/app/composables/useSectionState'

// Use shared section state
const { currentSectionIndex, sections } = useSectionState()
const stringSections = sections as unknown as string[]
const isHeaderTransparent = ref(true)

// Convert currentSectionIndex to currentSection for backward compatibility
const currentSection = computed(() => currentSectionIndex.value)
</script>
