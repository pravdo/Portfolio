import { describe, expect, it } from "vitest";
import { getContactConfig, getServerEnv } from "@/lib/env";

const keys = { NEXT_PUBLIC_TURNSTILE_SITE_KEY: "site", TURNSTILE_SECRET_KEY: "secret" };
const ses = {
  MAILER: "ses",
  CONTACT_TO_EMAIL: "me@example.com",
  CONTACT_FROM_EMAIL: "site@example.com",
};
const config = (env: Record<string, string>) => getContactConfig(getServerEnv(env));

describe("getServerEnv", () => {
  it("applies defaults and treats empty strings as unset", () => {
    const env = getServerEnv({ CONTACT_TO_EMAIL: "", MAILER: "" });
    expect(env.MAILER).toBe("console");
    expect(env.AWS_REGION).toBe("eu-central-1");
    expect(env.CONTACT_TO_EMAIL).toBeUndefined();
  });

  it("rejects invalid values with a readable error", () => {
    expect(() => getServerEnv({ MAILER: "smtp" })).toThrow(/Invalid environment variables/);
    expect(() => getServerEnv({ CONTACT_TO_EMAIL: "nope" })).toThrow(/CONTACT_TO_EMAIL/);
  });
});

describe("getContactConfig", () => {
  it("works locally with the console mailer and no captcha", () => {
    expect(config({})).toEqual({ enabled: true, turnstileSiteKey: undefined });
  });

  it("passes the site key through when Turnstile is configured", () => {
    expect(config(keys).turnstileSiteKey).toBe("site");
  });

  it("disables the form when SES is selected without addresses", () => {
    expect(config({ MAILER: "ses" }).enabled).toBe(false);
  });

  it("never uses the console mailer in Vercel production", () => {
    expect(config({ ...keys, VERCEL_ENV: "production" }).enabled).toBe(false);
  });

  it("requires Turnstile in Vercel production", () => {
    expect(config({ ...ses, VERCEL_ENV: "production" }).enabled).toBe(false);
    expect(config({ ...ses, ...keys, VERCEL_ENV: "production" })).toEqual({
      enabled: true,
      turnstileSiteKey: "site",
    });
  });

  it("allows the console mailer on preview deployments", () => {
    expect(config({ VERCEL_ENV: "preview" }).enabled).toBe(true);
  });
});
