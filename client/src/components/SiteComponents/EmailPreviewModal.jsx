import PostCard from "../Posts/PostCard";

export default function EmailPreviewModal({
  isOpen,
  mailData,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !mailData) return null;

  const postForCard = {
    ...mailData,
    description: mailData.body,
    authorName: "Admin Gordon",
    createdAt: new Date().toISOString(),
    archived: 1,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-5 text-slate-900 dark:text-slate-100 my-8">
        <div>
          <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full mb-2">
            Simulerat e-postutskick
          </span>
          <h3 className="text-xl font-bold tracking-tight">
            Förhandsgranskning av utskick
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Det här e-postmeddelandet kommer att skickas till{" "}
            {mailData.recipientsCount} godkända medlemmar.
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 px-1 border-b border-slate-200 dark:border-slate-800 pb-2.5">
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Från:
              </span>{" "}
              InfoFynd &lt;noreply@infofynd.se&gt;
            </div>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-medium">
              Nytt inlägg
            </span>
          </div>
          <div className="pointer-events-none">
            <PostCard post={postForCard} />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            Bekräfta & Skicka
          </button>
        </div>
      </div>
    </div>
  );
}
