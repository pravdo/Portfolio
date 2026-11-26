import type { ContentInput } from "./schema";

export const profile = {
  name: "Pravdomir Kostov",
  role: "Intermediate Web Developer",
  tagline:
    "I build enterprise web apps end to end: Angular frontends, NestJS APIs on PostgreSQL, and the AWS services that connect them.",
  location: "Varna, Bulgaria",
  email: "pravdo00@gmail.com",
  cvUrl: "/cv.pdf",
  social: {
    github: "https://github.com/pravdo",
    linkedin: "https://www.linkedin.com/in/pravdomir-kostov-798769216/",
  },
  sourceUrl: "https://github.com/pravdo/Portfolio",
} satisfies ContentInput["profile"];
