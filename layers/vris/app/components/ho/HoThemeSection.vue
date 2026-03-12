<template>
  <section
    id="theme"
    ref="sectionRef"
    class="section theme-section"
  />
</template>

<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)

defineExpose({
  sectionRef,
})
</script>

<style lang="scss" scoped>
.section {
  scroll-snap-align: start;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100dvh;
  padding: 4rem 2rem;
}
</style>
