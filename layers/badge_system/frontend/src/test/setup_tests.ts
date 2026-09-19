import "@testing-library/jest-dom/vitest";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: false,
      json: async () => ({}),
    })),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});
