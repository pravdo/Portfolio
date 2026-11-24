import type { ContentInput } from "./schema";

// Order here = order on the page. Links render only when they exist.
export const projects = [
  {
    slug: "seatsync",
    name: "SeatSync",
    problem: "Sell seats on a live map so two people can never buy the same seat.",
    summary:
      "Event ticketing built as microservices: a Step Functions checkout saga, transactional outbox, idempotent consumers and a realtime SVG seat map.",
    stack: ["Angular", "NestJS", "ASP.NET Core", "DynamoDB", "Step Functions", "EventBridge"],
    status: "in-progress",
  },
  {
    slug: "interviewforge",
    name: "InterviewForge",
    problem: "Practise technical interviews with agents that plan, interview, score and coach.",
    summary:
      "A multi-agent mock interviewer with sandboxed code execution, pgvector RAG, structured outputs and an eval suite that gates prompt changes in CI.",
    stack: ["Next.js", "ASP.NET Core", "Agent Framework", "Claude on Bedrock", "pgvector"],
    status: "planned",
  },
  {
    slug: "portfolio",
    name: "This portfolio",
    problem: "Get a recruiter to a live demo in 30 seconds, and show how I think.",
    summary:
      "Next.js 16 with typed, schema-validated content, a no-flash theme system on design tokens, and CI with accessibility checks.",
    stack: ["Next.js", "TypeScript", "SCSS", "Vercel"],
    status: "in-progress",
    links: { repo: "https://github.com/pravdo/Portfolio" },
  },
] satisfies ContentInput["projects"];
