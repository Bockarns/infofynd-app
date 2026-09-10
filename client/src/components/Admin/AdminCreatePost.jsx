import { useState } from "react";
import { useNavigate } from "react-router";
import AdminPostForm from "./AdminPostForm";
import EmailPreviewModal from "../SiteComponents/EmailPreviewModal"; // Justera sökvägen beroende på var du lägger den

export default function AdminCreatePost() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [emailData, setEmailData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Kunde inte skapa inlägg.");

      const data = await res.json();

      if (data.simulatedMail) {
        setEmailData(data.simulatedMail);
        setIsModalOpen(true);
      } else {
        setMessage("Inlägget skapades framgångsrikt!");
        setTimeout(() => navigate("/admin/inlägg"), 1200);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleConfirmEmail = () => {
    setIsModalOpen(false);
    setMessage("Inlägget skapades och e-postsimuleringen genomfördes!");
    setTimeout(() => {
      navigate("/admin/inlägg");
    }, 1200);
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

      <EmailPreviewModal
        isOpen={isModalOpen}
        mailData={emailData}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmEmail}
      />
    </div>
  );
}
