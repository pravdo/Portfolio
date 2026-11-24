import type { ContentInput } from "./schema";

export const certifications = [
  {
    name: "Claude Certified Developer – Foundations",
    issuer: "Anthropic",
    status: "earned",
    issued: "2026-11", // TODO(content): real issue month
    // verifyUrl: "https://...", // TODO(content): public verification link
  },
] satisfies ContentInput["certifications"];
