import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "ghost";

interface CommonProps {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
}

function classes(variant: Variant, extra?: string) {
  return [styles.button, styles[variant], extra].filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  icon,
  children,
  className,
  type = "button",
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button type={type} className={classes(variant, className)} {...props}>
      {children}
      {icon}
    </button>
  );
}

/**
 * A link styled as a button. Internal paths and #anchors use next/link; anything with a
 * scheme (https:, mailto:) or a file download renders a plain <a>.
 */
export function ButtonLink({
  variant = "primary",
  icon,
  children,
  className,
  href,
  ...props
}: CommonProps & Omit<ComponentProps<"a">, "href"> & { href: string }) {
  const isExternal = /^[a-z]+:/i.test(href);
  const isNewTab = props.target === "_blank";
  const content = (
    <>
      {children}
      {icon}
      {isNewTab && <span className="visually-hidden"> (opens in a new tab)</span>}
    </>
  );

  if (isExternal || props.download !== undefined) {
    return (
      <a
        href={href}
        className={classes(variant, className)}
        rel={isNewTab ? "noopener noreferrer" : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes(variant, className)} {...props}>
      {content}
    </Link>
  );
}
