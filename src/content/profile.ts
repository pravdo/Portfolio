import type { ContentInput } from "./schema";

export const profile = {
  name: "Your Name", // TODO(content): your full name
  role: "Full-stack engineer — Angular, NestJS, .NET, AWS",
  tagline:
    "I build distributed systems that stay correct under load, with interfaces people enjoy using.", // TODO(content): your own one-liner
  location: "Sofia, Bulgaria", // TODO(content): confirm or remove
  email: "you@example.com", // TODO(content): public contact address (shown in the mailto fallback)
  cvUrl: "/cv.pdf", // TODO(content): drop your real CV at public/cv.pdf
  availability: "Open to full-stack roles", // TODO(content): adjust or remove
  social: {
    github: "https://github.com/pravdo",
    linkedin: "https://www.linkedin.com/", // TODO(content): your LinkedIn profile URL
  },
  sourceUrl: "https://github.com/pravdo/Portfolio",
} satisfies ContentInput["profile"];
