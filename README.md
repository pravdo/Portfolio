# Portfolio

Personal portfolio of **Pravdomir Kostov**: projects, experience, skills, certifications and a
contact form. Built to get a recruiter to a live project in 30 seconds and to show how I build
software.

**Stack:** Next.js 16 (App Router, React Server Components, static rendering) · TypeScript strict
· SCSS modules on design tokens (no UI kit) · zod · Vitest · Playwright + axe · GitHub Actions ·
Vercel · AWS SES

## Run locally

```bash
pnpm install
cp .env.example .env.local   # optional: defaults work without it
pnpm dev                     # http://localhost:3000
```

The contact form works locally without any accounts: messages are printed to the terminal
(`MAILER=console`).

## Scripts

| Command             | What it does                                                |
| ------------------- | ----------------------------------------------------------- |
| `pnpm dev`          | Dev server on http://localhost:3000                         |
| `pnpm lint`         | ESLint (zero warnings allowed)                              |
| `pnpm typecheck`    | Generates route types, then runs `tsc --noEmit`             |
| `pnpm test`         | Unit tests (Vitest)                                         |
| `pnpm e2e`          | Builds, starts and runs Playwright + axe (desktop + mobile) |
| `pnpm build`        | Production build                                            |
| `pnpm format`       | Prettier                                                    |
| `pnpm content:todo` | Lists placeholder content still to replace                  |

## How it's built

```text
src/
  app/            layout (fonts, theme script, metadata), page, OG image, sitemap, robots, 404
  actions/        contact server action
  components/
    layout/       header, footer, skip link, theme toggle
    sections/     hero, projects, experience, skills, certifications, contact
    ui/           button, section, project card, chips, status dot, icons
    contact/      contact form + Turnstile widget
  content/        all copy as typed data, validated by zod at build time
  lib/            env, mailer (console | SES), turnstile, JSON-LD, formatting
  styles/         design tokens, mixins, breakpoints, globals
tests/unit/       Vitest: content schema, env, mailer, Turnstile, contact action
tests/e2e/        Playwright: sections, accessibility (axe, both themes), theme, keyboard, contact
docs/adr/         architecture decision records
```

- **Content is data.** Every section renders from [`src/content/`](src/content). The schema
  checks dates, URLs, unique ids, and that each skill points at a real project or role. A typo
  fails the build with the exact field named.
- **Themes without flash.** A tiny inline script sets `data-theme` before first paint; tokens are
  CSS custom properties, so switching themes changes no markup ([ADR 0002](docs/adr/0002-scss-tokens-no-ui-kit.md)).
- **Contact form.** Server action → zod → honeypot → Turnstile → `Mailer` (console or SES via
  Vercel OIDC, no stored AWS keys) ([ADR 0003](docs/adr/0003-mailer-abstraction-ses.md)).
- **Accessibility.** Skip link, landmarks, visible focus, reduced motion, 44px targets; axe runs
  in CI against both themes on desktop and mobile.

## Deploys

- **CI** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs on every pull request and
  push to `main`: lint → format → typecheck → unit tests → build → Playwright + axe.
- **Vercel** (Git integration) builds every pull request into a preview URL and deploys `main`
  to production.

### Environment variables (Vercel)

| Variable                                                 | Needed for         | Notes                                                 |
| -------------------------------------------------------- | ------------------ | ----------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                   | custom domain      | Optional; defaults to the Vercel production URL       |
| `MAILER`                                                 | contact form       | `ses` in production; previews can use `console`       |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`                 | contact form (SES) | From address must be verified in SES                  |
| `AWS_REGION`, `AWS_ROLE_ARN`                             | contact form (SES) | IAM role trusted by Vercel OIDC, only `ses:SendEmail` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | spam protection    | Required in production                                |

Until SES and Turnstile are configured, production shows an "Email me" link instead of the form.

## Roadmap

1. Scaffold & tooling ✅
2. Design system (tokens, theme, layout shell) ✅
3. Content layer (typed, zod-validated) ✅
4. Sections (hero, projects, experience, skills, certifications) ✅
5. Contact form (server action, Mailer → SES, Turnstile) ✅
6. SEO (metadata, OG image, sitemap, JSON-LD) ✅
7. Tests + CI (Vitest, Playwright + axe, GitHub Actions) ✅
8. Ship (Vercel, SES, Turnstile, custom domain)
9. Week 15: MDX case studies, writing, "Ask about me" agent, live status widget

## Docs

- [Blueprint](docs/blueprint.md)
- [Architecture decision records](docs/adr)
