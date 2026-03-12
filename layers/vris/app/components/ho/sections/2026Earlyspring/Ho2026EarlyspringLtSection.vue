<i18n lang="yaml">
ja:
  lt:
    eyebrow: Parareal Lightning Talks
    title: Parareal Lightning Talks 登壇テーマ・登壇者ご紹介
    lead: Parareal Lightning Talksの登壇テーマと登壇者をご紹介します(当日の発表順とは一部異なります)。
    items:
      - name: 仮想と現実をつなぐ印刷――VRCで生まれた“瞬間“を紙に残す理由(tukkun)
        x: https://x.com/VmiruSenyou17
      - name: ご当地キャラ「ちくワン」と一緒にリアルもバーチャルも駆け巡る！？キャラクターが切り開くバーチャルコンテンツの未来(ひぐちこーき)
        x: https://x.com/higuchi_dayoV
      - name: バーチャルとリアルの循環-VRアートを楽しむ会の活動(俵屋年彦)
        x: https://x.com/tawarayat
      - name: これから世代交代が始まるVRサークルの目標と課題(らっく)
        x: https://x.com/
      - name: 卒論でガチ研究！！！お砂糖が出来やすい人の特徴は！？(ぶーとん)
        x: https://x.com/
      - name: イベントに遠隔参加！地域をResoniteで繋げる！(N-JELLY)
        x: https://x.com/NJELLY1
      - name: 「LTシステム作って」とAIに投げたらこうなった(Tsubaki)
        x: https://x.com/Tsubaki_HIUVR
      - name: アバターと旅するアプリ「vsnap」開発中！(A-kun)
        x: https://x.com/a919515
en:
  lt:
    eyebrow: Parareal Lightning Talks
    title: Parareal Lightning Talks Speakers Introduction
    lead: Introducing the themes and speakers of Parareal Lightning Talks (the order of presentations may differ from the actual event).
    items:
      - name: 仮想と現実をつなぐ印刷――VRCで生まれた“瞬間“を紙に残す理由(tukkun)
        x: https://x.com/VmiruSenyou17
      - name: ご当地キャラ「ちくワン」と一緒にリアルもバーチャルも駆け巡る！？キャラクターが切り開くバーチャルコンテンツの未来(ひぐちこーき)
        x: https://x.com/higuchi_dayoV
      - name: バーチャルとリアルの循環-VRアートを楽しむ会の活動(俵屋年彦)
        x: https://x.com/tawarayat
      - name: これから世代交代が始まるVRサークルの目標と課題(らっく)
        x: https://x.com/
      - name: 卒論でガチ研究！！！お砂糖が出来やすい人の特徴は！？(ぶーとん)
        x: https://x.com/
      - name: イベントに遠隔参加！地域をResoniteで繋げる！(N-JELLY)
        x: https://x.com/NJELLY1
      - name: 「LTシステム作って」とAIに投げたらこうなった(Tsubaki)
        x: https://x.com/Tsubaki_HIUVR
      - name: アバターと旅するアプリ「vsnap」開発中！(A-kun)
        x: https://x.com/a919515
</i18n>

<template>
  <section
    id="lt"
    class="ha-section ha-lt"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('lt.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('lt.title') }}
      </h2>
      <p class="ha-section__lead">
        {{ t('lt.lead') }}
      </p>
    </div>

    <ul class="lt-list">
      <li
        v-for="(item, index) in ltItems"
        :key="item.name"
        class="lt-item"
      >
        <a
          class="lt-link"
          :href="item.x"
          target="_blank"
          rel="noreferrer"
        >
          <span class="lt-order">
            {{ twoDigits(index + 1) }}
          </span>
          <span class="lt-name">
            {{ item.name }}
          </span>
          <span
            class="lt-icon"
            aria-hidden="true"
          >↗</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

type LtItem = {
  name: string
  x: string
}

const ltItems = computed<LtItem[]>(() => [
  { name: t('lt.items.1.name'), x: t('lt.items.1.x') },
  { name: t('lt.items.5.name'), x: t('lt.items.5.x') },
  { name: t('lt.items.2.name'), x: t('lt.items.2.x') },
  { name: t('lt.items.7.name'), x: t('lt.items.7.x') },
  { name: t('lt.items.6.name'), x: t('lt.items.6.x') },
  { name: t('lt.items.3.name'), x: t('lt.items.3.x') },
  { name: t('lt.items.4.name'), x: t('lt.items.4.x') },
  { name: t('lt.items.0.name'), x: t('lt.items.0.x') },
])

const twoDigits = (value: number) => value.toString().padStart(2, '0')
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_functions" as f;

.ha-lt {
  display: flex;
  flex-direction: column;
  gap: f.rem(24px);
}

.lt-list {
  display: grid;
  gap: f.rem(12px);

  margin: 0;
  padding: 0;

  list-style: none;
}

.lt-item {
  border-radius: 16px;
  background: rgba(v.$white, 0.9);
  box-shadow: 0 10px 30px rgba(v.$navy, 0.16);
}

.lt-link {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: f.rem(12px);
  align-items: center;

  padding: f.rem(14px) f.rem(16px);

  color: v.$navy;
  text-decoration: none;

  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    outline: none;
    box-shadow: 0 14px 40px rgba(v.$navy, 0.25);
  }
}

.lt-order {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: v.$navy;
}

.lt-name {
  font-weight: 600;
  letter-spacing: 0.01em;
}

.lt-icon {
  font-size: f.rem(14px);
}
</style>
