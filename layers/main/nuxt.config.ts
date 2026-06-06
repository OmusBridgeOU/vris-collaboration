import { defineNuxtConfig } from 'nuxt/config'
import path from 'path'
import { readEnvType } from './config/models/EnvType'
import { getRuntimeConfigOfEnvType } from './config/runtimeConfig'
import { nuxtI18nOptions } from './i18n/i18n.config'

type MetaInfo = {
  robots: string
  ogImageUrl: string
  twitterSite: string
  twitterCreator: string
}

const NUXT_ENV_OUTPUT_ENV = readEnvType(process.env)
const runtimeConfig = getRuntimeConfigOfEnvType(NUXT_ENV_OUTPUT_ENV)
const cssUrls = [`@/assets/styles/style.scss`]
const srcDir = 'app'
const isSsr = true
const checkTypeCheckOnBuild = true
const needAnalyze = NUXT_ENV_OUTPUT_ENV === 'local'
const needSourcemap = NUXT_ENV_OUTPUT_ENV !== 'production'
const enableDebug = NUXT_ENV_OUTPUT_ENV === 'local'

const meta: MetaInfo = {
  robots: NUXT_ENV_OUTPUT_ENV === 'production' ? 'all' : 'none',
  ogImageUrl: `${runtimeConfig.public.url}/kv.png`,
  twitterSite: 'https://x.com/vketreal_vris',
  twitterCreator: 'https://x.com/vketreal_vris',
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: path.resolve(__dirname, '../base'),
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/content',
  ],
  ssr: isSsr,

  imports: {
    dirs: ['utils/types/**'],
    global: false,
  },

  app: {
    head: {
      meta: [
        { name: 'robots', content: meta.robots },
        {
          property: 'og:image',
          content: meta.ogImageUrl,
        },
        {
          name: 'twitter:site',
          content: meta.twitterSite,
        },
        {
          name: 'twitter:creator',
          content: meta.twitterCreator,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:image',
          content: meta.ogImageUrl,
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${runtimeConfig.public.url}/favicon.ico`,
        },
      ],
    },
  },

  css: cssUrls,

  content: {
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    watch: {
      enabled: true,
    },
    build: {
      markdown: {
        toc: {
          depth: 4,
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
            sepia: 'monokai',
          },
        },
        remarkPlugins: {
          'remark-gfm': {
            singleTilde: false,
          },
        },
      },
    },
    experimental: {
      nativeSqlite: true,
    },
  },

  runtimeConfig,
  dir: {
    public: path.resolve(__dirname, './public'),
  },
  rootDir: __dirname,
  srcDir: `${srcDir}/`,

  alias: {
    '#base': path.resolve(__dirname, '../base'),
    '#main': __dirname,
    '@': path.resolve(__dirname, './app'),
  },

  ignore: [
    '.output',
    '**/test/*.{js,ts,jsx,tsx}',
    '**/*.{spec,test}.{js,ts,jsx,tsx}',
    '**/-*.*',
  ],

  build: {
    analyze: needAnalyze,
  },

  routeRules: {
    '/external/**': {
      proxy: 'https://d1-api-test-project.solarkamimura.workers.dev/api/**',
    },
  },

  nitro: {
    preset: 'cloudflare_pages',
  },

  sourcemap: {
    server: needSourcemap,
    client: needSourcemap,
  },

  compatibilityDate: '2024-04-03',

  typescript: {
    typeCheck: checkTypeCheckOnBuild,
  },

  debug: process.env.VITEST === 'true' ? false : enableDebug,

  googleFonts: {
    families: {
      'Noto+Sans+JP': [100, 300, 400, 500, 700, 900],
      'Inter': [100, 300, 400, 500, 700, 900],
    },
    display: 'swap',
  },

  i18n: nuxtI18nOptions,
})
