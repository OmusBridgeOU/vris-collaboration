<i18n lang="yaml">
  ja:
    site:
      title: VketReal in 札幌 2026 Autumn
      title_template: "{title} - VketReal in 札幌"
      description: VRSNSユーザーとXRクリエイターが札幌に集うリアルイベント、VketReal in 札幌 2026 Autumn。2026年9月26日(土)、アスティーホールで開催予定です。
      keywords: VketReal,札幌,2026 Autumn,VR,SNS,XR,メタバース,イベント,北海道
      author: VketReal in 札幌 実行委員会
      og_locale: ja_JP
  en:
    site:
      title: VketReal in SAPPORO 2026 Autumn
      title_template: "{title} - VketReal in SAPPORO"
      description: VketReal in SAPPORO 2026 Autumn is a real-world event for VRSNS users and XR creators in Sapporo, scheduled for September 26, 2026 at ASTY Hall.
      keywords: VketReal,Sapporo,2026 Autumn,VR,SNS,XR,metaverse,event,Hokkaido
      author: VketReal in SAPPORO Executive Committee
      og_locale: en_US
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
  <Body class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<script lang="ts" setup>
const route = useRoute()
const i18n = useI18n()
const runtimeConfig = useRuntimeConfig()
const currentLang = ref(i18n.locale.value)

const currentFullPath = computed(() => `${runtimeConfig.public.url}${route.fullPath}`)
const title = computed(() => i18n.t('site.title'))
const description = computed(() => i18n.t('site.description'))
const ogImageUrl = computed(() => `${runtimeConfig.public.url}/kv.png`)

const hasDebugQuery = () => {
  const debugQuery = route.query.debug

  if (Array.isArray(debugQuery)) {
    return debugQuery.includes('1')
  }

  return debugQuery === '1'
}

const redirectToArchivedSite = () => {
  const archivedUrl = new URL(runtimeConfig.public.archivedUrl)

  if (hasDebugQuery() || window.location.origin === archivedUrl.origin) {
    return
  }

  window.location.replace(archivedUrl.href)
}

if (import.meta.client) {
  watch(
    () => route.fullPath,
    () => {
      redirectToArchivedSite()
    },
    { immediate: true },
  )
}

const currentJaFullPath = computed(() => {
  if (currentLang.value === 'ja') {
    return currentFullPath.value
  } else {
    const path = route.fullPath.replace(/^\/en(?=\/|$)/, '') || '/'
    return `${runtimeConfig.public.url}${path}`
  }
})

const currentEnFullPath = computed(() => {
  if (currentLang.value === 'en') {
    return currentFullPath.value
  } else {
    const path = route.fullPath.endsWith('/')
      ? route.fullPath
      : `${route.fullPath}/`
    return `${runtimeConfig.public.url}/en${path}`
  }
})

useHeadSafe({
  htmlAttrs: {
    lang: currentLang.value,
  },
  title: title.value,
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? i18n.t('site.title_template', { title: titleChunk })
      : title.value
  },
  meta: [
    {
      name: 'description',
      content: description.value,
    },
    {
      property: 'og:title',
      content: title.value,
    },
    {
      property: 'og:description',
      content: description.value,
    },
    {
      property: 'og:site_name',
      content: title.value,
    },
    {
      property: 'og:url',
      content: currentFullPath.value,
    },
    {
      property: 'og:image',
      content: ogImageUrl.value,
    },
    {
      property: 'og:locale',
      content: i18n.t('site.og_locale'),
    },
    {
      name: 'twitter:title',
      content: title.value,
    },
    {
      name: 'twitter:description',
      content: description.value,
    },
    {
      name: 'twitter:image',
      content: ogImageUrl.value,
    },
    {
      name: 'keywords',
      content: i18n.t('site.keywords'),
    },
    {
      name: 'author',
      content: i18n.t('site.author'),
    },
  ],
})
</script>
