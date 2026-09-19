import type { SessionUser, StaffOrderBatch } from "../types/api_types";

async function parse_response<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;
    throw new Error(body?.error?.message ?? "Request failed");
  }
  return (await response.json()) as T;
}

export async function fetch_current_staff_user(): Promise<SessionUser> {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return parse_response<SessionUser>(response);
}

export async function find_staff_order(
  search_value: string,
): Promise<StaffOrderBatch> {
  if (!/^[1-9]\d{4}$/.test(search_value)) {
    throw new Error(
      "受付番号は10000から99999までの5桁数字で入力してください。",
    );
  }
  const response = await fetch(
    `/api/staff/order-batches/by-reception-number/${search_value}`,
    {
      credentials: "include",
      headers: { Accept: "application/json" },
    },
  );
  return parse_response<StaffOrderBatch>(response);
}
