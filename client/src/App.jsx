import { useEffect, useState } from "react";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white transition-colors">
      <header className="p-4 flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
          InfoFynd
        </h1>
        <DarkModeToggle />
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
          InfoFynd
        </h1>{" "}
        <p className="dark:text-gray-300 text-black">
          Svar från servern: {message || "Laddar..."}
        </p>
      </main>
    </div>
  );
}
