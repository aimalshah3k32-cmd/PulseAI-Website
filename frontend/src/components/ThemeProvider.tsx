"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "midnight" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  const applyThemeToDOM = (t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    document.body.setAttribute("data-theme", t);
    if (t === "light") {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    }
  };

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("pulse_theme") as Theme | null;
    const initialTheme: Theme = saved && ["dark", "midnight", "light"].includes(saved) ? saved : "dark";
    setThemeState(initialTheme);
    applyThemeToDOM(initialTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("pulse_theme", newTheme);
    applyThemeToDOM(newTheme);
  };

  const toggleTheme = () => {
    if (theme === "dark") setTheme("midnight");
    else if (theme === "midnight") setTheme("light");
    else setTheme("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
