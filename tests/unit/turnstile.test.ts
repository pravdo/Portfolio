import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "@/lib/turnstile";

afterEach(() => vi.unstubAllGlobals());

const respond = (body: unknown, ok = true) =>
  vi.fn().mockResolvedValue({ ok, json: async () => body } as Response);

describe("verifyTurnstile", () => {
  it("returns true when Cloudflare says success", async () => {
    const fetchMock = respond({ success: true });
    vi.stubGlobal("fetch", fetchMock);
    await expect(verifyTurnstile("token", "secret", "1.2.3.4")).resolves.toBe(true);

    const body = fetchMock.mock.calls[0]?.[1]?.body as URLSearchParams;
    expect(body.get("secret")).toBe("secret");
    expect(body.get("response")).toBe("token");
    expect(body.get("remoteip")).toBe("1.2.3.4");
  });

  it("returns false on a failed verification", async () => {
    vi.stubGlobal("fetch", respond({ success: false, "error-codes": ["invalid-input-response"] }));
    await expect(verifyTurnstile("token", "secret")).resolves.toBe(false);
  });

  it("fails closed on HTTP and network errors", async () => {
    vi.stubGlobal("fetch", respond({}, false));
    await expect(verifyTurnstile("token", "secret")).resolves.toBe(false);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await expect(verifyTurnstile("token", "secret")).resolves.toBe(false);
  });

  it("rejects an empty token without calling Cloudflare", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await expect(verifyTurnstile("", "secret")).resolves.toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
