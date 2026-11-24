# 0002 — SCSS modules on CSS-custom-property tokens, no UI kit

- Status: Accepted
- Date: 2026-11-25

## Context

The portfolio is a design sample in its own right, so it should look like mine and not like a
component library's defaults. It needs light and dark themes with no flash on load, and a
Lighthouse score of 95+. SeatSync (Angular) will follow the same token approach, so the pattern
should not depend on React.

## Decision

- Design tokens (colour, type, space, radius, motion) live in `src/styles/_tokens.scss`
  and are emitted as CSS custom properties on `:root`. Dark theme overrides the colour tokens
  under `:root[data-theme="dark"]`, with a `prefers-color-scheme` fallback when JS is off.
- Components use SCSS modules (`*.module.scss`) and only reference tokens, never raw values.
  Sass is used for mixins and breakpoints only, which compile away to plain CSS.
- No Tailwind and no UI kit. The few primitives needed (Button, Section, icons) are written by hand.
- Theme selection: an inline `<head>` script reads `localStorage` (or the OS preference) and
  sets `data-theme` before first paint. The toggle reads the attribute via
  `useSyncExternalStore`, so server and client markup match and there is no hydration error.

## Consequences

- Theme switching only changes custom properties, with no re-render or extra CSS bundle.
- More CSS to write than with a utility framework. Acceptable for a small site.
- The inline script needs a CSP nonce if a strict Content-Security-Policy is added later.
