import { content } from "@/content";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { buildJsonLd, serializeJsonLd } from "@/lib/jsonld";
import { getSiteUrl } from "@/lib/site";

export default function Home() {
  const { profile, sections } = content;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd(content, getSiteUrl())) }}
      />
      <Hero profile={profile} />
      <Projects copy={sections.projects} projects={content.projects} />
      <Experience
        copy={sections.experience}
        roles={content.experience}
        education={content.education}
      />
      <Skills copy={sections.skills} groups={content.skills} />
      <Certifications copy={sections.certifications} items={content.certifications} />
      <Contact copy={sections.contact} profile={profile} />
    </>
  );
}
