import { useState, useEffect } from "react";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    superAdmin: false,
  });

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Kunde inte hämta administratörer.");
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Kunde inte skapa administratör.");

      setSuccessMessage("Administratören har skapats!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        superAdmin: false,
      });

      fetchAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return <p className="text-slate-400">Laddar administratörer...</p>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">
          Hantera Administratörer
        </h1>
        <p className="text-sm text-slate-400">
          Här kan du lägga till nya administratörer och se befintliga konton.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-sm">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-300 rounded-xl text-sm">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleCreateAdmin}
        className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4"
      >
        <h2 className="text-lg font-semibold text-slate-200">
          Skapa ny administratör
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Förnamn
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Efternamn
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              E-postadress
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Lösenord
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            name="superAdmin"
            id="superAdmin"
            checked={formData.superAdmin}
            onChange={handleChange}
            className="w-4 h-4 rounded border-slate-800 text-emerald-600 focus:ring-emerald-500 bg-slate-950"
          />
          <label
            htmlFor="superAdmin"
            className="text-sm font-medium text-slate-300"
          >
            Gör till Super Admin (fullständiga behörigheter)
          </label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
        >
          Skapa administratör
        </button>
      </form>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-slate-200">
            Befintliga administratörer
          </h2>
        </div>
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">Namn</th>
              <th className="p-4">E-post</th>
              <th className="p-4">Roll</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {admins.map((adm) => (
              <tr key={adm.id} className="hover:bg-slate-800/30">
                <td className="p-4 font-medium text-slate-200">
                  {adm.firstName} {adm.lastName}
                </td>
                <td className="p-4 text-slate-400">{adm.email}</td>
                <td className="p-4">
                  {adm.superAdmin === 1 ? (
                    <span className="px-2 py-1 bg-purple-950/60 border border-purple-800 text-purple-300 rounded-lg text-xs font-semibold">
                      Super Admin
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs">
                      Admin
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {adm.suspendedAccount === 1 ? (
                    <span className="text-red-400 text-xs font-medium">
                      Avstängd
                    </span>
                  ) : (
                    <span className="text-emerald-400 text-xs font-medium">
                      Aktiv
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
