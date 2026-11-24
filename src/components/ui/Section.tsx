import type { ReactNode } from "react";
import styles from "./Section.module.scss";

interface SectionProps {
  id: string;
  /** Small mono label above the heading, e.g. "01 / Projects". */
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}

/** A page section with an anchor id, labelled by its heading for screen readers. */
export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={styles.section}>
      <header className={styles.header}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        {intro && <div className={styles.intro}>{intro}</div>}
      </header>
      {children}
    </section>
  );
}
