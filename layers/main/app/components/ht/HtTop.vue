<i18n lang="yaml">
ja:
  hoge: ほげ
en:
  hoge: hoge
</i18n>

<template>
  <div class="ht-top">
    <HaFirstView />
    <section id="quick-access">
      <HtQuickAccessSection />
    </section>

    <section id="about">
      <HtAboutSection />
    </section>

    <section id="news">
      <HtNewsSection />
    </section>

    <section id="schedule">
      <HtSchedule />
    </section>
  </div>
</template>

<script setup lang="ts">
import HaFirstView from '../ha/HaFirstView.vue'
import HtAboutSection from './HtAboutSection.vue'
import HtQuickAccessSection from './HtQuickAccessSection.vue'
import HtNewsSection from './HtNewsSection.vue'
import HtSchedule from './HtSchedule.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ht-top {
  width: 100%;
  height: 100%;
}

section {
  padding: 0 136px 108px;
}
</style>
