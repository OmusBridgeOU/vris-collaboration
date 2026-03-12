import { defineNuxtConfig } from 'nuxt/config'
import path from 'path'
import { readEnvType } from './config/models/EnvType'
import { getRuntimeConfigOfEnvType } from './config/runtimeConfig'

type MetaInfo = {
  title: string
  description: string
  robots: string
  siteName: string
  ogImageUrl: string
  ogUrl: string
  twitterSite: string
  twitterCreator: string
}

const NUXT_ENV_OUTPUT_ENV = readEnvType(process.env)
const runtimeConfig = getRuntimeConfigOfEnvType(
  NUXT_ENV_OUTPUT_ENV,
  process.env,
)
const cssUrls = [`#vris/app/assets/styles/style.scss`]
const srcDir = 'app'
const isSsr = false
const checkTypeCheckOnBuild = true
const needAnalyze = NUXT_ENV_OUTPUT_ENV === 'local'
const needSourcemap = NUXT_ENV_OUTPUT_ENV !== 'production'
const enableDebug = NUXT_ENV_OUTPUT_ENV === 'local'
const meta: MetaInfo = {
  title: 'VketReal mini in 札幌 2026 Winter Early Spring',
  description: '世界最大級のメタバースイベント「バーチャルマーケット」から派生したリアルイベント！有志主催で北海道の創作文化を発信！',
  robots: NUXT_ENV_OUTPUT_ENV === 'production' ? 'all' : 'none',
  siteName: 'VketReal in 札幌',
  ogImageUrl: `${runtimeConfig.public.url}/images/logo-noyear.png`,
  ogUrl: runtimeConfig.public.url,
  twitterSite: 'https://x.com/vketreal_vris/',
  twitterCreator: 'https://x.com/skmt3p/',
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: path.resolve(__dirname, '../base'),
  modules: ['@nuxt/fonts', '@nuxtjs/mdc', '@nuxt/content', '@nuxtjs/google-fonts'],
  ssr: isSsr,

  imports: {
    dirs: ['utils/types/**'],
    global: false,
  },
  app: {
    head: {
      title: meta.title,
      meta: [
        { name: 'robots', content: meta.robots },
        {
          name: 'description',
          content: meta.description,
        },
        {
          property: 'og:site_name',
          content: meta.siteName,
        },
        {
          property: 'og:url',
          content: meta.ogUrl,
        },
        {
          property: 'og:title',
          content: meta.title,
        },
        {
          property: 'og:description',
          content: meta.description,
        },
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
          property: 'og:locale',
          content: 'ja_JP',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: meta.title,
        },
        {
          name: 'twitter:description',
          content: meta.description,
        },
        {
          name: 'twitter:image',
          content: meta.ogImageUrl,
        },
        {
          name: 'keywords',
          content: 'VketReal,札幌,バーチャルマーケット,VR,メタバース,イベント,北海道',
        },
        {
          name: 'author',
          content: 'VketReal in 札幌 実行委員会',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
    },
  },

  css: cssUrls,
  content: {
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
  },
  runtimeConfig,
  dir: {
    public: path.resolve(__dirname, './public'),
  },
  rootDir: __dirname,
  srcDir: `${srcDir}/`,

  alias: {
    '~': path.resolve(__dirname, '../main/app'),
    '@': path.resolve(__dirname, '../main/app'),
    '#base': path.resolve(__dirname, '../base'),
    '#main': path.resolve(__dirname, '../main'),
    '#vris': __dirname,
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

  sourcemap: {
    server: needSourcemap,
    client: needSourcemap,
  },

  experimental: {
    debugModuleMutation: false,
  },

  compatibilityDate: '2024-04-03',

  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/en/',
      ],
      ignore: ['/api', '/__nuxt_content/'],
    },
  },

  typescript: {
    typeCheck: checkTypeCheckOnBuild,
  },

  debug: process.env.VITEST === 'true' ? false : enableDebug,

  fonts: {
    provider: 'google',
    families: [
      { name: 'Mochiy+Pop+One', provider: 'google' },
    ],
  },
})
