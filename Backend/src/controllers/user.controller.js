import { findUserByIdFullSvc } from "../services/user.service.js";
import { toJSONSafe } from "../utils/serialize.js";
import { buildUserResponse } from '../services/auth.js';
import { getProfile, updateProfile } from '../services/user.service.js';
import bcrypt from "bcryptjs";

export function protectedHello(req, res) {
  res.send(`Hola ${req.user?.name ?? 'usuario'} (${req.user?.email})`);
}
function bigintReplacer(_key, value) {
  return typeof value === 'bigint' ? value.toString() : value;
}

/** Mapea/normaliza el usuario para la UI (opcional: usa el tuyo si ya lo tienes) */
function mapUserSafe(u) {
  if (!u) return null;
  // Convierte todo el objeto (incluidas relaciones) a JSON seguro
  const safe = JSON.parse(JSON.stringify(u, bigintReplacer));

  // Si quieres devolver sólo ciertos campos, hazlo aquí:
  return {
    userId: safe.userId,           // ya es string
    name: safe.name ?? null,
    lastName: safe.lastName ?? null,
    phone: safe.phone ?? null,
    email: safe.email ?? null,
    status: safe.status ?? null,
    createdAt: safe.createdAt ?? null,
    updatedAt: safe.updatedAt ?? null,
    organizerStatus: safe.organizer?.status ?? null,
    organizer: safe.organizer
      ? { organizerId: safe.organizer.organizerId }
      : null,
    administrator: !!safe.administrator,
  };
}

export async function findUserByIdFull(req, res) {
  try {
    if (!req.params?.id) return res.status(400).json({ error: 'id is required' });
    let id;
    try {
      id = toBigIntId(req.params.id);
    } catch {
      return res.status(400).json({ error: 'id must be a numeric BigInt' });
    }
    const u = await findByIdFull(id);
    if (!u) return res.status(404).json({ error: 'User not found' });
    return res.json(buildUserResponse(u));
  } catch (e) {
    return res.status(500).json({ error: e.message ?? 'Internal error' });
  }
}
export async function getMe(req, res) {
  try {
    const uid = req.user?.id ?? req.user?.userId; // viene del ensureAuth/jwt
    if (!uid) return res.status(404).json({ message: "INVALID_ID" });

    const u = await getProfile(uid);
    if (!u) return res.status(404).json({ message: "Usuario no encontrado" });

    return res.json(buildUserResponse(u));
  } catch (e) {
    return res.status(500).json({ message: e?.message || "Error interno" });
  }
}


export async function putMe(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'UNAUTHENTICATED' });

    const { name, lastName, phone, email } = req.body ?? {};

    // whitelist + validaciones mínimas
    const data = {};
    if (typeof name === 'string') data.name = name.trim();
    if (typeof lastName === 'string') data.lastName = lastName.trim();
    if (typeof phone === 'string') data.phone = phone.trim();
    if (typeof email === 'string') {
      const v = email.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        return res.status(400).json({ message: 'EMAIL_INVALID' });
      }
      data.email = v;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: 'EMPTY_UPDATE' });
    }

    const updated = await updateProfile(userId, data);
    return res.json(mapUserSafe(updated));
  } catch (e) {
    // Prisma P2002 => unique constraint
    if (e?.code === 'P2002' && e?.meta?.target?.includes('email')) {
      return res.status(409).json({ message: 'EMAIL_ALREADY_IN_USE' });
    }
    console.error(e);
    return res.status(500).json({ message: 'INTERNAL_ERROR' });
  }
}
const PASS_RULE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_\-+=]{8,}$/;

export async function changeMyPassword(req, res) {
  try {
    const userId = req.user?.id;
    const { newPassword } = req.body || {};

    if (!userId) return res.status(401).json({ message: "UNAUTHENTICATED" });
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        message: "WEAK_PASSWORD",
        hint: "Mínimo 8 caracteres, letras y números.",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    // Si usas una tabla `passwordUser`
    await prisma.passwordUser.upsert({
      where: { userId: BigInt(userId) },
      update: { hashedPassword: hashed },
      create: { userId: BigInt(userId), hashedPassword: hashed },
    });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
}