import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { PostcardPrint } from "./postcard_print";
import { staff_order_fixture as order } from "../../test/staff_order_fixture";

function setup_images(failure = false) {
  let index = 0;
  const revoke = vi.fn();
  vi.stubGlobal(
    "URL",
    class extends URL {
      static createObjectURL = () => `blob:image-${++index}`;
      static revokeObjectURL = revoke;
    },
  );
  vi.stubGlobal(
    "Image",
    class {
      src = "";
      decode = async () => {};
    },
  );
  const fetch_mock = vi.fn(async () => ({
    ok: !failure,
    blob: async () => new Blob(["synthetic"], { type: "image/png" }),
  }));
  vi.stubGlobal("fetch", fetch_mock);
  return { revoke, fetch_mock };
}

describe("postcard printing", () => {
  it("loads each authorized image once and prints one page per ordered copy", async () => {
    const { fetch_mock, revoke } = setup_images();
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    const view = render(<PostcardPrint order={order} />);
    expect(screen.getByRole("button", { name: "印刷" })).toBeDisabled();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "印刷" })).toBeEnabled(),
    );
    const pages = () => Array.from(document.querySelectorAll(".postcard_page"));
    expect(pages()).toHaveLength(3);
    expect(pages().map((page) => page.querySelectorAll("img").length)).toEqual([
      2, 2, 2,
    ]);
    expect(document.querySelectorAll(".postcard_badge")).toHaveLength(6);
    const marks = Array.from(
      document.querySelectorAll<HTMLElement>(".postcard_alignment_mark"),
    );
    expect(marks).toHaveLength(6);
    expect(marks[0].dataset.angleDegrees).toBe("-17");
    const angle_radians = (-17 * Math.PI) / 180;
    expect(marks[0].style.left).toBe(`${50 + Math.sin(angle_radians) * 50}%`);
    expect(marks[0].style.top).toBe(`${50 - Math.cos(angle_radians) * 50}%`);
    expect(screen.queryByRole("combobox")).toBeNull();
    const gallery = screen.getByRole("list", { name: "注文画像一覧" });
    expect(within(gallery).getAllByRole("img")).toHaveLength(3);
    expect(screen.getByAltText("48317-01 1枚目")).toBeVisible();
    expect(screen.getByAltText("48317-02 1枚目")).toBeVisible();
    expect(screen.getByAltText("48317-02 2枚目")).toBeVisible();
    expect(screen.getByText("3個")).toBeVisible();
    expect(screen.getByText("1,500円")).toBeVisible();
    expect(document.querySelector("details")).toBeNull();
    expect(screen.queryByText("完成画像を拡大")).toBeNull();
    expect(
      new Set(Array.from(pages()[0].querySelectorAll("img"), (img) => img.src))
        .size,
    ).toBe(1);
    expect(pages()[0].querySelector("img")?.src).not.toBe(
      pages()[1].querySelector("img")?.src,
    );
    expect(pages()[1].querySelector("img")?.src).toBe(
      pages()[2].querySelector("img")?.src,
    );
    fireEvent.click(screen.getByRole("button", { name: "印刷" }));
    fireEvent.click(
      screen.getByRole("button", { name: "印刷画面を開いています" }),
    );
    expect(print).toHaveBeenCalledTimes(1);
    expect(
      screen
        .getAllByRole("button", { name: /の注文を取りやめ/ })
        .every((button) => button.hasAttribute("disabled")),
    ).toBe(true);
    act(() => window.dispatchEvent(new Event("afterprint")));
    expect(screen.getByRole("button", { name: "印刷" })).toBeEnabled();
    expect(fetch_mock).toHaveBeenCalledTimes(2);
    expect(order.items.map((item) => item.quantity)).toEqual([1, 2]);
    view.unmount();
    expect(revoke).toHaveBeenCalledTimes(2);
    expect(document.querySelector(".postcard_pages")).toBeNull();
    print.mockRestore();
  });
  it("removes and restores one ordered copy at a time", async () => {
    const { fetch_mock } = setup_images();
    const view = render(<PostcardPrint order={order} />);
    await screen.findByRole("list", { name: "注文画像一覧" });
    fireEvent.click(
      screen.getAllByRole("button", { name: /48317-02 の注文を取りやめ/ })[1],
    );
    expect(screen.getByAltText("48317-02 1枚目")).toBeVisible();
    expect(screen.queryByAltText("48317-02 2枚目")).toBeNull();
    expect(screen.getByText("2個")).toBeVisible();
    expect(screen.getByText("1,000円")).toBeVisible();
    expect(document.querySelectorAll(".postcard_page")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "取りやめを戻す" }));
    expect(screen.getByText("3個")).toBeVisible();
    expect(screen.getByText("1,500円")).toBeVisible();
    expect(screen.getByAltText("48317-02 2枚目")).toBeVisible();
    expect(document.querySelectorAll(".postcard_page")).toHaveLength(3);
    // Removing the first item must preserve the second item's image mapping.
    fireEvent.click(
      screen.getByRole("button", { name: /48317-01 の注文を取りやめ/ }),
    );
    expect(document.querySelector(".postcard_page img")).toHaveAttribute(
      "src",
      "blob:image-2",
    );
    fireEvent.click(
      screen.getAllByRole("button", { name: /48317-02 の注文を取りやめ/ })[0],
    );
    expect(screen.getByText("1個")).toBeVisible();
    expect(screen.getByText("500円")).toBeVisible();
    expect(document.querySelectorAll(".postcard_page")).toHaveLength(1);
    expect(document.querySelector(".postcard_page img")).toHaveAttribute(
      "src",
      "blob:image-2",
    );
    fireEvent.click(
      screen.getByRole("button", { name: /48317-02 の注文を取りやめ/ }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "注文するデザインがありません",
    );
    expect(screen.getByText("0個")).toBeVisible();
    expect(screen.getByText("0円")).toBeVisible();
    expect(screen.getByRole("button", { name: "印刷" })).toBeDisabled();
    expect(document.querySelector(".postcard_pages")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "取りやめを戻す" }));
    expect(screen.getByText("1個")).toBeVisible();
    expect(screen.getByText("500円")).toBeVisible();
    expect(screen.getByRole("button", { name: "印刷" })).toBeEnabled();
    expect(fetch_mock).toHaveBeenCalledTimes(2);
    expect(order.items.map((item) => item.quantity)).toEqual([1, 2]);
    view.unmount();
    render(<PostcardPrint order={order} />);
    await screen.findByRole("list", { name: "注文画像一覧" });
    expect(screen.getByText("3個")).toBeVisible();
    expect(screen.queryByRole("button", { name: "取りやめを戻す" })).toBeNull();
  });
  it("reduces ten copies to nine with one remove action", async () => {
    setup_images();
    render(
      <PostcardPrint
        order={{
          ...order,
          items: [{ ...order.items[0], quantity: 10 }],
        }}
      />,
    );
    const gallery = await screen.findByRole("list", { name: "注文画像一覧" });
    expect(within(gallery).getAllByRole("img")).toHaveLength(10);
    expect(screen.getByText("10個")).toBeVisible();
    expect(screen.getByText("5,000円")).toBeVisible();
    expect(document.querySelectorAll(".postcard_page")).toHaveLength(10);
    fireEvent.click(
      within(gallery).getAllByRole("button", {
        name: /48317-01 の注文を取りやめ/,
      })[0],
    );
    expect(within(gallery).getAllByRole("img")).toHaveLength(9);
    expect(screen.getByText("9個")).toBeVisible();
    expect(screen.getByText("4,500円")).toBeVisible();
    expect(document.querySelectorAll(".postcard_page")).toHaveLength(9);
    fireEvent.click(screen.getByRole("button", { name: "取りやめを戻す" }));
    expect(within(gallery).getAllByRole("img")).toHaveLength(10);
    expect(screen.getByText("10個")).toBeVisible();
    expect(document.querySelectorAll(".postcard_page")).toHaveLength(10);
  });
  it.each([null, undefined, -1, Number.MAX_SAFE_INTEGER])(
    "does not invent a total when the price is unavailable or invalid (%s)",
    async (price) => {
      setup_images();
      render(
        <PostcardPrint
          order={{ ...order, unitPriceYen: price, totalPriceYen: price }}
        />,
      );
      await screen.findByRole("list", { name: "注文画像一覧" });
      expect(screen.getByText("価格未設定")).toBeVisible();
      expect(screen.queryByText("0円")).toBeNull();
      fireEvent.click(
        screen.getByRole("button", { name: /48317-01 の注文を取りやめ/ }),
      );
      expect(screen.getByText("価格未設定")).toBeVisible();
    },
  );
  it("shows one image per purchased copy and supports a configured zero price", async () => {
    setup_images();
    render(
      <PostcardPrint
        order={{
          ...order,
          unitPriceYen: 0,
          items: [{ ...order.items[0], quantity: 3 }],
        }}
      />,
    );
    const gallery = await screen.findByRole("list", { name: "注文画像一覧" });
    expect(within(gallery).getAllByRole("img")).toHaveLength(3);
    expect(screen.getByText("3個")).toBeVisible();
    expect(screen.getByText("0円")).toBeVisible();
    expect(document.querySelectorAll(".postcard_page")).toHaveLength(3);
    expect(document.querySelectorAll(".postcard_page img")).toHaveLength(6);
  });
  it("blocks printing when an image fetch fails", async () => {
    setup_images(true);
    render(<PostcardPrint order={order} />);
    expect(await screen.findByRole("alert")).toHaveTextContent("再検索");
    expect(screen.getByRole("button", { name: "印刷" })).toBeDisabled();
    expect(document.querySelector(".postcard_pages")).toBeNull();
  });
  it("blocks broken image data even after a successful HTTP response", async () => {
    setup_images();
    vi.stubGlobal(
      "Image",
      class {
        src = "";
        decode = async () => {
          throw new Error("画像を読み込めません");
        };
      },
    );
    render(<PostcardPrint order={order} />);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "画像を読み込めません",
    );
    expect(screen.getByRole("button", { name: "印刷" })).toBeDisabled();
  });
});
