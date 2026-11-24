import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import styles from "./Footer.module.scss";

interface FooterProps {
  name: string;
  githubUrl: string;
  linkedinUrl: string;
  sourceUrl: string;
}

export function Footer({ name, githubUrl, linkedinUrl, sourceUrl }: FooterProps) {
  // Evaluated at build time: the page is static, and a rebuild every year is fine.
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.meta}>
          © {year} {name} · Built with Next.js ·{" "}
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            Source<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </p>
        <ul role="list" className={styles.social}>
          <li>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
          </li>
          <li>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
