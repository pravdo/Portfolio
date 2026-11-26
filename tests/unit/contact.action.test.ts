import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
const verify = vi.fn();

vi.mock("@/lib/mailer", () => ({ getMailer: () => ({ name: "mock", send }) }));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: (...args: unknown[]) => verify(...args) }));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }),
}));

const { sendContactMessage } = await import("@/actions/contact");

const idle = { status: "idle" } as const;
const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};
const valid = { name: "Ada", email: "ada@example.com", message: "Hello, I'd like to chat." };

beforeEach(() => {
  vi.unstubAllEnvs();
  send.mockReset().mockResolvedValue(undefined);
  verify.mockReset().mockResolvedValue(true);
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe("sendContactMessage", () => {
  it("sends a valid message", async () => {
    const state = await sendContactMessage(idle, form(valid));
    expect(state).toEqual({ status: "success" });
    expect(send).toHaveBeenCalledWith(valid);
  });

  it("returns per-field errors and echoes values back", async () => {
    const state = await sendContactMessage(idle, form({ name: "", email: "nope", message: "hi" }));
    expect(state.status).toBe("error");
    expect(Object.keys(state.fieldErrors ?? {}).sort()).toEqual(["email", "message", "name"]);
    expect(state.values).toEqual({ name: "", email: "nope", message: "hi" });
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects line breaks in the name (header injection)", async () => {
    const state = await sendContactMessage(idle, form({ ...valid, name: "Ada\r\nBcc: x@y.z" }));
    expect(state.fieldErrors?.name).toMatch(/line breaks/);
  });

  it("fakes success for bots that fill the honeypot, without sending", async () => {
    const state = await sendContactMessage(idle, form({ ...valid, website: "http://spam" }));
    expect(state).toEqual({ status: "success" });
    expect(send).not.toHaveBeenCalled();
  });

  it("verifies Turnstile with the client IP when configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    await sendContactMessage(idle, form({ ...valid, "cf-turnstile-response": "tok" }));
    expect(verify).toHaveBeenCalledWith("tok", "secret", "203.0.113.7");
  });

  it("blocks the message when Turnstile fails", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    verify.mockResolvedValue(false);
    const state = await sendContactMessage(idle, form(valid));
    expect(state.status).toBe("error");
    expect(send).not.toHaveBeenCalled();
  });

  it("reports a friendly error when sending fails", async () => {
    send.mockRejectedValue(new Error("SES down"));
    const state = await sendContactMessage(idle, form(valid));
    expect(state).toMatchObject({ status: "error", values: valid });
    expect(state.message).toMatch(/try again/);
  });

  it("refuses when the form is disabled by config", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const state = await sendContactMessage(idle, form(valid));
    expect(state.status).toBe("error");
    expect(send).not.toHaveBeenCalled();
  });
});
