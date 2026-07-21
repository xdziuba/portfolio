/**
 * Contact form state, kept in its own module on purpose.
 *
 * A "use server" file may only export async functions. Exporting the initial-state
 * object from the action module builds fine but throws at runtime with
 * "A 'use server' file can only export async functions, found object" — so the
 * shared value and its type live here instead.
 *
 * The action returns message *keys* rather than sentences. The server therefore
 * never needs to know which language the visitor is reading, and the two locales
 * cannot drift apart in wording.
 */

export const CONTACT_ERROR_KEYS = [
  "nameRequired",
  "nameTooLong",
  "emailInvalid",
  "messageTooShort",
  "messageTooLong",
] as const;

export type ContactErrorKey = (typeof CONTACT_ERROR_KEYS)[number];

export const CONTACT_MESSAGE_KEYS = ["idle", "fixErrors", "notConfigured", "sendFailed", "sent"] as const;

export type ContactMessageKey = (typeof CONTACT_MESSAGE_KEYS)[number];

export type ContactState = {
  status: "idle" | "ok" | "error";
  messageKey: ContactMessageKey;
  errors?: {
    name?: ContactErrorKey[];
    email?: ContactErrorKey[];
    message?: ContactErrorKey[];
  };
};

export const CONTACT_INITIAL_STATE: ContactState = { status: "idle", messageKey: "idle" };
