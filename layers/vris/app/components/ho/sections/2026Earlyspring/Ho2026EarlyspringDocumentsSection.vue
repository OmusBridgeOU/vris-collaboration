<i18n lang="yaml">
ja:
  access:
    eyebrow: Documents
    resources:
      title: 関連ドキュメント
      items:
        item1:
          label: 出展ガイドライン
          href: https://vris.jp/docs/2026early-spring/exhibition-guideline
        item2:
          label: 出展規約
          href: https://vris.jp/docs/2026early-spring/exhibition-terms
        item3:
          label: Lightning Talk ガイドライン
          href: https://vris.jp/docs/2026early-spring/lt-guideline
        item4:
          label: お問い合わせフォーム
          href: https://forms.gle/hnsfBRRnQZq4hLQP7
        item5:
          label: VketReal mini in 札幌 2026 Early Springイベントガイド
          href: https://vris.jp/docs/2026early-spring/event-notification
en:
  access:
    eyebrow: Documents
    resources:
      title: Related Documents
      items:
        item1:
          label: Exhibition Guidelines
          href: https://vris.jp/docs/2026early-spring/exhibition-guideline
        item2:
          label: Exhibition Terms
          href: https://vris.jp/docs/2026early-spring/exhibition-terms
        item3:
          label: Lightning Talk Guidelines
          href: https://vris.jp/docs/2026early-spring/lt-guideline
        item4:
          label: Contact Form
          href: https://forms.gle/hnsfBRRnQZq4hLQP7
        item5:
          label: VketReal mini in 札幌 2026 Early Springイベントガイド
          href: https://vris.jp/docs/2026early-spring/event-notification
</i18n>

<template>
  <section
    id="documents"
    class="ha-section ha-access ha-access--docs"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('access.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('access.resources.title') }}
      </h2>
    </div>
    <div class="grid -single">
      <div class="card">
        <ul class="links">
          <li
            v-for="resource in resources"
            :key="resource.href"
          >
            <a
              :href="resource.href"
              target="_blank"
              rel="noopener"
            >
              {{ resource.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ResourceLink {
  label: string
  href: string
}

const { t } = useI18n()

const resources = computed<ResourceLink[]>(() => {
  const keys = ['item5', 'item1', 'item2', 'item3', 'item4'] as const
  return keys.map(key => ({
    label: t(`access.resources.items.${key}.label`),
    href: t(`access.resources.items.${key}.href`),
  }))
})
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
      border: 1px solid v.$blue;
      color: #333;
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
