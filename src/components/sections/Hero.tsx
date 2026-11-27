import type { Profile } from "@/content";
import { ButtonLink } from "@/components/ui/Button";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import styles from "./Hero.module.scss";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          {profile.role}
          {profile.location && <span className={styles.location}> · {profile.location}</span>}
        </p>
        <h1 id="hero-heading" className={styles.name}>
          {profile.name}
        </h1>
        <p className={styles.tagline}>{profile.tagline}</p>
        {profile.availability && <p className={styles.availability}>{profile.availability}</p>}

        <div className={styles.actions}>
          <ButtonLink href="#projects">View projects</ButtonLink>
          <ButtonLink href={profile.cvUrl} download variant="secondary" icon={<DownloadIcon />}>
            Download CV
          </ButtonLink>
          <ButtonLink href="#contact" variant="ghost" icon={<MailIcon />}>
            Get in touch
          </ButtonLink>
        </div>

        <ul role="list" className={styles.social}>
          <li>
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              GitHub<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
