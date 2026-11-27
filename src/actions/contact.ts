"use server";

import { headers } from "next/headers";
import {
  ContactSchema,
  HONEYPOT_FIELD,
  type ContactField,
  type ContactState,
} from "@/lib/contact-schema";
import { getContactConfig, getServerEnv } from "@/lib/env";
import { getMailer } from "@/lib/mailer";
import { verifyTurnstile } from "@/lib/turnstile";

const text = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
};

/**
 * Contact form server action: validate → honeypot → Turnstile → send.
 * Returns a serialisable state for useActionState; never throws to the client.
 */
export async function sendContactMessage(
  _prev: ContactState,
  form: FormData,
): Promise<ContactState> {
  const values = {
    name: text(form, "name"),
    email: text(form, "email"),
    message: text(form, "message"),
  };

  const env = getServerEnv();
  if (!getContactConfig(env).enabled) {
    return {
      status: "error",
      message: "The contact form is unavailable. Please email me instead.",
    };
  }

  // Bots that fill the honeypot get a fake success and nothing is sent.
  if (text(form, HONEYPOT_FIELD)) {
    return { status: "success" };
  }

  const parsed = ContactSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  if (env.TURNSTILE_SECRET_KEY && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    const requestHeaders = await headers();
    const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
    const human = await verifyTurnstile(
      text(form, "cf-turnstile-response"),
      env.TURNSTILE_SECRET_KEY,
      ip,
    );
    if (!human) {
      return {
        status: "error",
        message: "The spam check didn't pass. Please try again.",
        values,
      };
    }
  }

  try {
    await getMailer(env).send(parsed.data);
  } catch (error) {
    console.error("[contact] send failed", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or email me directly.",
      values,
    };
  }

  return { status: "success" };
}
