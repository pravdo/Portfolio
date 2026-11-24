import type { ContentInput } from "./schema";

export const profile = {
  name: "Pravdomir Kostov",
  role: "Full-stack engineer — Angular, NestJS, .NET, AWS",
  tagline:
    "I build distributed systems that stay correct under load, with interfaces people enjoy using.",
  location: "Varna, Bulgaria",
  email: "pravdo00@gmail.com",
  cvUrl: "/cv.pdf", // TODO(content): drop your real CV at public/cv.pdf
  social: {
    github: "https://github.com/pravdo",
    linkedin: "https://www.linkedin.com/in/pravdomir-kostov-798769216/",
  },
  sourceUrl: "https://github.com/pravdo/Portfolio",
} satisfies ContentInput["profile"];
