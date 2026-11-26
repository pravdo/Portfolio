import type { Content } from "@/content";

/** schema.org Person + CreativeWork graph for search engines. */
export function buildJsonLd(content: Content, siteUrl: URL) {
  const { profile, experience, education, projects } = content;
  const current = experience.find((role) => role.end === "present");
  const personId = new URL("/#person", siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.role,
        description: profile.tagline,
        url: siteUrl.toString(),
        sameAs: [profile.social.github, profile.social.linkedin],
        ...(profile.location && {
          address: { "@type": "PostalAddress", addressLocality: profile.location },
        }),
        ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
        ...(education[0] && {
          alumniOf: { "@type": "CollegeOrUniversity", name: education[0].institution },
        }),
      },
      ...projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.name,
        description: project.summary,
        creator: { "@id": personId },
        keywords: project.stack.join(", "),
        url:
          project.links.live ??
          project.links.repo ??
          new URL(`/#project-${project.slug}`, siteUrl).toString(),
      })),
    ],
  };
}

/** Safe to inline in a <script>: escapes "<" so content can't close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
