import type { Education, Role, SectionCopy } from "@/content";
import { ChipList } from "@/components/ui/ChipList";
import { Section } from "@/components/ui/Section";
import { formatYearMonth } from "@/lib/format";
import styles from "./Experience.module.scss";

interface ExperienceProps {
  copy: SectionCopy;
  roles: Role[];
  education: Education[];
}

export function Experience({ copy, roles, education }: ExperienceProps) {
  return (
    <Section id="experience" {...copy}>
      <ol role="list" className={styles.timeline}>
        {roles.map((role) => (
          <li key={role.id} id={`role-${role.id}`} className={styles.item}>
            <div className={styles.head}>
              <h3 className={styles.title}>
                {role.title}{" "}
                <span className={styles.company}>
                  at{" "}
                  {role.companyUrl ? (
                    <a href={role.companyUrl} target="_blank" rel="noopener noreferrer">
                      {role.company}
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    role.company
                  )}
                </span>
              </h3>
              <p className={styles.meta}>
                <time dateTime={role.start}>{formatYearMonth(role.start)}</time>
                {" – "}
                {role.end === "present" ? (
                  "Present"
                ) : (
                  <time dateTime={role.end}>{formatYearMonth(role.end)}</time>
                )}
                {role.location && <> · {role.location}</>}
              </p>
            </div>
            <ul className={styles.outcomes}>
              {role.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
            <ChipList items={role.stack} label={`Stack at ${role.company}`} />
          </li>
        ))}
      </ol>

      {education.length > 0 && (
        <div className={styles.education}>
          <h3 className={styles.subheading}>Education</h3>
          <ul role="list" className={styles.eduList}>
            {education.map((edu) => (
              <li key={`${edu.institution}-${edu.degree}`}>
                <p className={styles.degree}>{edu.degree}</p>
                <p className={styles.meta}>
                  {edu.institution}
                  {edu.field && <> · {edu.field}</>} · {edu.graduated}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
