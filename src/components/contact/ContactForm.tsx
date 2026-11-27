"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactMessage } from "@/actions/contact";
import { Button } from "@/components/ui/Button";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  type ContactField,
  type ContactState,
} from "@/lib/contact-schema";
import { Turnstile } from "./Turnstile";
import styles from "./ContactForm.module.scss";

const initialState: ContactState = { status: "idle" };

const fields: {
  name: ContactField;
  label: string;
  type: "text" | "email" | "textarea";
  autoComplete?: string;
  maxLength: number;
}[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
    maxLength: CONTACT_LIMITS.name,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    maxLength: CONTACT_LIMITS.email,
  },
  { name: "message", label: "Message", type: "textarea", maxLength: CONTACT_LIMITS.message },
];

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // After a failed submit, move focus to the first invalid field (or the form-level message).
  useEffect(() => {
    if (state.status !== "error" || !formRef.current) return;
    const firstInvalid = formRef.current.querySelector<HTMLElement>("[aria-invalid='true']");
    (firstInvalid ?? formRef.current.querySelector<HTMLElement>("[data-form-status]"))?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>Thanks, your message is on its way.</p>
        <p>I&apos;ll reply to the email address you gave, usually within a couple of days.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className={styles.form} noValidate>
      {fields.map((field) => {
        const id = `contact-${field.name}`;
        const error = state.fieldErrors?.[field.name];
        const errorId = `${id}-error`;
        const common = {
          id,
          name: field.name,
          required: true,
          maxLength: field.maxLength,
          defaultValue: state.values?.[field.name],
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
          className: styles.input,
        } as const;

        return (
          <div key={field.name} className={styles.field}>
            <label htmlFor={id} className={styles.label}>
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea {...common} rows={6} />
            ) : (
              <input {...common} type={field.type} autoComplete={field.autoComplete} />
            )}
            {error && (
              <p id={errorId} className={styles.error}>
                {error}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {turnstileSiteKey && <Turnstile siteKey={turnstileSiteKey} resetSignal={state} />}

      <div className={styles.footer}>
        <Button type="submit" disabled={pending} aria-disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p
          className={styles.status}
          role={state.status === "error" ? "alert" : undefined}
          data-form-status
          tabIndex={-1}
        >
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
