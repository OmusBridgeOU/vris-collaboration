<template>
  <div class="layout -default">
    <HoTheHeader :nav-links="[]"/>
    <slot />
    <HoTheFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout.-default {
  overflow-x: hidden;
}
</style>
