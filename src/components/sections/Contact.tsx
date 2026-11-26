import type { Profile, SectionCopy } from "@/content";
import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { MailIcon } from "@/components/ui/icons";
import { getContactConfig } from "@/lib/env";
import styles from "./Contact.module.scss";

export function Contact({ copy, profile }: { copy: SectionCopy; profile: Profile }) {
  // Evaluated at build time (static page): a misconfigured mailer shows the mailto fallback.
  const config = getContactConfig();

  return (
    <Section id="contact" {...copy}>
      <div className={styles.layout}>
        {config.enabled ? (
          <ContactForm turnstileSiteKey={config.turnstileSiteKey} />
        ) : (
          <ButtonLink href={`mailto:${profile.email}`} icon={<MailIcon />}>
            Email me
          </ButtonLink>
        )}
        <p className={styles.direct}>
          {config.enabled ? "Prefer email? " : "Or write to "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </div>
    </Section>
  );
}
