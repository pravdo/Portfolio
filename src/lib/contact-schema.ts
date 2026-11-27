import { z } from "zod";

/** Shared between the server action and the form (for maxLength hints). */
export const CONTACT_LIMITS = { name: 100, email: 200, message: 5000, messageMin: 10 } as const;

/** Hidden field that humans never see. Bots fill every input. */
export const HONEYPOT_FIELD = "website";

export const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(CONTACT_LIMITS.name, `Keep it under ${CONTACT_LIMITS.name} characters.`)
    // No line breaks: the name ends up in the email subject.
    .regex(/^[^\r\n]*$/, "Name can't contain line breaks."),
  email: z
    .email("Please enter a valid email address.")
    .max(CONTACT_LIMITS.email, "That email address is too long."),
  message: z
    .string()
    .trim()
    .min(
      CONTACT_LIMITS.messageMin,
      `Please write at least ${CONTACT_LIMITS.messageMin} characters.`,
    )
    .max(CONTACT_LIMITS.message, `Keep it under ${CONTACT_LIMITS.message} characters.`),
});

export type ContactMessage = z.infer<typeof ContactSchema>;
export type ContactField = keyof ContactMessage;

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error so the form keeps what the visitor typed. */
  values?: Partial<Record<ContactField, string>>;
}
