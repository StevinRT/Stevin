import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { http } from "@/lib/api";

const AuthContext = createContext(null);
const TOKEN_KEY = "pjours_admin_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [checking, setChecking] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsAuthed(false);
  }, []);

  const login = useCallback(async (password) => {
    const res = await http.post("/admin/login", { password });
    const newToken = res.data.token;
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setIsAuthed(true);
    return newToken;
  }, []);

  // Verify token on mount / change
  useEffect(() => {
    let alive = true;
    (async () => {
      setChecking(true);
      if (!token) {
        if (alive) { setIsAuthed(false); setChecking(false); }
        return;
      }
      try {
        await http.get("/admin/me");
        if (alive) setIsAuthed(true);
      } catch {
        if (alive) {
          setIsAuthed(false);
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      } finally {
        if (alive) setChecking(false);
      }
    })();
    return () => { alive = false; };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAuthed, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
