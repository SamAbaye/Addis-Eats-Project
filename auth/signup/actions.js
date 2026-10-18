"use server";

import { redirect } from "next/navigation";
import { createUser, normalizePhone } from "@/app/lib/users";
import { createSession, safeNext } from "@/app/lib/session";


export async function signUp(_previousState, formData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = normalizePhone(formData.get("phone"));
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const next = String(formData.get("next") ?? "");

  // Keep what they typed (never the password) so a typo does not wipe the form.
  const values = { name, phone: String(formData.get("phone") ?? "") };

  if (name.length < 2 || name.length > 60) {
    return { error: "Enter your name (2 to 60 characters).", values };
  }
  if (!phone) {
    return { error: "Enter a valid Ethiopian mobile number, like 0911 234 567.", values };
  }
  if (password.length < 8) {
    return { error: "Use a password of at least 8 characters.", values };
  }
  if (password !== confirm) {
    return { error: "The two passwords do not match.", values };
  }

  
  const user = createUser({ name, phone, password });
  if (!user) {
    return { error: "That phone number already has an account. Sign in instead.", values };
  }

  await createSession(user.id); 
  redirect(safeNext(next)); 
}
