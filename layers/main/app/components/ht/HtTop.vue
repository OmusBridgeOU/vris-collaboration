<i18n lang="yaml">
ja:
  hoge: ほげ
en:
  hoge: hoge
</i18n>

<template>
  <main class="ht-top">
    <div class="canvas-wrapper">
      <HaConfetti />
      <HaFireworks />
    </div>

    <HtHeroSection />

    <HaFirstView />

    <section id="cloud-levels">
      <HtCrowdLevelsSection />
    </section>

    <section id="quick-access">
      <HtQuickAccessSection />
    </section>

    <section id="about">
      <HtAboutSection />
    </section>

    <section id="news">
      <HtNewsSection />
    </section>

    <section id="contents">
      <HtContentsSection />
    </section>

    <section id="schedule">
      <HtScheduleSection />
    </section>

    <section id="exhibition">
      <HtExhibitionSection />
    </section>

    <section id="access">
      <HtAccessSection />
    </section>

    <section id="ticket">
      <HtTicketSection />
    </section>

    <section id="qa">
      <HtQandASection />
    </section>

    <section id="code-of-conduction">
      <HtCodeOfConductSection />
    </section>

    <section id="related-events">
      <HtRelatedEventsSection />
    </section>

    <section id="sponsors-and-partners">
      <HtSponsorsAndPartnersSection />
    </section>

    <section id="contact">
      <HtContactSection />
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
import HtAccessSection from './HtAccessSection.vue'
import HtTicketSection from './HtTicketSection.vue'
import HtQandASection from './HtQandASection.vue'
import HtCodeOfConductSection from './HtCodeOfConductSection.vue'
import HtSponsorsAndPartnersSection from './HtSponsorsAndPartnersSection.vue'
import HtContactSection from './HtContactSection.vue'
import HtContentsSection from './HtContentsSection.vue'
import HtRelatedEventsSection from './HtRelatedEventsSection.vue'
import HtCrowdLevelsSection from './HtCrowdLevelsSection.vue'
import HtHeroSection from './HtHeroSection.vue'
import HaFireworks from '../ha/HaFireworks.vue'
import HaConfetti from '../ha/HaConfetti.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ht-top {
  position: relative;
  z-index: 0;

  width: 100%;
  height: 100%;

  background-color: v.$base-background-color;
}

.canvas-wrapper {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

section {
  padding: 0 136px 108px;

  @include m.tb {
    padding: 0 24px 84px;
  }
}
</style>
