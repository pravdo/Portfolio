# 0003 — Contact form: server action, Mailer interface, SES via Vercel OIDC

- Status: Accepted
- Date: 2026-11-27

## Context

The contact form has to work on day one, before any AWS account exists, and later deliver to my
inbox through SES (the blueprint's AWS story). It must resist spam bots without annoying people,
and must never silently drop a message in production.

## Decision

- The form posts to a **server action** (`src/actions/contact.ts`): zod validation, then a honeypot
  check, then Cloudflare Turnstile, then `Mailer.send()`. Errors return per field with the typed
  values echoed back, so the visitor loses nothing.
- Delivery sits behind a `Mailer` interface with two implementations, picked by `MAILER`:
  `console` (logs the message; local dev, CI, previews) and `ses` (AWS SESv2).
- On Vercel, SES credentials come from **Vercel OIDC → IAM role** (`AWS_ROLE_ARN`), using
  `@vercel/oidc-aws-credentials-provider`. No long-lived AWS keys exist anywhere.
- `getContactConfig()` refuses to show the form in Vercel production unless `MAILER=ses` and
  Turnstile keys are set. Instead, the section falls back to a mailto link.

## Consequences

- Local dev and CI need no cloud accounts; E2E tests exercise the real form end to end.
- Swapping providers (Resend, SMTP) is a new `Mailer` implementation, with no change to the form.
- The form's enabled state is decided at build time (static page), so changing mail env vars on
  Vercel needs a redeploy.
- No rate limiting yet beyond Turnstile; Upstash-based limits arrive with the AI agent (week 15).
