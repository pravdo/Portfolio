import { afterEach, describe, expect, it, vi } from "vitest";
import { SendEmailCommand, type SESv2Client } from "@aws-sdk/client-sesv2";
import { getServerEnv } from "@/lib/env";
import { getMailer, resetMailerCache } from "@/lib/mailer";
import { consoleMailer } from "@/lib/mailer/console";
import { createSesMailer } from "@/lib/mailer/ses";
import { renderPlainText } from "@/lib/mailer/types";

const message = { name: "Ada", email: "ada@example.com", message: "Hello there, nice site!" };

afterEach(() => {
  resetMailerCache();
  vi.restoreAllMocks();
});

describe("getMailer", () => {
  it("defaults to the console mailer", () => {
    expect(getMailer(getServerEnv({})).name).toBe("console");
  });

  it("selects SES when configured", () => {
    const env = getServerEnv({
      MAILER: "ses",
      CONTACT_TO_EMAIL: "me@example.com",
      CONTACT_FROM_EMAIL: "site@example.com",
    });
    expect(getMailer(env).name).toBe("ses");
  });

  it("refuses SES without addresses", () => {
    expect(() => getMailer(getServerEnv({ MAILER: "ses" }))).toThrow(/CONTACT_FROM_EMAIL/);
  });
});

describe("consoleMailer", () => {
  it("logs the rendered message", async () => {
    const log = vi.spyOn(console, "info").mockImplementation(() => {});
    await consoleMailer.send(message);
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Portfolio contact from Ada"));
  });
});

describe("SES mailer", () => {
  it("sends a plain-text email with reply-to set to the visitor", async () => {
    const send = vi.fn().mockResolvedValue({});
    const mailer = createSesMailer(
      { region: "eu-central-1", from: "site@example.com", to: "me@example.com" },
      { send } as unknown as SESv2Client,
    );
    await mailer.send(message);

    const command = send.mock.calls[0]?.[0] as SendEmailCommand;
    expect(command).toBeInstanceOf(SendEmailCommand);
    expect(command.input).toMatchObject({
      FromEmailAddress: "site@example.com",
      Destination: { ToAddresses: ["me@example.com"] },
      ReplyToAddresses: ["ada@example.com"],
    });
    expect(command.input.Content?.Simple?.Body?.Text?.Data).toBe(renderPlainText(message).body);
  });
});
