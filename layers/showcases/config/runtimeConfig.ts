/**
 * nuxt.config.tsのためのモジュール。
 *
 * @packageDocumentation
 */

import type { EnvType } from './models/EnvType'

export function getRuntimeConfigOfEnvType(envType: EnvType) {
  switch (envType) {
    case 'local':
      return getLocal(envType)
    case 'development':
      return getDevelopment(envType)
    case 'staging':
      return getStaging(envType)
    case 'production':
      return getProduction(envType)
  }
}

const commonPrivate = {} as const

const commonPublic = {
  gtmId: 'GTM-XXXXXXX',
  apiPrefix: process.env.NUXT_API_PREFIX ?? '/api/v1',
} as const

function getLocal(envType: EnvType) {
  return {
    ...commonPrivate,

    public: {
      ...commonPublic,
      outputEnv: envType,
      url: 'http://localhost:3000',
      baseUrl: 'http://localhost:3000',
      httpBinUrl: 'http://localhost:3003',
    },
  } as const
}

function getDevelopment(envType: EnvType) {
  return {
    ...commonPrivate,

    public: {
      ...commonPublic,
      outputEnv: envType,
      url: 'http://localhost:3000',
      baseUrl: 'http://localhost:3000',
    },
  } as const
}

function getStaging(envType: EnvType) {
  return {
    ...commonPrivate,

    public: {
      ...commonPublic,
      outputEnv: envType,
      url: '',
      baseUrl: '',
    },
  } as const
}

function getProduction(envType: EnvType) {
  return {
    ...commonPrivate,

    public: {
      ...commonPublic,
      gtmId: 'GTM-XXXXXXX',
      outputEnv: envType,
      url: '',
      baseUrl: '',
    },
  } as const
}
