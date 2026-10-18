"use server";

import { redirect } from "next/navigation";
import { authenticate } from "@/app/lib/users";
import { createSession, destroySession, safeNext } from "@/app/lib/session";


export async function signIn(_previousState, formData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  const user = authenticate(phone, password);
  if (!user) {

    return { error: "Wrong phone number or password." };
  }

  await createSession(user.id);
  redirect(safeNext(next)); 
}


export async function signOut() {
  await destroySession();
  redirect("/menu");
}
