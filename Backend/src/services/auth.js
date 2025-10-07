import { upsertUserWithGoogle } from '../repositories/user.repo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findByEmail } from '../repositories/user.repo.js';

function splitName(profile) {
  const g = profile.name?.givenName ?? '';
  const f = profile.name?.familyName ?? '';
  if (g || f) return { name: g || profile.displayName || '', lastName: f || '' };
  const parts = (profile.displayName ?? '').trim().split(/\s+/);
  return { name: parts.slice(0,-1).join(' ') || profile.displayName || '', lastName: parts.at(-1) || '' };
}

export async function handleGoogleProfile(profile) {
  const email = profile.emails?.[0]?.value;
  if (!email) throw new Error('La cuenta de Google no expuso un email.');

  const { name, lastName } = splitName(profile);
  const googleId = profile.id;
  const saved = await upsertUserWithGoogle({ email, googleId, name, lastName });

  return {
    userId: String(saved.userId), 
    name: saved.name,
    lastName: saved.lastName,
    email: saved.email,
    photo: profile.photos?.[0]?.value,
  };
}

export async function loginWithCredentials(email, password) {
  const user = await findByEmail(email);
  if (!user) throw new Error("Usuario no encontrado");

  if (!user.password) {
    throw new Error("Este usuario no tiene login por contraseña (probablemente es OAuth)");
  }

  const isMatch = await bcrypt.compare(password, user.password.hashedPassword);
  console.log("Contra:", password)
  console.log("Contra:", isMatch)
  if (!isMatch) throw new Error("Credenciales inválidas :)");

  const token = generateToken(user);

  return {token, user};
}

export function generateToken(user) {
  const token = jwt.sign(
    { id: user.userId.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
}