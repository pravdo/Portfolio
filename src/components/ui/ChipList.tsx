import styles from "./ChipList.module.scss";

/** A row of small mono "chips", e.g. a tech stack. */
export function ChipList({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) return null;
  return (
    <ul role="list" aria-label={label} className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.chip}>
          {item}
        </li>
      ))}
    </ul>
  );
}
