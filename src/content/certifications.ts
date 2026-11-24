import type { ContentInput } from "./schema";

export const certifications = [
  {
    name: "Claude Certified Developer – Foundations",
    issuer: "Anthropic",
    status: "earned",
    issued: "2026-10",
    verifyUrl: "https://www.credly.com/badges/3bbedf09-6e26-4067-9903-6ab7b9c71b5c/public_url",
  },
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services Training and Certification",
    status: "earned",
    issued: "2026-06",
    verifyUrl: "https://www.credly.com/badges/d170462c-a9c2-489d-ac09-5511074213f9/public_url",
  },
  {
    name: "Fundamentals of AI Agents Using RAG and LangChain",
    issuer: "IBM",
    status: "earned",
    issued: "2026-05",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/WODDFHUMHTF3",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services Training and Certification",
    status: "earned",
    issued: "2026-03",
    verifyUrl: "https://www.credly.com/badges/a4ad7949-0826-4b9c-b33d-688dac5d4c3d/public_url",
  },
  {
    name: "Getting Started with AI and Machine Learning",
    issuer: "LinkedIn",
    status: "earned",
    issued: "2025-04",
    verifyUrl:
      "https://www.linkedin.com/learning/certificates/2ecf5a3793d19100103a1fdad362d895b9ca9d002c2a36c03f14c88524fd10ac",
  },
  {
    name: "Certificate of Completion FrontendExpert",
    issuer: "AlgoExpert",
    status: "earned",
    issued: "2023-10",
    verifyUrl: "https://certificate.algoexpert.io/FE-f4db3ea733",
  },
] satisfies ContentInput["certifications"];
