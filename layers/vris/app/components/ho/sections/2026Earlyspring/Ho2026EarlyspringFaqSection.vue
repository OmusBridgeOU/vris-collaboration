<i18n lang="yaml">
ja:
  faq:
    eyebrow: FAQ
    title: よくある質問（抜粋）
    more: 詳細は FAQ 全文をご確認ください。
    linkText: FAQを見る
    items:
      item1:
        question: Q. 入場にはチケットが必要ですか？
        answer: A. はい。一般参加者は有償の入場チケットが必要です。販売開始の告知をお待ちください。
      item2:
        question: Q. 出展申込の締切と当落発表はいつですか？
        answer: A. 締切は2025年11月4日(火) 23:59 JST、当落発表は11月18日(火)を予定しています。
      item3:
        question: Q. 撮影・配信は可能ですか？
        answer: A. 可能ですが、他参加者を撮影する際は許可を得てください。無断での顔出しはお控えください。
    link: https://vris.jp/docs/2026early-spring/faq
en:
  faq:
    eyebrow: FAQ
    title: Frequently Asked Questions (Excerpt)
    more: Please read the full FAQ for additional details.
    linkText: View FAQ
    items:
      item1:
        question: Q. Do I need a ticket to enter?
        answer: A. Yes. General attendees require a paid admission ticket. Please wait for the sales announcement.
      item2:
        question: Q. When are the application deadline and result announcement?
        answer: A. The deadline is Tue, Nov 4, 2025 at 23:59 JST. Results are scheduled for Tue, Nov 18, 2025.
      item3:
        question: Q. Can I film or stream the event?
        answer: A. Yes, but please obtain permission before filming other participants. Avoid showing faces without consent.
    link: https://vris.jp/docs/2026early-spring/faq
</i18n>

<template>
  <section
    id="faq"
    class="ha-section ha-faq"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('faq.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('faq.title') }}
      </h2>
    </div>
    <div class="list">
      <article
        v-for="item in faqItems"
        :key="item.question"
        class="item"
      >
        <h3>{{ item.question }}</h3>
        <p>{{ item.answer }}</p>
      </article>
    </div>
    <p class="more">
      {{ t('faq.more') }}
      <a
        :href="t('faq.link')"
        target="_blank"
        rel="noopener"
      >
        {{ t('faq.linkText') }}
      </a>
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface FaqItem {
  question: string
  answer: string
}

const { t } = useI18n()

const faqItems = computed<FaqItem[]>(() =>
  Array.from({ length: 3 }, (_, index) => ({
    question: t(`faq.items.item${index + 1}.question`),
    answer: t(`faq.items.item${index + 1}.answer`),
  })),
)
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-faq {
  .list {
    display: grid;
    gap: f.rem(24px);
  }

  .item {
    padding: f.rem(24px);
    border-radius: 24px;

    background: v.$white;
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 55px rgba(v.$navy, 0.35);

    h3 {
      margin: 0 0 f.rem(12px);
      font-size: clamp(f.rem(18px), 2vw, f.rem(24px));
    }

    p {
      margin: 0;
      line-height: 1.7;
      color: #333;
    }
  }

  .more {
    margin-top: f.rem(24px);
    font-size: f.rem(14px);

    a {
      margin-left: f.rem(8px);
      color: rgba(v.$blue, 0.85);
      text-decoration: underline;
    }
  }
}
</style>
