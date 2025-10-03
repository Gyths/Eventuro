CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  userType VARCHAR(20) NOT NULL CHECK (userType IN ('administrador', 'organizador', 'usuario')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
