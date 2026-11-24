@AGENTS.md

# Portfolio — rules for Claude

## What this is

Personal portfolio: hero, project cards, experience, skills, certifications, contact form.
Week 15 adds MDX case studies, posts and an "Ask about me" RAG agent.
Blueprint: docs/blueprint.md · Implementation plan: see "Roadmap" in README.md

## Commands

- Install: pnpm install
- Dev: pnpm dev
- Check everything: pnpm lint && pnpm typecheck && pnpm test && pnpm build
- E2E: pnpm e2e

## Architecture rules

- Next.js 16 App Router. Server Components by default; add "use client" only for interactivity.
  Read node_modules/next/dist/docs/ before using an API you are unsure about.
- Content lives in src/content/* as typed data validated by zod. Sections never hard-code copy.
- Styling: SCSS modules + design tokens (CSS custom properties in src/styles/_tokens.scss).
  No UI kits, no Tailwind, no hard-coded colours/spacing outside the tokens file.
- Server-only code (env, mailer, turnstile) imports "server-only". Env is read through src/lib/env.ts.
- External services sit behind interfaces (e.g. Mailer) so local dev works without cloud accounts.
- Accessibility is a requirement: semantic HTML, keyboard reachable, visible focus, reduced motion, axe-clean.

## Workflow

- Plan before touching more than one area.
- New architectural decision = new ADR in docs/adr (copy the format of 0001).
- Every change comes with tests; not done until lint, typecheck, unit and e2e pass.
- Conventional Commits (enforced by commitlint), small PRs.
