<i18n lang="yaml">
ja:
  hoge: ほげ
en:
  hoge: hoge
</i18n>

<template>
  <div class="ht-top">
    <HaFirstView />
    <section
      id="quick-access"
      class="section"
    >
      <HaSectionTitle
        title="参加者向け重要情報"
        label="QUICK ACCESS"
      />
      <div class="grid2x">
        <HaGlassCard
          class="grid2x__child"
          variant="link"
          color="cyan"
          title="開催日"
          label="DATE"
          icon-url="/icons/line-md_calendar.svg"
        >
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
        <HaGlassCard
          class="grid2x__child"
          variant="link"
          color="magenta"
          title="会場"
          label="LOCATION"
          icon-url="/icons/mingcute_map-pin-line.svg"
        >
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
        <HaGlassCard
          class="grid2x__child"
          variant="link"
          color="amber"
          title="チケット"
          label="TICKETS"
          icon-url="/icons/f7_tickets.svg"
        >
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
        <HaGlassCard
          class="grid2x__child"
          variant="link"
          color="vermilion"
          title="スケジュール"
          label="SCHEDULE"
          icon-url="/icons/material-symbols_timer-outline.svg"
        >
          <template #body>
            <p>ボディの中身</p>
          </template>
        </HaGlassCard>
      </div>
    </section>

    <section
      id="about"
      class="section"
    >
      <HaSectionTitle
        title="VketReal in 札幌とは"
        label="about"
      />
      <div
        class="section__description"
        style="width: 750px;"
      >
        世界最大級のメタバースイベント「バーチャルマーケット(Vket)」から派生した、「バーチャルの姿のままリアルに飛び出す！」リアルイベント。<br>北海道の有志XRクリエイターが主催し、札幌で開催します。
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import HaFirstView from '../ha/HaFirstView.vue'
import HaGlassCard from '../ha/HaGlassCard.vue'
import HaSectionTitle from '../ha/HaSectionTitle.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ht-top {
  width: 100%;
  height: 100%;
}

.section {
  padding: 0 136px 108px;

  &__description {
    margin: 0 auto 96px;

    font-size: 20px;
    font-weight: 700;
    line-height: 1.5em;
    color: white;
    text-align: center;
  }
}

#quick-access{
  // TODO: common.scssなどに移動すべき
  .grid2x {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 20px;

    &__child {
      height: 100%;
      min-height: 280px; // FIXME: 適当な値を入れている
    }
  }
}
</style>
