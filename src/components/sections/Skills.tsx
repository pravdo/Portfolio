import { resolveUsage, type SectionCopy, type SkillGroup } from "@/content";
import { Section } from "@/components/ui/Section";
import styles from "./Skills.module.scss";

export function Skills({ copy, groups }: { copy: SectionCopy; groups: SkillGroup[] }) {
  return (
    <Section id="skills" {...copy}>
      <div className={styles.grid}>
        {groups.map((group) => (
          <section key={group.domain} className={styles.group} aria-label={group.domain}>
            <h3 className={styles.domain}>{group.domain}</h3>
            <ul role="list" className={styles.skills}>
              {group.skills.map((skill) => {
                const usages = skill.usedIn.flatMap((ref) => resolveUsage(ref) ?? []);
                return (
                  <li key={skill.name} className={styles.skill}>
                    <span className={styles.name}>{skill.name}</span>
                    {usages.length > 0 && (
                      <span className={styles.usedIn}>
                        <span className="visually-hidden">Used in: </span>
                        {usages.map((usage, i) => (
                          <span key={usage.href}>
                            {i > 0 && <span aria-hidden="true"> · </span>}
                            <a href={usage.href}>{usage.label}</a>
                          </span>
                        ))}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
