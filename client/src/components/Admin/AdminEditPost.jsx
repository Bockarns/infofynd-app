import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import AdminPostForm from "./AdminPostForm";
import ConfirmModal from "../SiteComponents/ConfirmModal";

export default function AdminEditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    confirmColor: "",
    onConfirm: null,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/admin/${id}`);
        if (!res.ok) throw new Error("Kunde inte hämta inlägget.");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleFormSubmit = (formData) => {
    setModalConfig({
      isOpen: true,
      title: "Spara ändringar",
      message: "Är du säker på att du vill uppdatera detta inlägg?",
      confirmText: "Spara ändringar",
      confirmColor: "bg-emerald-600 hover:bg-emerald-500",
      onConfirm: () => executeUpdate(formData),
    });
  };

  const executeUpdate = async (formData) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Kunde inte uppdatera inlägget.");

      setMessage("Inlägget sparades framgångsrikt!");
      closeModal();

      setTimeout(() => {
        navigate("/admin/inlägg");
      }, 1200);
    } catch (err) {
      alert(err.message);
      closeModal();
    }
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  if (loading)
    return <p className="p-6 text-sm text-slate-500">Laddar inlägg...</p>;
  if (error) return <p className="p-6 text-sm text-red-500">{error}</p>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Redigera Inlägg
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Uppdatera informationen för det valda inlägget.
        </p>
      </div>

      {message && (
        <p className="text-sm text-emerald-500 mb-4 font-medium">{message}</p>
      )}

      <AdminPostForm
        key={post.id}
        initialData={post}
        onSubmit={handleFormSubmit}
        buttonText="Spara ändringar"
      />

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
