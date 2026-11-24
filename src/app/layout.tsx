import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header, type NavItem } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { themeInitScript } from "@/lib/theme";
import "@/styles/globals.scss";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// TODO(step 3): these move into src/content/profile.ts.
const site = {
  name: "Your Name",
  githubUrl: "https://github.com/pravdo",
  linkedinUrl: "https://www.linkedin.com/",
  sourceUrl: "https://github.com/pravdo/Portfolio",
};

const nav: NavItem[] = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Full-stack engineer — Angular, NestJS, .NET, AWS.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0d" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script sets data-theme before React hydrates.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SkipLink />
        <Header name={site.name} nav={nav} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer
          name={site.name}
          githubUrl={site.githubUrl}
          linkedinUrl={site.linkedinUrl}
          sourceUrl={site.sourceUrl}
        />
      </body>
    </html>
  );
}
