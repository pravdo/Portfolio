import { ButtonLink } from "@/components/ui/Button";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>This page doesn&apos;t exist.</h1>
      <p className={styles.text}>The link may be old, or the page may have moved.</p>
      <ButtonLink href="/">Back to the homepage</ButtonLink>
    </div>
  );
}
