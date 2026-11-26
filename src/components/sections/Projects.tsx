import type { Project, SectionCopy } from "@/content";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import styles from "./Projects.module.scss";

export function Projects({ copy, projects }: { copy: SectionCopy; projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  return (
    <Section id="projects" {...copy}>
      <ul role="list" className={styles.grid}>
        {featured.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
