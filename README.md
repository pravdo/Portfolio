# Portfolio

Personal portfolio site: projects, experience, skills, certifications and a contact form.
Built with Next.js 16 (App Router), TypeScript strict and SCSS modules on design tokens, and hosted on Vercel.

> Work in progress. The week-1 MVP is being built. The full README (architecture, screenshots,
> how deploys work) lands in step 8 of the roadmap.

## Run locally

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts

| Command          | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `pnpm dev`       | Dev server on http://localhost:3000             |
| `pnpm lint`      | ESLint (zero warnings allowed)                  |
| `pnpm typecheck` | Generates route types, then runs `tsc --noEmit` |
| `pnpm build`     | Production build                                |
| `pnpm format`    | Prettier                                        |

## Editing content

All copy lives in [`src/content/`](src/content) as typed data: profile, projects, experience,
skills and certifications. It's validated with zod when the site builds, so a typo
(bad date, broken link, a skill pointing at a project that doesn't exist) fails the build
with a message naming the exact field. Run `pnpm content:todo` to see what's still a placeholder.

## Roadmap

1. Scaffold & tooling ✅
2. Design system (tokens, theme, layout shell) ✅
3. Content layer (typed, zod-validated) ✅
4. Sections (hero, projects, experience, skills, certifications)
5. Contact form (server action, Mailer → SES, Turnstile)
6. SEO (metadata, OG image, sitemap, JSON-LD)
7. Tests + CI (Vitest, Playwright + axe, GitHub Actions)
8. Ship (GitHub + Vercel)
9. Week 15: MDX case studies, writing, "Ask about me" agent, live status widget

## Docs

- [Blueprint](docs/blueprint.md)
- [Architecture decision records](docs/adr)
