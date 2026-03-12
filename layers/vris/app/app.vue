<i18n lang="yaml">
ja:
  site:
    title: VketReal mini in 札幌 2026 Early Spring
    title_template: '%s - VketReal in 札幌'
    description: 北海道の有志XRクリエイターが主催する、VRSNSユーザーのためのリアルイベント、VketReal in 札幌！2025年12月にイベント開催予定！
en:
  site:
    title: VketReal mini in SAPPORO 2026 Early Spring
    title_template: '%s - VketReal in SAPPORO'
    description: VketReal in SAPPORO, a real event for VRSNS users organized by XR creators in Hokkaido! Scheduled for December 2025!
</i18n>

<template>
  <Head>
    <Link
      rel="alternate"
      hreflang="ja"
      :href="currentJaFullPath"
    />
    <Link
      rel="alternate"
      hreflang="en"
      :href="currentEnFullPath"
    />
    <Link
      rel="alternate"
      hreflang="x-default"
      :href="currentJaFullPath"
    />
    <template v-if="currentLang === 'ja'">
      <Link
        rel="canonical"
        :href="currentJaFullPath"
      />
    </template>
    <template v-if="currentLang === 'en'">
      <Link
        rel="canonical"
        :href="currentEnFullPath"
      />
    </template>
  </Head>
  <div class="app">
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const i18n = useI18n()
const currentFullPath = ref(`${useRuntimeConfig().public.url}${route.fullPath}`)
const currentLang = ref(i18n.locale.value)

const currentJaFullPath = computed(() => {
  if (currentLang.value === 'ja') {
    return currentFullPath.value
  } else {
    return currentFullPath.value
      .replace(/\/en(\/|$)/, '/')
      .replace(/\/{2,}/, '/')
  }
})

const currentEnFullPath = computed(() => {
  if (currentLang.value === 'en') {
    return currentFullPath.value
  } else {
    const path = route.fullPath.endsWith('/')
      ? route.fullPath
      : `${route.fullPath}/`
    return `${useRuntimeConfig().public.url}/en${path}`
  }
})

const title = computed(() => {
  return i18n.t('site.title') === 'VketReal mini in 札幌 2026 Early Spring'
    || i18n.t('site.title') === 'VketReal mini in SAPPORO 2026 Early Spring'
    ? i18n.t('site.title')
    : 'VketReal mini in 札幌 2026 Early Spring'
})

useHead({
  htmlAttrs: {
    lang: currentLang.value,
  },
  title,
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? i18n.t('site.title_template', { title: titleChunk })
      : title.value
  },
  meta: [
    {
      name: 'description',
      content: i18n.t('site.description'),
    },
    {
      property: 'og:title',
      content: title.value,
    },
    {
      property: 'og:description',
      content: i18n.t('site.description'),
    },
  ],
})
</script>
