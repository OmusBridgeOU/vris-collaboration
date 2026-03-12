<i18n lang="yaml">
ja:
  access:
    eyebrow: Access
    title: 会場アクセス
    venue:
      title: 会場
      name: Deep Tech CORE SAPPORO
      description: 札幌駅徒歩2分のXRスタジオ併設のインキュベーション施設
      details:
        item1: 「札幌」駅から徒歩約2分
        item2: XRスタジオ・イベントフロア併設
        item3: 詳細アクセスとフロアマップは後日公開予定
      linkLabel: Deep Tech CORE SAPPORO 公式サイト
      link: https://deeptech-core.com/
en:
  access:
    eyebrow: Access
    title: Venue Access & Documents
    venue:
      title: Venue
      name: Deep Tech CORE SAPPORO
      description: XR-ready venue 2 minutes from Sapporo Station.
      details:
        item1: 5-minute walk from Sapporo Station
        item2: Indoor XR studio & event floor
        item3: Detailed access / floor map coming soon
      linkLabel: Official Site
      link: https://deeptech-core.com/
</i18n>

<template>
  <section
    id="access"
    class="ha-section ha-access"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('access.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('access.title') }}
      </h2>
    </div>
    <div class="grid">
      <div class="card">
        <p class="name">
          {{ t('access.venue.name') }}
        </p>
        <p>{{ t('access.venue.description') }}</p>
        <ul>
          <li
            v-for="detail in venueDetails"
            :key="detail"
          >
            {{ detail }}
          </li>
        </ul>
        <a
          class="ha-button -ghost"
          :href="t('access.venue.link')"
          target="_blank"
          rel="noopener"
        >
          {{ t('access.venue.linkLabel') }}
        </a>
      </div>
      <div class="card map-card">
        <div class="map-frame">
          <iframe
            title="venue-map"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2916.030855916918!2d141.34185831584782!3d43.06733130000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b29a2316108b5%3A0x3342123f9e717b03!2sDeep-Tech%20CORE%20SAPPORO!5e0!3m2!1sja!2sjp!4v1735002000!5m2!1sja!2sjp"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const i18n = useI18n()
const translate = (key: string) => i18n.t(key as never)
const t = translate

const venueDetails = computed<string[]>(() =>
  Array.from({ length: 3 }, (_, index) => String(translate(`access.venue.details.item${index + 1}`))),
)
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-access {
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: f.rem(24px);

    &.-single {
      grid-template-columns: 1fr;
    }

    @include m.sp {
      grid-template-columns: 1fr;
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: f.rem(16px);

    padding: f.rem(24px);
    border-radius: 24px;

    background: v.$white;
    backdrop-filter: blur(12px);
    box-shadow: 0 20px 55px rgba(v.$navy, 0.35);

    h3 {
      margin: 0;
      font-size: clamp(f.rem(20px), 2vw, f.rem(26px));
    }

    p {
      margin: 0;
      line-height: 1.6;
      color: #333;
    }

    ul {
      margin: 0;
      padding-left: f.rem(16px);
      line-height: 1.7;
      color: #333;

      > li {
        list-style-type: disc;
      }
    }

    .ha-button {
      margin-top: auto;
      border: 1px solid v.$blue;
      color: #333;
    }
  }

  .name {
    font-size: clamp(f.rem(22px), 2.2vw, f.rem(30px));
    font-weight: 700;
  }

  .map-card {
    .map-title {
      font-size: clamp(f.rem(18px), 1.6vw, f.rem(22px));
      font-weight: 700;
      color: #333;
    }

    .map-frame {
      overflow: hidden;

      aspect-ratio: 16 / 9;
      width: 100%;
      border-radius: 18px;

      box-shadow: 0 14px 45px rgba(v.$navy, 0.25);

      iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    }

    .map-caption {
      margin: 0;
      font-size: f.rem(14px);
      color: rgba(#333, 0.8);
    }
  }

  .links {
    display: grid;
    gap: f.rem(12px);

    a {
      cursor: pointer;
      color: #333;
      text-decoration: underline;
    }
  }
}
</style>
