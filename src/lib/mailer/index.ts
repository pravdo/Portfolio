import "server-only";
import { getServerEnv, type ServerEnv } from "@/lib/env";
import { consoleMailer } from "./console";
import { createSesMailer } from "./ses";
import type { Mailer } from "./types";

export type { Mailer } from "./types";

let cached: Mailer | undefined;

/** The mailer selected by env (MAILER). Cached so the SES client is reused across requests. */
export function getMailer(env: ServerEnv = getServerEnv()): Mailer {
  if (cached) return cached;
  if (env.MAILER === "ses") {
    if (!env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
      throw new Error("MAILER=ses requires CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL");
    }
    cached = createSesMailer({
      region: env.AWS_REGION,
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      roleArn: env.AWS_ROLE_ARN,
    });
  } else {
    cached = consoleMailer;
  }
  return cached;
}

/** Test helper. */
export function resetMailerCache() {
  cached = undefined;
}
