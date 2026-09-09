import { useState } from "react";
import AdminPostForm from "./AdminPostForm";

export default function AdminCreatePost() {
  const [message, setMessage] = useState(null);

  const handleCreate = async (formData) => {
    try {
      // Exempel på anrop till backend:
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Kunde inte skapa inlägg.");

      setMessage("Inlägget skapades framgångsrikt!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">Skapa Nytt Inlägg</h2>
        <p className="text-sm text-slate-400">
          Publicera ett nytt tips eller inlägg på plattformen.
        </p>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <AdminPostForm onSubmit={handleCreate} buttonText="Publicera inlägg" />
    </div>
  );
}
