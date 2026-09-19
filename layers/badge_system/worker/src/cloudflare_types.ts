export type D1Result<T = unknown> = {
  results?: T[];
  success: boolean;
  meta?: {
    rows_read?: number;
    rows_written?: number;
    changes?: number;
  };
};

export type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(column?: string): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
};

export type D1Database = {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
};

export type R2Object = {
  body: ReadableStream<Uint8Array> | null;
  httpMetadata?: {
    contentType?: string;
  };
  size: number;
};

export type R2PutOptions = {
  httpMetadata?: {
    contentType?: string;
  };
  customMetadata?: Record<string, string>;
};

export type R2Bucket = {
  get(key: string): Promise<R2Object | null>;
  put(
    key: string,
    value: ArrayBuffer | ArrayBufferView | ReadableStream<Uint8Array>,
    options?: R2PutOptions,
  ): Promise<void>;
  delete(keys: string | string[]): Promise<void>;
};

export type Env = {
  DB: D1Database;
  ORDER_IMAGES: R2Bucket;
  ASSETS?: {
    fetch(request: Request): Promise<Response>;
  };
  APP_BASE_URL?: string;
  BADGE_UNIT_PRICE_YEN?: string;
  PUBLIC_TOKEN_SECRET: string;
  STAFF_ACCESS_USERNAME?: string;
  STAFF_ACCESS_PASSWORD?: string;
  TERMS_VERSION?: string;
  MAX_UPLOAD_BYTES_PER_ITEM?: string;
  MAX_BATCH_UPLOAD_BYTES?: string;
  MAX_ITEMS_PER_BATCH?: string;
  MAX_QUANTITY_PER_ITEM?: string;
  CANVAS_SIZE_PX?: string;
  FINISH_DIAMETER_RATIO?: string;
  SAFE_AREA_RATIO?: string;
  X_SHARE_TEXT?: string;
  X_HASHTAGS?: string;
};
