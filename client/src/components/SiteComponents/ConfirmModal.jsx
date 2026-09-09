export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Bekräfta",
  confirmColor = "bg-red-600 hover:bg-red-500",
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <div>
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer shadow-sm ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
