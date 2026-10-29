"use server";

import { redirect } from "next/navigation";
import { authenticate } from "@/app/lib/users";
import { createSession, destroySession } from "@/app/lib/session";
import {getSafeNextPath} from '@/app/lib/redirects';

export async function signIn(_previousState, formData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
    
  const target = getSafeNextPath(formData.get("next"));

  const user = authenticate(phone, password);
  if (!user) {
    return { error: "Wrong phone number or password." };
  }

  await createSession(user.id);
  redirect(target);
}

export async function signOut() {
  await destroySession();
  redirect("/menu");
}
