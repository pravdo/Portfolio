import { ImageResponse } from "next/og";
import { content } from "@/content";

export const alt = `${content.profile.name} — ${content.profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colours mirror the dark theme tokens (CSS variables aren't available in next/og).
const colors = {
  bg: "#0c0c0d",
  text: "#ededed",
  muted: "#a1a1aa",
  accent: "#2dd4bf",
  grid: "#1c1c1f",
};

export default function OpengraphImage() {
  const { profile } = content;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: colors.bg,
        backgroundImage: `linear-gradient(to right, ${colors.grid} 1px, transparent 1px), linear-gradient(to bottom, ${colors.grid} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        color: colors.text,
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: colors.accent, letterSpacing: 2 }}>
        ~/{profile.name.split(" ")[0]?.toLowerCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          {profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: colors.muted,
            maxWidth: 960,
            lineHeight: 1.35,
          }}
        >
          {profile.tagline}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: colors.muted }}>
        Projects · Experience · Skills · Contact
      </div>
    </div>,
    size,
  );
}
