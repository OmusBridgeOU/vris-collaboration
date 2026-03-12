<i18n lang="yaml">
ja:
  eyebrow: ticket
  title: チケット
  lead: 一般参加券は 3,500円（入場＋飲食込み）となります。数量限定につきお早めにご購入ください。
  ctaPrimary: チケットを購入
  price: 一般参加券 3,500円
  note: チケットはイベント前日まで販売いたします。
  linkPrimary: https://livepocket.jp/e/kr1us
en:
  eyebrow: ticket
  title: Tickets
  lead: General admission planned at ¥3,500 (incl. food & drink). Limited quantity available, so please purchase early.
  ctaPrimary: Get Tickets
  price: General Ticket ¥3,500
  note: Tickets will be sold until the day before the event.
  linkPrimary: https://livepocket.jp/e/kr1us
</i18n>

<template>
  <section class="ha-section ha-ticket">
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('title') }}
      </h2>
      <p class="ha-section__lead">
        {{ t('lead') }}
      </p>
    </div>
    <div class="ticket-card">
      <div class="text">
        <p class="price">
          {{ t('price') }}
        </p>
        <p class="note">
          {{ t('note') }}
        </p>
      </div>
      <div class="actions">
        <a
          class="ha-button -primary"
          :href="t('linkPrimary')"
          target="_blank"
          rel="noopener"
        >
          {{ t('ctaPrimary') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-ticket {
  .ticket-card {
    display: flex;
    gap: v.space(3);

    padding: v.space(5);
    border-radius: 18px;

    text-align: left;

    background: linear-gradient(135deg, rgb(173 213 255 / 60%), rgb(255 214 240 / 60%));
    backdrop-filter: blur(10px);
    box-shadow: 0 16px 45px rgba(v.$navy, 0.25);

    @include m.sp {
      flex-direction: column;
      text-align: center;
    }

    .price {
      margin: 0;
      font-size: clamp(f.rem(24px), 3vw, f.rem(32px));
      font-weight: 800;
      color: v.$text-body;
    }

    .note {
      margin: 0;
      font-size: f.rem(14px);
      color: rgba(v.$text-body, 0.75);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: v.space(2.5);
      justify-content: center;

      min-width: 240px;
      margin: 0 auto;

      > .ha-button {
        width: 100%;
        text-align: center;
      }

      @include m.sp {
        justify-content: center;
        margin: auto;
      }
    }
  }
}
</style>
