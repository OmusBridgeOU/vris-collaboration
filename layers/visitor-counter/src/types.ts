export type Venue = "main" | "dtc";

export type CrowdLevel = 1 | 2 | 3;

export type PublicCrowdLevel = CrowdLevel | -1;

export type PublicCrowdStatus = {
  value1: PublicCrowdLevel;
  value2: PublicCrowdLevel;
  updated_at: string | null;
};

export type VenueStatusRequest = {
  venue?: unknown;
  crowd_level?: unknown;
};

export type LatestCrowdStatusRow = {
  venue: Venue;
  crowd_level: CrowdLevel;
  created_at: string;
};

export type Env = {
  DB: D1Database;
  CLOUD_INGEST_API_KEY: string;
  ALLOWED_ORIGINS?: string;
  ENABLE_TEST_API?: string;
};
