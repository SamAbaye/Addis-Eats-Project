
import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";
import { findUserById } from "./users";
import { connection } from "next/server";
export const SESSION_COOKIE = "session";
export const DEFAULT_DESTINATION = "/menu";
const MAX_AGE = 60 * 60 * 24 * 7; // seconds

const store = (globalThis.__addisSessions ??= new Map());


export async function createSession(userId) {
  const id = randomBytes(32).toString("hex"); 
  store.set(id, { userId, expiresAt: Date.now() + MAX_AGE * 1000 });

  (await cookies()).set(SESSION_COOKIE, id, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // not sent from other sites
    maxAge: MAX_AGE,
    path: "/",
  });
}

export const instant = false;
export async function getSession() {
  
  const id = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!id) return null;

  const session = store.get(id);
  if (!session) return null;

  await connection();
  if (session.expiresAt < Date.now()) {
    store.delete(id);
    return null;

  }

  const user = findUserById(session.userId);
  if (!user) return null;
  return { id: user.id, name: user.name, role: user.role };
}


export async function destroySession() {
  const jar = await cookies();
  const id = jar.get(SESSION_COOKIE)?.value;
  if (id) store.delete(id);
  jar.delete(SESSION_COOKIE);
}

export function safeNext(next) {
  if (typeof next !== "string") return DEFAULT_DESTINATION;
  if (!next.startsWith("/")) return DEFAULT_DESTINATION; 
  if (next.startsWith("//") || next.startsWith("/\\")) return DEFAULT_DESTINATION;
  return next;
}
