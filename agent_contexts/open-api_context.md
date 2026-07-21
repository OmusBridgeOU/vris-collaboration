This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: layers/open-api/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
layers/
  open-api/
    app/
      models/
        openapi/
          .gitkeep
    openapi/
      example-merged.yml
      example.yml
    scripts/
      make-zod.ts
      template.hbs
    eslint.config.mjs
    package.json
    tsconfig.json
    tsconfig.tsbuildinfo
```

# Files

## File: layers/open-api/app/models/openapi/.gitkeep
```
# This directory will contain generated API clients
# Files in this directory are automatically generated and should not be edited manually
```

## File: layers/open-api/openapi/example-merged.yml
```yaml
openapi: 3.0.3
info:
  title: Example API
  description: Example API for demonstrating OpenAPI integration
  version: 1.0.0
servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server
paths:
  /users:
    get:
      operationId: getUsers
      summary: Get all users
      description: Retrieve a list of all users
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  users:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  total:
                    type: number
                    description: Total number of users
    post:
      operationId: createUser
      summary: Create a new user
      description: Create a new user with the provided information
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
  /users/{id}:
    get:
      operationId: getUserById
      summary: Get user by ID
      description: Retrieve a specific user by their ID
      parameters:
        - name: id
          in: path
          required: true
          description: User ID
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          description: Unique user identifier
        email:
          type: string
          format: email
          description: User email address
        name:
          type: string
          description: User full name
        createdAt:
          type: string
          format: date-time
          description: Account creation timestamp
        updatedAt:
          type: string
          format: date-time
          description: Last update timestamp
      required:
        - id
        - email
        - name
        - createdAt
        - updatedAt
    CreateUserRequest:
      type: object
      properties:
        email:
          type: string
          format: email
          description: User email address
        name:
          type: string
          description: User full name
        password:
          type: string
          minLength: 8
          description: User password (minimum 8 characters)
      required:
        - email
        - name
        - password
```

## File: layers/open-api/openapi/example.yml
```yaml
openapi: 3.0.3
info:
  title: Example API
  description: Example API for demonstrating OpenAPI integration
  version: 1.0.0
servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server

paths:
  /users:
    get:
      operationId: getUsers
      summary: Get all users
      description: Retrieve a list of all users
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  users:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  total:
                    type: number
                    description: Total number of users
    post:
      operationId: createUser
      summary: Create a new user
      description: Create a new user with the provided information
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

  /users/{id}:
    get:
      operationId: getUserById
      summary: Get user by ID
      description: Retrieve a specific user by their ID
      parameters:
        - name: id
          in: path
          required: true
          description: User ID
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          description: Unique user identifier
        email:
          type: string
          format: email
          description: User email address
        name:
          type: string
          description: User full name
        createdAt:
          type: string
          format: date-time
          description: Account creation timestamp
        updatedAt:
          type: string
          format: date-time
          description: Last update timestamp
      required:
        - id
        - email
        - name
        - createdAt
        - updatedAt

    CreateUserRequest:
      type: object
      properties:
        email:
          type: string
          format: email
          description: User email address
        name:
          type: string
          description: User full name
        password:
          type: string
          minLength: 8
          description: User password (minimum 8 characters)
      required:
        - email
        - name
        - password
```

## File: layers/open-api/scripts/make-zod.ts
```typescript
#!/usr/bin/env bun
/**
 * OpenAPI から Zod スキーマと型安全なAPIクライアントを自動生成
 */

import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import yaml from 'js-yaml'
import path from 'path'

/**
 * エンドポイント設定
 */
interface Endpoint {
  name: string
  path: string
  output: string
}

/**
 * 設定
 */
const endpoints: Endpoint[] = [
  {
    name: 'example',
    path: './openapi/example.yml',
    output: './app/models/openapi/example.ts',
  },
  // 追加のエンドポイントをここに定義
]

const template = './scripts/template.hbs'

/**
 * コマンドを実行
 */
const runCommand = (command: string): void => {
  console.info(`Executing: ${command}`)
  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Command failed: ${command}`)
    throw error
  }
}

/**
 * YAMLファイルをマージ
 */
const mergeYamlFiles = (openapiPath: string, name: string): string => {
  const baseDir = path.dirname(openapiPath)
  const mergedPath = path.join(baseDir, `${name}-merged.yml`)
  
  if (!existsSync(openapiPath)) {
    console.warn(`OpenAPI file not found: ${openapiPath}`)
    return openapiPath
  }
  
  try {
    const content = readFileSync(openapiPath, 'utf8')
    const parsed = yaml.load(content) as unknown
    
    // ここで必要に応じてYAMLファイルのマージ処理を実装
    // 現在は単純にそのまま書き出し
    writeFileSync(mergedPath, yaml.dump(parsed))
    
    return mergedPath
  } catch (error) {
    console.error(`Failed to merge YAML files: ${error}`)
    return openapiPath
  }
}

/**
 * Zodクライアントをビルド
 */
const buildZodClient = ({ name, path: openapiPath, output }: Endpoint): void => {
  console.info(`Building Zod client for ${name}...`)
  
  // 出力ディレクトリを作成
  const outputDir = path.dirname(output)
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }
  
  // YAMLファイルをマージ
  const mergeFilePath = mergeYamlFiles(openapiPath, name)
  
  // OpenAPI-Zod-Client でコード生成
  const command = `bunx openapi-zod-client ${mergeFilePath} -o ${output} -t ${template}`
  runCommand(command)
  
  console.info(`✅ Generated ${output}`)
}

/**
 * テンプレートファイルが存在しない場合は作成
 */
const ensureTemplate = (): void => {
  if (!existsSync(template)) {
    const templateContent = `{{#each operations}}
{{#each responses}}
{{#if content}}
export const {{toCamelCase ../operationId}}ResponseSchema = z.object({
{{#each content}}
  {{#each schema.properties}}
  {{toCamelCase @key}}: {{{zodType this}}},
  {{/each}}
});
export type {{toCamelCase ../operationId}}ResponseType = z.infer<typeof {{toCamelCase ../operationId}}ResponseSchema>;

{{/each}}
{{/if}}
{{/each}}

{{#if requestBody}}
export const {{toCamelCase operationId}}RequestSchema = z.object({
{{#each requestBody.content}}
  {{#each schema.properties}}
  {{toCamelCase @key}}: {{{zodType this}}},
  {{/each}}
{{/each}}
});
export type {{toCamelCase operationId}}RequestType = z.infer<typeof {{toCamelCase operationId}}RequestSchema>;

{{/if}}
{{/each}}`
    
    const templateDir = path.dirname(template)
    if (!existsSync(templateDir)) {
      mkdirSync(templateDir, { recursive: true })
    }
    
    writeFileSync(template, templateContent)
    console.info(`Created template file: ${template}`)
  }
}

/**
 * メイン処理
 */
const main = (): void => {
  console.info('🚀 Starting OpenAPI Zod client generation...')
  
  // テンプレートファイルを確認・作成
  ensureTemplate()
  
  // 各エンドポイントに対してZodクライアントを生成
  for (const endpoint of endpoints) {
    try {
      buildZodClient(endpoint)
    } catch (error) {
      console.error(`Failed to build client for ${endpoint.name}:`, error)
      process.exit(1)
    }
  }
  
  console.info('✅ OpenAPI Zod client generation completed!')
}

// スクリプトとして実行された場合のみメイン処理を実行
if (process.argv[1] === import.meta.url) {
  main()
}
```

## File: layers/open-api/scripts/template.hbs
```handlebars
{{!-- OpenAPI から Zod スキーマ生成用テンプレート --}}
import { z } from 'zod/v3'

{{#each operations}}
{{#each responses}}
{{#if content}}
/**
 * {{../summary}}
 * {{../description}}
 */
export const {{toCamelCase ../operationId}}ResponseSchema = z.object({
{{#each content}}
  {{#each schema.properties}}
  {{toCamelCase @key}}: {{{zodType this}}},{{#if description}} // {{description}}{{/if}}
  {{/each}}
{{/each}}
})

export type {{toCamelCase ../operationId}}ResponseType = z.infer<typeof {{toCamelCase ../operationId}}ResponseSchema>

{{/each}}
{{/if}}
{{/each}}

{{#if requestBody}}
/**
 * Request schema for {{summary}}
 */
export const {{toCamelCase operationId}}RequestSchema = z.object({
{{#each requestBody.content}}
  {{#each schema.properties}}
  {{toCamelCase @key}}: {{{zodType this}}},{{#if description}} // {{description}}{{/if}}
  {{/each}}
{{/each}}
})

export type {{toCamelCase operationId}}RequestType = z.infer<typeof {{toCamelCase operationId}}RequestSchema>

{{/if}}

{{#if parameters}}
/**
 * Parameters schema for {{summary}}
 */
export const {{toCamelCase operationId}}ParametersSchema = z.object({
{{#each parameters}}
  {{toCamelCase name}}: {{{zodType schema}}},{{#if description}} // {{description}}{{/if}}
{{/each}}
})

export type {{toCamelCase operationId}}ParametersType = z.infer<typeof {{toCamelCase operationId}}ParametersSchema>

{{/if}}
{{/each}}

/**
 * API client functions
 */
{{#each operations}}
export const {{toCamelCase operationId}} = async (
{{#if requestBody}}
  data: {{toCamelCase operationId}}RequestType,
{{/if}}
{{#if parameters}}
  params: {{toCamelCase operationId}}ParametersType,
{{/if}}
) => {
  // TODO: Implement API call logic using fetcher from api-enhanced.ts
  throw new Error('API call not implemented yet')
}

{{/each}}
```

## File: layers/open-api/eslint.config.mjs
```javascript
import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { basicConfig } from '../../eslint.config.shared.mjs'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['scripts/**/*.ts', 'app/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.es2023,
        ...globals.node,
        Bun: 'readonly',
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...basicConfig.rules,
      'no-console': 'off',
    },
  },
)
```

## File: layers/open-api/tsconfig.tsbuildinfo
```
{"fileNames":["../../node_modules/typescript/lib/lib.es5.d.ts","../../node_modules/typescript/lib/lib.es2015.d.ts","../../node_modules/typescript/lib/lib.es2016.d.ts","../../node_modules/typescript/lib/lib.es2017.d.ts","../../node_modules/typescript/lib/lib.es2018.d.ts","../../node_modules/typescript/lib/lib.es2019.d.ts","../../node_modules/typescript/lib/lib.es2020.d.ts","../../node_modules/typescript/lib/lib.es2021.d.ts","../../node_modules/typescript/lib/lib.es2022.d.ts","../../node_modules/typescript/lib/lib.es2023.d.ts","../../node_modules/typescript/lib/lib.es2024.d.ts","../../node_modules/typescript/lib/lib.es2025.d.ts","../../node_modules/typescript/lib/lib.esnext.d.ts","../../node_modules/typescript/lib/lib.dom.d.ts","../../node_modules/typescript/lib/lib.es2015.core.d.ts","../../node_modules/typescript/lib/lib.es2015.collection.d.ts","../../node_modules/typescript/lib/lib.es2015.generator.d.ts","../../node_modules/typescript/lib/lib.es2015.iterable.d.ts","../../node_modules/typescript/lib/lib.es2015.promise.d.ts","../../node_modules/typescript/lib/lib.es2015.proxy.d.ts","../../node_modules/typescript/lib/lib.es2015.reflect.d.ts","../../node_modules/typescript/lib/lib.es2015.symbol.d.ts","../../node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts","../../node_modules/typescript/lib/lib.es2016.array.include.d.ts","../../node_modules/typescript/lib/lib.es2016.intl.d.ts","../../node_modules/typescript/lib/lib.es2017.arraybuffer.d.ts","../../node_modules/typescript/lib/lib.es2017.date.d.ts","../../node_modules/typescript/lib/lib.es2017.object.d.ts","../../node_modules/typescript/lib/lib.es2017.sharedmemory.d.ts","../../node_modules/typescript/lib/lib.es2017.string.d.ts","../../node_modules/typescript/lib/lib.es2017.intl.d.ts","../../node_modules/typescript/lib/lib.es2017.typedarrays.d.ts","../../node_modules/typescript/lib/lib.es2018.asyncgenerator.d.ts","../../node_modules/typescript/lib/lib.es2018.asynciterable.d.ts","../../node_modules/typescript/lib/lib.es2018.intl.d.ts","../../node_modules/typescript/lib/lib.es2018.promise.d.ts","../../node_modules/typescript/lib/lib.es2018.regexp.d.ts","../../node_modules/typescript/lib/lib.es2019.array.d.ts","../../node_modules/typescript/lib/lib.es2019.object.d.ts","../../node_modules/typescript/lib/lib.es2019.string.d.ts","../../node_modules/typescript/lib/lib.es2019.symbol.d.ts","../../node_modules/typescript/lib/lib.es2019.intl.d.ts","../../node_modules/typescript/lib/lib.es2020.bigint.d.ts","../../node_modules/typescript/lib/lib.es2020.date.d.ts","../../node_modules/typescript/lib/lib.es2020.promise.d.ts","../../node_modules/typescript/lib/lib.es2020.sharedmemory.d.ts","../../node_modules/typescript/lib/lib.es2020.string.d.ts","../../node_modules/typescript/lib/lib.es2020.symbol.wellknown.d.ts","../../node_modules/typescript/lib/lib.es2020.intl.d.ts","../../node_modules/typescript/lib/lib.es2020.number.d.ts","../../node_modules/typescript/lib/lib.es2021.promise.d.ts","../../node_modules/typescript/lib/lib.es2021.string.d.ts","../../node_modules/typescript/lib/lib.es2021.weakref.d.ts","../../node_modules/typescript/lib/lib.es2021.intl.d.ts","../../node_modules/typescript/lib/lib.es2022.array.d.ts","../../node_modules/typescript/lib/lib.es2022.error.d.ts","../../node_modules/typescript/lib/lib.es2022.intl.d.ts","../../node_modules/typescript/lib/lib.es2022.object.d.ts","../../node_modules/typescript/lib/lib.es2022.string.d.ts","../../node_modules/typescript/lib/lib.es2022.regexp.d.ts","../../node_modules/typescript/lib/lib.es2023.array.d.ts","../../node_modules/typescript/lib/lib.es2023.collection.d.ts","../../node_modules/typescript/lib/lib.es2023.intl.d.ts","../../node_modules/typescript/lib/lib.es2024.arraybuffer.d.ts","../../node_modules/typescript/lib/lib.es2024.collection.d.ts","../../node_modules/typescript/lib/lib.es2024.object.d.ts","../../node_modules/typescript/lib/lib.es2024.promise.d.ts","../../node_modules/typescript/lib/lib.es2024.regexp.d.ts","../../node_modules/typescript/lib/lib.es2024.sharedmemory.d.ts","../../node_modules/typescript/lib/lib.es2024.string.d.ts","../../node_modules/typescript/lib/lib.es2025.collection.d.ts","../../node_modules/typescript/lib/lib.es2025.float16.d.ts","../../node_modules/typescript/lib/lib.es2025.intl.d.ts","../../node_modules/typescript/lib/lib.es2025.iterator.d.ts","../../node_modules/typescript/lib/lib.es2025.promise.d.ts","../../node_modules/typescript/lib/lib.es2025.regexp.d.ts","../../node_modules/typescript/lib/lib.esnext.array.d.ts","../../node_modules/typescript/lib/lib.esnext.collection.d.ts","../../node_modules/typescript/lib/lib.esnext.date.d.ts","../../node_modules/typescript/lib/lib.esnext.decorators.d.ts","../../node_modules/typescript/lib/lib.esnext.disposable.d.ts","../../node_modules/typescript/lib/lib.esnext.error.d.ts","../../node_modules/typescript/lib/lib.esnext.intl.d.ts","../../node_modules/typescript/lib/lib.esnext.sharedmemory.d.ts","../../node_modules/typescript/lib/lib.esnext.temporal.d.ts","../../node_modules/typescript/lib/lib.esnext.typedarrays.d.ts","../../node_modules/typescript/lib/lib.decorators.d.ts","../../node_modules/typescript/lib/lib.decorators.legacy.d.ts","../../node_modules/js-yaml/dist/js-yaml.d.ts","./scripts/make-zod.ts","../../node_modules/undici-types/utility.d.ts","../../node_modules/undici-types/header.d.ts","../../node_modules/undici-types/readable.d.ts","../../node_modules/@types/node/globals.typedarray.d.ts","../../node_modules/@types/node/buffer.buffer.d.ts","../../node_modules/@types/node/globals.d.ts","../../node_modules/@types/node/web-globals/abortcontroller.d.ts","../../node_modules/@types/node/web-globals/blob.d.ts","../../node_modules/@types/node/web-globals/console.d.ts","../../node_modules/@types/node/web-globals/crypto.d.ts","../../node_modules/@types/node/web-globals/domexception.d.ts","../../node_modules/@types/node/web-globals/encoding.d.ts","../../node_modules/@types/node/web-globals/events.d.ts","../../node_modules/@types/node/node_modules/undici-types/utility.d.ts","../../node_modules/@types/node/node_modules/undici-types/header.d.ts","../../node_modules/@types/node/node_modules/undici-types/readable.d.ts","../../node_modules/@types/node/node_modules/undici-types/fetch.d.ts","../../node_modules/@types/node/node_modules/undici-types/formdata.d.ts","../../node_modules/@types/node/node_modules/undici-types/connector.d.ts","../../node_modules/@types/node/node_modules/undici-types/client-stats.d.ts","../../node_modules/@types/node/node_modules/undici-types/client.d.ts","../../node_modules/@types/node/node_modules/undici-types/errors.d.ts","../../node_modules/@types/node/node_modules/undici-types/dispatcher.d.ts","../../node_modules/@types/node/node_modules/undici-types/global-dispatcher.d.ts","../../node_modules/@types/node/node_modules/undici-types/global-origin.d.ts","../../node_modules/@types/node/node_modules/undici-types/pool-stats.d.ts","../../node_modules/@types/node/node_modules/undici-types/pool.d.ts","../../node_modules/@types/node/node_modules/undici-types/handlers.d.ts","../../node_modules/@types/node/node_modules/undici-types/balanced-pool.d.ts","../../node_modules/@types/node/node_modules/undici-types/round-robin-pool.d.ts","../../node_modules/@types/node/node_modules/undici-types/h2c-client.d.ts","../../node_modules/@types/node/node_modules/undici-types/agent.d.ts","../../node_modules/@types/node/node_modules/undici-types/dispatcher1-wrapper.d.ts","../../node_modules/@types/node/node_modules/undici-types/mock-interceptor.d.ts","../../node_modules/@types/node/node_modules/undici-types/mock-call-history.d.ts","../../node_modules/@types/node/node_modules/undici-types/mock-agent.d.ts","../../node_modules/@types/node/node_modules/undici-types/mock-client.d.ts","../../node_modules/@types/node/node_modules/undici-types/mock-pool.d.ts","../../node_modules/@types/node/node_modules/undici-types/snapshot-agent.d.ts","../../node_modules/@types/node/node_modules/undici-types/mock-errors.d.ts","../../node_modules/@types/node/node_modules/undici-types/proxy-agent.d.ts","../../node_modules/@types/node/node_modules/undici-types/socks5-proxy-agent.d.ts","../../node_modules/@types/node/node_modules/undici-types/env-http-proxy-agent.d.ts","../../node_modules/@types/node/node_modules/undici-types/retry-handler.d.ts","../../node_modules/@types/node/node_modules/undici-types/retry-agent.d.ts","../../node_modules/@types/node/node_modules/undici-types/api.d.ts","../../node_modules/@types/node/node_modules/undici-types/cache-interceptor.d.ts","../../node_modules/@types/node/node_modules/undici-types/interceptors.d.ts","../../node_modules/@types/node/node_modules/undici-types/util.d.ts","../../node_modules/@types/node/node_modules/undici-types/cookies.d.ts","../../node_modules/@types/node/node_modules/undici-types/patch.d.ts","../../node_modules/@types/node/node_modules/undici-types/websocket.d.ts","../../node_modules/@types/node/node_modules/undici-types/eventsource.d.ts","../../node_modules/@types/node/node_modules/undici-types/diagnostics-channel.d.ts","../../node_modules/@types/node/node_modules/undici-types/content-type.d.ts","../../node_modules/@types/node/node_modules/undici-types/cache.d.ts","../../node_modules/@types/node/node_modules/undici-types/index.d.ts","../../node_modules/@types/node/web-globals/fetch.d.ts","../../node_modules/@types/node/web-globals/importmeta.d.ts","../../node_modules/@types/node/web-globals/messaging.d.ts","../../node_modules/@types/node/web-globals/navigator.d.ts","../../node_modules/@types/node/web-globals/performance.d.ts","../../node_modules/@types/node/web-globals/storage.d.ts","../../node_modules/@types/node/web-globals/streams.d.ts","../../node_modules/@types/node/web-globals/timers.d.ts","../../node_modules/@types/node/web-globals/url.d.ts","../../node_modules/@types/node/assert.d.ts","../../node_modules/@types/node/assert/strict.d.ts","../../node_modules/@types/node/async_hooks.d.ts","../../node_modules/@types/node/buffer.d.ts","../../node_modules/@types/node/child_process.d.ts","../../node_modules/@types/node/cluster.d.ts","../../node_modules/@types/node/console.d.ts","../../node_modules/@types/node/constants.d.ts","../../node_modules/@types/node/crypto.d.ts","../../node_modules/@types/node/dgram.d.ts","../../node_modules/@types/node/diagnostics_channel.d.ts","../../node_modules/@types/node/dns.d.ts","../../node_modules/@types/node/dns/promises.d.ts","../../node_modules/@types/node/domain.d.ts","../../node_modules/@types/node/events.d.ts","../../node_modules/@types/node/ffi.d.ts","../../node_modules/@types/node/fs.d.ts","../../node_modules/@types/node/fs/promises.d.ts","../../node_modules/@types/node/http.d.ts","../../node_modules/@types/node/http2.d.ts","../../node_modules/@types/node/https.d.ts","../../node_modules/@types/node/inspector.d.ts","../../node_modules/@types/node/inspector.generated.d.ts","../../node_modules/@types/node/inspector/promises.d.ts","../../node_modules/@types/node/module.d.ts","../../node_modules/@types/node/net.d.ts","../../node_modules/buffer/index.d.ts","../../node_modules/@types/node/os.d.ts","../../node_modules/@types/node/path.d.ts","../../node_modules/@types/node/path/posix.d.ts","../../node_modules/@types/node/path/win32.d.ts","../../node_modules/@types/node/perf_hooks.d.ts","../../node_modules/@types/node/process.d.ts","../../node_modules/@types/node/punycode.d.ts","../../node_modules/@types/node/querystring.d.ts","../../node_modules/@types/node/quic.d.ts","../../node_modules/@types/node/readline.d.ts","../../node_modules/@types/node/readline/promises.d.ts","../../node_modules/@types/node/repl.d.ts","../../node_modules/@types/node/sea.d.ts","../../node_modules/@types/node/sqlite.d.ts","../../node_modules/@types/node/stream.d.ts","../../node_modules/@types/node/stream/consumers.d.ts","../../node_modules/@types/node/stream/iter.d.ts","../../node_modules/@types/node/stream/promises.d.ts","../../node_modules/@types/node/stream/web.d.ts","../../node_modules/@types/node/string_decoder.d.ts","../../node_modules/@types/node/test.d.ts","../../node_modules/@types/node/test/reporters.d.ts","../../node_modules/@types/node/timers.d.ts","../../node_modules/@types/node/timers/promises.d.ts","../../node_modules/@types/node/tls.d.ts","../../node_modules/@types/node/trace_events.d.ts","../../node_modules/@types/node/tty.d.ts","../../node_modules/@types/node/url.d.ts","../../node_modules/@types/node/util.d.ts","../../node_modules/@types/node/util/types.d.ts","../../node_modules/@types/node/v8.d.ts","../../node_modules/@types/node/vm.d.ts","../../node_modules/@types/node/wasi.d.ts","../../node_modules/@types/node/worker_threads.d.ts","../../node_modules/@types/node/zlib.d.ts","../../node_modules/@types/node/zlib/iter.d.ts","../../node_modules/@types/node/index.d.ts","../../node_modules/undici-types/fetch.d.ts","../../node_modules/undici-types/formdata.d.ts","../../node_modules/undici-types/connector.d.ts","../../node_modules/undici-types/client-stats.d.ts","../../node_modules/undici-types/client.d.ts","../../node_modules/undici-types/errors.d.ts","../../node_modules/undici-types/dispatcher.d.ts","../../node_modules/undici-types/global-dispatcher.d.ts","../../node_modules/undici-types/global-origin.d.ts","../../node_modules/undici-types/pool-stats.d.ts","../../node_modules/undici-types/pool.d.ts","../../node_modules/undici-types/handlers.d.ts","../../node_modules/undici-types/balanced-pool.d.ts","../../node_modules/undici-types/round-robin-pool.d.ts","../../node_modules/undici-types/h2c-client.d.ts","../../node_modules/undici-types/agent.d.ts","../../node_modules/undici-types/mock-interceptor.d.ts","../../node_modules/undici-types/mock-call-history.d.ts","../../node_modules/undici-types/mock-agent.d.ts","../../node_modules/undici-types/mock-client.d.ts","../../node_modules/undici-types/mock-pool.d.ts","../../node_modules/undici-types/snapshot-agent.d.ts","../../node_modules/undici-types/mock-errors.d.ts","../../node_modules/undici-types/proxy-agent.d.ts","../../node_modules/undici-types/socks5-proxy-agent.d.ts","../../node_modules/undici-types/env-http-proxy-agent.d.ts","../../node_modules/undici-types/retry-handler.d.ts","../../node_modules/undici-types/retry-agent.d.ts","../../node_modules/undici-types/api.d.ts","../../node_modules/undici-types/cache-interceptor.d.ts","../../node_modules/undici-types/interceptors.d.ts","../../node_modules/undici-types/util.d.ts","../../node_modules/undici-types/cookies.d.ts","../../node_modules/undici-types/patch.d.ts","../../node_modules/undici-types/websocket.d.ts","../../node_modules/undici-types/eventsource.d.ts","../../node_modules/undici-types/diagnostics-channel.d.ts","../../node_modules/undici-types/content-type.d.ts","../../node_modules/undici-types/cache.d.ts","../../node_modules/undici-types/index.d.ts","../../node_modules/bun-types/globals.d.ts","../../node_modules/bun-types/s3.d.ts","../../node_modules/bun-types/fetch.d.ts","../../node_modules/bun-types/jsx.d.ts","../../node_modules/bun-types/bun.d.ts","../../node_modules/@types/bun/index.d.ts","../../node_modules/bun-types/extensions.d.ts","../../node_modules/bun-types/devserver.d.ts","../../node_modules/bun-types/ffi.d.ts","../../node_modules/bun-types/html-rewriter.d.ts","../../node_modules/bun-types/jsc.d.ts","../../node_modules/bun-types/sqlite.d.ts","../../node_modules/bun-types/vendor/expect-type/utils.d.ts","../../node_modules/bun-types/vendor/expect-type/overloads.d.ts","../../node_modules/bun-types/vendor/expect-type/branding.d.ts","../../node_modules/bun-types/vendor/expect-type/messages.d.ts","../../node_modules/bun-types/vendor/expect-type/index.d.ts","../../node_modules/bun-types/test.d.ts","../../node_modules/bun-types/wasm.d.ts","../../node_modules/bun-types/overrides.d.ts","../../node_modules/bun-types/deprecated.d.ts","../../node_modules/bun-types/redis.d.ts","../../node_modules/bun-types/shell.d.ts","../../node_modules/bun-types/serve.d.ts","../../node_modules/bun-types/sql.d.ts","../../node_modules/bun-types/security.d.ts","../../node_modules/bun-types/bundle.d.ts","../../node_modules/bun-types/bun.ns.d.ts","../../node_modules/bun-types/index.d.ts"],"fileIdsList":[[89,95,160,161,168,173,176,178,179,180,185,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286,289],[95,157,158,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,159,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,202,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,161,166,168,171,173,176,178,179,180,182,193,198,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,161,162,168,171,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,163,168,173,176,178,179,180,193,212,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,164,165,168,173,176,178,179,180,184,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,165,168,173,176,178,179,180,193,198,208,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,166,168,171,173,176,178,179,180,182,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,159,160,167,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,169,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,170,171,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,159,160,168,171,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,174,176,178,179,180,193,198,211,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,168,171,173,174,176,178,179,180,193,198,200,202,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,147,160,168,171,173,175,176,178,179,180,182,193,198,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,175,176,178,179,180,182,193,198,208,211,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,168,173,175,176,177,178,179,180,193,198,208,211,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[94,95,96,97,98,99,100,101,102,103,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,181,193,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,176,178,179,180,182,193,198,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,110,113,116,117,160,168,173,176,178,179,180,193,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,113,160,168,173,176,178,179,180,193,198,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,113,117,160,168,173,176,178,179,180,193,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,198,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,107,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,111,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,109,110,113,160,168,173,176,178,179,180,193,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,182,193,208,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,220,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,107,160,168,173,176,178,179,180,193,220,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,109,113,160,168,173,176,178,179,180,182,193,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,104,105,106,108,112,160,168,171,173,176,178,179,180,193,198,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,113,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,113,122,131,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,105,111,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,113,141,142,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,105,108,113,160,168,173,176,178,179,180,193,202,211,220,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,109,113,160,168,173,176,178,179,180,193,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,104,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,107,108,109,111,112,113,114,115,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,144,145,146,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,113,134,137,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,113,122,124,125,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,111,113,124,126,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,112,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,105,107,113,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,113,117,124,126,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,117,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,111,113,116,160,168,173,176,178,179,180,193,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,105,109,113,122,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,113,134,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,126,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,105,109,113,117,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,107,113,141,160,168,173,176,178,179,180,193,202,217,220,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,184,193,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,185,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,176,178,179,180,188,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,190,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,191,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,165,168,173,176,178,179,180,182,193,202,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,176,178,179,180,193,194,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,195,212,215,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,176,178,179,180,193,198,200,201,202,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,199,202,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,176,178,179,180,193,198,200,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,176,178,179,180,193,198,201,202,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,202,212,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,203,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,157,160,168,173,176,178,179,180,193,198,205,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,198,204,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,171,173,176,178,179,180,193,206,207,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,206,207,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,165,168,173,176,178,179,180,182,193,198,208,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,209,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,182,193,210,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,175,176,178,179,180,191,193,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,212,213,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,165,168,173,176,178,179,180,193,213,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,198,214,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,181,193,215,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,216,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,163,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,165,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,212,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,147,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,211,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,217,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,188,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,202,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,207,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,147,160,168,171,173,174,176,178,179,180,188,193,198,202,211,214,215,217,222,261,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,198,218,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,200,219,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,165,168,173,175,176,178,179,180,193,208,212,217,222,260,261,262,263,264,268,269,279,280,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,260,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,165,168,173,176,178,179,180,188,193,198,202,208,212,217,222,260,262,263,265,268,279,280,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,220,222,261,262,263,265,267,268,269,270,271,272,278,279,280,281,282,283,284,285,286,287,288],[95,160,163,165,168,173,174,176,178,179,180,184,193,202,208,211,218,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,272,279,281,282,283,284,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,277,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,273,274,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,273,274,275,276,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,273,275,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,273,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,211,222,224,227,230,231,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,198,211,222,227,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,211,222,227,231,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,221,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,225,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,211,222,223,224,227,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,220,221,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,182,193,211,222,223,227,261,262,263,265,268,279,281,282,283,284,285,286],[91,92,93,95,160,168,171,173,176,178,179,180,193,198,211,222,226,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,227,236,244,261,262,263,265,268,279,281,282,283,284,285,286],[92,95,160,168,173,176,178,179,180,193,222,225,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,227,254,255,261,262,263,265,268,279,281,282,283,284,285,286],[92,95,160,168,173,176,178,179,180,193,202,211,220,222,227,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,227,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,211,222,223,227,261,262,263,265,268,279,281,282,283,284,285,286],[91,95,160,168,173,176,178,179,180,193,222,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,221,222,223,225,226,227,228,229,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,255,256,257,258,259,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,227,247,250,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,227,236,237,238,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,225,227,237,239,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,226,261,262,263,265,268,279,281,282,283,284,285,286],[92,95,160,168,173,176,178,179,180,193,221,222,227,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,227,231,237,239,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,231,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,211,222,225,227,230,261,262,263,265,268,279,281,282,283,284,285,286],[92,95,160,168,173,176,178,179,180,193,222,223,227,236,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,227,247,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,222,239,261,262,263,265,268,279,281,282,283,284,285,286],[92,95,160,168,173,176,178,179,180,193,222,223,227,231,261,262,263,265,268,279,281,282,283,284,285,286],[95,160,168,173,176,178,179,180,193,202,217,220,221,222,227,254,261,262,263,265,268,279,281,282,283,284,285,286]],"fileInfos":[{"version":"bcd24271a113971ba9eb71ff8cb01bc6b0f872a85c23fdbe5d93065b375933cd","affectsGlobalScope":true,"impliedFormat":1},{"version":"3f88bedbeb09c6f5a6645cb24c7c55f1aa22d19ae96c8e6959cbd8b85a707bc6","impliedFormat":1},{"version":"7fe93b39b810eadd916be8db880dd7f0f7012a5cc6ffb62de8f62a2117fa6f1f","impliedFormat":1},{"version":"bb0074cc08b84a2374af33d8bf044b80851ccc9e719a5e202eacf40db2c31600","impliedFormat":1},{"version":"1a7daebe4f45fb03d9ec53d60008fbf9ac45a697fdc89e4ce218bc94b94f94d6","impliedFormat":1},{"version":"f94b133a3cb14a288803be545ac2683e0d0ff6661bcd37e31aaaec54fc382aed","impliedFormat":1},{"version":"f59d0650799f8782fd74cf73c19223730c6d1b9198671b1c5b3a38e1188b5953","impliedFormat":1},{"version":"8a15b4607d9a499e2dbeed9ec0d3c0d7372c850b2d5f1fb259e8f6d41d468a84","impliedFormat":1},{"version":"26e0fe14baee4e127f4365d1ae0b276f400562e45e19e35fd2d4c296684715e6","impliedFormat":1},{"version":"1e9332c23e9a907175e0ffc6a49e236f97b48838cc8aec9ce7e4cec21e544b65","impliedFormat":1},{"version":"3753fbc1113dc511214802a2342280a8b284ab9094f6420e7aa171e868679f91","impliedFormat":1},{"version":"999ca32883495a866aa5737fe1babc764a469e4cde6ee6b136a4b9ae68853e4b","impliedFormat":1},{"version":"17f13ecb98cbc39243f2eee1f16d45cd8ec4706b03ee314f1915f1a8b42f6984","impliedFormat":1},{"version":"d6b1eba8496bdd0eed6fc8a685768fe01b2da4a0388b5fe7df558290bffcf32f","affectsGlobalScope":true,"impliedFormat":1},{"version":"eadcffda2aa84802c73938e589b9e58248d74c59cb7fcbca6474e3435ac15504","affectsGlobalScope":true,"impliedFormat":1},{"version":"105ba8ff7ba746404fe1a2e189d1d3d2e0eb29a08c18dded791af02f29fb4711","affectsGlobalScope":true,"impliedFormat":1},{"version":"00343ca5b2e3d48fa5df1db6e32ea2a59afab09590274a6cccb1dbae82e60c7c","affectsGlobalScope":true,"impliedFormat":1},{"version":"ebd9f816d4002697cb2864bea1f0b70a103124e18a8cd9645eeccc09bdf80ab4","affectsGlobalScope":true,"impliedFormat":1},{"version":"2c1afac30a01772cd2a9a298a7ce7706b5892e447bb46bdbeef720f7b5da77ad","affectsGlobalScope":true,"impliedFormat":1},{"version":"7b0225f483e4fa685625ebe43dd584bb7973bbd84e66a6ba7bbe175ee1048b4f","affectsGlobalScope":true,"impliedFormat":1},{"version":"c0a4b8ac6ce74679c1da2b3795296f5896e31c38e888469a8e0f99dc3305de60","affectsGlobalScope":true,"impliedFormat":1},{"version":"3084a7b5f569088e0146533a00830e206565de65cae2239509168b11434cd84f","affectsGlobalScope":true,"impliedFormat":1},{"version":"c5079c53f0f141a0698faa903e76cb41cd664e3efb01cc17a5c46ec2eb0bef42","affectsGlobalScope":true,"impliedFormat":1},{"version":"32cafbc484dea6b0ab62cf8473182bbcb23020d70845b406f80b7526f38ae862","affectsGlobalScope":true,"impliedFormat":1},{"version":"fca4cdcb6d6c5ef18a869003d02c9f0fd95df8cfaf6eb431cd3376bc034cad36","affectsGlobalScope":true,"impliedFormat":1},{"version":"b93ec88115de9a9dc1b602291b85baf825c85666bf25985cc5f698073892b467","affectsGlobalScope":true,"impliedFormat":1},{"version":"f5c06dcc3fe849fcb297c247865a161f995cc29de7aa823afdd75aaaddc1419b","affectsGlobalScope":true,"impliedFormat":1},{"version":"b77e16112127a4b169ef0b8c3a4d730edf459c5f25fe52d5e436a6919206c4d7","affectsGlobalScope":true,"impliedFormat":1},{"version":"fbffd9337146eff822c7c00acbb78b01ea7ea23987f6c961eba689349e744f8c","affectsGlobalScope":true,"impliedFormat":1},{"version":"a995c0e49b721312f74fdfb89e4ba29bd9824c770bbb4021d74d2bf560e4c6bd","affectsGlobalScope":true,"impliedFormat":1},{"version":"c7b3542146734342e440a84b213384bfa188835537ddbda50d30766f0593aff9","affectsGlobalScope":true,"impliedFormat":1},{"version":"ce6180fa19b1cccd07ee7f7dbb9a367ac19c0ed160573e4686425060b6df7f57","affectsGlobalScope":true,"impliedFormat":1},{"version":"3f02e2476bccb9dbe21280d6090f0df17d2f66b74711489415a8aa4df73c9675","affectsGlobalScope":true,"impliedFormat":1},{"version":"45e3ab34c1c013c8ab2dc1ba4c80c780744b13b5676800ae2e3be27ae862c40c","affectsGlobalScope":true,"impliedFormat":1},{"version":"805c86f6cca8d7702a62a844856dbaa2a3fd2abef0536e65d48732441dde5b5b","affectsGlobalScope":true,"impliedFormat":1},{"version":"e42e397f1a5a77994f0185fd1466520691456c772d06bf843e5084ceb879a0ad","affectsGlobalScope":true,"impliedFormat":1},{"version":"f4c2b41f90c95b1c532ecc874bd3c111865793b23aebcc1c3cbbabcd5d76ffb0","affectsGlobalScope":true,"impliedFormat":1},{"version":"ab26191cfad5b66afa11b8bf935ef1cd88fabfcb28d30b2dfa6fad877d050332","affectsGlobalScope":true,"impliedFormat":1},{"version":"2088bc26531e38fb05eedac2951480db5309f6be3fa4a08d2221abb0f5b4200d","affectsGlobalScope":true,"impliedFormat":1},{"version":"cb9d366c425fea79716a8fb3af0d78e6b22ebbab3bd64d25063b42dc9f531c1e","affectsGlobalScope":true,"impliedFormat":1},{"version":"500934a8089c26d57ebdb688fc9757389bb6207a3c8f0674d68efa900d2abb34","affectsGlobalScope":true,"impliedFormat":1},{"version":"689da16f46e647cef0d64b0def88910e818a5877ca5379ede156ca3afb780ac3","affectsGlobalScope":true,"impliedFormat":1},{"version":"bc21cc8b6fee4f4c2440d08035b7ea3c06b3511314c8bab6bef7a92de58a2593","affectsGlobalScope":true,"impliedFormat":1},{"version":"7ca53d13d2957003abb47922a71866ba7cb2068f8d154877c596d63c359fed25","affectsGlobalScope":true,"impliedFormat":1},{"version":"54725f8c4df3d900cb4dac84b64689ce29548da0b4e9b7c2de61d41c79293611","affectsGlobalScope":true,"impliedFormat":1},{"version":"e5594bc3076ac29e6c1ebda77939bc4c8833de72f654b6e376862c0473199323","affectsGlobalScope":true,"impliedFormat":1},{"version":"2f3eb332c2d73e729f3364fcc0c2b375e72a121e8157d25a82d67a138c83a95c","affectsGlobalScope":true,"impliedFormat":1},{"version":"6f4427f9642ce8d500970e4e69d1397f64072ab73b97e476b4002a646ac743b1","affectsGlobalScope":true,"impliedFormat":1},{"version":"48915f327cd1dea4d7bd358d9dc7732f58f9e1626a29cc0c05c8c692419d9bb7","affectsGlobalScope":true,"impliedFormat":1},{"version":"b7bf9377723203b5a6a4b920164df22d56a43f593269ba6ae1fdc97774b68855","affectsGlobalScope":true,"impliedFormat":1},{"version":"db9709688f82c9e5f65a119c64d835f906efe5f559d08b11642d56eb85b79357","affectsGlobalScope":true,"impliedFormat":1},{"version":"4b25b8c874acd1a4cf8444c3617e037d444d19080ac9f634b405583fd10ce1f7","affectsGlobalScope":true,"impliedFormat":1},{"version":"37be57d7c90cf1f8112ee2636a068d8fd181289f82b744160ec56a7dc158a9f5","affectsGlobalScope":true,"impliedFormat":1},{"version":"a917a49ac94cd26b754ab84e113369a75d1a47a710661d7cd25e961cc797065f","affectsGlobalScope":true,"impliedFormat":1},{"version":"6d3261badeb7843d157ef3e6f5d1427d0eeb0af0cf9df84a62cfd29fd47ac86e","affectsGlobalScope":true,"impliedFormat":1},{"version":"195daca651dde22f2167ac0d0a05e215308119a3100f5e6268e8317d05a92526","affectsGlobalScope":true,"impliedFormat":1},{"version":"8b11e4285cd2bb164a4dc09248bdec69e9842517db4ca47c1ba913011e44ff2f","affectsGlobalScope":true,"impliedFormat":1},{"version":"0508571a52475e245b02bc50fa1394065a0a3d05277fbf5120c3784b85651799","affectsGlobalScope":true,"impliedFormat":1},{"version":"8f9af488f510c3015af3cc8c267a9e9d96c4dd38a1fdff0e11dc5a544711415b","affectsGlobalScope":true,"impliedFormat":1},{"version":"fc611fea8d30ea72c6bbfb599c9b4d393ce22e2f5bfef2172534781e7d138104","affectsGlobalScope":true,"impliedFormat":1},{"version":"0bd714129fca875f7d4c477a1a392200b0bcd13fb2e80928cd334b63830ea047","affectsGlobalScope":true,"impliedFormat":1},{"version":"e2c9037ae6cd2c52d80ceef0b3c5ffdb488627d71529cf4f63776daf11161c9a","affectsGlobalScope":true,"impliedFormat":1},{"version":"135d5cf4d345f59f1a9caadfafcd858d3d9cc68290db616cc85797224448cccc","affectsGlobalScope":true,"impliedFormat":1},{"version":"bc238c3f81c2984751932b6aab223cd5b830e0ac6cad76389e5e9d2ffc03287d","affectsGlobalScope":true,"impliedFormat":1},{"version":"4a07f9b76d361f572620927e5735b77d6d2101c23cdd94383eb5b706e7b36357","affectsGlobalScope":true,"impliedFormat":1},{"version":"7c4e8dc6ab834cc6baa0227e030606d29e3e8449a9f67cdf5605ea5493c4db29","affectsGlobalScope":true,"impliedFormat":1},{"version":"de7ba0fd02e06cd9a5bd4ab441ed0e122735786e67dde1e849cced1cd8b46b78","affectsGlobalScope":true,"impliedFormat":1},{"version":"6148e4e88d720a06855071c3db02069434142a8332cf9c182cda551adedf3156","affectsGlobalScope":true,"impliedFormat":1},{"version":"d63dba625b108316a40c95a4425f8d4294e0deeccfd6c7e59d819efa19e23409","affectsGlobalScope":true,"impliedFormat":1},{"version":"0568d6befee03dd435bed4fc25c4e46865b24bdcb8c563fdc21f580a2c301904","affectsGlobalScope":true,"impliedFormat":1},{"version":"30d62269b05b584741f19a5369852d5d34895aa2ac4fd948956f886d15f9cc0d","affectsGlobalScope":true,"impliedFormat":1},{"version":"f128dae7c44d8f35ee42e0a437000a57c9f06cc04f8b4fb42eebf44954d53dc8","affectsGlobalScope":true,"impliedFormat":1},{"version":"ffbe6d7b295306b2ba88030f65b74c107d8d99bdcf596ea99c62a02f606108b0","affectsGlobalScope":true,"impliedFormat":1},{"version":"996fb27b15277369c68a4ba46ed138b4e9e839a02fb4ec756f7997629242fd9f","affectsGlobalScope":true,"impliedFormat":1},{"version":"79b712591b270d4778c89706ca2cfc56ddb8c3f895840e477388f1710dc5eda9","affectsGlobalScope":true,"impliedFormat":1},{"version":"20884846cef428b992b9bd032e70a4ef88e349263f63aeddf04dda837a7dba26","affectsGlobalScope":true,"impliedFormat":1},{"version":"5fcab789c73a97cd43828ee3cc94a61264cf24d4c44472ce64ced0e0f148bdb2","affectsGlobalScope":true,"impliedFormat":1},{"version":"db59a81f070c1880ad645b2c0275022baa6a0c4f0acdc58d29d349c6efcf0903","affectsGlobalScope":true,"impliedFormat":1},{"version":"673294292640f5722b700e7d814e17aaf7d93f83a48a2c9b38f33cbc940ad8b0","affectsGlobalScope":true,"impliedFormat":1},{"version":"d786b48f934cbca483b3c6d0a798cb43bbb4ada283e76fb22c28e53ae05b9e69","affectsGlobalScope":true,"impliedFormat":1},{"version":"1ecb8e347cb6b2a8927c09b86263663289418df375f5e68e11a0ae683776978f","affectsGlobalScope":true,"impliedFormat":1},{"version":"142efd4ce210576f777dc34df121777be89eda476942d6d6663b03dcb53be3ff","affectsGlobalScope":true,"impliedFormat":1},{"version":"379bc41580c2d774f82e828c70308f24a005b490c25ba34d679d84bcf05c3d9d","affectsGlobalScope":true,"impliedFormat":1},{"version":"ed484fb2aa8a1a23d0277056ec3336e0a0b52f9b8d6a961f338a642faf43235d","affectsGlobalScope":true,"impliedFormat":1},{"version":"4ffedae1d1c2d53fdbca1c96d3c7dda544281f7d262f99b6880634f8fd8d9820","affectsGlobalScope":true,"impliedFormat":1},{"version":"83a730b125d477dd264df8ba479afab27a3dae7152b005c214ab94dc7ee44fd3","affectsGlobalScope":true,"impliedFormat":1},{"version":"1ce14b81c5cc821994aa8ec1d42b220dd41b27fcc06373bce3958af7421b77d4","affectsGlobalScope":true,"impliedFormat":1},{"version":"b3a048b3e9302ef9a34ef4ebb9aecfb28b66abb3bce577206a79fee559c230da","affectsGlobalScope":true,"impliedFormat":1},{"version":"df68f13398faab6c849e3f9b34a09b068621f8470593f994a43f9b8042f4de57","impliedFormat":1},"02b21d3a0e7da4d1e589fdbc9949415f59d2a740e7077ced302807e00dd15ef0",{"version":"cdcf9ea426ad970f96ac930cd176d5c69c6c24eebd9fc580e1572d6c6a88f62c","impliedFormat":1},{"version":"23cd712e2ce083d68afe69224587438e5914b457b8acf87073c22494d706a3d0","impliedFormat":1},{"version":"156a859e21ef3244d13afeeba4e49760a6afa035c149dda52f0c45ea8903b338","impliedFormat":1},{"version":"0ccdaa19852d25ecd84eec365c3bfa16e7859cadecf6e9ca6d0dbbbee439743f","affectsGlobalScope":true,"impliedFormat":1},{"version":"cc2110f7decca6bfb9392e30421cfa1436479e4a6756e8fec6cbc22625d4f881","affectsGlobalScope":true,"impliedFormat":1},{"version":"f53a7652392cf26ebbe4e29fd0672aa87c93bd6d0241289c13fab87b9ac35c8a","affectsGlobalScope":true,"impliedFormat":1},{"version":"e5e01375c9e124a83b52ee4b3244ed1a4d214a6cfb54ac73e164a823a4a7860a","affectsGlobalScope":true,"impliedFormat":1},{"version":"f90ae2bbce1505e67f2f6502392e318f5714bae82d2d969185c4a6cecc8af2fc","affectsGlobalScope":true,"impliedFormat":1},{"version":"4b58e207b93a8f1c88bbf2a95ddc686ac83962b13830fe8ad3f404ffc7051fb4","affectsGlobalScope":true,"impliedFormat":1},{"version":"1fefabcb2b06736a66d2904074d56268753654805e829989a46a0161cd8412c5","affectsGlobalScope":true,"impliedFormat":1},{"version":"b00a630557d1622ad312633bdbfbdb9c6b7220d948dca9f899db30679f160074","affectsGlobalScope":true,"impliedFormat":1},{"version":"c18a99f01eb788d849ad032b31cafd49de0b19e083fe775370834c5675d7df8e","affectsGlobalScope":true,"impliedFormat":1},{"version":"5247874c2a23b9a62d178ae84f2db6a1d54e6c9a2e7e057e178cc5eea13757fc","affectsGlobalScope":true,"impliedFormat":1},{"version":"cdcf9ea426ad970f96ac930cd176d5c69c6c24eebd9fc580e1572d6c6a88f62c","impliedFormat":1},{"version":"88809d6c1b9c78d04a133646a6feb926def05a8774c308c7c93bc32ee163d271","impliedFormat":1},{"version":"156a859e21ef3244d13afeeba4e49760a6afa035c149dda52f0c45ea8903b338","impliedFormat":1},{"version":"3ac40516c33b87f751f7507346933081a26cdb8a3e11a6b3aa07d23f803c85db","impliedFormat":1},{"version":"615754924717c0b1e293e083b83503c0a872717ad5aa60ed7f1a699eb1b4ea5c","impliedFormat":1},{"version":"14e9acf826baba0ef4b5665704084896e7bcc06f65a9ab13af7e93d27d6b7069","impliedFormat":1},{"version":"68834d631c8838c715f225509cfc3927913b9cc7a4870460b5b60c8dbdb99baf","impliedFormat":1},{"version":"829bc57ee8f287b490ab5bbc5a962fca57e432c1e38ec680ecd3ecaf12800613","impliedFormat":1},{"version":"eec76bf6b9346f3f95fa402621b889489e96930e72295b0369022f332e9b4a6a","impliedFormat":1},{"version":"3a3ff14da53d5013f3e6d8c4ad55225e3649c08786c4421ce639c00d8d589b7d","impliedFormat":1},{"version":"ea6bc8de8b59f90a7a3960005fd01988f98fd0784e14bc6922dde2e93305ec7d","impliedFormat":1},{"version":"36107995674b29284a115e21a0618c4c2751b32a8766dd4cb3ba740308b16d59","impliedFormat":1},{"version":"914a0ae30d96d71915fc519ccb4efbf2b62c0ddfb3a3fc6129151076bc01dc60","impliedFormat":1},{"version":"38004e6801340cb890afb8cb5a9fc8972297e7f88ab94026e4b0b3c61fb32f8a","impliedFormat":1},{"version":"d243db6b25788f439e7e2f03c05688e92f46764351673bb0e7b2f3631232e186","impliedFormat":1},{"version":"4d327f7d72ad0918275cea3eee49a6a8dc8114ae1d5b7f3f5d0774de75f7439a","impliedFormat":1},{"version":"149f9a9e7f04e67afa0e2a49fc0ff421035c01d6b793cfcae7d2e9f6819431e2","impliedFormat":1},{"version":"e8a9dfa4c75ef6d25df8b40eaa9c31e0a69452aaf2ced4a3f4215dbdbaa876f4","impliedFormat":1},{"version":"a70af845a2eb9dd6e2723e319e14ea7fb28b129ec1361c21509b49305448c323","impliedFormat":1},{"version":"b53dc572d4f187904207ae1166652de47aab8eeb00c254d009cb226863076b56","impliedFormat":1},{"version":"0a60a292b89ca7218b8616f78e5bbd1c96b87e048849469cccb4355e98af959a","impliedFormat":1},{"version":"0b6e25234b4eec6ed96ab138d96eb70b135690d7dd01f3dd8a8ab291c35a683a","impliedFormat":1},{"version":"9666f2f84b985b62400d2e5ab0adae9ff44de9b2a34803c2c5bd3c8325b17dc0","impliedFormat":1},{"version":"40cd35c95e9cf22cfa5bd84e96408b6fcbca55295f4ff822390abb11afbc3dca","impliedFormat":1},{"version":"b1616b8959bf557feb16369c6124a97a0e74ed6f49d1df73bb4b9ddf68acf3f3","impliedFormat":1},{"version":"f501234c5aeeeb5d7659412335227466aaacf30b952372d60afeb21c02c96348","impliedFormat":1},{"version":"40b463c6766ca1b689bfcc46d26b5e295954f32ad43e37ee6953c0a677e4ae2b","impliedFormat":1},{"version":"9ac977503f15bf13ca7c82ad9a32a782f42d43e474824e8b3bffe228fd5f2639","impliedFormat":1},{"version":"8b91ff5bb912be3ea213cbcf0075aace1f5d4ff249a0d227ed673868cb7bfabc","impliedFormat":1},{"version":"80aae6afc67faa5ac0b32b5b8bc8cc9f7fa299cff15cf09cc2e11fd28c6ae29e","impliedFormat":1},{"version":"f473cd2288991ff3221165dcf73cd5d24da30391f87e85b3dd4d0450c787a391","impliedFormat":1},{"version":"499e5b055a5aba1e1998f7311a6c441a369831c70905cc565ceac93c28083d53","impliedFormat":1},{"version":"8aee8b6d4f9f62cf3776cda1305fb18763e2aade7e13cea5bbe699112df85214","impliedFormat":1},{"version":"98498b101803bb3dde9f76a56e65c14b75db1cc8bec5f4db72be541570f74fc5","impliedFormat":1},{"version":"7cb4f431a4591b0e23002bed805dc871a874dfed6b9a3994dce68a6df73e6739","impliedFormat":1},{"version":"5d0375ca7310efb77e3ef18d068d53784faf62705e0ad04569597ae0e755c401","impliedFormat":1},{"version":"59af37caec41ecf7b2e76059c9672a49e682c1a2aa6f9d7dc78878f53aa284d6","impliedFormat":1},{"version":"addf417b9eb3f938fddf8d81e96393a165e4be0d4a8b6402292f9c634b1cb00d","impliedFormat":1},{"version":"436d7b4543b340b0f3eef4310d524242e41369b9652aa9c70428767c4dcac455","impliedFormat":1},{"version":"adf27937dba6af9f08a68c5b1d3fce0ca7d4b960c57e6d6c844e7d1a8e53adae","impliedFormat":1},{"version":"12950411eeab8563b349cb7959543d92d8d02c289ed893d78499a19becb5a8cc","impliedFormat":1},{"version":"2e85db9e6fd73cfa3d7f28e0ab6b55417ea18931423bd47b409a96e4a169e8e6","impliedFormat":1},{"version":"c46e079fe54c76f95c67fb89081b3e399da2c7d109e7dca8e4b58d83e332e605","impliedFormat":1},{"version":"e99963ae1e3a48ca7a7958c02f3e88bb963eb7978c28b68ae6b8c9f03309d83c","impliedFormat":1},{"version":"c3f5289820990ab66b70c7fb5b63cb674001009ff84b13de40619619a9c8175f","affectsGlobalScope":true,"impliedFormat":1},{"version":"b3275d55fac10b799c9546804126239baf020d220136163f763b55a74e50e750","affectsGlobalScope":true,"impliedFormat":1},{"version":"fa68a0a3b7cb32c00e39ee3cd31f8f15b80cac97dce51b6ee7fc14a1e8deb30b","affectsGlobalScope":true,"impliedFormat":1},{"version":"1cf059eaf468efcc649f8cf6075d3cb98e9a35a0fe9c44419ec3d2f5428d7123","affectsGlobalScope":true,"impliedFormat":1},{"version":"6c36e755bced82df7fb6ce8169265d0a7bb046ab4e2cb6d0da0cb72b22033e89","affectsGlobalScope":true,"impliedFormat":1},{"version":"e7721c4f69f93c91360c26a0a84ee885997d748237ef78ef665b153e622b36c1","affectsGlobalScope":true,"impliedFormat":1},{"version":"7a93de4ff8a63bafe62ba86b89af1df0ccb5e40bb85b0c67d6bbcfdcf96bf3d4","affectsGlobalScope":true,"impliedFormat":1},{"version":"90e85f9bc549dfe2b5749b45fe734144e96cd5d04b38eae244028794e142a77e","affectsGlobalScope":true,"impliedFormat":1},{"version":"e0a5deeb610b2a50a6350bd23df6490036a1773a8a71d70f2f9549ab009e67ee","affectsGlobalScope":true,"impliedFormat":1},{"version":"594ae90cacd813fa392ff80d2e0a8eff4e41f4a136329a940e321399dd8895b4","impliedFormat":1},{"version":"d1f333ade8ff35a409b4984e1f11956fe11c61855b0c7e9b59f0313e48b40c4a","impliedFormat":1},{"version":"0224aa4b3464895d69c413a640a19ac2166778a74eb5eb3b36b021c72d42b274","impliedFormat":1},{"version":"2e6fca0024dd8a076a886d9ec031a936ea59ad878a25b944820495d92f8381dd","affectsGlobalScope":true,"impliedFormat":1},{"version":"177459cba484e2f1e08872a3d2fdbca3162d9d43ca5ec9dc0c946835b55f74be","impliedFormat":1},{"version":"2fbf504c4791f9d32cd766cfe6b605bcda63289b925401953a7900db9af85348","impliedFormat":1},{"version":"ed0fb633cae35948d9e144004299a4bdf1ab912667c787b7fbffcd6d8c7b92a2","impliedFormat":1},{"version":"1678b04557dca52feab73cc67610918a7f5e25bfdba3e7fa081acd625d93106d","impliedFormat":1},{"version":"0e312260895afc9de021ce9de3c8a857392f0ccc7f19d3a030e4d6136a4ac91e","impliedFormat":1},{"version":"2ea729503db9793f2691162fec3dd1118cab62e96d025f8eeb376d43ec293395","impliedFormat":1},{"version":"98fc7231d6c846a8ed19bdef026ddffe5e2182cc818be74899287421ad370a87","impliedFormat":1},{"version":"3a40b5d34e014017539acb92f04cf2bc0aa71e49efb33c66039df93be97842a1","impliedFormat":1},{"version":"2bc7aa4fba46df0bd495425a7c8201437a7d465f83854fac859df2d67f664df3","impliedFormat":1},{"version":"41d17e1ad9a002feb11c8cdd2777e5bbc0cdb1e3f595d237e4dded0b6949983b","impliedFormat":1},{"version":"8c7e618c2a91ea7f6b5cca272a295864e92c16413be8fc56a943e8c7d5320011","affectsGlobalScope":true,"impliedFormat":1},{"version":"79a85c64bf083c5f4dd7074e804d1000c0c47301b84d48417a224decd681be30","impliedFormat":1},{"version":"9f1e3a76d5f509b5579e567de522b402cb79e201c4f47dcd014451c0580b290d","impliedFormat":1},{"version":"2ddab5b6932f9a6327f71baeb82a1d6b0824e0d23a4c7a5de5d355857113c22f","impliedFormat":1},{"version":"70f3f8b2dcaf7388f26731a59c79437813e3620b594903525a303cb2a7901016","impliedFormat":1},{"version":"62e8f884c3bc6dff6189b6e662ebe8b238a645938f2df7a97b8a82fca56773a4","impliedFormat":1},{"version":"2c2bdaa1d8ead9f68628d6d9d250e46ee8e81aa4898b4769a36956ae15e060fe","impliedFormat":1},{"version":"57a0d1b3d59063d4af2d3f8aac27cfe3c20a0f5d1faf0f8598ccf0b779637939","impliedFormat":1},{"version":"5ff4433a2deae4f85ab1377e90a7554ce6b47ae51c69a84ca30a6e22fae85834","impliedFormat":1},{"version":"82b91e4e42e6c41bc7fc1b6c2dc5eba6a2ba98375eb1f210e6ff6bba2d54177e","impliedFormat":1},{"version":"97234c5303866576f913d0ccae7d58d6322d9e803c7bf1228a3fda46ab8087b2","affectsGlobalScope":true,"impliedFormat":1},{"version":"93ecf87143cac7b9d05cffc1d6bdc075b7e4fdd48ff05f1fad85043f6ae678d3","impliedFormat":1},{"version":"4967529644e391115ca5592184d4b63980569adf60ee685f968fd59ab1557188","impliedFormat":1},{"version":"6f200afcb82b3e9a54bed6db23f2edf2508cd266801257312c0f124b47f2bdb9","impliedFormat":1},{"version":"ec501101c2a96133a6c695f934c8f6642149cc728571b29cbb7b770984c1088e","impliedFormat":1},{"version":"b214ebcf76c51b115453f69729ee8aa7b7f8eccdae2a922b568a45c2d7ff52f7","impliedFormat":1},{"version":"429c9cdfa7d126255779efd7e6d9057ced2d69c81859bbab32073bad52e9ba76","impliedFormat":1},{"version":"39338f84e8c4d0e3de7b3c4a7024fb3925f42100eed5cbe73be58902799dff4d","impliedFormat":1},{"version":"fbf83eb33bf5e329527add92acc65da59323876c702ddccf5f4bf1e848c92369","affectsGlobalScope":true,"impliedFormat":1},{"version":"230763250f20449fa7b3c9273e1967adb0023dc890d4be1553faca658ee65971","impliedFormat":1},{"version":"c3e9078b60cb329d1221f5878e88cecfa3e74460550e605a58fcfb41a66029ff","impliedFormat":1},{"version":"515318bc6e656f75e9e34db625316bfafbafd800dfb1642574af93735a24ad38","impliedFormat":1},{"version":"441b9bb09013654aa3d050e68b06464d8959b473e85868249d9d18f692acd35b","impliedFormat":1},{"version":"bc18a1991ba681f03e13285fa1d7b99b03b67ee671b7bc936254467177543890","impliedFormat":1},{"version":"55246f15e33ff1e2e9e679b25fa9790a48db55dc63d567fe25fac8b6a0efe911","impliedFormat":1},{"version":"fa94bbf532b7af8f394b95fa310980d6e20bd2d4c871c6a6cb9f70f03750a44b","impliedFormat":1},{"version":"03b7804d69cecd66850abada858ed6d4a59001f8c228a9fe212306ee860a4ff6","impliedFormat":1},{"version":"5b26c4dd672d88336bb929787c9bfb55119e80ba89ec6dc923da1c063892843e","affectsGlobalScope":true,"impliedFormat":1},{"version":"7fa2214bb0d64701bc6f9ce8cde2fd2ff8c571e0b23065fa04a8a5a6beb91511","impliedFormat":1},{"version":"987fd1f85dc36f4b2c927aa3db814ac6b452e970f4f55d24ed4ecbb7df09be00","impliedFormat":1},{"version":"f12624a4a8d042b68914eac1b0a16571fc1c523173fcdf2517c65d191bd5a86c","impliedFormat":1},{"version":"b4769767f13a1692a66186e01c3aa186ff808d5ff72ed36eda8c37738fb2ac92","impliedFormat":1},{"version":"841983e39bd4cbb463be385e92fda11057cab368bf27100a801c492f1d86cbaa","impliedFormat":1},{"version":"683edfc4f2b411ebe04729cb6dc09ddd26fbac2c57771a6d7c55964af776e176","impliedFormat":1},{"version":"1ec3f3a5f04cc42df33274fbe5c0937d9a9e06f249a7a26288d7d54f0763ffd4","impliedFormat":1},{"version":"e4156ddb25aa0e3b5303d372f26957b36778f0f6bbd4326359269873295e3058","affectsGlobalScope":true,"impliedFormat":1},{"version":"cc1b433a84cae05ddc5672d4823170af78606ad21ecef60dbc4570190cbf1357","impliedFormat":1},{"version":"e47f532d6e1617833f13a5b0710c0089d402c89c2f2b54f324e5a20e418d287a","impliedFormat":1},{"version":"7f78cfb2b343838612c192cb251746e3a7c62ac7675726a47e130d9b213f6580","impliedFormat":1},{"version":"201db9cf1687fab1adf5282fcba861f382b32303dc4f67c89d59655e78a25461","impliedFormat":1},{"version":"8e2577e7262051fd3c5bd6ca2b2056d358ff8853565720f92455860824c25188","impliedFormat":1},{"version":"7ec8d7d483f7394f9da611b10d3a0e402f76ff5c991261e6ce43a15f81ca4258","impliedFormat":1},{"version":"bb9dbb4b2ad81e3e71ec5ba4314973718555b9d04ba2a17dfbf875efecb8e2c0","impliedFormat":1},{"version":"82c3cc48c692438e41b94d936b8acd75ca97b18c50fa1af8a0715eb9d07d18cd","impliedFormat":1},{"version":"045a210189ec63c5488410b33f9fca53d77d051599d0d6506d8048551399c5f3","impliedFormat":1},{"version":"99ab6d0d660ce4d21efb52288a39fd35bb3f556980ec5463b1ae8f304a3bbc85","impliedFormat":1},{"version":"632c45ccb4cdc2c3a80c7a36a63dd7763016e59cac5e07bfb3e37e3548957028","impliedFormat":1},{"version":"c9a2daf6cd1eb854cd5b9e424247c5e306692055738c2effd35f7871d942b76e","impliedFormat":1},{"version":"afa1c49f8e559e413d57343339db857d2a8159435cf9cf7d4deb41718fff1b88","impliedFormat":1},{"version":"e50a7130339a951e6da9e968ed5521b0997a5b0479e148914087213839b5474c","impliedFormat":1},{"version":"3ac40516c33b87f751f7507346933081a26cdb8a3e11a6b3aa07d23f803c85db","impliedFormat":1},{"version":"4ac80270b6787c2b77a2d98a9714a71f4363c24b5890314f3ba582c94bfbe779","impliedFormat":1},{"version":"14e9acf826baba0ef4b5665704084896e7bcc06f65a9ab13af7e93d27d6b7069","impliedFormat":1},{"version":"68834d631c8838c715f225509cfc3927913b9cc7a4870460b5b60c8dbdb99baf","impliedFormat":1},{"version":"21adf13435b9b748529c8cedf80f884e5130b9684188120a686cd2b26a2059c7","impliedFormat":1},{"version":"eec76bf6b9346f3f95fa402621b889489e96930e72295b0369022f332e9b4a6a","impliedFormat":1},{"version":"171b96f31e3fbdb55fe570f2a29a5ee47223fdca95a84ea2142e4cc4feaf9dfe","impliedFormat":1},{"version":"ea6bc8de8b59f90a7a3960005fd01988f98fd0784e14bc6922dde2e93305ec7d","impliedFormat":1},{"version":"36107995674b29284a115e21a0618c4c2751b32a8766dd4cb3ba740308b16d59","impliedFormat":1},{"version":"914a0ae30d96d71915fc519ccb4efbf2b62c0ddfb3a3fc6129151076bc01dc60","impliedFormat":1},{"version":"9c32412007b5662fd34a8eb04292fb5314ec370d7016d1c2fb8aa193c807fe22","impliedFormat":1},{"version":"d243db6b25788f439e7e2f03c05688e92f46764351673bb0e7b2f3631232e186","impliedFormat":1},{"version":"4d327f7d72ad0918275cea3eee49a6a8dc8114ae1d5b7f3f5d0774de75f7439a","impliedFormat":1},{"version":"6ebe8ebb8659aaa9d1acbf3710d7dae3e923e97610238b9511c25dc39023a166","impliedFormat":1},{"version":"e85d7f8068f6a26710bff0cc8c0fc5e47f71089c3780fbede05857331d2ddec9","impliedFormat":1},{"version":"7befaf0e76b5671be1d47b77fcc65f2b0aad91cc26529df1904f4a7c46d216e9","impliedFormat":1},{"version":"0a60a292b89ca7218b8616f78e5bbd1c96b87e048849469cccb4355e98af959a","impliedFormat":1},{"version":"0b6e25234b4eec6ed96ab138d96eb70b135690d7dd01f3dd8a8ab291c35a683a","impliedFormat":1},{"version":"9666f2f84b985b62400d2e5ab0adae9ff44de9b2a34803c2c5bd3c8325b17dc0","impliedFormat":1},{"version":"40cd35c95e9cf22cfa5bd84e96408b6fcbca55295f4ff822390abb11afbc3dca","impliedFormat":1},{"version":"b1616b8959bf557feb16369c6124a97a0e74ed6f49d1df73bb4b9ddf68acf3f3","impliedFormat":1},{"version":"5b03a034c72146b61573aab280f295b015b9168470f2df05f6080a2122f9b4df","impliedFormat":1},{"version":"40b463c6766ca1b689bfcc46d26b5e295954f32ad43e37ee6953c0a677e4ae2b","impliedFormat":1},{"version":"249b9cab7f5d628b71308c7d9bb0a808b50b091e640ba3ed6e2d0516f4a8d91d","impliedFormat":1},{"version":"d33ce35e3f9cfcc1d94eca415bdd3bde94d5b153ffdd33e6c4455c029986c630","impliedFormat":1},{"version":"80aae6afc67faa5ac0b32b5b8bc8cc9f7fa299cff15cf09cc2e11fd28c6ae29e","impliedFormat":1},{"version":"f473cd2288991ff3221165dcf73cd5d24da30391f87e85b3dd4d0450c787a391","impliedFormat":1},{"version":"499e5b055a5aba1e1998f7311a6c441a369831c70905cc565ceac93c28083d53","impliedFormat":1},{"version":"8aee8b6d4f9f62cf3776cda1305fb18763e2aade7e13cea5bbe699112df85214","impliedFormat":1},{"version":"98498b101803bb3dde9f76a56e65c14b75db1cc8bec5f4db72be541570f74fc5","impliedFormat":1},{"version":"4dc59f6e1dbf3d5f66660fceabe6c174d3261b37b696ae1854f0dbaf255fc753","impliedFormat":1},{"version":"5d0375ca7310efb77e3ef18d068d53784faf62705e0ad04569597ae0e755c401","impliedFormat":1},{"version":"59af37caec41ecf7b2e76059c9672a49e682c1a2aa6f9d7dc78878f53aa284d6","impliedFormat":1},{"version":"addf417b9eb3f938fddf8d81e96393a165e4be0d4a8b6402292f9c634b1cb00d","impliedFormat":1},{"version":"436d7b4543b340b0f3eef4310d524242e41369b9652aa9c70428767c4dcac455","impliedFormat":1},{"version":"adf27937dba6af9f08a68c5b1d3fce0ca7d4b960c57e6d6c844e7d1a8e53adae","impliedFormat":1},{"version":"12950411eeab8563b349cb7959543d92d8d02c289ed893d78499a19becb5a8cc","impliedFormat":1},{"version":"2e85db9e6fd73cfa3d7f28e0ab6b55417ea18931423bd47b409a96e4a169e8e6","impliedFormat":1},{"version":"c46e079fe54c76f95c67fb89081b3e399da2c7d109e7dca8e4b58d83e332e605","impliedFormat":1},{"version":"114f493b30f364255290472111b5a4791d5902c308645670cd0401429cbc6930","impliedFormat":1},{"version":"9d4a4290a3c4e3a270f0a71562ad4eb4660d570e28ce642b6bd9429844860d38","affectsGlobalScope":true,"impliedFormat":1},{"version":"0d759cc99e081cacd0352467a0c24e979a6ef748329aa6ddea2d789664580201","impliedFormat":1},{"version":"bd85f4135b68382ac505805ba1f527818e3930a61d78614c8c78d050b7287d6a","impliedFormat":1},{"version":"314607151cc203975193d5f44765f38597be3b0a43f466d3c1bfb17176dd3bd3","impliedFormat":1},{"version":"4e7a48d96c485eaafa9250f1e64d875f04eaec933b754728cd8bdd86103c171a","impliedFormat":1},{"version":"37be812b06e518320ba82e2aff3ac2ca37370a9df917db708f081b9043fa3315","impliedFormat":1},{"version":"f40aad6c91017f20fc542f5701ec41e0f6aeba63c61bbf7aa13266ec29a50a3b","impliedFormat":1},{"version":"fc9e630f9302d0414ccd6c8ed2706659cff5ae454a56560c6122fa4a3fac5bbd","affectsGlobalScope":true,"impliedFormat":1},{"version":"4b150df3a383765413ab569181f5f907d75da6d7df22062567722e4031e066ba","impliedFormat":1},{"version":"0ac74c7586880e26b6a599c710b59284a284e084a2bbc82cd40fb3fbfdea71ae","affectsGlobalScope":true,"impliedFormat":1},{"version":"2ce12357dadbb8efc4e4ec4dab709c8071bf992722fc9adfea2fe0bd5b50923f","impliedFormat":1},{"version":"b5a907deaba678e5083ccdd7cc063a3a8c3413c688098f6de29d6e4cefabc85f","impliedFormat":1},{"version":"ffd344731abee98a0a85a735b19052817afd2156d97d1410819cd9bcd1bd575e","impliedFormat":1},{"version":"475e07c959f4766f90678425b45cf58ac9b95e50de78367759c1e5118e85d5c3","impliedFormat":1},{"version":"a524ae401b30a1b0814f1bbcdae459da97fa30ae6e22476e506bb3f82e3d9456","impliedFormat":1},{"version":"7375e803c033425e27cb33bae21917c106cb37b508fd242cccd978ef2ee244c7","impliedFormat":1},{"version":"eeb890c7e9218afdad2f30ad8a76b0b0b5161d11ce13b6723879de408e6bc47a","impliedFormat":1},{"version":"998da6b85ebace9ebea67040dd1a640f0156064e3d28dbe9bd9c0229b6f72347","impliedFormat":1},{"version":"00a196792eed6e9b7f988db0d3ced11a94ecd1e258fd19124ce89fe7642df35a","affectsGlobalScope":true,"impliedFormat":1},{"version":"dc6ce3e0a0bcd06ea3788fdc3475cedb048ea2e06282ae21b8ccd54a6a7062f8","affectsGlobalScope":true,"impliedFormat":1},{"version":"6b386c7b6ce6f369d18246904fa5eac73566167c88fb6508feba74fa7501a384","affectsGlobalScope":true,"impliedFormat":1},{"version":"592a109e67b907ffd2078cd6f727d5c326e06eaada169eef8fb18546d96f6797","impliedFormat":1},{"version":"f2eb1e35cae499d57e34b4ac3650248776fe7dbd9a3ec34b23754cfd8c22fceb","impliedFormat":1},{"version":"cbbd9a45e9ac79f13a0135b82dc5698f3fb601c22b7246e05d407cd11b2e10c7","impliedFormat":1},{"version":"9e98bd421e71f70c75dae7029e316745c89fa7b8bc8b43a91adf9b82c206099c","impliedFormat":1},{"version":"fc803e6b01f4365f71f51f9ce13f71396766848204d4f7a1b2b6154434b84b15","impliedFormat":1},{"version":"f3afcc0d6f77a9ca2d2c5c92eb4b89cd38d6fa4bdc1410d626bd701760a977ec","impliedFormat":1},{"version":"c8109fe76467db6e801d0edfbc50e6826934686467c9418ce6b246232ce7f109","affectsGlobalScope":true,"impliedFormat":1},{"version":"e6f803e4e45915d58e721c04ec17830c6e6678d1e3e00e28edf3d52720909cea","affectsGlobalScope":true,"impliedFormat":1}],"root":[90],"options":{"allowImportingTsExtensions":true,"allowJs":true,"allowSyntheticDefaultImports":true,"composite":true,"downlevelIteration":true,"jsx":1,"module":99,"skipLibCheck":true,"strict":true,"target":99},"referencedMap":[[90,1],[266,2],[157,3],[158,3],[159,4],[95,5],[160,6],[161,7],[162,8],[163,9],[164,10],[165,11],[166,12],[167,13],[168,14],[169,14],[170,15],[171,16],[172,17],[173,18],[174,19],[96,17],[94,17],[175,20],[176,21],[177,22],[220,23],[178,24],[179,25],[180,24],[181,26],[182,27],[122,28],[136,29],[119,30],[137,31],[146,32],[110,33],[111,34],[109,35],[145,36],[140,37],[144,38],[113,39],[123,40],[133,41],[112,42],[143,43],[107,44],[108,37],[114,40],[115,17],[121,45],[118,40],[105,46],[147,47],[138,48],[126,49],[125,40],[127,50],[130,51],[124,52],[128,53],[141,36],[116,54],[117,55],[131,56],[106,31],[135,57],[134,40],[120,55],[129,58],[132,59],[139,17],[104,17],[142,60],[184,61],[185,62],[186,62],[187,62],[188,63],[189,64],[190,65],[191,66],[192,67],[193,68],[194,68],[195,69],[196,17],[197,17],[198,70],[199,71],[200,72],[201,73],[202,74],[203,75],[204,76],[205,77],[206,78],[207,79],[208,80],[209,81],[210,82],[211,83],[212,84],[213,85],[214,86],[215,87],[216,88],[97,24],[98,17],[99,89],[100,90],[101,17],[102,91],[103,17],[148,92],[149,93],[150,94],[151,94],[152,95],[153,17],[154,96],[155,97],[156,93],[217,98],[218,99],[219,100],[183,17],[265,101],[288,17],[287,17],[281,102],[268,103],[267,17],[263,104],[269,17],[261,105],[270,17],[289,106],[271,17],[264,17],[280,107],[282,108],[262,109],[286,110],[284,111],[283,112],[285,113],[272,17],[278,114],[275,115],[277,116],[276,117],[274,118],[273,17],[279,119],[89,17],[87,17],[88,17],[14,17],[16,17],[15,17],[2,17],[17,17],[18,17],[19,17],[20,17],[21,17],[22,17],[23,17],[24,17],[3,17],[25,17],[26,17],[4,17],[27,17],[31,17],[28,17],[29,17],[30,17],[32,17],[33,17],[34,17],[5,17],[35,17],[36,17],[37,17],[38,17],[6,17],[42,17],[39,17],[40,17],[41,17],[43,17],[7,17],[44,17],[49,17],[50,17],[45,17],[46,17],[47,17],[48,17],[8,17],[54,17],[51,17],[52,17],[53,17],[55,17],[9,17],[56,17],[57,17],[58,17],[60,17],[59,17],[61,17],[62,17],[10,17],[63,17],[64,17],[65,17],[11,17],[66,17],[67,17],[68,17],[69,17],[70,17],[71,17],[12,17],[72,17],[73,17],[74,17],[75,17],[76,17],[1,17],[77,17],[78,17],[13,17],[79,17],[80,17],[81,17],[82,17],[83,17],[84,17],[85,17],[86,17],[236,120],[249,121],[233,122],[250,31],[259,123],[224,124],[225,125],[223,35],[258,36],[253,126],[257,127],[227,128],[246,129],[226,130],[256,131],[221,132],[222,126],[228,133],[229,17],[235,134],[232,133],[92,135],[260,136],[251,137],[239,138],[238,133],[240,139],[243,140],[237,141],[241,142],[254,36],[230,143],[231,144],[244,145],[93,31],[248,146],[247,133],[234,144],[242,147],[245,148],[252,17],[91,17],[255,149]],"affectedFilesPendingEmit":[[90,17]],"emitSignatures":[90],"version":"6.0.3"}
```

## File: layers/open-api/package.json
```json
{
  "name": "vket-boilerplate-nuxt-open-api",
  "private": true,
  "type": "module",
  "version": "0.1.0",
  "scripts": {
    "generate": "bun run scripts/make-zod.ts",
    "lint": "eslint --cache --cache-strategy content --no-error-on-unmatched-pattern './scripts/**/*.ts' './app/**/*.ts'",
    "fix": "eslint --cache --cache-strategy content --fix --no-error-on-unmatched-pattern './scripts/**/*.ts' './app/**/*.ts'",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "clean": "rm -rf app/models/openapi/*",
    "package-update": "bunx npm-check-updates -i",
    "clean-install": "bun run ../../scripts/clean_install.js",
    "allclean-install": "bun run ../../scripts/clean_install.js all"
  },
  "dependencies": {
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "openapi-zod-client": "^1.18.3",
    "js-yaml": "^5.2.1",
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^26.1.0"
  }
}
```

## File: layers/open-api/tsconfig.json
```json
{
  "compilerOptions": {
    "lib": [
      "ESNext",
      "DOM"
    ],
    "module": "esnext",
    "target": "esnext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "ignoreDeprecations": "6.0",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "composite": true,
    "strict": true,
    "downlevelIteration": true,
    "skipLibCheck": true,
    "jsx": "preserve",
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "allowJs": true,
    "types": [
      "bun-types",
      "node"
    ]
  },
  "include": [
    "scripts/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
