// services/auth/AuthContext.jsx
import {
  createContext,
  useContext,
  useMemo,
  useLayoutEffect,
  useState,
} from "react";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  // Lee sesión de forma sincrónica para evitar FOUC
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem("session");
    return raw ? JSON.parse(raw) : { token: null, user: null };
  });
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    // Si validas con backend, hazlo aquí; si no, basta marcar ready.
    setReady(true);
  }, []);

  const login = ({ token, user }) => {
    const s = { token, user };
    localStorage.setItem("session", JSON.stringify(s));
    setSession(s);
  };

  const logout = () => {
    localStorage.removeItem("session");
    setSession({ token: null, user: null });
  };

  const value = useMemo(
    () => ({
      user: session.user,
      token: session.token,
      isAuthenticated: !!session.token,
      ready,
      login,
      logout,
    }),
    [session, ready]
  );

  // Importante: no renders de la app hasta que esté listo
  if (!ready) return null; // o un Splash minimal

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
