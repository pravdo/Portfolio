import { z } from "zod";

/** "2024-03" — month precision is enough for a CV, and avoids time-zone surprises. */
export const YearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM, e.g. 2024-03");

/** Absolute https URL, or a site-relative path such as "/cv.pdf". */
/** "2023" or "2023-10": certificates often only state the year. */
export const YearOrMonth = z
  .string()
  .regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, "Use YYYY or YYYY-MM, e.g. 2023 or 2023-10");

const Href = z.union([z.url({ protocol: /^https?$/ }), z.string().regex(/^\/[^/]/)]);

const Slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case slug");

const NonEmpty = z.string().trim().min(1);

export const ProfileSchema = z.object({
  name: NonEmpty,
  /** Shown under the name, e.g. "Full-stack engineer — Angular, NestJS, .NET, AWS". */
  role: NonEmpty,
  /** One sentence on what you build. Keep it short enough for a phone screen. */
  tagline: NonEmpty.max(160),
  location: NonEmpty.optional(),
  email: z.email(),
  cvUrl: Href,
  /** Optional line such as "Open to senior full-stack roles". */
  availability: NonEmpty.optional(),
  social: z.object({
    github: z.url(),
    linkedin: z.url(),
  }),
  sourceUrl: z.url(),
});

export const ProjectStatus = z.enum(["live", "in-progress", "planned"]);

export const ProjectSchema = z.object({
  slug: Slug,
  name: NonEmpty,
  /** The one-line problem the project solves. */
  problem: NonEmpty.max(140),
  summary: NonEmpty,
  stack: z.array(NonEmpty).min(1),
  status: ProjectStatus,
  links: z
    .object({
      live: z.url().optional(),
      repo: z.url().optional(),
      /** Route of the MDX case study (week 15), e.g. "/projects/seatsync". */
      caseStudy: Href.optional(),
    })
    .default({}),
  /** Recruiters won't sign up: a live demo should come with a login. */
  demoLogin: z.object({ username: NonEmpty, password: NonEmpty }).optional(),
  /** Pinged by the live-status widget (week 15). */
  healthUrl: z.url().optional(),
  featured: z.boolean().default(true),
});

export const RoleSchema = z
  .object({
    /** Stable id, used by skills to link to "where you used it". */
    id: Slug,
    company: NonEmpty,
    companyUrl: z.url().optional(),
    title: NonEmpty,
    location: NonEmpty.optional(),
    start: YearMonth,
    end: z.union([YearMonth, z.literal("present")]),
    /** Outcomes, not duties: 2–3 bullets with numbers where possible. */
    outcomes: z.array(NonEmpty).min(1).max(4),
    stack: z.array(NonEmpty).default([]),
  })
  .refine((r) => r.end === "present" || r.end >= r.start, {
    message: "end must not be before start",
    path: ["end"],
  });

export const SkillSchema = z.object({
  name: NonEmpty,
  /** Ids of projects (slug) or roles (id) where this skill was used. */
  usedIn: z.array(Slug).default([]),
});

export const SkillGroupSchema = z.object({
  domain: NonEmpty,
  skills: z.array(SkillSchema).min(1),
});

export const EducationSchema = z.object({
  institution: NonEmpty,
  degree: NonEmpty,
  field: NonEmpty.optional(),
  /** Graduation year, e.g. "2023". */
  graduated: z.string().regex(/^\d{4}$/, "Use a four-digit year"),
});

export const CertificationSchema = z.object({
  name: NonEmpty,
  issuer: NonEmpty,
  status: z.enum(["earned", "in-progress"]),
  issued: YearOrMonth.optional(),
  /** Public verification page. Badges must link here once earned. */
  verifyUrl: z.url().optional(),
});

/**
 * Everything together, with cross-reference checks the individual schemas can't do:
 * unique ids, and every skill's `usedIn` pointing at a real project or role.
 */
export const ContentSchema = z
  .object({
    profile: ProfileSchema,
    projects: z.array(ProjectSchema),
    experience: z.array(RoleSchema),
    skills: z.array(SkillGroupSchema),
    education: z.array(EducationSchema).default([]),
    certifications: z.array(CertificationSchema),
  })
  .superRefine((content, ctx) => {
    const projectSlugs = content.projects.map((p) => p.slug);
    const roleIds = content.experience.map((r) => r.id);
    const all = [...projectSlugs, ...roleIds];

    const seen = new Set<string>();
    for (const id of all) {
      if (seen.has(id)) {
        ctx.addIssue({ code: "custom", message: `Duplicate project/role id "${id}"` });
      }
      seen.add(id);
    }

    content.skills.forEach((group, g) =>
      group.skills.forEach((skill, s) =>
        skill.usedIn.forEach((ref, r) => {
          if (!seen.has(ref)) {
            ctx.addIssue({
              code: "custom",
              path: ["skills", g, "skills", s, "usedIn", r],
              message: `"${skill.name}" refers to unknown project/role "${ref}"`,
            });
          }
        }),
      ),
    );

    content.certifications.forEach((cert, i) => {
      if (cert.status === "earned" && !cert.issued) {
        ctx.addIssue({
          code: "custom",
          path: ["certifications", i, "issued"],
          message: `"${cert.name}" is earned but has no issued date`,
        });
      }
    });
  });

export type ContentInput = z.input<typeof ContentSchema>;
export type Content = z.output<typeof ContentSchema>;
export type Profile = Content["profile"];
export type Project = Content["projects"][number];
export type Role = Content["experience"][number];
export type SkillGroup = Content["skills"][number];
export type Education = Content["education"][number];
export type Certification = Content["certifications"][number];
