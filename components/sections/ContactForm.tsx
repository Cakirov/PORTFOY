"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { cn } from "@/lib/utils";

// bg-bg (not bg-bg-elevated, the panel's own background) so fields read as
// recessed against the surrounding form panel.
const FIELD_CLASSES =
  "w-full border border-border-strong bg-bg px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary transition-[border-color,box-shadow] duration-(--motion-fast) focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none";

const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, INITIAL_STATE);

  return (
    <form action={formAction} className="flex w-full flex-col gap-5 text-left">
      {/* Honeypot — invisible to sighted users and screen readers alike; a
          bot that fills every field trips it, a real visitor never does. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="font-mono-ui text-label text-text-tertiary">
            İsim
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            className={FIELD_CLASSES}
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "contact-name-error" : undefined}
          />
          {state.fieldErrors?.name ? (
            <p id="contact-name-error" className="text-small text-danger">
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="font-mono-ui text-label text-text-tertiary">
            E-posta
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD_CLASSES}
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "contact-email-error" : undefined}
          />
          {state.fieldErrors?.email ? (
            <p id="contact-email-error" className="text-small text-danger">
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="font-mono-ui text-label text-text-tertiary">
          Mesaj
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className={cn(FIELD_CLASSES, "resize-none")}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "contact-message-error" : undefined}
        />
        {state.fieldErrors?.message ? (
          <p id="contact-message-error" className="text-small text-danger">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-1 flex flex-col gap-3">
        <Button
          type="submit"
          variant="primary"
          showArrow={!pending}
          disabled={pending}
          className="self-start disabled:opacity-60"
        >
          {pending ? "Gönderiliyor..." : "Mesajı Gönder"}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={cn("flex items-center gap-2 text-small", state.status === "error" ? "text-danger" : "text-accent")}
        >
          {state.status !== "idle" ? (
            <>
              {state.status === "error" ? (
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {state.message}
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
