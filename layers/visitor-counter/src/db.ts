import type { CrowdLevel, LatestCrowdStatusRow, PublicCrowdStatus, Venue } from "./types";

export async function insertCrowdStatus(
  db: D1Database,
  venue: Venue,
  crowdLevel: CrowdLevel,
): Promise<void> {
  await db
    .prepare("INSERT INTO crowd_status_history (venue, crowd_level) VALUES (?, ?)")
    .bind(venue, crowdLevel)
    .run();
}

export async function getPublicCrowdStatus(db: D1Database): Promise<PublicCrowdStatus> {
  const latestByVenueQuery = `
    SELECT id, venue, crowd_level, created_at
    FROM crowd_status_history
    WHERE venue = ?
    ORDER BY created_at DESC, id DESC
    LIMIT 1
  `;
  const results = await db.batch<LatestCrowdStatusRow>([
    db.prepare(latestByVenueQuery).bind("main"),
    db.prepare(latestByVenueQuery).bind("dtc"),
  ]);
  const rows = results.flatMap((result) => result.results ?? []);
  const latest = new Map<Venue, LatestCrowdStatusRow>(rows.map((row) => [row.venue, row]));

  const value1 = latest.get("main")?.crowd_level ?? -1;
  const value2 = latest.get("dtc")?.crowd_level ?? -1;
  const updatedAt = rows.reduce<string | null>((latestTime, row) => {
    if (latestTime === null || row.created_at > latestTime) {
      return row.created_at;
    }

    return latestTime;
  }, null);

  return {
    value1,
    value2,
    updated_at: updatedAt,
  };
}
