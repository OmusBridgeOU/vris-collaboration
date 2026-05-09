<script setup lang="ts">
import HaCard from '../ha/HaCard.vue'
import HaDocumentLink from '../ha/HaDocumentLink.vue'
import HaBalanceIcon from '../ha/icons/HaBalanceIcon.vue'
import HaCommunityIcon from '../ha/icons/HaCommunityIcon.vue'
import HaOpenBookIcon from '../ha/icons/HaOpenBookIcon.vue'
import HaQuestionIcon from '../ha/icons/HaQuestionIcon.vue'
import HaStarShineIcon from '../ha/icons/HaStarShineIcon.vue'
import HaWorldIcon from '../ha/icons/HaWorldIcon.vue'
</script>

<template>
  <HaSectionTitle
    title="出展情報"
    label="exhibition"
  />
  <p class="subtitle">
    出展カテゴリ
  </p>
  <div class="card-flex mb-24">
    <HaCard
      class="child"
      color="amber"
    >
      <template #icon>
        <HaStarShineIcon />
      </template>
      <template #title>
        サークル出展
      </template>
      <template #body>
        VRクリエイターによるアイテムやグッズの展示・販売ブースです。3Dプリント作品、イラスト、同人誌など幅広いジャンルで出店できます。
      </template>
    </HaCard>
    <HaCard
      class="child"
      icon-url="/icons/tabler_world.svg"
      color="cyan"
    >
      <template #icon>
        <HaWorldIcon />
      </template>
      <template #title>
        一般展示
      </template>
      <template #body>
        XR技術やクリエイティブ作品の展示を行うブースです。デモ体験やワークショップなど、来場者が参加できる企画も歓迎します。
      </template>
    </HaCard>
    <HaCard
      class="child"
      icon-url="/icons/boxicons_community.svg"
      color="magenta"
    >
      <template #icon>
        <HaCommunityIcon />
      </template>
      <template #title>
        企業出展
      </template>
      <template #body>
        企業・法人向けの出展ブースです。最新XRコンテンツの体験提供や、製品・サービスのプロモーションにご活用いただけます。
      </template>
    </HaCard>
  </div>
  <p class="subtitle">
    出展カテゴリ
  </p>
  <div class="link-list">
    <HaDocumentLink
      title="出展ガイドライン"
      label="important"
      color="green"
      text="出展に必要なルール・準備事項をまとめた公式ガイド"
    >
      <template #icon>
        <HaOpenBookIcon />
      </template>
    </HaDocumentLink>
    <HaDocumentLink
      title="出展規約"
      label="required"
      color="cyan"
      text="出展者が遵守すべき規約・利用条件"
    >
      <template #icon>
        <HaBalanceIcon />
      </template>
    </HaDocumentLink>
    <HaDocumentLink
      title="出展ガイドライン"
      label="Q&A"
      color="magenta"
      text="出展に必要なルール・準備事項をまとめた公式ガイド"
    >
      <template #icon>
        <HaQuestionIcon />
      </template>
    </HaDocumentLink>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.subtitle {
  margin: 0 auto 42px;

  font-size: 20px;
  font-weight: 700;
  line-height: 1.5em;
  color: white;
  text-align: center;
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

.link-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
