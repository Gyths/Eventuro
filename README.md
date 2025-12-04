# Eventuro
[![License](https://img.shields.io/github/license/Gyths/Eventuro)](LICENSE) [![Last Commit](https://img.shields.io/github/last-commit/Gyths/Eventuro)](https://github.com/Gyths/Eventuro/commits/main) [![Issues](https://img.shields.io/github/issues/Gyths/Eventuro)](https://github.com/Gyths/Eventuro/issues) [![Stars](https://img.shields.io/github/stars/Gyths/Eventuro?style=social)](https://github.com/Gyths/Eventuro/stargazers) [![Repo Size](https://img.shields.io/github/repo-size/Gyths/Eventuro)](https://github.com/Gyths/Eventuro)
<!-- Tecnologías principales -->
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2EA3F2?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![npm](https://img.shields.io/badge/npm-~-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
Eventuro es una plataforma para la gestión de eventos (backend en Node.js + frontend con Vite/React). Este repositorio contiene el servidor, la aplicación cliente y scripts de inicialización de base de datos.
**Estado:** Código fuente presente. Ver carpetas `Backend/` y `Frontend/`.
**Contenido rápido**
- **Backend:** `Backend/` (API REST, Prisma, jobs, servicios)
- **Frontend:** `Frontend/` (app con Vite + React)
- **Scripts DB:** `script/` (archivos SQL de inicialización)
**Requisitos**
- Node.js >= 16
- npm o yarn
- PostgreSQL (u otra BD soportada por Prisma según `prisma/schema.prisma`)
**Instalación y ejecución (desarrollo)**
1. Instalar dependencias en la raíz y en ambos subproyectos:
```powershell
cd c:\Users\user\Documents\IngSoft\Eventuro
npm install
cd Backend; npm install; cd ..
cd Frontend; npm install; cd ..
```
2. Variables de entorno
- Copia o crea un archivo de entorno en `Backend/` según `Backend/config/env.js` y configura la conexión a la base de datos (p. ej. `DATABASE_URL`) y otras variables (sesión, correo, etc.).
3. Inicializar la base de datos (Prisma)
```powershell
cd Backend
npx prisma migrate dev --name init
node prisma/seed.js
cd ..
```
4. Ejecutar servidores
- Backend (desarrollo):
```powershell
cd Backend
npm run dev   # o el script equivalente en package.json
```
- Frontend (desarrollo):
```powershell
cd Frontend
npm run dev
```
**Comandos útiles**
- `npm run start` — iniciar aplicación según lo defina cada package.json.
- `npx prisma studio` — abrir Prisma Studio para inspeccionar la BD (ejecutar desde `Backend/`).
**Estructura principal**
- `Backend/` — servidor Express/Node
  - `src/controllers/` — controladores de rutas
  - `src/services/` — lógica de negocio
  - `src/repositories/` — acceso a datos (Prisma)
  - `prisma/` — esquema Prisma y seed
  - `jobs/` — tareas programadas (ej. `incrementCapacityJob.js`)
- `Frontend/` — cliente con Vite + React
- `script/` — SQL de inicialización
**Pruebas y logs**
- Revisar `Backend/log/` para logs del servidor.
**Contribuir**
- Abre un issue para discutir cambios grandes.
- Crea ramas con un prefijo claro: `feature/`, `fix/`, `chore/`.
- Agrega migraciones de Prisma y actualiza `prisma/seed.js` si cambias el modelo.
**Licencia**
- Revisa el archivo `LICENSE` en la raíz para los términos de licencia.
