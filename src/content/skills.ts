import type { ContentInput } from "./schema";

// Grouped by domain; each skill links to where it was used (project slugs or role ids).
// No logo walls, no percentage bars. Add skills here as the projects actually use them.
export const skills = [
  {
    domain: "Frontend",
    skills: [
      { name: "Angular (NgRx, RxJS, Signals)", usedIn: ["softserve", "seatsync"] },
      { name: "TypeScript", usedIn: ["softserve", "seatsync", "portfolio"] },
      { name: "React / Next.js", usedIn: ["portfolio"] },
      { name: "AG Grid", usedIn: ["softserve", "seatsync"] },
      { name: "HTML, SCSS & design tokens", usedIn: ["softserve", "portfolio"] },
      { name: "Accessibility (WCAG 2.2)", usedIn: ["portfolio"] },
    ],
  },
  {
    domain: "Backend",
    skills: [
      { name: "NestJS & Node.js", usedIn: ["softserve", "seatsync"] },
      { name: "PostgreSQL (migrations, SQL views)", usedIn: ["softserve", "seatsync"] },
      { name: "REST & OpenAPI design", usedIn: ["softserve"] },
      { name: "Policy-based authorization (Cerbos)", usedIn: ["softserve"] },
      { name: "Realtime & event-driven systems", usedIn: ["softserve", "seatsync"] },
      { name: "Hexagonal architecture", usedIn: ["softserve", "seatsync"] },
    ],
  },
  {
    domain: "Cloud & DevOps",
    skills: [
      { name: "AWS (AppSync, S3, CodeBuild)", usedIn: ["softserve", "seatsync"] },
      { name: "CI/CD (Azure DevOps, GitHub Actions)", usedIn: ["softserve", "portfolio"] },
      { name: "Docker", usedIn: ["softserve"] },
      { name: "Ansible & PowerShell", usedIn: ["softserve"] },
    ],
  },
  {
    domain: "Testing",
    skills: [
      { name: "Playwright (E2E)", usedIn: ["softserve", "portfolio"] },
      { name: "Jest, Karma & Jasmine", usedIn: ["softserve"] },
      { name: "Vitest", usedIn: ["portfolio"] },
    ],
  },
  {
    domain: "AI engineering",
    skills: [
      { name: "Claude & Amazon Bedrock", usedIn: ["seatsync", "interviewforge"] },
      { name: "RAG & AI agents", usedIn: ["interviewforge"] },
    ],
  },
] satisfies ContentInput["skills"];
