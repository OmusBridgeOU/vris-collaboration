<script setup>
// 日本語表示時に形態素内で改行が行われるのを出来るだけ防ぐための、プレーンテキストを返すコンポーネント。配列で渡すと、その要素内では改行がされなくなる
// 新しい試みのため、要望への対応のため作成したが、管理の複雑化と改行の綺麗さを天秤にかけてもtoo matchである。

const props = defineProps({
  content: { type: [String, Array], required: true },
})

const isUnits = computed(() => Array.isArray(props.content))
</script>

<template>
  <template v-if="isUnits">
    <template
      v-for="(unit, index) in content"
      :key="index"
    >
      <br
        v-if="unit === '__br__'"
        class="sp-none"
      >
      <br
        v-else-if="unit === '__br-tb-over__'"
        class="tb-over"
      >
      <span
        v-else
        class="nowrap"
      >{{ unit }}</span>
    </template>
  </template>
  <template v-else>
    {{ content }}
  </template>
</template>
