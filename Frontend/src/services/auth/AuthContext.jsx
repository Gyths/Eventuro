// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // hidratar desde localStorage
  useEffect(() => {
    const rawUser = localStorage.getItem("auth:user");
    const rawToken = localStorage.getItem("auth:token");
    if (rawUser && rawToken) {
      setUser(JSON.parse(rawUser));
      setToken(rawToken);
    }
  }, []);

  function login({ token, user }) {
    setUser(user);
    setToken(token);
    localStorage.setItem("auth:user", JSON.stringify(user));
    localStorage.setItem("auth:token", token);
  }

  function register({ token, user }) {
    setUser(user);
    setToken(token);
    localStorage.setItem("auth:user", JSON.stringify(user));
    localStorage.setItem("auth:token", token);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth:user");
    localStorage.removeItem("auth:token");
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
