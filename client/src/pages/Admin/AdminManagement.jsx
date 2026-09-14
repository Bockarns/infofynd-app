import { useState, useEffect } from "react";
import ConfirmModal from "../../components/SiteComponents/ConfirmModal";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    confirmColor: "",
    onConfirm: null,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    superAdmin: false,
  });

  const fetchAdmins = async () => {
    try {
      const token = sessionStorage.getItem("token");
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
      const token = sessionStorage.getItem("token");
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

  const openSuspendModal = (admin) => {
    const isSuspended = admin.suspendedAccount === 1;
    setModalConfig({
      isOpen: true,
      title: isSuspended ? "Aktivera konto" : "Stäng av konto",
      message: `Är du säker på att du vill ${isSuspended ? "aktivera" : "stänga av"} ${admin.firstName} ${admin.lastName}?`,
      confirmText: isSuspended ? "Aktivera" : "Stäng av",
      confirmColor: isSuspended
        ? "bg-emerald-600 hover:bg-emerald-500"
        : "bg-amber-600 hover:bg-amber-500",
      onConfirm: async () => {
        try {
          const token = sessionStorage.getItem("token");
          const res = await fetch(`/api/admins/${admin.id}/suspend`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (!res.ok)
            throw new Error(data.error || "Kunde inte ändra status.");

          fetchAdmins();
          closeModal();
        } catch (err) {
          alert(err.message);
          closeModal();
        }
      },
    });
  };

  const openDeleteModal = (admin) => {
    setModalConfig({
      isOpen: true,
      title: "Radera administratör",
      message: `Vill du radera ${admin.firstName} ${admin.lastName} permanent? Det går inte att ångra.`,
      confirmText: "Radera",
      confirmColor: "bg-red-600 hover:bg-red-500",
      onConfirm: async () => {
        try {
          const token = sessionStorage.getItem("token");
          const res = await fetch(`/api/admins/${admin.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (!res.ok)
            throw new Error(data.error || "Kunde inte radera administratör.");

          setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
          closeModal();
        } catch (err) {
          alert(err.message);
          closeModal();
        }
      },
    });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  if (loading)
    return <p className="text-slate-400">Laddar administratörer...</p>;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Hantera Administratörer
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Här kan du lägga till nya administratörer och se befintliga konton.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-3 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleCreateAdmin}>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
          Skapa ny administratör
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Förnamn</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Efternamn</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>E-postadress</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label>Lösenord</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
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
            className="w-4 h-4 rounded border-slate-300 dark:border-slate-800 text-emerald-600 focus:ring-emerald-500 bg-slate-50 dark:bg-slate-950 cursor-pointer"
          />
          <label
            htmlFor="superAdmin"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer mb-0"
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

      <div className="bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-300 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
            Befintliga administratörer
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-950/50 text-slate-600 dark:text-slate-400 text-xs uppercase border-b border-slate-300 dark:border-slate-800">
              <tr>
                <th className="p-4">Namn</th>
                <th className="p-4">E-post</th>
                <th className="p-4">Roll</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Åtgärd</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {admins.map((adm) => (
                <tr
                  key={adm.id}
                  className="hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
                >
                  <td className="p-4 font-medium text-slate-900 dark:text-slate-200">
                    {adm.firstName} {adm.lastName}{" "}
                    {adm.isDemo === 1 && (
                      <span className="text-xs text-amber-500 font-normal">
                        (Demo)
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {adm.email}
                  </td>
                  <td className="p-4">
                    {adm.superAdmin === 1 ? (
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-semibold">
                        Super Admin
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs">
                        Admin
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {adm.suspendedAccount === 1 ? (
                      <span className="text-red-600 dark:text-red-400 text-xs font-medium">
                        Avstängd
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                        Aktiv
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openSuspendModal(adm)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                        adm.suspendedAccount === 1
                          ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200"
                          : "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800 hover:bg-amber-200"
                      }`}
                    >
                      {adm.suspendedAccount === 1 ? "Aktivera" : "Stäng av"}
                    </button>
                    <button
                      onClick={() => openDeleteModal(adm)}
                      className="px-3 py-1 bg-red-100 dark:bg-red-950/50 hover:bg-red-200 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    >
                      Radera
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmColor={modalConfig.confirmColor}
        onConfirm={modalConfig.onConfirm}
        onClose={closeModal}
      />
    </div>
  );
}
