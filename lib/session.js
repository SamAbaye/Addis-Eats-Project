import { cookies } from "next/headers";
import { findUserById } from "./users";


export async function createSession(userId) {
  const user = findUserById(userId);
  if (!user) return null;

  const cookieStore = await cookies();
  cookieStore.set("session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function verify(token) {
  if (!token) {
    return null;
  }
  
  const user = findUserById(token);
  if (!user) return null;

  return { id: user.id, name: user.name, role: user.role };
}

export async function getSession() {

  const userId = (await cookies()).get("session")?.value;
  const user = findUserById(userId);

  if (!user) return null;
  // ያዘውን ይሰጠዋል
  return user ? { id: user.id, name: user.name, role: user.role } : null;
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete("session");
}
