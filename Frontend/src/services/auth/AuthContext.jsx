// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // hidratar desde localStorage
  useEffect(() => {
    const raw = localStorage.getItem("auth:user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function login({ email }) {
    const u = { email };
    setUser(u);
    localStorage.setItem("auth:user", JSON.stringify(u));
  }

  function register({ email }) {
    // aquí normalmente llamarías a tu API
    const u = { email };
    setUser(u);
    localStorage.setItem("auth:user", JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth:user");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
