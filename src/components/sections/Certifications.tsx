import type { Certification, SectionCopy } from "@/content";
import { Section } from "@/components/ui/Section";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { formatYearMonth } from "@/lib/format";
import styles from "./Certifications.module.scss";

export function Certifications({ copy, items }: { copy: SectionCopy; items: Certification[] }) {
  return (
    <Section id="certifications" {...copy}>
      <ul role="list" className={styles.grid}>
        {items.map((cert) => (
          <li key={cert.name} className={styles.card}>
            <p className={styles.name}>{cert.name}</p>
            <p className={styles.meta}>
              {cert.issuer}
              {cert.issued && (
                <>
                  {" · "}
                  <time dateTime={cert.issued}>{formatYearMonth(cert.issued)}</time>
                </>
              )}
              {cert.status === "in-progress" && " · In progress"}
            </p>
            {cert.verifyUrl && (
              <a
                className={styles.verify}
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify <ArrowUpRightIcon />
                <span className="visually-hidden"> {cert.name} (opens in a new tab)</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
