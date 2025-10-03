import { pool } from "../db.js";
import bcrypt from 'bcrypt';

export async function registrarUsuarioDedault(req, res) {

  const { name, email, password, userType } = req.body;
    const tiposValidos = ['administrador', 'organizador', 'usuario'];
    
    if (!tiposValidos.includes(userType)) {
      return res.status(400).json({ error: 'Tipo de usuario inválido' });
    }
  
    try {
      // validar
      if (!name || !email || !password || !userType) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }
  
      // encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // insertar en DB
      const result = await pool.query(
        "INSERT INTO users (name, email, password, userType) VALUES ($1, $2, $3, $4) RETURNING id, name, email, userType",
        [name, email, hashedPassword, userType]
      );
  
      res.status(201).json({
        message: "Usuario creado con éxito",
        user: result.rows[0],
      });
    } catch (err) {
      if (err.code === "23505") {
        // error por email duplicado
        return res.status(400).json({ error: "El correo ya está registrado" });
      }
      console.error(err);
      res.status(500).json({ error: "Error en el servidor" });
    }
}


export async function mostrarUsuariosDedault(req, res) {
    try {
    const result = await pool.query(
      'SELECT id, name, email, userType, created_at FROM users ORDER BY id ASC'
    );
    res.json({ usuarios: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }

}