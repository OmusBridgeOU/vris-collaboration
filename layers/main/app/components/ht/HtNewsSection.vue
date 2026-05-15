<script setup lang="ts">
import HaCard from '../ha/HaAboutCard.vue'
import HaCommunityIcon from '../ha/icons/HaCommunityIcon.vue'
import HaStarShineIcon from '../ha/icons/HaStarShineIcon.vue'
import HaWorldIcon from '../ha/icons/HaWorldIcon.vue'
</script>

<template>
  <HaSectionTitle
    title="お知らせ"
    label="news"
  />

  <div class="card-flex mb-24">
    <HaCard
      class="child"
      color="amber"
    >
      <template #icon>
        <HaStarShineIcon />
      </template>
      <template #title>
        バーチャル姿のまま<br>リアルで体験
      </template>
      <template #body>
        アバターとしての生き方を大切にする人々が<br>リアルの場で集い、交流し、共に<br>クリエイティブな未来を気付く場です。
      </template>
    </HaCard>
    <HaCard
      class="child"
      color="cyan"
    >
      <template #icon>
        <HaWorldIcon />
      </template>
      <template #title>
        VRの世界で活躍する<br>クリエイターの出展
      </template>
      <template #body>
        VRとリアルを行き来しながら活躍する<br>クリエイターの作品展示や、新たなXR技術を<br>活用したインタラクティブな企画を展開！
      </template>
    </HaCard>
    <HaCard
      class="child"
      color="magenta"
    >
      <template #icon>
        <HaCommunityIcon />
      </template>
      <template #title>
        遊んで、買って、<br>楽しめる企業ブース
      </template>
      <template #body>
        各企業ブースでは最新XRコンテンツを体験でき、<br>ここでしか手に入らない限定グッズも<br>販売されるかも？
      </template>
    </HaCard>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.description {
  margin: 0 auto 96px;

  font-size: 20px;
  font-weight: 700;
  line-height: 1.5em;
  color: white;
  text-align: center;
}

.info-flex {
  display: flex;
  gap: 32px;
  justify-content: center;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  &__child{
    width: 320px;
  }

  &__number{
    margin-bottom: 4px;

    font-size: 64px;
    font-weight: 700;
    line-height: 1em;
    text-align: center;
    letter-spacing: normal;

    &--cyan{
      color: v.$vket-cyan;
    }

    &--amber{
      color: v.$vket-amber;
    }

    &--magenta{
      color: v.$vket-magenta;
    }
  }

  &__label{
    font-size: 16px;
    font-weight: 400;
    color: v.$vket-emerald;
    text-align: center;
  }
}

.card-flex {
  display: flex;
  gap: 32px;
  justify-content: center;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  .child {
    width: 320px;
  }
}
</style>
