import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { http } from "@/lib/api";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [menu, setMenu] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [m, o, p] = await Promise.all([
        http.get("/menu"),
        http.get("/outlets"),
        http.get("/popular"),
      ]);
      setMenu(m.data);
      setOutlets(o.data);
      setPopular(p.data);
    } catch (e) {
      setError(e?.response?.data?.detail || e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <DataContext.Provider value={{ menu, outlets, popular, loading, error, refresh }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
