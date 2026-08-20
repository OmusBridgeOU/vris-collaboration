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
  id: number;
  venue: Venue;
  crowd_level: CrowdLevel;
  created_at: string;
};
