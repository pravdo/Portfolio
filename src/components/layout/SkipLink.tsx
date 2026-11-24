import styles from "./SkipLink.module.scss";

export function SkipLink({ targetId = "main" }: { targetId?: string }) {
  return (
    <a href={`#${targetId}`} className={styles.skip}>
      Skip to content
    </a>
  );
}
