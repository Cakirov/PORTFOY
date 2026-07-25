"use server";

import { Resend } from "resend";
import { z } from "zod";

// Resend's shared `onboarding@resend.dev` sender (no verified domain yet)
// only delivers to the email address the Resend account itself was signed
// up with — sending to a different address (e.g. the gmail one shown on
// the site's own "E-posta" button) gets rejected with a 403. Once a domain
// is verified at resend.com/domains, both this and `from` below can point
// anywhere.
const CONTACT_EMAIL = "omerrcakirogluu@hotmail.com";

const contactSchema = z.object({
  name: z.string().trim().min(2, "En az 2 karakter olmalı").max(80, "Çok uzun"),
  email: z.string().trim().min(1, "Gerekli").email("Geçerli bir e-posta adresi girin"),
  message: z.string().trim().min(10, "En az 10 karakter olmalı").max(2000, "Çok uzun"),
});

// Only types (erased at compile time, so they aren't subject to the "a
// 'use server' file may only export async functions" rule below) and the
// action itself belong in this file — a plain object export like an
// "initial state" constant would break the server-reference transform this
// directive applies to every other export in the module.
export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
}

const SUCCESS_MESSAGE = "Mesajın için teşekkürler, en kısa sürede dönüş yapacağım.";
const GENERIC_ERROR_MESSAGE = "Mesaj gönderilemedi, lütfen doğrudan e-posta ile ulaş.";

/**
 * Server Action backing the Contact section's form. Validates with zod,
 * silently "succeeds" on a filled honeypot field (bots that blindly fill
 * every input trip it; real visitors never see it), then sends the message
 * via Resend with the visitor's own address as `replyTo` so a reply from the
 * inbox goes straight back to them.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (formData.get("company")) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Lütfen aşağıdaki alanları kontrol et.",
      fieldErrors: {
        name: flat.name?.[0],
        email: flat.email?.[0],
        message: flat.message?.[0],
      },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("submitContactForm: RESEND_API_KEY is not set.");
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portfolyo İletişim Formu <onboarding@resend.dev>",
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Yeni mesaj: ${name}`,
    text: `${name} (${email}) şunu yazdı:\n\n${message}`,
  });

  if (error) {
    console.error("submitContactForm: Resend error", error);
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
