"use client";

import { useActionState } from "react";
import { requestAudit, type AuditState } from "./actions";

const initial: AuditState = { status: "idle" };

export default function AuditForm({ ctaLabel }: { ctaLabel: string }) {
  const [state, action, pending] = useActionState(requestAudit, initial);
  const values = state.status === "error" ? state.values : {};

  if (state.status === "sent") {
    return (
      <div className="border-4 border-orange p-8" role="status">
        <p className="font-headline text-3xl uppercase text-orange">Got it.</p>
        <p className="mt-3 text-lg text-offwhite">
          Your audit is in the queue. We&apos;ll email it to you when it&apos;s done.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5 border-4 border-offwhite/15 p-5 sm:grid-cols-2 sm:p-8" noValidate>
      <Field label="Your name" name="name" defaultValue={values.name} autoComplete="name" required />
      <Field
        label="Company name"
        name="company"
        defaultValue={values.company}
        autoComplete="organization"
        required
      />
      <Field
        label="City and state"
        name="city"
        defaultValue={values.city}
        placeholder="Tulsa, OK"
        required
        wide
      />
      <Field
        label="Email"
        name="email"
        type="email"
        defaultValue={values.email}
        autoComplete="email"
        required
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        defaultValue={values.phone}
        autoComplete="tel"
        hint="Optional"
      />
      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className="flex items-baseline justify-between text-sm font-semibold text-offwhite">
          Questions for us
          <span className="font-mono text-xs font-medium text-offwhite/75">Optional</span>
        </span>
        <textarea
          name="notes"
          rows={3}
          defaultValue={values.notes}
          className="resize-y border-2 border-offwhite/50 bg-navy px-4 py-3 text-lg text-offwhite focus:border-orange focus:outline-none"
        />
      </label>

      {state.status === "error" && (
        <p className="border-l-4 border-orange pl-3 font-semibold text-orange sm:col-span-2" role="alert">
          {state.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-orange px-6 py-4 font-headline text-lg uppercase text-navy transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-60"
        >
          {pending ? "Sending..." : ctaLabel}
        </button>
        <p className="mt-3 text-sm text-offwhite/75">No sales call needed. You get the audit either way.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  wide = false,
  autoComplete,
  placeholder,
  defaultValue,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  wide?: boolean;
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
  hint?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="flex items-baseline justify-between text-sm font-semibold text-offwhite">
        {label}
        {hint && <span className="font-mono text-xs font-medium text-offwhite/75">{hint}</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        aria-required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="border-2 border-offwhite/50 bg-navy px-4 py-3 text-lg text-offwhite placeholder:text-offwhite/55 focus:border-orange focus:outline-none"
      />
    </label>
  );
}
