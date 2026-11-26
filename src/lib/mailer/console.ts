import type { Mailer } from "./types";
import { renderPlainText } from "./types";

/** Dev/CI mailer: prints the message to the server log instead of sending it. */
export const consoleMailer: Mailer = {
  name: "console",
  async send(message) {
    const { subject, body } = renderPlainText(message);
    console.info(`[mailer:console] ${subject}\n${body}`);
  },
};
