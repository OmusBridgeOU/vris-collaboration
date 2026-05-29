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
const SCROLL_OFFSET = -80

const props = defineProps<{
  text: string
  href: string
}>()

const emit = defineEmits<{
  clicked: []
}>()

const handleClick = () => {
  emit('clicked')

  setTimeout(() => {
    const target = document.querySelector(`#${props.href}`)
    if (!target) return
    const top
      = target.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }, 350)
}
</script>
