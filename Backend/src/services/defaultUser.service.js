import { createDefaultUserRepo } from '../repositories/defaultUser.repo.js';
import bcrypt from 'bcrypt';

export async function createDefaultUserSvc(input) {

    const { name, lastName, password, phone, email, birthdate, gender } = input;

    try {
      // validar
      if (!name ||  !email  || !lastName ||!password) {
        throw new Error('Son requeridos el nombre, correo y contraseña');
      }
  
      // encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // insertar en DB

    
      return createDefaultUserRepo({ name, lastName, phone, email, birthdate, gender,hashedPassword});
      





    } catch (err) {
      if (err.code === "23505") {
        // error por email duplicado
        throw new Error('El correo ya está registrado');
      }
      console.error(err);
      throw new Error('Error en el servidor');
    }
}