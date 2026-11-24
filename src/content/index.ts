import { certifications } from "./certifications";
import { experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { ContentSchema, type Content } from "./schema";
import { skills } from "./skills";

/**
 * Parse all content once, at module load. Pages are statically rendered, so this runs at
 * build time: invalid content fails `next build` with a readable error instead of shipping.
 */
function load(): Content {
  const result = ContentSchema.safeParse({
    profile,
    projects,
    experience,
    skills,
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

/** Where a skill was used, resolved to a label and an on-page anchor. */
export function resolveUsage(ref: string): { label: string; href: string } | undefined {
  const project = content.projects.find((p) => p.slug === ref);
  if (project) return { label: project.name, href: `#project-${project.slug}` };
  const role = content.experience.find((r) => r.id === ref);
  if (role) return { label: role.company, href: `#role-${role.id}` };
  return undefined;
}

export type * from "./schema";
