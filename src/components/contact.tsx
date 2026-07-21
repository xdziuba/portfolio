"use client";

import { useActionState, useId } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { PROFILE } from "@/content/projects";
import { submitContact } from "@/lib/actions/contact";
import { CONTACT_INITIAL_STATE, type ContactErrorKey } from "@/lib/contact-state";
import type { Dictionary } from "@/i18n/types";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

/**
 * Contact.
 *
 * No email address is printed anywhere, because none is public on the GitHub
 * profile and inventing one is not an option. The form is the channel instead.
 *
 * The Server Action returns keys; this component resolves them through the active
 * locale, so a validation error reads in the same language as the page.
 *
 * Accessibility notes: every field has a real visible label, errors sit next to the
 * field they belong to and are announced politely, invalid fields carry
 * aria-invalid, and the form still submits without client JavaScript because a
 * Server Action is a plain form POST.
 */
export function Contact({ dict }: { dict: Dictionary }) {
  const [state, formAction, pending] = useActionState(submitContact, CONTACT_INITIAL_STATE);
  const ids = useId();
  const copy = dict.contact;

  const errorText = (keys: ContactErrorKey[] | undefined) => (keys?.[0] ? copy.errors[keys[0]] : "");

  const inputClass =
    "w-full rounded-[var(--r-sm)] border border-[var(--color-line)] bg-white/[0.02] px-3.5 py-3 text-[0.92rem] text-text transition-colors duration-[var(--dur-fast)] placeholder:text-faint/70 hover:border-[var(--color-line-strong)] focus:border-accent/60 aria-[invalid=true]:border-red-400/70";

  const fields = [
    { name: "name" as const, label: copy.name, type: "text", autoComplete: "name" },
    { name: "email" as const, label: copy.email, type: "email", autoComplete: "email" },
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-[var(--section-y)]">
      <div className="container-rail">
        <SectionHeader index={copy.index} label={copy.label} title={copy.title} intro={copy.lede} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <form action={formAction} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={`${ids}-${field.name}`} className="meta mb-2 block text-muted">
                        {field.label}
                      </label>
                      <input
                        id={`${ids}-${field.name}`}
                        name={field.name}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        required
                        aria-describedby={`${ids}-${field.name}-error`}
                        aria-invalid={Boolean(state.errors?.[field.name])}
                        className={inputClass}
                      />
                      <p
                        id={`${ids}-${field.name}-error`}
                        aria-live="polite"
                        className="mt-1.5 text-[0.76rem] text-red-300"
                      >
                        {errorText(state.errors?.[field.name])}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor={`${ids}-message`} className="meta mb-2 block text-muted">
                    {copy.message}
                  </label>
                  <textarea
                    id={`${ids}-message`}
                    name="message"
                    rows={6}
                    required
                    aria-describedby={`${ids}-message-error`}
                    aria-invalid={Boolean(state.errors?.message)}
                    className={`${inputClass} resize-y`}
                  />
                  <p id={`${ids}-message-error`} aria-live="polite" className="mt-1.5 text-[0.76rem] text-red-300">
                    {errorText(state.errors?.message)}
                  </p>
                </div>

                {/* Honeypot. Hidden from people, not from bots. */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor={`${ids}-company`}>{copy.company}</label>
                  <input id={`${ids}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--r-sm)] bg-text px-5 text-[0.9rem] font-medium text-[#06080e] transition-all duration-[var(--dur-fast)] hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
                  >
                    {pending ? <Loader2 size={15} aria-hidden className="animate-spin" /> : null}
                    {pending ? copy.sending : copy.send}
                  </button>

                  {/* Single status region for the whole form. */}
                  <p
                    aria-live="polite"
                    className={`flex items-center gap-1.5 text-[0.84rem] ${
                      state.status === "ok" ? "text-accent" : "text-red-300"
                    }`}
                  >
                    {state.status === "ok" ? <Check size={14} aria-hidden /> : null}
                    {copy.messages[state.messageKey]}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="meta mb-4">{copy.elsewhere}</p>
              <ul className="space-y-px">
                {[
                  { label: "GitHub", value: `github.com/${PROFILE.handle}`, href: PROFILE.githubUrl },
                  { label: "Instagram", value: `@${PROFILE.instagramHandle}`, href: PROFILE.instagramUrl },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex min-h-[56px] items-center justify-between border-t border-[var(--color-line)] transition-colors hover:border-accent/30"
                    >
                      <span className="flex flex-col">
                        <span className="meta">{link.label}</span>
                        <span className="mt-1 font-mono text-[0.84rem] text-text transition-colors group-hover:text-accent">
                          {link.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        aria-hidden
                        className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                      <span className="sr-only">{dict.nav.newTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
