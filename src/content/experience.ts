import type { ContentInput } from "./schema";

// TODO(content): replace both roles with your real experience, newest first.
// Outcomes, not duties: "Cut checkout p95 from 1.2 s to 300 ms", not "Worked on checkout".
export const experience = [
  {
    id: "company-a",
    company: "Company A",
    title: "Senior Full-stack Engineer",
    location: "Remote",
    start: "2023-01",
    end: "present",
    outcomes: [
      "TODO: outcome with a number — what changed because of your work.",
      "TODO: second outcome.",
      "TODO: third outcome (optional).",
    ],
    stack: ["Angular", "NestJS", "AWS"],
  },
  {
    id: "company-b",
    company: "Company B",
    title: "Full-stack Engineer",
    location: "Sofia",
    start: "2020-06",
    end: "2022-12",
    outcomes: ["TODO: outcome with a number.", "TODO: second outcome."],
    stack: [".NET", "React", "PostgreSQL"],
  },
] satisfies ContentInput["experience"];
