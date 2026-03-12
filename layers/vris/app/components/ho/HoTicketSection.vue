<i18n lang="yaml">
ja:
  ticket:
    title: チケット
    description: 持続可能なイベント開催のため、チケット制でのイベントへのご参加に、ご協力をお願いいたします。
    description2: チケットは、複数種類用意しました！なかには「当日、現地に来場参加"できない"人向け」のチケットも？
    description3: 詳しくは、チケット販売サイトをチェック！！
    button:
      label: チケット購入サイトへ
en:
  ticket:
    title: Ticket
    description: To support a sustainable event, we kindly ask for your cooperation in attending the event with a ticket system.
    description2: We have prepared multiple types of tickets! Some of them are for those who "cannot" attend the event in person on the day.
    description3: For more details, please check the ticket sales site!
    button:
      label: Go to Ticket Purchase Site
</i18n>

<template>
  <section
    id="ticket"
    ref="sectionRef"
    class="section ticket-section"
  >
    <div class="background" />
    <div class="section-inner">
      <h2 class="section-title">
        {{ t('ticket.title') }}
      </h2>
      <div class="inner-container">
        <p class="ticket-description">
          {{ t('ticket.description') }}
        </p>
        <p class="ticket-description">
          <span class="text">{{ t('ticket.description2') }}</span>
        </p>
        <p class="ticket-description">
          {{ t('ticket.description3') }}
        </p>
        <div class="cta-button">
          <HaLink
            to="https://t.livepocket.jp/e/vketreal_vris"
            class="button"
            forceAnchorLink
            blank
          >
            {{ t('ticket.button.label') }}
          </HaLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

defineExpose({
  sectionRef,
})
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/variables' as v;
@use '#vris/app/assets/styles/mixins' as m;

.section {
  scroll-snap-align: start;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: auto;
  min-height: 100dvh;
}

.background {
  position: absolute;
  z-index: 0;
  inset: 0;

  background-position: center;
  background-size: cover;
  backdrop-filter: blur(8px);
}

.section-inner {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
  padding: calc((100dvh - 720px) / 2) 2rem 2rem;
}

.section-title {
  margin-bottom: 3rem;

  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-shadow:
    2px 2px 4px rgb(0 0 0 / 50%),
    -2px -2px 4px rgb(0 0 0 / 50%),
    2px -2px 4px rgb(0 0 0 / 50%),
    -2px 2px 4px rgb(0 0 0 / 50%);
}

.inner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  border: 4px solid #000;
  border-radius: 16px;

  color: #000;

  background: rgb(255 255 255 / 60%);
}

.ticket-description {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: center;

  &:nth-of-type(2) {
    > .text {
      background: linear-gradient(transparent 50%, #00A95F 50%);
    }
  }

  &:last-of-type {
    margin-bottom: 3rem;
  }
}

.cta-button {
  display: none;
  margin-top: 2rem;
  text-align: center;

  .button {
    display: inline-block;

    padding: 1rem 3rem;
    border-radius: 50px;

    font-weight: bold;
    color: #fff;
    text-decoration: none;

    background: #00A95F;

    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      background: #008a4e;
    }
  }
}

@include m.sp {
  .section {
    min-height: 100dvh;
    padding: 1rem 0.5rem;
  }

  .section-inner {
    padding: 70px 1rem 1rem;
  }

  .inner-container {
    padding: 1rem;
  }

  .section-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.2;
  }

  .ticket-description {
    font-size: 0.875rem;
    line-height: 1.4;

    &:last-of-type {
      margin-bottom: 2rem;
    }
  }

  .cta-button {
    .button {
      padding: 0.875rem 2.5rem;
      font-size: 0.95rem;
    }
  }
}
</style>
