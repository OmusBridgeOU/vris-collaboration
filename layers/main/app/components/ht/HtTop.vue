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

        <section id="exhibitor-info">
          <HtExhibitorInfoSection />
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

        <section id="schedule">
          <HtScheduleSection />
        </section>

        <section id="location-info">
          <HtAccessSection />
        </section>

        <section id="sponsors-and-partners">
          <HtSponsorsAndPartnersSection />
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
import HtHeroSection from './HtHeroSection.vue'
import HtAboutSection from './HtAboutSection.vue'
import HtExhibitorInfoSection from './HtExhibitorInfoSection.vue'
import HtNewsSection from './HtNewsSection.vue'
import HtContentsSection from './HtContentsSection.vue'
import HtAccessSection from './HtAccessSection.vue'
import HtScheduleSection from './HtScheduleSection.vue'
import HtSponsorsAndPartnersSection from './HtSponsorsAndPartnersSection.vue'
import HtQandASection from './HtQandASection.vue'
import HtContactSection from './HtContactSection.vue'

import HaFireworks from '../ha/HaFireworks.vue'
import HaConfetti from '../ha/HaConfetti.vue'
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
    padding-top: 124px;
    border-radius: 36px 36px 0 0;
    background-color: v.$base-background-color;

    @include m.sp {
      padding-top: 64px;
    }
  }

  &__main {
    position: relative;
    z-index: 2;
    max-width: 1600px;
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
  padding: 0 136px 108px;

  &:first-of-type {
    padding-top: 24px;
  }

  @include m.tb {
    padding: 0 16px 84px;
  }
}

#contact {
  padding-bottom: 220px;

  @include m.tb {
    padding-bottom: 180px;
  }

  @include m.sp {
    padding-bottom: 124px;
  }
}
</style>
