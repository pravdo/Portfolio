import type { Project } from "@/content";
import styles from "./StatusDot.module.scss";

const labels: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  planned: "Planned",
};

/** Coloured dot + text label: colour is never the only signal. */
export function StatusDot({ status }: { status: Project["status"] }) {
  return (
    <span className={`${styles.status} ${styles[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {labels[status]}
    </span>
  );
}
