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
    const googleUser = req.user;

    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: googleUser.given_name,
          lastName: googleUser.family_name,
          email: googleUser.email,
          status: "A",
        },
      });
    }

    const token = generateToken(user);

    const userSafe = {
      userId: user.userId.toString(),
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      birthdate: user.birthdate,
      gender: user.gender,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    const encodedUser = encodeURIComponent(JSON.stringify(userSafe));

    const redirectUrl = `http://localhost:5173/auth/callback?token=${token}&user=${encodedUser}`;
    res.redirect(redirectUrl);
  } catch (err) {
    res.status(400).json({ error: 'Error en login con Google' });
  }
};
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