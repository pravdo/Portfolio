import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Full-stack engineer — Angular, NestJS, .NET, AWS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
