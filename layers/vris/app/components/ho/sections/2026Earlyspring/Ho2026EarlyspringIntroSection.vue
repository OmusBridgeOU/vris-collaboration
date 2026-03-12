<i18n lang="yaml">
ja:
  intro:
    eyebrow: About
    title: 「VketReal mini in 札幌 2026 Early Spring」とは？
    lead: 今回のテーマは「閉ざされた世界から開かれた世界へ」。展示 x LT x 飲食が融合した、これまでにないVketRealを、札幌の地で、地域クリエイターと有志チームがお届けします。
    points:
      item1:
        title: 札幌でも！「バーチャルの姿のまま」体験できる
        description: アバターとしての生き方を大切にする人々がリアルの場で集い、交流し、共にクリエイティブな未来を築く場として開催することを目指します！
      item2:
        title: 札幌でも！VRの世界で活躍するクリエイターの出展
        description: VRとリアルを行き来しながら活躍するクリエイターの作品展示や、最新技術を活用したインタラクティブでおもしろい企画を展開！
      item3:
        title: 札幌でも！遊んで、買って、楽しんで、飲食も！
        description: 展示を楽しんだり、ここだけのグッズを購入したり、フード＆ドリンクも味わえる、リアルイベントならではの体験が盛りだくさん！
en:
  intro:
    eyebrow: About
    title: What Is "VketReal mini in Sapporo 2026 Early Spring"?
    lead: The theme for this time is "From a Closed World to an Open World." Volunteers are bringing you a new kind of VketReal in Sapporo, combining exhibitions, lightning talks, and food & drinks.
    points:
      item1:
        title: An XR Culture Hub from Sapporo
        description: Creators from Hokkaido and beyond gather to exhibit works, host hands-on demos, and sell original merchandise in a real-world community event.
      item2:
        title: Carrying the Energy of 2025 Summer
        description: Our 2025 Summer event welcomed 767 visitors—83% from within Hokkaido—and we are raising the bar in early spring 2026.
      item3:
        title: Rooted in VketReal by HIKKY
        description: Inspired by the world’s largest virtual event “VketReal,” volunteers design a unique “para-real” experience tailored for Sapporo.
</i18n>

<template>
  <section
    id="about"
    class="ha-section ha-intro"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('intro.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('intro.title') }}
      </h2>
      <p class="ha-section__lead">
        {{ t('intro.lead') }}
      </p>
    </div>
    <div class="grid">
      <article
        v-for="(point, index) in introPoints"
        :key="index"
        class="card"
      >
        <h3>{{ point.title }}</h3>
        <p>{{ point.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IntroPoint {
  title: string
  description: string
}

const { t } = useI18n()

const introPoints = computed<IntroPoint[]>(() =>
  Array.from({ length: 3 }, (_, index) => ({
    title: t(`intro.points.item${index + 1}.title`),
    description: t(`intro.points.item${index + 1}.description`),
  })),
)
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-intro {
  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: f.rem(24px);

    @include m.tb {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include m.sp {
      grid-template-columns: 1fr;
    }
  }

  .card {
    padding: f.rem(32px);
    border-radius: 24px;

    color: #333;

    background: v.$white;
    backdrop-filter: blur(12px);
    box-shadow: 0 18px 60px rgba(v.$navy, 0.35);

    transition: transform 0.3s ease, box-shadow 0.3s ease;

    @include m.hover {
      transform: translateY(-6px);
      box-shadow: 0 26px 80px rgba(v.$navy, 0.42);
    }

    h3 {
      margin: 0 0 f.rem(16px);
      font-size: clamp(f.rem(20px), 2vw, f.rem(24px));
    }

    p {
      margin: 0;
      line-height: 1.7;
      color: #333;
    }

    .ha-button.-ghost {
      color: #333 !important;
    }
  }
}
</style>
