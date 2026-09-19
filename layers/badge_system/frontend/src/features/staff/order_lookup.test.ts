import QRCode from "qrcode";
import jsQR from "jsqr";
import { normalize_order_lookup } from "./order_lookup";

describe("order QR lookup", () => {
  it("accepts only an exact reception number from 10000 through 99999", () => {
    expect(normalize_order_lookup("10000")).toBe("10000");
    expect(normalize_order_lookup("48317")).toBe("48317");
    expect(normalize_order_lookup("99999")).toBe("99999");
    for (const value of [
      "",
      "09999",
      "100000",
      " 48317 ",
      "A-0042",
      "https://badge.example/o/48317",
      "/o/48317",
    ]) {
      expect(() => normalize_order_lookup(value)).toThrow();
    }
  });
  it("decodes a real QR containing only the five-digit reception number", () => {
    const value = "48317";
    const qr = QRCode.create(value, { errorCorrectionLevel: "M" }).modules;
    const scale = 5;
    const size = (qr.size + 8) * scale;
    const pixels = new Uint8ClampedArray(size * size * 4).fill(255);
    for (let y = 0; y < qr.size; y++)
      for (let x = 0; x < qr.size; x++) {
        if (!qr.data[y * qr.size + x]) continue;
        for (let dy = 0; dy < scale; dy++)
          for (let dx = 0; dx < scale; dx++) {
            const offset =
              (((y + 4) * scale + dy) * size + (x + 4) * scale + dx) * 4;
            pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = 0;
          }
      }
    expect(jsQR(pixels, size, size)?.data).toBe(value);
  });
});
