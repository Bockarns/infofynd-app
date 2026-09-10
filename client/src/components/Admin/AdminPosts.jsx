import { useState, useEffect } from "react";
import { Link } from "react-router";
import ConfirmModal from "../SiteComponents/ConfirmModal";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("active");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    confirmColor: "",
    onConfirm: null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint =
          tab === "archived"
            ? `/api/posts/archived?page=${page}&limit=${limit}`
            : `/api/posts?page=${page}&limit=${limit}`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Kunde inte hämta inlägg.");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [tab, page]);
  const handleTabChange = (newTab) => {
    setTab(newTab);
    setPage(1);
  };

  const openArchiveModal = (id) => {
    setModalConfig({
      isOpen: true,
      title: "Arkivera inlägg",
      message:
        "Är du säker på att du vill arkivera detta inlägg? Det kommer döljas från den publika listan.",
      confirmText: "Arkivera",
      confirmColor: "bg-amber-600 hover:bg-amber-500",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/posts/${id}/archive`, {
            method: "PATCH",
          });
          if (!res.ok) throw new Error("Kunde inte arkivera inlägget.");
          setPosts((prev) => prev.filter((p) => p.id !== id));
          closeModal();
        } catch (err) {
          alert(err.message);
          closeModal();
        }
      },
    });
  };

  const openUnarchiveModal = (id) => {
    setModalConfig({
      isOpen: true,
      title: "Återaktivera inlägg",
      message: "Vill du flytta tillbaka inlägget till de aktiva inläggen?",
      confirmText: "Återaktivera",
      confirmColor: "bg-emerald-600 hover:bg-emerald-500",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/posts/${id}/unarchive`, {
            method: "PATCH",
          });
          if (!res.ok) throw new Error("Kunde inte återaktivera inlägget.");
          setPosts((prev) => prev.filter((p) => p.id !== id));
          closeModal();
        } catch (err) {
          alert(err.message);
          closeModal();
        }
      },
    });
  };

  const openDeleteModal = (id) => {
    setModalConfig({
      isOpen: true,
      title: "Radera inlägg permanent",
      message: "Vill du radera inlägget permanent? Det går inte att ångra.",
      confirmText: "Radera",
      confirmColor: "bg-red-600 hover:bg-red-500",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Kunde inte radera inlägget.");
          setPosts((prev) => prev.filter((p) => p.id !== id));
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
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Hantera Inlägg
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Översikt över publicerade nyheter och erbjudanden.
          </p>
        </div>
        <div className="flex bg-slate-200 dark:bg-slate-950 p-1 rounded-xl border border-slate-300 dark:border-slate-800 self-start">
          <button
            onClick={() => handleTabChange("active")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              tab === "active"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Aktiva
          </button>
          <button
            onClick={() => handleTabChange("archived")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              tab === "archived"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Arkiverade
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-slate-500 dark:text-slate-400">
            Laddar inlägg...
          </p>
        ) : error ? (
          <p className="p-6 text-sm text-red-500 dark:text-red-400">{error}</p>
        ) : posts.length === 0 ? (
          <p className="p-6 text-sm text-slate-500 dark:text-slate-400">
            Inga inlägg hittades.
          </p>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm ">
                <thead>
                  <tr>
                    <th className="py-3 px-4 font-semibold">Titel</th>
                    <th className="py-3 px-4 font-semibold">Typ</th>
                    <th className="py-3 px-4 font-semibold">Författare</th>
                    <th className="py-3 px-4 font-semibold">Datum</th>
                    <th className="py-3 px-4 font-semibold text-right">
                      Åtgärd
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium max-w-xs truncate">
                        {post.title}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.type === "offer"
                              ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border border-purple-300 dark:border-purple-800/60"
                              : "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800/60"
                          }`}
                        >
                          {post.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                        {post.authorName || "Admin"}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {tab === "active" && (
                          <Link
                            to={`/admin/inlägg/redigera/${post.id}`}
                            className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors"
                          >
                            Redigera
                          </Link>
                        )}
                        {tab === "archived" && (
                          <button
                            onClick={() => openUnarchiveModal(post.id)}
                            className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/50 hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            Återaktivera
                          </button>
                        )}
                        {tab === "active" && (
                          <button
                            onClick={() => openArchiveModal(post.id)}
                            className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950 hover:text-amber-700 dark:hover:text-amber-400 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            Arkivera
                          </button>
                        )}

                        {tab === "archived" && (
                          <button
                            onClick={() => openDeleteModal(post.id)}
                            className="px-3 py-1 bg-red-100 dark:bg-red-950/50 hover:bg-red-200 dark:hover:bg-red-900 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            Radera
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 text-xs">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Föregående
              </button>
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Sida {page}
              </span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={posts.length < limit}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Nästa
              </button>
            </div>
          </div>
        )}
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
