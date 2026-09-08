import { defineNuxtConfig } from 'nuxt/config'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import svgLoader from 'vite-svg-loader'
import { readEnvType } from './config/models/EnvType'
import { getRuntimeConfigOfEnvType } from './config/runtimeConfig'
import { nuxtI18nOptions } from './i18n/i18n.config'
import { createResolver } from '@nuxt/kit'

// NOTE: cssの相対パス指定に関する不具合対応
//
// Nuxtのレイヤー機構(extends)には、「レイヤーのnuxt.config.tsに書かれたcss配列の相対パスは、そのレイヤー自身ではなく、
// extendsしている側(例: layers/main)のプロジェクトディレクトリを基準に解決される」という仕様がある。
// これにより、本来は`layers/base/app/assets/styles/style.scss`を指すはずだった相対パス './app/assets/styles/style.scss' が、
// layers/main 側を基準に解決されようとすることで見つからず、ビルドエラー(Internal server error)が発生していた。
//
// @nuxt/kit の createResolver を使い、このnuxt.config.ts自身の物理的な場所(import.meta.url)を基準に、絶対パスへ明示的に解決するよう変更した。
// これにより、baseをどのレイヤーがextendsしても、常にbaseレイヤー自身のstyle.scssを正しく指すようにしている。
const { resolve } = createResolver(import.meta.url)
const cssUrls = [resolve('./app/assets/styles/style.scss')]
const srcDir = 'app'

type NuxtConfigInput = Parameters<typeof defineNuxtConfig>[0]
type ResolvedNuxtConfigInput = NonNullable<NuxtConfigInput>
type NuxtVitePluginOption = NonNullable<
  NonNullable<NonNullable<NuxtConfigInput>['vite']>['plugins']
>[number]
type NuxtEslintConfig = {
  checker?: boolean
  config?: {
    stylistic?: {
      semi?: boolean
      indent?: number
      quotes?: 'single' | 'double'
      braceStyle?: string
    }
  }
}

/**
 * Nuxt Config
 * @ref https://nuxt.com/docs/api/configuration/nuxt-config
 */
const config: ResolvedNuxtConfigInput & { eslint?: NuxtEslintConfig } = {
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'unplugin-icons/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/device',
    ...(process.env.VITEST === 'true' ? ['@nuxt/test-utils/module'] : []),
  ],
  imports: {
    dirs: ['utils/types/**'],
    global: false,
  },
  devtools: { enabled: true },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      meta: [
        { property: 'og:type', content: 'website' },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'note:card',
          content: 'summary_large_image',
        },
      ],
      noscript: [{ innerHTML: 'JavaScript is required' }],
    },
  },
  css: cssUrls,
  runtimeConfig: getRuntimeConfigOfEnvType(
    readEnvType(process.env),
    process.env,
  ),
  rootDir: __dirname,
  srcDir: `${srcDir}/`,
  alias: {
    '#base': __dirname,
  },
  ignore: [
    '.output',
    '**/test/*.{js,ts,jsx,tsx}',
    '**/*.{spec,test}.{js,ts,jsx,tsx}',
    '**/-*.*',
  ],
  compatibilityDate: '2024-04-03',
  vite: {
    build: {
      emptyOutDir: true,
    },
    plugins: [
      svgLoader({
        defaultImport: 'component', // 'component', 'url', 'raw'
        svgo: false,
      }) as unknown as NuxtVitePluginOption,
      Icons({
        customCollections: {
          'hikky-icons': FileSystemIconLoader(`${srcDir}/assets/icons/hikky`),
          'sns-icons': FileSystemIconLoader(`${srcDir}/assets/icons/sns`),
        },
        iconCustomizer(collection, _icon, props) {
          // customize all icons in this collection
          if (
            collection === 'hikky-icons'
            || collection === 'sns-icons'
            || collection === 'ri'
          ) {
            props.width = '1em'
            props.height = '1em'
          }
        },
      }) as unknown as NuxtVitePluginOption,
      Components({
        dts: false,
        resolvers: [
          IconsResolver({
            customCollections: ['hikky-icons', 'sns-icons'],
          }),
        ],
      }) as unknown as NuxtVitePluginOption,
    ],
    css: {
      preprocessorMaxWorkers: true,
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },
  eslint: {
    checker: false,
    config: {
      stylistic: {
        semi: false,
        indent: 2,
        quotes: 'single',
        braceStyle: '1tbs',
      },
    },
  },
  i18n: nuxtI18nOptions,
}

export default defineNuxtConfig(config)
