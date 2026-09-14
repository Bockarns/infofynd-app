import { useState } from "react";

export default function AdminPostForm({
  initialData = {},
  onSubmit,
  buttonText = "Spara",
}) {
  const [type, setType] = useState(initialData.type || "news");
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [censoredDescription, setCensoredDescription] = useState(
    initialData.censoredDescription || "",
  );
  const [discountCode, setDiscountCode] = useState(
    initialData.discountCode || "",
  );
  const [discountAmount, setDiscountAmount] = useState(
    initialData.discountAmount || "",
  );
  const [discountType, setDiscountType] = useState(
    initialData.discountType || "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type,
      title,
      description,
      censoredDescription,
      discountCode: type === "offer" ? discountCode || null : null,
      discountAmount:
        type === "offer" && discountAmount ? Number(discountAmount) : null,
      discountType: type === "offer" ? discountType || null : null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Typ</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="news">Nyhet</option>
          <option value="offer">Erbjudande</option>
        </select>
      </div>

      <div>
        <label>Titel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ange rubrik..."
          required
        />
      </div>

      <div>
        <label>Beskrivning (Visas för medlemmar)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          placeholder="Synlig text för medlemmar..."
          required
        />
      </div>

      <div>
        <label>Censurerad beskrivning (Publik)</label>
        <textarea
          value={censoredDescription}
          onChange={(e) => setCensoredDescription(e.target.value)}
          rows="3"
          placeholder="Ska visas på startsidan"
        />
      </div>

      {type === "offer" && (
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-800/80 rounded-xl">
          <div>
            <label>Rabattkod</label>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="T.ex. SOMMAR20"
            />
          </div>
          <div>
            <label>Rabattmängd</label>
            <input
              type="number"
              step="any"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              placeholder="T.ex. 20"
            />
          </div>
          <div>
            <label>Rabatt-typ</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="">Välj typ...</option>
              <option value="percent">Procent (%)</option>
              <option value="sek">SEK (Kronor)</option>
            </select>
          </div>
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
