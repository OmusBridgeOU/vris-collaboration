<i18n lang="yaml">
ja: {}
en: {}
</i18n>

<template>
  <a
    :href="`#${href}`"
    class="ha-anchor-link"
    @click.prevent="handleClick"
  >
    {{ text }}
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  href: string
}>()

const emit = defineEmits<{
  clicked: []
}>()

// ブレークポイントに応じたスクロールオフセットを取得
const getScrollOffset = () => {
  const width = window.innerWidth

  // 各値はapp/assets/styles/_variables.scssの`vket-header-height-{devices}`の値と揃える
  if (width > 1080) return -160 // PC: app/assets/styles/_variables.scss v.$pc-content-min-width
  if (width > 769) return -106 // タブレット: app/assets/styles/_variables.scss v.$media-query-width
  return -150 // スマホ（混雑表示の二段目を含む）
}

const handleClick = () => {
  emit('clicked')

  setTimeout(() => {
    const target = document.querySelector(`#${props.href}`)
    if (!target) return

    const top
      = target.getBoundingClientRect().top + window.scrollY + getScrollOffset()
    window.scrollTo({ top, behavior: 'smooth' })
  }, 350)
}
</script>
