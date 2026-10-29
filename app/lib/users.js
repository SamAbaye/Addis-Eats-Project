import accounts from "./accounts.json";

const users = (globalThis.__addisUsers ??= accounts.map((u) => ({ ...u })));

export function normalizePhone(input) {
  const digits = String(input ?? "").replace(/[\s\-()]/g, "");
  const match = digits.match(/^(?:\+?251|0)(9\d{8})$/);
  return match ? `0${match[1]}` : null;
}

export function findUserById(id) {
  return users.find((u) => u.id === id) ?? null;
}

export function findUserByPhone(phone) {
  return users.find((u) => u.phone === phone) ?? null;
}


export function authenticate(phone, password) {
  const normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone) return null;

  const user = findUserByPhone(normalizedPhone);
  if (!user || user.password !== password) return null;
  return user;
}

export function createUser({ name, phone, password }) {
  if (findUserByPhone(phone)) return null;
  const user = {
    id: `usr_${users.length + 1}`,
    name,
    phone,
    role: "customer",
    password: password,
  };
  users.push(user);
  return user;
}
