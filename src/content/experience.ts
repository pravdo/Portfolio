import type { ContentInput } from "./schema";

// Newest first. Outcomes, not duties; add numbers (users, latency, time saved) when you have them.
export const experience = [
  {
    id: "softserve",
    company: "SoftServe",
    companyUrl: "https://www.softserveinc.com/",
    title: "Intermediate Web Developer",
    start: "2022-06",
    end: "present",
    outcomes: [
      "Delivered complex workflows end to end in an enterprise procurement platform: multi-step cost requests, drawing analysis and analytics dashboards, with realtime status updates over AWS AppSync.",
      "Built NestJS REST APIs on PostgreSQL (migrations, SQL views, modular architecture) and Angular frontends with NgRx, RxJS and Signals.",
      "Secured features with policy-based authorization in Cerbos, enforced consistently across frontend and backend.",
      "Raised release confidence with Jest and Playwright suites and CI/CD in Azure DevOps and AWS CodeBuild, and supported self-hosted production apps (SQL, PowerShell, Ansible).",
    ],
    stack: [
      "Angular",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "NgRx",
      "AWS AppSync",
      "Cerbos",
      "Playwright",
    ],
  },
] satisfies ContentInput["experience"];
