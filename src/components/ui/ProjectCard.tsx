import type { Project } from "@/content";
import { ChipList } from "./ChipList";
import { StatusDot } from "./StatusDot";
import { ArrowUpRightIcon, GitHubIcon } from "./icons";
import styles from "./ProjectCard.module.scss";

export function ProjectCard({ project }: { project: Project }) {
  const { links } = project;
  const hasLinks = Boolean(links.live || links.repo || links.caseStudy);
  const headingId = `project-${project.slug}-heading`;

  return (
    <article id={`project-${project.slug}`} className={styles.card} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h3 id={headingId} className={styles.name}>
          {project.name}
        </h3>
        <StatusDot status={project.status} />
      </header>

      <p className={styles.problem}>{project.problem}</p>
      <p className={styles.summary}>{project.summary}</p>

      <ChipList items={project.stack} label={`${project.name} tech stack`} />

      <footer className={styles.footer}>
        {hasLinks ? (
          <ul role="list" className={styles.links}>
            {links.live && (
              <li>
                <a href={links.live} target="_blank" rel="noopener noreferrer">
                  Live demo <ArrowUpRightIcon />
                  <span className="visually-hidden"> of {project.name} (opens in a new tab)</span>
                </a>
              </li>
            )}
            {links.repo && (
              <li>
                <a href={links.repo} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon /> Source
                  <span className="visually-hidden"> of {project.name} (opens in a new tab)</span>
                </a>
              </li>
            )}
            {links.caseStudy && (
              <li>
                <a href={links.caseStudy}>
                  Case study<span className="visually-hidden">: {project.name}</span>
                </a>
              </li>
            )}
          </ul>
        ) : (
          <p className={styles.soon}>Repository and demo coming soon</p>
        )}
        {project.demoLogin && (
          <p className={styles.demo}>
            Demo login: <code>{project.demoLogin.username}</code> /{" "}
            <code>{project.demoLogin.password}</code>
          </p>
        )}
      </footer>
    </article>
  );
}
