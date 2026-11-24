import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

export interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  name: string;
  nav: NavItem[];
}

export function Header({ name, nav }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.prompt} aria-hidden="true">
            ~/
          </span>
          {name}
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          <ul role="list" className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
