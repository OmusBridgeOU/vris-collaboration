import type {
  SessionUser,
  StaffOrderBatch,
  StaffOrderBatchList,
} from "../types/api_types";

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

export async function login_staff(
  username: string,
  password: string,
): Promise<SessionUser> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return parse_response<SessionUser>(response);
}

export async function logout_staff(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
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

export async function fetch_staff_orders(
  status?: string,
): Promise<StaffOrderBatch[]> {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  const response = await fetch(`/api/staff/order-batches${query}`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return (await parse_response<StaffOrderBatchList>(response)).orderBatches;
}

export async function accept_staff_order(
  order_id: string,
  buyer_confirmed: boolean,
): Promise<StaffOrderBatch> {
  const response = await fetch(`/api/staff/order-batches/${order_id}/accept`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ buyerConfirmed: buyer_confirmed }),
  });
  return parse_response<StaffOrderBatch>(response);
}

export async function reject_staff_order(
  order_id: string,
  reason: string,
): Promise<StaffOrderBatch> {
  const response = await fetch(`/api/staff/order-batches/${order_id}/reject`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
  });
  return parse_response<StaffOrderBatch>(response);
}

export async function start_staff_production(
  order_id: string,
): Promise<StaffOrderBatch> {
  const response = await fetch(
    `/api/staff/order-batches/${order_id}/start-production`,
    {
      method: "POST",
      credentials: "include",
      headers: { Accept: "application/json" },
    },
  );
  return parse_response<StaffOrderBatch>(response);
}

export async function mark_staff_order_ready(
  order_id: string,
): Promise<StaffOrderBatch> {
  const response = await fetch(`/api/staff/order-batches/${order_id}/ready`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return parse_response<StaffOrderBatch>(response);
}

export async function deliver_staff_order(
  order_id: string,
): Promise<StaffOrderBatch> {
  const response = await fetch(`/api/staff/order-batches/${order_id}/deliver`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return parse_response<StaffOrderBatch>(response);
}
