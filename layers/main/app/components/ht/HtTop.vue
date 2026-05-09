<i18n lang="yaml">
ja:
  hoge: ほげ
en:
  hoge: hoge
</i18n>

<template>
  <main class="ht-top">
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
      <HtScheduleSection />
    </section>

    <section id="exhibition">
      <HtExhibitionSection />
    </section>
  </main>
</template>

<script setup lang="ts">
import HaFirstView from '../ha/HaFirstView.vue'
import HtAboutSection from './HtAboutSection.vue'
import HtQuickAccessSection from './HtQuickAccessSection.vue'
import HtNewsSection from './HtNewsSection.vue'
import HtScheduleSection from './HtScheduleSection.vue'
import HtExhibitionSection from './HtExhibitionSection.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ht-top {
  width: 100%;
  height: 100%;
  background-color: rgb(15 27 46 / 100%)
}

section {
  padding: 0 136px 108px;
}
</style>
