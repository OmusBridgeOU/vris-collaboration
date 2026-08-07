<i18n lang="yaml">
ja:
  hoge: ほげ
en:
  hoge: hoge
</i18n>

<template>
  <main class="ht-top content-wrapper">
    <div class="content-wrapper__sticky">
      <HtHeroSection />
    </div>

    <div class="content-wrapper__bg content-wrapper__scroll">
      <div class="canvas-wrapper">
        <HaConfetti />
        <HaFireworks />
      </div>

      <div class="content-wrapper__main">
        <section id="about">
          <HtAboutSection />
        </section>

        <section id="participation-guide">
          <HtParticipationGuide />
        </section>

        <section id="news">
          <HtNewsSection />
        </section>

        <section id="contents">
          <HtContentsSection />
        </section>

        <section id="exhibitor-circles">
          <HtExhibitorCirclesSection />
        </section>

        <section id="schedule">
          <HtScheduleSection />
        </section>

        <section id="location-info">
          <HtAccessSection />
        </section>

        <section id="exhibitor-info">
          <HtExhibitorInfoSection />
        </section>

        <section id="sponsors-and-partners">
          <HtSponsorsAndPartnersSection />
        </section>

        <section id="members">
          <HtMemberSection />
        </section>

        <section id="qa">
          <HtQandASection />
        </section>

        <section id="contact">
          <HtContactSection />
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// import HtQuickAccessSection from './HtQuickAccessSection.vue'
// import HtCrowdLevelsSection from './HtCrowdLevelsSection.vue'
// import HtExhibitionSection from './HtExhibitionSection.vue'
// import HtCodeOfConductSection from './HtCodeOfConductSection.vue'
// import HtRelatedEventsSection from './HtRelatedEventsSection.vue'
// import HtTicketSection from './HtTicketSection.vue'
import HtAboutSection from './HtAboutSection.vue'
import HtAccessSection from './HtAccessSection.vue'
import HtContactSection from './HtContactSection.vue'
import HtContentsSection from './HtContentsSection.vue'
import HtExhibitorCirclesSection from './HtExhibitorCirclesSection.vue'
import HtExhibitorInfoSection from './HtExhibitorInfoSection.vue'
import HtHeroSection from './HtHeroSection.vue'
import HtNewsSection from './HtNewsSection.vue'
import HtQandASection from './HtQandASection.vue'
import HtScheduleSection from './HtScheduleSection.vue'
import HtSponsorsAndPartnersSection from './HtSponsorsAndPartnersSection.vue'

import HaConfetti from '../ha/HaConfetti.vue'
import HaFireworks from '../ha/HaFireworks.vue'
import HtMemberSection from './HtMemberSection.vue'
import HtParticipationGuide from './HtParticipationGuide.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ht-top {
  position: relative;
  z-index: 0;

  width: 100%;
  height: 100%;
  margin-bottom: -40px;
}

.content-wrapper {
  position: relative;

  &__sticky {
    position: sticky;
    z-index: -1;
    top: 0;
  }

  &__bg {
    padding: 108px 0 48px;
    border-radius: 36px 36px 0 0;
    background-color: v.$base-background-color;

    @include m.tb {
      padding: 168px 0 64px;
    }
  }

  &__main {
    position: relative;
    z-index: 2;
    max-width: v.$pc-content-body-width;
    margin: 0 auto;
  }
}

.canvas-wrapper {
  pointer-events: none;

  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100svh;
  margin-bottom: -100svh;
}

section {
  margin-bottom: 80px;
  padding: 0 v.$pc-content-body-padding;

  @include m.tb {
    margin-bottom: 52px;
    padding: 0 24px;
  }

  @include m.sp {
    margin-bottom: 32px;
    padding: 0 16px;
  }
}
</style>
