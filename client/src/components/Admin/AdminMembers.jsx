import { useState, useEffect } from "react";

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/members");
        if (!res.ok) throw new Error("Kunde inte hämta medlemmar.");
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/members/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Kunde inte uppdatera status.");
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m)),
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return <p className="text-sm text-slate-400">Laddar medlemmar...</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">Medlemsansökningar</h2>
        <p className="text-sm">
          Hantera inkomna ansökningar och uppdatera status.
        </p>
      </div>

      <div className=" border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {members.length === 0 ? (
          <p className="p-6 text-sm ">Inga medlemmar hittades i databasen.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm  bg-blue-100 dark:bg-slate-950">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 font-semibold">Namn</th>
                  <th className="py-3 px-4 font-semibold">E-post</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Åtgärd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium ">
                      {member.firstName} {member.lastName}
                    </td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.status === "approved"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                            : member.status === "rejected"
                              ? "bg-red-950 text-red-400 border border-red-800/60"
                              : "bg-amber-950 text-amber-400 border border-amber-800/60"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {member.status !== "approved" && (
                        <button
                          onClick={() =>
                            handleStatusChange(member.id, "approved")
                          }
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        >
                          Godkänn
                        </button>
                      )}
                      {member.status !== "denied" && (
                        <button
                          onClick={() =>
                            handleStatusChange(member.id, "denied")
                          }
                          className="px-3 py-1 bg-slate-800 hover:bg-red-950 hover:text-red-400 hover:border-red-900 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        >
                          Neka
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
