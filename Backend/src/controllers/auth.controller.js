import { loginWithCredentials,generateToken }  from '../services/auth.js';
import bcrypt from 'bcrypt'; // borrar
import { Buffer } from "buffer";

export function home(req, res) {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
}

export function failure(req, res) {
  res.send('Algo salió mal');
}

export function logout(req, res, next) {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => res.send('miau'));
  });
}

export const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const { token, user } = await loginWithCredentials(email, password);
      res.json({ 
        token, 
        user: {
          userId: user.userId.toString(),
          name: user.name,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          birthdate: user.birthdate,
          gender: user.gender,
          status: user.status,
          roles: [
            user.administrator ? "ADMIN" : null,
            user.organizer ? "ORGANIZER" : null
          ].filter(Boolean),
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};

export const googleCallback = async (req, res) => {
  try {
    const googleUser = req.user; // viene de handleGoogleProfile()

    if (!googleUser?.email) {
      throw new Error("El perfil de Google no devolvió un email válido.");
    }

    // Buscar usuario en la base para traer roles y demás
    const user = await prisma.user.findUnique({
      where: { email: googleUser.email },
      include: {
        organizer: true,
        administrator: true,
      },
    });

    if (!user) {
      throw new Error("El usuario no se encontró o no se creó correctamente.");
    }

    const token = generateToken({
      id: user.userId,
      email: user.email,
    });

    // Estructura de usuario seguro para frontend
    const userSafe = {
      userId: user.userId.toString(),
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      birthdate: user.birthdate,
      gender: user.gender,
      status: user.status,
      roles: [
        user.administrator ? "ADMIN" : null,
        user.organizer ? "ORGANIZER" : null,
      ].filter(Boolean),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const encodedUser = encodeURIComponent(JSON.stringify(userSafe));

    // Redirigir al frontend con token + datos
    const redirectUrl = `http://localhost:5173/auth/callback?token=${token}&user=${encodedUser}`;
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error(" Error en login con Google:", err);
    return res.status(500).json({ error: "Error en login con Google" });
  }
};
// src/controllers/auth.controller.js
export async function me(req, res) {
  // El middleware attachUserContext ya cargó el usuario completo en req.auth
  return res.json({ user: req.auth.user });
}

/*
export async function tempRegister(req, res) {
  try {
    console.log("Body recibido:", req.body);
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario + contraseña asociada
    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        status: "A",
        password: {
          create: {
            hashedPassword,
          },
        },
      },
      include: { password: true },
    });

    console.log("Usuario creado:", user);
    res.status(201).json({
    message: "Usuario temporal creado",
    user: {
      ...user,
      userId: user.userId.toString(),
      password: {
        ...user.password,
        userId: user.password.userId.toString()
      }
    }
});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar usuario temporal" });
  }
}
  */