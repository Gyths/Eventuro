// src/middlewares/ensureAuth.js
import jwt from "jsonwebtoken";
import { getUserRolesAndOrganizerStatus } from "../services/auth.js";

/** Passport session-based (para rutas donde uses req.isAuthenticated) */
export function ensureAuth(req, res, next) {
  if (req.isAuthenticated?.()) return next();
  return res.sendStatus(401);
}

/**  JWT-based (API). Lee Authorization: Bearer <token> o cookie 'at' */
export function verifyToken(req, res, next) {
  const raw = req.headers["authorization"] || req.get("Authorization");
  const tokenFromHeader =
    raw && /^Bearer\s+/i.test(raw) ? raw.replace(/^Bearer\s+/i, "").trim() : null;
  const token = tokenFromHeader || req.cookies?.at || null;

  if (!token) return res.status(401).json({ message: "Falta token." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id ?? decoded.userId ?? decoded.sub;
    if (!id) return res.status(401).json({ message: "Token sin id (id/userId/sub)." });

    req.user = { id: String(id), email: decoded.email ?? null, ...decoded };
    return next();
  } catch (err) {
    const msg =
      err.name === "TokenExpiredError" ? "Token expirado." :
      err.name === "JsonWebTokenError" ? "Token inválido." :
      "No autorizado.";
    return res.status(401).json({ message: msg });
  }
}

/** Carga roles y estado de organizer desde BD en req.auth */
export async function attachUserContext(req, res, next) {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "No autenticado." });
    const ctx = await getUserRolesAndOrganizerStatus(req.user.id);
    req.auth = ctx;
    next();
  } catch (e) {
    return res.status(500).json({ message: "No se pudo obtener el contexto de usuario" });
  }
}

/** Exige tener al menos uno de los roles permitidos */
export function requireAnyRole(...allowed) {
  return (req, res, next) => {
    const roles = req.auth?.roles || [];
    const ok = roles.some((r) => allowed.includes(r));
    if (!ok) return res.status(403).json({ error: "Prohibido" });
    next();
  };
}

/** Requiere ORGANIZER aprobado (o ADMIN que bypass) */
export function requireOrganizerApproved(req, res, next) {
  const roles = req.auth?.roles || [];
  const status = req.auth?.organizerStatus || null;
  if (roles.includes("ADMIN")) return next();
  if (roles.includes("ORGANIZER") && status === "APPROVED") return next();
  return res.status(403).json({ error: "Organizador no aprobado" });
}
