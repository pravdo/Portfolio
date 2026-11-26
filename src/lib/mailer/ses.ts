import "server-only";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { awsCredentialsProvider } from "@vercel/oidc-aws-credentials-provider";
import type { Mailer } from "./types";
import { renderPlainText } from "./types";

interface SesMailerConfig {
  region: string;
  from: string;
  to: string;
  /** On Vercel: IAM role assumed with the deployment's OIDC token (no stored AWS keys). */
  roleArn?: string;
}

export function createSesMailer(config: SesMailerConfig, client?: SESv2Client): Mailer {
  const ses =
    client ??
    new SESv2Client({
      region: config.region,
      // Without a role, fall back to the default chain (e.g. a local AWS profile).
      credentials: config.roleArn ? awsCredentialsProvider({ roleArn: config.roleArn }) : undefined,
    });

  return {
    name: "ses",
    async send(message) {
      const { subject, body } = renderPlainText(message);
      await ses.send(
        new SendEmailCommand({
          FromEmailAddress: config.from,
          Destination: { ToAddresses: [config.to] },
          // Replying goes straight to the visitor.
          ReplyToAddresses: [message.email],
          Content: {
            Simple: {
              Subject: { Data: subject, Charset: "UTF-8" },
              Body: { Text: { Data: body, Charset: "UTF-8" } },
            },
          },
        }),
      );
    },
  };
}
