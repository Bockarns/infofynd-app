import { useState } from "react";
import { useNavigate } from "react-router";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ett fel uppstod vid inloggning.");
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("admin", JSON.stringify(data.admin));

      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
        <div>
          <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full mb-2">
            Adminportal
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Logga in på InfoFynd
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ange dina administratörsreferenser för att fortsätta.
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              E-postadress
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="admin@infofynd.se"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Lösenord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>
        <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-xs space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            Demokonto för visning:
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            E-post:{" "}
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              demo@infofynd.se
            </span>
            <br />
            Lösenord:{" "}
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              demo123
            </span>
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail("demo@infofynd.se");
              setPassword("demo123");
            }}
            className="mt-2 w-full py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Fyll i demo-uppgifter
          </button>
        </div>
      </div>
    </div>
  );
}
