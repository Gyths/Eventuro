import { loginWithCredentials }  from '../services/auth.js';
import bcrypt from 'bcrypt'; // borrar

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
      const token = await loginWithCredentials(email, password);
      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};

export const googleLogin = async (req, res) => {
  try {
    const { id_token } = req.body;
    const token = await oginWithGoogle(id_token);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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

    res.status(201).json({ message: "Usuario temporal creado", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar usuario temporal" });
  }
}