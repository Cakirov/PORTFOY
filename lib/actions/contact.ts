"use server";

import { Resend } from "resend";
import { z } from "zod";

const CONTACT_EMAIL = "omerrcakirogluu@gmail.com";

const contactSchema = z.object({
  name: z.string().trim().min(2, "En az 2 karakter olmalı").max(80, "Çok uzun"),
  email: z.string().trim().min(1, "Gerekli").email("Geçerli bir e-posta adresi girin"),
  message: z.string().trim().min(10, "En az 10 karakter olmalı").max(2000, "Çok uzun"),
});

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
}

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

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
