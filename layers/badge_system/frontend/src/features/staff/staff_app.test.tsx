import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StaffApp } from "./staff_app";
import { staff_order_fixture as order } from "../../test/staff_order_fixture";

vi.mock("./postcard_print", () => ({
  PostcardPrint: () => <button>印刷</button>,
}));
function response(body: unknown, ok = true) {
  return Promise.resolve({ ok, json: async () => body } as Response);
}
function staff_fetch(found_order = order) {
  const mock = vi.fn((url: RequestInfo | URL) => {
    if (String(url) === "/api/auth/me")
      return response({
        displayName: "共有スタッフ",
        roles: ["reception"],
        authMode: "shared_basic",
      });
    if (String(url).endsWith("/48317")) return response(found_order);
    return response({ error: { message: "注文が見つかりません" } }, false);
  });
  vi.stubGlobal("fetch", mock);
  return mock;
}
describe("staff order lookup", () => {
  it("offers only lookup, camera and printing after shared authentication", async () => {
    staff_fetch();
    render(<StaffApp />);
    await screen.findByRole("heading", { name: "注文確認・印刷" });
    expect(screen.queryByRole("button", { name: "ログアウト" })).toBeNull();
    expect(screen.queryByRole("navigation")).toBeNull();
    expect(
      screen.getByRole("button", { name: "カメラでQRを読む" }),
    ).toBeEnabled();
    expect(screen.queryByText("製造を受け付ける")).toBeNull();
  });
  it("looks up the five-digit number without showing order details or mutating an order", async () => {
    const mock = staff_fetch();
    render(<StaffApp />);
    fireEvent.change(await screen.findByLabelText("受付番号（5桁）"), {
      target: { value: "48317" },
    });
    fireEvent.click(screen.getByRole("button", { name: "注文検索" }));
    expect(await screen.findByRole("button", { name: "印刷" })).toBeVisible();
    expect(screen.queryByText("受付番号")).toBeNull();
    expect(screen.queryByText("種類数")).toBeNull();
    expect(screen.queryByText("注文内容の確認")).toBeNull();
    expect(screen.queryByText(/確認してください/)).toBeNull();
    expect(screen.queryByText("共有スタッフ")).toBeNull();
    expect(mock).toHaveBeenLastCalledWith(
      "/api/staff/order-batches/by-reception-number/48317",
      expect.objectContaining({ credentials: "include" }),
    );
    expect(mock.mock.calls.map(([url]) => String(url))).toEqual([
      "/api/auth/me",
      "/api/staff/order-batches/by-reception-number/48317",
    ]);
  });
  it("clears a previous order before a failed or invalid lookup", async () => {
    const mock = staff_fetch();
    render(<StaffApp />);
    const input = await screen.findByLabelText("受付番号（5桁）");
    fireEvent.change(input, { target: { value: "48317" } });
    fireEvent.click(screen.getByRole("button", { name: "注文検索" }));
    await screen.findByRole("button", { name: "印刷" });
    fireEvent.change(input, { target: { value: "58318" } });
    fireEvent.click(screen.getByRole("button", { name: "注文検索" }));
    expect(screen.queryByRole("button", { name: "印刷" })).toBeNull();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "注文が見つかりません",
    );
    fireEvent.change(input, {
      target: { value: "https://other.example/o/abcdefghijklmnop" },
    });
    fireEvent.click(screen.getByRole("button", { name: "注文検索" }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("5桁数字"),
    );
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
