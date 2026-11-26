"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import styles from "./ContactForm.module.scss";

interface TurnstileApi {
  render(el: HTMLElement, options: { sitekey: string; theme?: string; action?: string }): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Cloudflare Turnstile widget, rendered explicitly so it survives React re-renders.
 * It injects a hidden `cf-turnstile-response` input into the surrounding form.
 * Tokens are single-use, so the widget resets whenever `resetSignal` changes.
 */
export function Turnstile({ siteKey, resetSignal }: { siteKey: string; resetSignal: unknown }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!container.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      theme: "auto",
      action: "contact",
    });
  }, [siteKey]);

  // Script may already be loaded (client-side navigation back to the page).
  useEffect(() => {
    render();
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [render]);

  useEffect(() => {
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }, [resetSignal]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={render}
      />
      <div ref={container} className={styles.turnstile} />
    </>
  );
}
