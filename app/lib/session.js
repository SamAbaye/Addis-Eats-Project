import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { findUserById } from "./users";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSessionSecret() {
  return process.env.SESSION_SECRET;
}

function sign(value, secret) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export async function createSession(userOrId) {
  const user = typeof userOrId === "string" ? findUserById(userOrId) : userOrId;
  const secret = getSessionSecret();
  if (!user || !secret) {
    throw new Error("A user and SESSION_SECRET are required to create a session.");
  }

  const payload = Buffer.from(
    JSON.stringify({
      id: user.id,
      name: user.name,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
    }),
  ).toString("base64url");
  const token = `${payload}.${sign(payload, secret)}`;

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export function verify(token) {
  const secret = getSessionSecret();
  if (!token || !secret) return null;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return null;

  const expected = Buffer.from(sign(payload, secret));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return null;
  }

  try {
    const user = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      typeof user.id !== "string" ||
      typeof user.name !== "string" ||
      !["customer", "staff"].includes(user.role) ||
      !Number.isInteger(user.exp) ||
      user.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return { id: user.id, name: user.name, role: user.role };
  } catch {
    return null;
  }
}

export async function getSession() {
  const token = (await cookies()).get("session")?.value;
  return verify(token);
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete("session");
}
