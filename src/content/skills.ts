import type { ContentInput } from "./schema";

// Grouped by domain; each skill links to where it was used (project slugs or role ids).
// No logo walls, no percentage bars. TODO(content): adjust skills and usedIn to match reality.
export const skills = [
  {
    domain: "Frontend",
    skills: [
      { name: "Angular", usedIn: ["seatsync", "company-a"] },
      { name: "React / Next.js", usedIn: ["portfolio", "interviewforge", "company-b"] },
      { name: "TypeScript", usedIn: ["seatsync", "portfolio", "company-a"] },
      { name: "SCSS & design tokens", usedIn: ["portfolio", "seatsync"] },
      { name: "Accessibility (WCAG 2.2)", usedIn: ["portfolio"] },
    ],
  },
  {
    domain: "Backend",
    skills: [
      { name: "NestJS", usedIn: ["seatsync", "company-a"] },
      { name: "ASP.NET Core", usedIn: ["seatsync", "interviewforge", "company-b"] },
      { name: "PostgreSQL", usedIn: ["seatsync", "interviewforge", "company-b"] },
      { name: "DynamoDB", usedIn: ["seatsync"] },
      { name: "Event-driven design & sagas", usedIn: ["seatsync"] },
    ],
  },
  {
    domain: "Cloud & DevOps",
    skills: [
      { name: "AWS Lambda & API Gateway", usedIn: ["seatsync", "company-a"] },
      { name: "Step Functions, EventBridge, SQS", usedIn: ["seatsync"] },
      { name: "AWS CDK", usedIn: ["seatsync"] },
      { name: "GitHub Actions (OIDC)", usedIn: ["seatsync", "portfolio"] },
    ],
  },
  {
    domain: "AI engineering",
    skills: [
      { name: "Claude on Bedrock", usedIn: ["interviewforge", "seatsync"] },
      { name: "Multi-agent workflows", usedIn: ["interviewforge"] },
      { name: "RAG with pgvector", usedIn: ["interviewforge"] },
      { name: "LLM evals in CI", usedIn: ["interviewforge"] },
    ],
  },
] satisfies ContentInput["skills"];
