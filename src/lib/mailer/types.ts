import type { ContactMessage } from "@/lib/contact-schema";

/** Anything that can deliver a contact message. Swap implementations by env (MAILER). */
export interface Mailer {
  readonly name: string;
  send(message: ContactMessage): Promise<void>;
}

export function renderPlainText(message: ContactMessage): { subject: string; body: string } {
  return {
    subject: `Portfolio contact from ${message.name}`,
    body: [
      `Name:  ${message.name}`,
      `Email: ${message.email}`,
      "",
      message.message,
      "",
      "— Sent from the portfolio contact form",
    ].join("\n"),
  };
}
