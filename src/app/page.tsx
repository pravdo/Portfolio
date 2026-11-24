// TEMPORARY design-system preview. Replaced by the real sections in step 4.
import { Button, ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ArrowUpRightIcon, DownloadIcon } from "@/components/ui/icons";
import styles from "./page.module.scss";

const swatches = [
  "bg",
  "surface",
  "surface-raised",
  "text",
  "text-muted",
  "border",
  "accent",
  "accent-soft",
  "success",
  "warning",
];

export default function Home() {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Design system preview</p>
          <h1 className={styles.title}>Full-stack engineer — Angular, NestJS, .NET, AWS.</h1>
          <p className={styles.lede}>
            I build distributed systems that stay correct under load, with interfaces people enjoy
            using.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="#projects">View projects</ButtonLink>
            <ButtonLink href="/cv.pdf" download variant="secondary" icon={<DownloadIcon />}>
              Download CV
            </ButtonLink>
            <ButtonLink
              href="https://github.com/pravdo"
              target="_blank"
              variant="ghost"
              icon={<ArrowUpRightIcon />}
            >
              GitHub
            </ButtonLink>
          </div>
        </div>
      </div>

      <Section
        id="projects"
        eyebrow="01 / Tokens"
        title="Colour tokens"
        intro="Every colour comes from src/styles/_tokens.scss. Toggle the theme to compare."
      >
        <ul role="list" className={styles.swatches}>
          {swatches.map((name) => (
            <li key={name} className={styles.swatch}>
              <span
                className={styles.chip}
                style={{ background: `var(--color-${name})` }}
                aria-hidden="true"
              />
              <code>--color-{name}</code>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="experience" eyebrow="02 / Type" title="Typography & controls">
        <div className={styles.typeSample}>
          <p className={styles.t4}>Display 4xl</p>
          <p className={styles.t3}>Heading 3xl</p>
          <p className={styles.t2}>Heading 2xl</p>
          <p>
            Body text at the base size with an <a href="#experience">inline link</a> and some{" "}
            <code>inline code</code>.
          </p>
          <div className={styles.actions}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
