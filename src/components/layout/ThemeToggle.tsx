"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import styles from "./ThemeToggle.module.scss";

const darkQuery = "(prefers-color-scheme: dark)";

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function resolveTheme(): Theme {
  return readStored() ?? (matchMedia(darkQuery).matches ? "dark" : "light");
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

// The <html data-theme> attribute is the source of truth; subscribe to its changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });

  // Follow OS changes only while the visitor hasn't picked a theme themselves.
  const media = matchMedia(darkQuery);
  const onMedia = () => {
    if (!readStored()) applyTheme(media.matches ? "dark" : "light");
  };
  media.addEventListener("change", onMedia);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onMedia);
  };
}

const getSnapshot = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

// Unknown on the server: render a neutral button, then hydrate to the real state.
const getServerSnapshot = (): Theme | null => null;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // In dev, React Strict Mode's remount clears attributes on <html> that the inline
  // script set. Re-apply before paint. No-op in production.
  useLayoutEffect(() => {
    applyTheme(resolveTheme());
  }, []);

  function toggle() {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): still switch for this page view.
    }
    applyTheme(next);
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      title="Toggle dark theme"
    >
      {/* Both icons render; CSS shows the right one from data-theme, so there's no icon flash. */}
      <SunIcon className={styles.sun} />
      <MoonIcon className={styles.moon} />
    </button>
  );
}
