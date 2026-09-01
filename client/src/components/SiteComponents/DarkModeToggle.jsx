import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    let favicon = document.getElementById("favicon");

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.id = "favicon";
      favicon.rel = "icon";
      favicon.type = "image/svg+xml";
      document.head.appendChild(favicon);
    }

    favicon.href = `${
      darkMode ? "/favicon/favicon-dark.svg" : "/favicon/favicon-light.svg"
    }?v=${darkMode ? "dark" : "light"}`;
  }, [darkMode]);
  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
      aria-label="Växla mörkt/ljust läge"
    >
      {darkMode ? "☀️ Ljust läge" : "🌙 Mörkt läge"}
    </button>
  );
}
