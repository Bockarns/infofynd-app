import { useState } from "react";

export default function MembersForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    approveGDPR: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Något gick fel vid registreringen.");
      }

      setSuccess(data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        approveGDPR: false,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-2">Ansök om medlemskap</h2>
      <p className="text-sm opacity-80 mb-6">
        Fyll i dina uppgifter nedan för att registrera dig som medlem och ta del
        av exklusiva erbjudanden.
      </p>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
          {success}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="firstName">
          Förnamn
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Ditt förnamn"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="lastName">
          Efternamn
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Ditt efternamn"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          E-postadress
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="namn@exempel.se"
        />
      </div>

      <div className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          id="approveGDPR"
          name="approveGDPR"
          checked={formData.approveGDPR}
          onChange={handleChange}
          required
          className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label
          htmlFor="approveGDPR"
          className="text-xs opacity-80 leading-relaxed cursor-pointer"
        >
          Jag godkänner att InfoFynd lagrar mina uppgifter i enlighet med GDPR.
          Läs mer i vår{" "}
          <a
            href="/gdpr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 underline hover:opacity-100"
          >
            integritetspolicy
          </a>
          .
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 py-2.5 px-4 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Skickar ansökan..." : "Skicka medlemsansökan"}
      </button>
    </form>
  );
}
