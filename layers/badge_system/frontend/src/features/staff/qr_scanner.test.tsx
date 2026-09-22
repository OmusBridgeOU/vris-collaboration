import { act, render, screen, waitFor } from "@testing-library/react";
import { QrScanner } from "./qr_scanner";
const decode = vi.hoisted(() => vi.fn());
vi.mock("jsqr", () => ({ default: decode }));
afterEach(() => {
  vi.restoreAllMocks();
  decode.mockReset();
});

describe("staff QR camera lifecycle", () => {
  it.each(["pagehide", "visibilitychange"])(
    "stops an active stream on %s",
    async (event_name) => {
      const stop = vi.fn();
      const close = vi.fn();
      vi.stubGlobal("navigator", {
        mediaDevices: {
          getUserMedia: vi.fn(async () => ({ getTracks: () => [{ stop }] })),
        },
      });
      vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
      vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
        {} as CanvasRenderingContext2D,
      );
      render(<QrScanner on_read={vi.fn()} on_close={close} />);
      await waitFor(() =>
        expect(screen.getByRole("status")).toHaveTextContent(
          "注文QRをカメラに",
        ),
      );
      if (event_name === "visibilitychange")
        vi.spyOn(document, "hidden", "get").mockReturnValue(true);
      act(() =>
        (event_name === "pagehide" ? window : document).dispatchEvent(
          new Event(event_name),
        ),
      );
      expect(stop).toHaveBeenCalledOnce();
      expect(close).toHaveBeenCalledOnce();
    },
  );
  it("stops a late permission result after the camera screen is closed", async () => {
    let resolve!: (stream: MediaStream) => void;
    const stop = vi.fn();
    const getUserMedia = vi.fn(
      () =>
        new Promise<MediaStream>((done) => {
          resolve = done;
        }),
    );
    vi.stubGlobal("navigator", { mediaDevices: { getUserMedia } });
    const view = render(<QrScanner on_read={vi.fn()} on_close={vi.fn()} />);
    await waitFor(() => expect(getUserMedia).toHaveBeenCalledOnce());
    expect(getUserMedia).toHaveBeenCalledWith({
      audio: false,
      video: { facingMode: { ideal: "environment" } },
    });
    view.unmount();
    await act(async () =>
      resolve({ getTracks: () => [{ stop }] } as unknown as MediaStream),
    );
    expect(stop).toHaveBeenCalledOnce();
  });
  it("explains denied camera access without trying to upload", async () => {
    const fetch_mock = vi.fn();
    vi.stubGlobal("fetch", fetch_mock);
    vi.stubGlobal("navigator", {
      mediaDevices: {
        getUserMedia: vi.fn(async () => {
          throw new DOMException("denied", "NotAllowedError");
        }),
      },
    });
    render(<QrScanner on_read={vi.fn()} on_close={vi.fn()} />);
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("受付番号を入力"),
    );
    expect(fetch_mock).not.toHaveBeenCalled();
  });
  it("reads once and releases tracks immediately", async () => {
    const stop = vi.fn();
    const on_read = vi.fn();
    vi.stubGlobal("navigator", {
      mediaDevices: {
        getUserMedia: vi.fn(async () => ({ getTracks: () => [{ stop }] })),
      },
    });
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "readyState", "get").mockReturnValue(
      2,
    );
    vi.spyOn(HTMLVideoElement.prototype, "videoWidth", "get").mockReturnValue(
      320,
    );
    vi.spyOn(HTMLVideoElement.prototype, "videoHeight", "get").mockReturnValue(
      320,
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
      drawImage: vi.fn(),
      getImageData: () => ({
        data: new Uint8ClampedArray(4),
        width: 1,
        height: 1,
      }),
    } as unknown as CanvasRenderingContext2D);
    decode.mockReturnValue({ data: "48317" });
    render(<QrScanner on_read={on_read} on_close={vi.fn()} />);
    await waitFor(() => expect(on_read).toHaveBeenCalledWith("48317"));
    expect(on_read).toHaveBeenCalledOnce();
    expect(stop).toHaveBeenCalledOnce();
  });
  it("rejects a URL QR and keeps scanning without a lookup", async () => {
    const on_read = vi.fn();
    vi.stubGlobal("navigator", {
      mediaDevices: {
        getUserMedia: vi.fn(async () => ({
          getTracks: () => [{ stop: vi.fn() }],
        })),
      },
    });
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "readyState", "get").mockReturnValue(
      2,
    );
    vi.spyOn(HTMLVideoElement.prototype, "videoWidth", "get").mockReturnValue(
      320,
    );
    vi.spyOn(HTMLVideoElement.prototype, "videoHeight", "get").mockReturnValue(
      320,
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
      drawImage: vi.fn(),
      getImageData: () => ({
        data: new Uint8ClampedArray(4),
        width: 1,
        height: 1,
      }),
    } as unknown as CanvasRenderingContext2D);
    decode.mockReturnValue({ data: "https://badge.example/o/48317" });

    const view = render(<QrScanner on_read={on_read} on_close={vi.fn()} />);

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("5桁の受付番号"),
    );
    expect(on_read).not.toHaveBeenCalled();
    view.unmount();
  });
});
