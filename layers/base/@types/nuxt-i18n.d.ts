import type { Composer } from 'vue-i18n'

type ToastApi = typeof import('vue3-toastify')['toast']

declare module '#app' {
  interface NuxtApp {
    $i18n: Composer
    $toast: ToastApi
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $i18n: Composer
    $toast: ToastApi
  }
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    NUXT_ENV_BASE_URL?: string
    apiPrefix: string
    baseUrl: string
    gtmId: string
    httpBinUrl?: string
    outputEnv: string
    url: string
  }
}

export {}
