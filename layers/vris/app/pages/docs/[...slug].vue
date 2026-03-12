<template>
  <div class="content-page">
    <HtDocs
      class="content-page"
      :page="page"
    />
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n()
const route = useRoute()
const nuxtContentDocs = useNuxtContentDocs()
const slug = ref<string | undefined>(undefined)

if (Array.isArray(route.params.slug)) {
  slug.value = route.params.slug.join('/')
} else if (typeof route.params.slug === 'string') {
  slug.value = route.params.slug
} else {
  slug.value = undefined
}
if (!slug.value || slug.value.endsWith('/')) {
  slug.value = slug.value?.replace(/\/$/, '') || ''
}
// Nuxt Content v3の方法でページを取得
const { data: contentState, refresh } = await nuxtContentDocs.fetchContentDocs(`/docs/${slug.value}`)
nuxtContentDocs.setContentDocs(contentState.value)

// Use computed to get the page reactively from the composable
const page = computed(() => nuxtContentDocs.content.value)

onMounted(async () => {
  try {
    if (!page.value) {
      if (nuxtContentDocs.content.value) {
        console.warn('Page not found, using cached content:', !!nuxtContentDocs.content.value)
        nuxtContentDocs.setContentDocs(nuxtContentDocs.content.value)
      } else {
        await refresh()
        nuxtContentDocs.setContentDocs(contentState.value)
      }
    }
    if (!page.value) {
      throw createError({
        statusCode: 404,
        statusMessage:
        i18n.locale.value === 'ja'
          ? 'ページが見つかりませんでした'
          : 'Page Not Found',
        fatal: false,
      })
    }
  } catch (error) {
    console.error('Error in mounted hook:', error)
  }
})
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/variables' as v;
@use '#vris/app/assets/styles/mixins' as m;

.content-page {
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  max-width: 100dvw;
  height: 100%;
}
</style>
