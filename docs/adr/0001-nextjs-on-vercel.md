# 0001 — Next.js 16 App Router, hosted on Vercel

- Status: Accepted
- Date: 2026-11-25

## Context

The portfolio needs to ship in a week, score 95+ on Lighthouse, and later host a streaming AI
agent and a server-side contact form. GitHub Pages only serves static files, so it cannot run
the contact form or the agent.

## Decision

Use Next.js 16 (App Router, React Server Components, TypeScript strict) and deploy through
Vercel's Git integration: every pull request gets a preview URL, `main` deploys to production.
GitHub Actions runs lint, typecheck, tests and build as the quality gate; Vercel does the deploy.

## Consequences

- Most pages render statically, so they are fast and cheap. Server actions and route handlers cover the
  contact form and, later, the agent's streaming endpoint.
- Vercel Hobby is free for a personal, non-commercial site. AWS Amplify Hosting is the fallback if
  that changes.
- AWS access from Vercel (SES now, Bedrock later) uses Vercel OIDC federation to an IAM role,
  so no long-lived AWS keys are stored anywhere.
