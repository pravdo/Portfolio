import { certifications } from "./certifications";
import { education } from "./education";
import { experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { ContentSchema, type Content } from "./schema";
import { sections } from "./sections";
import { skills } from "./skills";

function load(): Content {
  const result = ContentSchema.safeParse({
    profile,
    sections,
    projects,
    experience,
    skills,
    education,
    certifications,
  });
  if (!result.success) {
    throw new Error(`Invalid content in src/content:\n${formatIssues(result.error.issues)}`);
  }
  return result.data;
}

export function formatIssues(issues: { path: PropertyKey[]; message: string }[]): string {
  return issues
    .map((i) => `  • ${i.path.map(String).join(".") || "(root)"}: ${i.message}`)
    .join("\n");
}

export const content = load();

export function resolveUsage(ref: string): { label: string; href: string } | undefined {
  const project = content.projects.find((p) => p.slug === ref);
  if (project) return { label: project.name, href: `#project-${project.slug}` };
  const role = content.experience.find((r) => r.id === ref);
  if (role) return { label: role.company, href: `#role-${role.id}` };
  return undefined;
}

export type * from "./schema";
