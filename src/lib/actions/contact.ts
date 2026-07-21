"use server";

import { Resend } from "resend";
import { z } from "zod";
import type { ContactErrorKey, ContactState } from "@/lib/contact-state";

/**
 * Contact form Server Action.
 *
 * A Server Action is a public POST endpoint, so everything arriving here is
 * untrusted: it is validated before use, and the reply-to address is never
 * interpolated into a header the sender controls beyond the standard replyTo field.
 *
 * Validation messages are error *keys*, not sentences — the client renders them
 * through the active locale's dictionary, so this file stays language-agnostic.
 *
 * Delivery is configured entirely through environment variables. If they are
 * missing the build still succeeds and the form reports a clear, non-technical
 * failure rather than throwing — a missing key is an operator problem, not a
 * visitor's problem.
 */

const key = (k: ContactErrorKey) => k;

const schema = z.object({
  name: z.string().trim().min(1, key("nameRequired")).max(120, key("nameTooLong")),
  email: z.email(key("emailInvalid")),
  message: z.string().trim().min(10, key("messageTooShort")).max(5000, key("messageTooLong")),
});

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a field hidden from people but filled in by naive bots.
  if (typeof formData.get("company") === "string" && formData.get("company") !== "") {
    // Report success so the bot does not learn what tripped it.
    return { status: "ok", messageKey: "sent" };
  }

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      messageKey: "fixErrors",
      errors: z.flattenError(parsed.error).fieldErrors as ContactState["errors"],
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Resend requires a verified sender; onboarding@resend.dev works for testing.
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return { status: "error", messageKey: "notConfigured" };
  }

  const { name, email, message } = parsed.data;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      return { status: "error", messageKey: "sendFailed" };
    }
  } catch {
    return { status: "error", messageKey: "sendFailed" };
  }

  return { status: "ok", messageKey: "sent" };
}
