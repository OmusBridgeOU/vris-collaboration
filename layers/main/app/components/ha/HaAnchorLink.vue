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
  if (width >= 1024) return -106 // PC
  if (width >= 768) return -106 // タブレット
  return -106 // スマホ
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
