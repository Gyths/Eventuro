// src/services/auth.js
import { upsertUserWithGoogle, findByEmail } from "../repositories/user.repo.js";
import { findByIdFull } from "../repositories/user.repo.js"; // <-- agrega esta función en tu repo (ver nota abajo)
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** Utilidad: separa nombre y apellido de Google */
function splitName(profile) {
  const g = profile.name?.givenName ?? "";
  const f = profile.name?.familyName ?? "";
  if (g || f)
    return { name: g || profile.displayName || "", lastName: f || "" };
  const parts = (profile.displayName ?? "").trim().split(/\s+/);
  return {
    name: parts.slice(0, -1).join(" ") || profile.displayName || "",
    lastName: parts.at(-1) || "",
  };
}

/** Construye objeto user que usará el front */
export function buildUserResponse(u) {
  // Roles
  const roles = ["USER"];
  if (u?.organizer) roles.push("ORGANIZER");
  if (u?.administrator) roles.push("ADMIN");

  const organizerStatus = u?.organizer?.status ?? null;

  // Nombre para mostrar: respeta fullName si existe;
  // si no, intenta firstName+lastName; si no, name; si no, usuario del email.
  const displayName =
    u?.fullName ??
    (
      [u?.name, u?.lastName].filter(Boolean).join(" ") ||
      u?.name ||
      (u?.email ? String(u.email).split("@")[0] : "Usuario")
    );

  return {
    // Identificación
    userId: u?.userId != null ? String(u.userId) : null,

    // Nombre
    name: u?.name ?? null,
    firstName: u?.firstName ?? null,
    lastName: u?.lastName ?? null,

    // Contacto
    email: u?.email ?? null,
    phone: u?.phone ?? u?.phoneNumber ?? null,

    // Documento (si lo usas)
    document: u?.document ?? u?.documentNumber ?? null,

    // Fechas
    createdAt: u?.createdAt ? new Date(u.createdAt).toISOString() : null,
    lastLoginAt: u?.lastLoginAt ? new Date(u.lastLoginAt).toISOString() : null,

    // Roles/estado
    roles,
    organizerStatus,

    // Info mínima de organizador
    organizer: u?.organizer
      ? {
          organizerId:
            u.organizer?.organizerId != null
              ? String(u.organizer.organizerId)
              : null,
        }
      : null,
  };
}



/** Devuelve { roles, organizerStatus, user } desde BD */
export async function getUserRolesAndOrganizerStatus(userId) {
  const full = await findByIdFull(userId);
  if (!full) throw new Error("Usuario no encontrado");
  const user = buildUserResponse(full);
  return { roles: user.roles, organizerStatus: user.organizerStatus, user };
}

/** GOOGLE OAUTH: crea/actualiza usuario y devuelve token + user enriquecido */
export async function handleGoogleProfile(profile) {
  const email = profile.emails?.[0]?.value;
  if (!email) throw new Error("La cuenta de Google no expuso un email.");

  const { name, lastName } = splitName(profile);
  const googleId = profile.id;
  const saved = await upsertUserWithGoogle({ email, googleId, name, lastName });

  // Trae relaciones completas para roles/estado
  const full = await findByIdFull(saved.userId);
  const user = buildUserResponse(full);

  // Emite JWT
  const token = generateToken({ id: saved.userId, email: saved.email });

  return {
  userId: String(saved.userId), 
  name: user.name,
  lastName: user.lastName,
  email: user.email,
  };
}

/** LOGIN credenciales: igual, pero devolviendo user enriquecido */
export async function loginWithCredentials(email, password) {
  const user = await findByEmail(email);
  if (!user) throw new Error("Usuario no encontrado");

  if (!user.password) {
    throw new Error("Este usuario no tiene login por contraseña (probablemente es OAuth)");
  }

  const isMatch = await bcrypt.compare(password, user.password.hashedPassword);
  if (!isMatch) throw new Error("Credenciales inválidas :)");

  const token = generateToken({ id: user.userId, email: user.email });

  // Trae relaciones completas para roles/estado
  const full = await findByIdFull(user.userId);
  const userResp = buildUserResponse(full);

  return { token, user: userResp };
}

/** Genera JWT (deja tu misma SECRET y expiración) */
export function generateToken({ id, email }) {
  return jwt.sign({ id: String(id), email }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "eventuro-api",
  });
}

