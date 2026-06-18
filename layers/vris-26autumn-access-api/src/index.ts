type TablePolicy = {
  primaryKey: string | null
  columns: string[]
  writableColumns: string[]
}

type TableConfig = Record<string, TablePolicy>

type JsonPrimitive = string | number | boolean | null
type JsonBody = Record<string, JsonPrimitive>
type D1Row = Record<string, JsonPrimitive>

type TableInfoRow = {
  name: string
  type: string
  notnull: number
  dflt_value: string | null
  pk: number
}

type CreateTableColumn = {
  name: string
  type: SqlColumnType
  primaryKey?: boolean
  notNull?: boolean
  unique?: boolean
  default?: JsonPrimitive
}

type CreateTableBody = {
  name: string
  columns: CreateTableColumn[]
  ifNotExists?: boolean
}

type SqlColumnType = 'TEXT' | 'INTEGER' | 'REAL' | 'NUMERIC' | 'BLOB'

type ErrorCode =
  | 'bad_request'
  | 'forbidden_origin'
  | 'invalid_admin_key'
  | 'invalid_api_key'
  | 'method_not_allowed'
  | 'not_found'
  | 'schema_error'
  | 'validation_error'

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
}

const maxBodyBytes = 64 * 1024
const sqlColumnTypes = ['TEXT', 'INTEGER', 'REAL', 'NUMERIC', 'BLOB'] as const
const reservedTableNames = new Set(['tables', 'sqlite_sequence', '_cf_KV', 'd1_migrations'])

export default {
  async fetch(request, env): Promise<Response> {
    const origin = request.headers.get('origin')
    const corsHeaders = buildCorsHeaders(origin, env.ALLOWED_ORIGINS)

    if (request.method === 'OPTIONS') {
      return handleOptions(request, corsHeaders)
    }

    if (origin !== null && corsHeaders['access-control-allow-origin'] === undefined) {
      return errorResponse(403, 'forbidden_origin', 'Origin is not allowed.')
    }

    const url = new URL(request.url)
    if (request.method === 'GET' && url.pathname === '/health') {
      return jsonResponse({ ok: true }, corsHeaders)
    }

    if (!(await hasAnyValidApiKey(request, env.API_KEYS, env.ADMIN_API_KEYS))) {
      return errorResponse(401, 'invalid_api_key', 'A valid API key is required.', corsHeaders)
    }

    try {
      return await routeRequest(request, env, corsHeaders)
    } catch (error) {
      if (isValidationError(error)) {
        return errorResponse(400, 'validation_error', getErrorMessage(error), corsHeaders)
      }

      console.error(JSON.stringify({ level: 'error', message: 'Unhandled API error', error: getErrorMessage(error) }))
      return errorResponse(500, 'bad_request', 'Request failed.', corsHeaders)
    }
  },
} satisfies ExportedHandler<Env>

async function routeRequest(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  const url = new URL(request.url)
  const pathParts = url.pathname.split('/').filter(Boolean)

  if (pathParts[0] !== 'v1' || pathParts[1] === undefined || pathParts.length > 3) {
    return errorResponse(404, 'not_found', 'Route not found.', corsHeaders)
  }

  if (pathParts[1] === 'tables') {
    return routeTableManagement(request, env, pathParts, corsHeaders)
  }

  const tableName = pathParts[1]
  validateUserTableName(tableName)

  const tablePolicy = await getTablePolicy(env.DB, tableName, parseTableConfig(env.TABLE_CONFIG))
  if (tablePolicy === null) {
    return errorResponse(404, 'not_found', 'Table not found.', corsHeaders)
  }

  const id = pathParts[2]

  if (request.method === 'GET' && id === undefined) {
    return listRows(request, env.DB, tableName, tablePolicy, corsHeaders)
  }

  if (request.method === 'GET' && id !== undefined) {
    return getRow(env.DB, tableName, tablePolicy, id, corsHeaders)
  }

  if (request.method === 'POST' && id === undefined) {
    return createRow(request, env.DB, tableName, tablePolicy, corsHeaders)
  }

  if (request.method === 'PATCH' && id !== undefined) {
    return updateRow(request, env.DB, tableName, tablePolicy, id, corsHeaders)
  }

  if (request.method === 'DELETE' && id !== undefined) {
    return deleteRow(env.DB, tableName, tablePolicy, id, corsHeaders)
  }

  return errorResponse(405, 'method_not_allowed', 'Method is not allowed for this route.', corsHeaders)
}

async function routeTableManagement(
  request: Request,
  env: Env,
  pathParts: string[],
  corsHeaders: Record<string, string>,
): Promise<Response> {
  const tableName = pathParts[2]

  if (request.method === 'GET' && tableName === undefined) {
    return listTables(env.DB, corsHeaders)
  }

  if (request.method === 'GET' && tableName !== undefined) {
    validateUserTableName(tableName)
    const tablePolicy = await getTablePolicy(env.DB, tableName, parseTableConfig(env.TABLE_CONFIG))
    if (tablePolicy === null) {
      return errorResponse(404, 'not_found', 'Table not found.', corsHeaders)
    }

    return jsonResponse({ data: { name: tableName, ...tablePolicy } }, corsHeaders)
  }

  if (!(await hasValidApiKey(request, env.ADMIN_API_KEYS))) {
    return errorResponse(401, 'invalid_admin_key', 'A valid admin API key is required.', corsHeaders)
  }

  if (request.method === 'POST' && tableName === undefined) {
    return createTable(request, env.DB, corsHeaders)
  }

  if (request.method === 'DELETE' && tableName !== undefined) {
    return dropTable(request, env.DB, tableName, corsHeaders)
  }

  return errorResponse(405, 'method_not_allowed', 'Method is not allowed for this route.', corsHeaders)
}

async function listTables(
  db: D1Database,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  const result = await db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%' AND name != 'd1_migrations' ORDER BY name ASC",
    )
    .all<{ name: string }>()

  return jsonResponse({ data: result.results }, corsHeaders)
}

async function createTable(
  request: Request,
  db: D1Database,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  const body = await readCreateTableBody(request)
  validateUserTableName(body.name)

  if (await tableExists(db, body.name)) {
    return errorResponse(409, 'schema_error', 'Table already exists.', corsHeaders)
  }

  const primaryKeyColumns = body.columns.filter((column) => column.primaryKey === true)
  if (primaryKeyColumns.length > 1) {
    return errorResponse(400, 'validation_error', 'Only one primary key column is supported.', corsHeaders)
  }

  const columnDefinitions = body.columns.map(formatColumnDefinition)
  const ifNotExists = body.ifNotExists === true ? ' IF NOT EXISTS' : ''
  const result = await db
    .prepare(`CREATE TABLE${ifNotExists} ${quoteIdentifier(body.name)} (${columnDefinitions.join(', ')})`)
    .run()

  return jsonResponse({ ok: true, meta: result.meta }, corsHeaders, 201)
}

async function dropTable(
  request: Request,
  db: D1Database,
  tableName: string,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  validateUserTableName(tableName)

  const url = new URL(request.url)
  if (url.searchParams.get('confirm') !== tableName) {
    return errorResponse(400, 'validation_error', 'Set confirm to the table name to drop a table.', corsHeaders)
  }

  if (!(await tableExists(db, tableName))) {
    return errorResponse(404, 'not_found', 'Table not found.', corsHeaders)
  }

  const result = await db.prepare(`DROP TABLE ${quoteIdentifier(tableName)}`).run()
  return jsonResponse({ ok: true, meta: result.meta }, corsHeaders)
}

async function listRows(
  request: Request,
  db: D1Database,
  tableName: string,
  tablePolicy: TablePolicy,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  const url = new URL(request.url)
  const limit = parseBoundedInteger(url.searchParams.get('limit'), 50, 1, 200)
  const offset = parseBoundedInteger(url.searchParams.get('offset'), 0, 0, 10000)
  const orderBy = url.searchParams.get('orderBy') ?? tablePolicy.primaryKey ?? tablePolicy.columns[0]
  const orderDirection = (url.searchParams.get('orderDirection') ?? 'asc').toLowerCase()

  if (orderBy === undefined || !tablePolicy.columns.includes(orderBy)) {
    return errorResponse(400, 'validation_error', 'orderBy column is not allowed.', corsHeaders)
  }

  if (orderDirection !== 'asc' && orderDirection !== 'desc') {
    return errorResponse(400, 'validation_error', 'orderDirection must be asc or desc.', corsHeaders)
  }

  const result = await db
    .prepare(
      `SELECT ${quoteIdentifiers(tablePolicy.columns)} FROM ${quoteIdentifier(tableName)} ORDER BY ${quoteIdentifier(orderBy)} ${orderDirection.toUpperCase()} LIMIT ? OFFSET ?`,
    )
    .bind(limit, offset)
    .all<D1Row>()

  return jsonResponse({ data: result.results, meta: result.meta }, corsHeaders)
}

async function getRow(
  db: D1Database,
  tableName: string,
  tablePolicy: TablePolicy,
  id: string,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  if (tablePolicy.primaryKey === null) {
    return errorResponse(400, 'schema_error', 'Table does not have a primary key.', corsHeaders)
  }

  const row = await db
    .prepare(
      `SELECT ${quoteIdentifiers(tablePolicy.columns)} FROM ${quoteIdentifier(tableName)} WHERE ${quoteIdentifier(tablePolicy.primaryKey)} = ? LIMIT 1`,
    )
    .bind(id)
    .first<D1Row>()

  if (row === null) {
    return errorResponse(404, 'not_found', 'Row not found.', corsHeaders)
  }

  return jsonResponse({ data: row }, corsHeaders)
}

async function createRow(
  request: Request,
  db: D1Database,
  tableName: string,
  tablePolicy: TablePolicy,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  const body = await readJsonBody(request)
  const entries = filterWritableEntries(body, tablePolicy, true)
  if (entries.length === 0) {
    return errorResponse(400, 'validation_error', 'At least one writable column is required.', corsHeaders)
  }

  const columns = entries.map(([column]) => column)
  const values = entries.map(([, value]) => value)
  const placeholders = columns.map(() => '?').join(', ')

  const result = await db
    .prepare(
      `INSERT INTO ${quoteIdentifier(tableName)} (${quoteIdentifiers(columns)}) VALUES (${placeholders})`,
    )
    .bind(...values)
    .run()

  return jsonResponse({ ok: true, meta: result.meta }, corsHeaders, 201)
}

async function updateRow(
  request: Request,
  db: D1Database,
  tableName: string,
  tablePolicy: TablePolicy,
  id: string,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  if (tablePolicy.primaryKey === null) {
    return errorResponse(400, 'schema_error', 'Table does not have a primary key.', corsHeaders)
  }

  const body = await readJsonBody(request)
  const entries = filterWritableEntries(body, tablePolicy, false)

  if (entries.length === 0) {
    return errorResponse(400, 'validation_error', 'At least one writable column is required.', corsHeaders)
  }

  const assignments = entries.map(([column]) => `${quoteIdentifier(column)} = ?`).join(', ')
  const values = entries.map(([, value]) => value)

  const result = await db
    .prepare(
      `UPDATE ${quoteIdentifier(tableName)} SET ${assignments} WHERE ${quoteIdentifier(tablePolicy.primaryKey)} = ?`,
    )
    .bind(...values, id)
    .run()

  if (result.meta.changes === 0) {
    return errorResponse(404, 'not_found', 'Row not found.', corsHeaders)
  }

  return jsonResponse({ ok: true, meta: result.meta }, corsHeaders)
}

async function deleteRow(
  db: D1Database,
  tableName: string,
  tablePolicy: TablePolicy,
  id: string,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  if (tablePolicy.primaryKey === null) {
    return errorResponse(400, 'schema_error', 'Table does not have a primary key.', corsHeaders)
  }

  const result = await db
    .prepare(
      `DELETE FROM ${quoteIdentifier(tableName)} WHERE ${quoteIdentifier(tablePolicy.primaryKey)} = ?`,
    )
    .bind(id)
    .run()

  if (result.meta.changes === 0) {
    return errorResponse(404, 'not_found', 'Row not found.', corsHeaders)
  }

  return jsonResponse({ ok: true, meta: result.meta }, corsHeaders)
}

async function getTablePolicy(
  db: D1Database,
  tableName: string,
  tableConfig: TableConfig,
): Promise<TablePolicy | null> {
  const configuredPolicy = tableConfig[tableName]
  if (configuredPolicy !== undefined) {
    validateTablePolicy(configuredPolicy)
    return configuredPolicy
  }

  return introspectTablePolicy(db, tableName)
}

async function introspectTablePolicy(db: D1Database, tableName: string): Promise<TablePolicy | null> {
  if (!(await tableExists(db, tableName))) return null

  const tableInfo = await db
    .prepare(`PRAGMA table_info(${quoteIdentifier(tableName)})`)
    .all<TableInfoRow>()
  const columns = tableInfo.results.map((row) => row.name)
  const primaryKey = tableInfo.results
    .filter((row) => row.pk > 0)
    .sort((left, right) => left.pk - right.pk)
    .at(0)?.name ?? null

  return {
    primaryKey,
    columns,
    writableColumns: columns,
  }
}

async function tableExists(db: D1Database, tableName: string): Promise<boolean> {
  validateUserTableName(tableName)

  const row = await db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1")
    .bind(tableName)
    .first<{ name: string }>()

  return row !== null
}

function parseTableConfig(rawConfig: string): TableConfig {
  const parsed = JSON.parse(rawConfig) as unknown
  if (!isRecord(parsed)) {
    throw new Error('TABLE_CONFIG must be an object.')
  }

  const config: TableConfig = {}
  for (const [tableName, rawPolicy] of Object.entries(parsed)) {
    if (!isRecord(rawPolicy)) {
      throw new Error(`Invalid table policy for ${tableName}.`)
    }

    const primaryKey = rawPolicy.primaryKey
    const columns = rawPolicy.columns
    const writableColumns = rawPolicy.writableColumns
    if (
      (typeof primaryKey !== 'string' && primaryKey !== null)
      || !isStringArray(columns)
      || !isStringArray(writableColumns)
    ) {
      throw new Error(`Invalid table policy for ${tableName}.`)
    }

    config[tableName] = { primaryKey, columns, writableColumns }
  }

  return config
}

function validateTablePolicy(tablePolicy: TablePolicy): void {
  if (tablePolicy.primaryKey !== null) validateIdentifier(tablePolicy.primaryKey)
  for (const column of tablePolicy.columns) validateIdentifier(column)
  for (const column of tablePolicy.writableColumns) validateIdentifier(column)

  if (tablePolicy.primaryKey !== null && !tablePolicy.columns.includes(tablePolicy.primaryKey)) {
    throw new Error('primaryKey must be included in columns.')
  }

  for (const column of tablePolicy.writableColumns) {
    if (!tablePolicy.columns.includes(column)) {
      throw new Error('writableColumns must be a subset of columns.')
    }
  }
}

function filterWritableEntries(body: JsonBody, tablePolicy: TablePolicy, allowPrimaryKey: boolean): [string, JsonPrimitive][] {
  const allowedWritableColumns = allowPrimaryKey || tablePolicy.primaryKey === null
    ? tablePolicy.writableColumns
    : tablePolicy.writableColumns.filter((column) => column !== tablePolicy.primaryKey)

  const entries: [string, JsonPrimitive][] = []
  for (const column of allowedWritableColumns) {
    if (Object.hasOwn(body, column)) {
      entries.push([column, body[column] ?? null])
    }
  }

  return entries
}

async function readJsonBody(request: Request): Promise<JsonBody> {
  const body = await readBoundedJson(request)
  if (!isJsonBody(body)) {
    throw new Error('Request body must be a JSON object with primitive values.')
  }

  return body
}

async function readCreateTableBody(request: Request): Promise<CreateTableBody> {
  const body = await readBoundedJson(request)
  if (!isRecord(body)) {
    throw new Error('Request body must be an object.')
  }

  const name = body.name
  const columns = body.columns
  const ifNotExists = body.ifNotExists
  if (typeof name !== 'string' || !Array.isArray(columns)) {
    throw new Error('name and columns are required.')
  }

  if (columns.length === 0 || columns.length > 100) {
    throw new Error('columns must include 1 to 100 columns.')
  }

  const parsedColumns = columns.map(parseCreateTableColumn)
  const columnNames = new Set(parsedColumns.map((column) => column.name))
  if (columnNames.size !== parsedColumns.length) {
    throw new Error('Column names must be unique.')
  }

  const createTableBody: CreateTableBody = {
    name,
    columns: parsedColumns,
  }

  if (typeof ifNotExists === 'boolean') {
    createTableBody.ifNotExists = ifNotExists
  }

  return createTableBody
}

async function readBoundedJson(request: Request): Promise<unknown> {
  const contentLength = request.headers.get('content-length')
  if (contentLength !== null && Number.parseInt(contentLength, 10) > maxBodyBytes) {
    throw new Error('Request body is too large.')
  }

  return request.json()
}

function parseCreateTableColumn(value: unknown): CreateTableColumn {
  if (!isRecord(value)) {
    throw new Error('Column must be an object.')
  }

  const name = value.name
  const rawType = value.type
  if (typeof name !== 'string' || typeof rawType !== 'string') {
    throw new Error('Column name and type are required.')
  }

  validateIdentifier(name)
  const type = rawType.toUpperCase()
  if (!isSqlColumnType(type)) {
    throw new Error('Column type is not allowed.')
  }

  if (value.default !== undefined && !isJsonPrimitive(value.default)) {
    throw new Error('Column default must be a primitive value.')
  }

  const column: CreateTableColumn = {
    name,
    type,
    primaryKey: value.primaryKey === true,
    notNull: value.notNull === true,
    unique: value.unique === true,
  }

  if (value.default !== undefined) {
    column.default = value.default
  }

  return column
}

function formatColumnDefinition(column: CreateTableColumn): string {
  const parts = [quoteIdentifier(column.name), column.type]

  if (column.primaryKey === true) parts.push('PRIMARY KEY')
  if (column.notNull === true) parts.push('NOT NULL')
  if (column.unique === true) parts.push('UNIQUE')
  if (Object.hasOwn(column, 'default')) parts.push(`DEFAULT ${formatSqlLiteral(column.default ?? null)}`)

  return parts.join(' ')
}

function formatSqlLiteral(value: JsonPrimitive): string {
  if (value === null) return 'NULL'
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('Default number must be finite.')
    return String(value)
  }

  if (typeof value === 'boolean') return value ? '1' : '0'

  return `'${value.replaceAll("'", "''")}'`
}

function parseBoundedInteger(value: string | null, fallback: number, min: number, max: number): number {
  if (value === null) return fallback

  const parsed = Number.parseInt(value, 10)
  if (!Number.isInteger(parsed)) return fallback

  return Math.min(Math.max(parsed, min), max)
}

function validateUserTableName(value: string): void {
  validateIdentifier(value)
  if (value.startsWith('sqlite_') || value.startsWith('_cf_') || reservedTableNames.has(value)) {
    throw new Error(`Reserved table name: ${value}`)
  }
}

function validateIdentifier(value: string): void {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) {
    throw new Error(`Invalid SQL identifier: ${value}`)
  }
}

function quoteIdentifier(value: string): string {
  validateIdentifier(value)
  return `"${value}"`
}

function quoteIdentifiers(values: string[]): string {
  return values.map(quoteIdentifier).join(', ')
}

function buildCorsHeaders(origin: string | null, allowedOrigins: string): Record<string, string> {
  if (origin === null) return {}

  const allowed = allowedOrigins
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  if (!allowed.includes(origin)) return {}

  return {
    'access-control-allow-origin': origin,
    'access-control-allow-headers': 'authorization, content-type, x-api-key',
    'access-control-allow-methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'access-control-max-age': '86400',
    vary: 'Origin',
  }
}

function handleOptions(request: Request, corsHeaders: Record<string, string>): Response {
  if (corsHeaders['access-control-allow-origin'] === undefined) {
    return errorResponse(403, 'forbidden_origin', 'Origin is not allowed.')
  }

  const requestedMethod = request.headers.get('access-control-request-method')
  if (requestedMethod === null) {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (!['GET', 'POST', 'PATCH', 'DELETE'].includes(requestedMethod.toUpperCase())) {
    return errorResponse(405, 'method_not_allowed', 'Method is not allowed.', corsHeaders)
  }

  return new Response(null, { status: 204, headers: corsHeaders })
}

async function hasValidApiKey(request: Request, rawApiKeys: string | undefined): Promise<boolean> {
  if (rawApiKeys === undefined || rawApiKeys.length === 0) return false

  const apiKey = getRequestApiKey(request)
  if (apiKey === null || apiKey.length === 0) return false

  const configuredKeys = rawApiKeys
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  if (configuredKeys.length === 0) return false

  for (const configuredKey of configuredKeys) {
    if (await timingSafeEqual(apiKey, configuredKey)) return true
  }

  return false
}

async function hasAnyValidApiKey(request: Request, ...rawApiKeysList: Array<string | undefined>): Promise<boolean> {
  for (const rawApiKeys of rawApiKeysList) {
    if (await hasValidApiKey(request, rawApiKeys)) return true
  }

  return false
}

function getRequestApiKey(request: Request): string | null {
  const xApiKey = request.headers.get('x-api-key')
  if (xApiKey !== null) return xApiKey

  const authorization = request.headers.get('authorization')
  if (authorization === null) return null

  const [scheme, token] = authorization.split(' ')
  if (scheme?.toLowerCase() !== 'bearer' || token === undefined) return null

  return token
}

async function timingSafeEqual(left: string, right: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const leftBytes = encoder.encode(left)
  const rightBytes = encoder.encode(right)
  if (leftBytes.byteLength !== rightBytes.byteLength) return false

  const leftDigest = await crypto.subtle.digest('SHA-256', leftBytes)
  const rightDigest = await crypto.subtle.digest('SHA-256', rightBytes)
  const leftHash = new Uint8Array(leftDigest)
  const rightHash = new Uint8Array(rightDigest)

  let diff = 0
  for (let index = 0; index < leftHash.length; index += 1) {
    diff |= (leftHash.at(index) ?? 0) ^ (rightHash.at(index) ?? 0)
  }

  return diff === 0
}

function jsonResponse(
  body: unknown,
  corsHeaders: Record<string, string>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...jsonHeaders, ...corsHeaders },
  })
}

function errorResponse(
  status: number,
  code: ErrorCode,
  message: string,
  corsHeaders: Record<string, string> = {},
): Response {
  return jsonResponse({ error: { code, message } }, corsHeaders, status)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isSqlColumnType(value: string): value is SqlColumnType {
  return sqlColumnTypes.includes(value as SqlColumnType)
}

function isJsonPrimitive(value: unknown): value is JsonPrimitive {
  return value === null || ['string', 'number', 'boolean'].includes(typeof value)
}

function isJsonBody(value: unknown): value is JsonBody {
  if (!isRecord(value)) return false

  return Object.values(value).every(isJsonPrimitive)
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function isValidationError(error: unknown): boolean {
  if (!(error instanceof Error)) return false

  return [
    'Column ',
    'columns ',
    'Default ',
    'Invalid SQL identifier',
    'name and columns ',
    'Reserved table name',
    'Request body ',
    'Table ',
  ].some((prefix) => error.message.startsWith(prefix))
}
