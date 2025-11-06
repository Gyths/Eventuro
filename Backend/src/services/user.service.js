import { findByIdFull } from "../repositories/user.repo.js";
import { findUserById, updateUserById } from '../repositories/user.repo.js';
export async function findUserByIdFullSvc(userId) {
    return findByIdFull(userId);
}
export async function getProfile(userId) {
  const u = await findByIdFull(userId);
  if (!u) throw new Error('Usuario no encontrado');
  return u;
}

// Sólo permitimos actualizar campos explícitos
export async function updateProfile(userId, payload = {}) {
  const { name, lastName, phone, email } = payload;

  // Whitelist + sanitización mínima
  const data = {};
  if (name      != null) data.name      = String(name).trim();
  if (lastName  != null) data.lastName  = String(lastName).trim();
  if (phone     != null) data.phone     = String(phone).trim();
  if (email     != null) data.email     = String(email).trim().toLowerCase();

  // Si no hay cambios, devuelve el usuario tal cual (o podrías lanzar 400)
  if (Object.keys(data).length === 0) {
    return getProfile(userId);
  }

  // OJO: tu updateUserById debe manejar el userId como BigInt internamente
  const u = await updateUserById(userId, data);
  return u;
}