import type { PublicConfig } from "../types/api_types";

export async function fetch_public_config(): Promise<PublicConfig> {
  const response = await fetch("/api/config", {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to load public config");
  }

  return (await response.json()) as PublicConfig;
}
