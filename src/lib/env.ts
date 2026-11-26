import "server-only";
import { z } from "zod";

// Empty strings (e.g. `CONTACT_TO_EMAIL=` in .env) count as "not set".
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === "" ? undefined : v), schema.optional());

const ServerEnvSchema = z.object({
  MAILER: optional(z.enum(["console", "ses"])).transform((v) => v ?? "console"),
  CONTACT_TO_EMAIL: optional(z.email()),
  CONTACT_FROM_EMAIL: optional(z.email()),
  AWS_REGION: optional(z.string()).transform((v) => v ?? "eu-central-1"),
  AWS_ROLE_ARN: optional(z.string().startsWith("arn:aws:iam::")),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: optional(z.string()),
  TURNSTILE_SECRET_KEY: optional(z.string()),
  /** Set by Vercel: "production" | "preview" | "development". */
  VERCEL_ENV: optional(z.string()),
});

export type ServerEnv = z.infer<typeof ServerEnvSchema>;

/** Read and validate server env. Throws with a readable message on bad values. */
export function getServerEnv(source: Record<string, string | undefined> = process.env): ServerEnv {
  const result = ServerEnvSchema.safeParse(source);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
    throw new Error(`Invalid environment variables:\n  ${issues.join("\n  ")}`);
  }
  return result.data;
}

export interface ContactConfig {
  /** Show the form. When false the page falls back to a mailto link. */
  enabled: boolean;
  /** Turnstile site key when the widget should render. */
  turnstileSiteKey?: string;
  reason?: string;
}

/**
 * Decide whether the contact form can work. Production on Vercel must have a real mailer
 * and Turnstile; everywhere else (local, CI, previews) the console mailer is fine and
 * Turnstile is optional, so the form works without any cloud accounts.
 */
export function getContactConfig(env: ServerEnv = getServerEnv()): ContactConfig {
  const isProduction = env.VERCEL_ENV === "production";
  const captchaReady = Boolean(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY);
  const turnstileSiteKey = captchaReady ? env.NEXT_PUBLIC_TURNSTILE_SITE_KEY : undefined;

  if (env.MAILER === "ses" && !(env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL)) {
    return { enabled: false, reason: "MAILER=ses needs CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL" };
  }
  if (isProduction && env.MAILER !== "ses") {
    return { enabled: false, reason: "production needs MAILER=ses (console would drop messages)" };
  }
  if (isProduction && !captchaReady) {
    return { enabled: false, reason: "production needs Turnstile keys" };
  }
  return { enabled: true, turnstileSiteKey };
}
