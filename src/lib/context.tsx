import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type PortfolioMode = "studio" | "terminal";

interface PortfolioContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  mode: PortfolioMode;
  setMode: (m: PortfolioMode) => void;
  toggleMode: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [mode, setModeState] = useState<PortfolioMode>(() => {
    if (typeof window === "undefined") return "studio";
    return (localStorage.getItem("portfolio-mode") as PortfolioMode) || "studio";
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);
  };

  const setMode = (m: PortfolioMode) => {
    setModeState(m);
    localStorage.setItem("portfolio-mode", m);
  };

  const toggleMode = () => {
    setMode(mode === "studio" ? "terminal" : "studio");
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "terminal-theme");
    root.classList.add(theme);
    if (mode === "terminal") {
      root.classList.add("terminal-theme");
    }
  }, [theme, mode]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("portfolio-theme")) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <PortfolioContext.Provider value={{ theme, setTheme, mode, setMode, toggleMode }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}
