/**
 * app.config.tsのためのモジュール。
 *
 * @packageDocumentation
 */

import type { EnvType } from './models/EnvType'

/**
 * ```typescript
 * const appConfig = getAppConfigOfEnvType('local')
 * ```
 */
export function getAppConfigOfEnvType(envType: EnvType) {
  switch (envType) {
    case 'local':
      return getLocal()
    case 'development':
      return getDevelopment()
    case 'staging':
      return getStaging()
    case 'production':
      return getProduction()
  }
}

function getLocal() {
  return {}
}

function getDevelopment() {
  return {}
}

function getStaging() {
  return {}
}

function getProduction() {
  return {}
}
