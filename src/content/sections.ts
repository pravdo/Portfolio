import type { ContentInput } from "./schema";

// Headings and intros for each page section.
export const sections = {
  projects: {
    eyebrow: "01 / Projects",
    title: "Featured projects",
    intro:
      "Production-style builds with CI, tests and docs. Each one gets a live demo and a case study as it ships.",
  },
  experience: {
    eyebrow: "02 / Experience",
    title: "Where I've worked",
  },
  skills: {
    eyebrow: "03 / Skills",
    title: "Skills, and where I used them",
    intro: "Each skill links to the role or project where I applied it.",
  },
  certifications: {
    eyebrow: "04 / Certifications",
    title: "Certifications",
  },
  contact: {
    eyebrow: "05 / Contact",
    title: "Get in touch",
    intro: "Hiring, a project, or a question about something here? Send a message and I'll reply.",
  },
} satisfies ContentInput["sections"];
