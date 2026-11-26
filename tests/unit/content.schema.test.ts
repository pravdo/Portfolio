import { describe, expect, it } from "vitest";
import { content, formatIssues, resolveUsage } from "@/content";
import { ContentSchema, RoleSchema, type ContentInput } from "@/content/schema";

/** Smallest valid content; each test breaks one thing. */
function valid(): ContentInput {
  return {
    profile: {
      name: "Ada Lovelace",
      role: "Engineer",
      tagline: "Builds things.",
      email: "ada@example.com",
      cvUrl: "/cv.pdf",
      social: { github: "https://github.com/ada", linkedin: "https://linkedin.com/in/ada" },
      sourceUrl: "https://github.com/ada/site",
    },
    projects: [
      {
        slug: "engine",
        name: "Engine",
        problem: "Compute things.",
        summary: "An analytical engine.",
        stack: ["Brass"],
        status: "live",
      },
    ],
    experience: [
      {
        id: "babbage-co",
        company: "Babbage & Co",
        title: "Programmer",
        start: "1842-01",
        end: "present",
        outcomes: ["Wrote the first program."],
      },
    ],
    skills: [
      { domain: "Maths", skills: [{ name: "Algorithms", usedIn: ["engine", "babbage-co"] }] },
    ],
    certifications: [{ name: "Cert", issuer: "Org", status: "earned", issued: "1843-06" }],
  };
}

const messages = (input: unknown) => {
  const result = ContentSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((i) => i.message);
};

describe("ContentSchema", () => {
  it("accepts valid content and applies defaults", () => {
    const parsed = ContentSchema.parse(valid());
    expect(parsed.projects[0]?.links).toEqual({});
    expect(parsed.projects[0]?.featured).toBe(true);
    expect(parsed.experience[0]?.stack).toEqual([]);
    expect(parsed.education).toEqual([]);
  });

  it("rejects a malformed month", () => {
    const input = valid();
    input.experience[0]!.start = "2024-13";
    expect(messages(input)).toContain("Use YYYY-MM, e.g. 2024-03");
  });

  it("rejects a role that ends before it starts", () => {
    const result = RoleSchema.safeParse({
      ...valid().experience[0],
      start: "2024-05",
      end: "2024-01",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a skill that points at an unknown project or role", () => {
    const input = valid();
    input.skills[0]!.skills[0]!.usedIn = ["nope"];
    expect(messages(input)).toContain('"Algorithms" refers to unknown project/role "nope"');
  });

  it("rejects duplicate ids across projects and roles", () => {
    const input = valid();
    input.experience[0]!.id = "engine";
    expect(messages(input)).toContain('Duplicate project/role id "engine"');
  });

  it("requires an issued date for earned certifications", () => {
    const input = valid();
    delete input.certifications[0]!.issued;
    expect(messages(input)).toContain('"Cert" is earned but has no issued date');
  });

  it("rejects non-http links and bad slugs", () => {
    const input = valid();
    input.projects[0]!.links = { live: "javascript:alert(1)" };
    input.projects[0]!.slug = "Not A Slug";
    expect(messages(input).length).toBeGreaterThanOrEqual(2);
  });

  it("rejects a non-year graduation value", () => {
    const input = valid();
    input.education = [{ institution: "Uni", degree: "BSc", graduated: "2023-06" }];
    expect(messages(input)).toContain("Use a four-digit year");
  });

  it("accepts a year-only certification date but not a malformed one", () => {
    const input = valid();
    input.certifications[0]!.issued = "2023";
    expect(messages(input)).toEqual([]);
    input.certifications[0]!.issued = "23";
    expect(messages(input)).toContain("Use YYYY or YYYY-MM, e.g. 2023 or 2023-10");
  });

  it("formats issues with their path", () => {
    expect(formatIssues([{ path: ["projects", 0, "slug"], message: "bad" }])).toBe(
      "  • projects.0.slug: bad",
    );
  });
});

describe("repository content", () => {
  it("parses (the same check `next build` runs)", () => {
    expect(content.projects.length).toBeGreaterThan(0);
  });

  it("resolves every skill usage to an on-page anchor", () => {
    for (const group of content.skills) {
      for (const skill of group.skills) {
        for (const ref of skill.usedIn) {
          expect(resolveUsage(ref)?.href).toMatch(/^#(project|role)-/);
        }
      }
    }
  });
});
