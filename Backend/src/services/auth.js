import { upsertUserWithGoogle } from '../repositories/user.repo.js';

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

