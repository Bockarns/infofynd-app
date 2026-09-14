import { Outlet, NavLink, useNavigate } from "react-router";

export default function AdminLayout() {
  const navigate = useNavigate();

  const admin = (() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      try {
        return JSON.parse(storedAdmin);
      } catch (e) {
        console.error("Kunde inte läsa admin-info från localStorage", e);
      }
    }
    return {
      firstName: "Admin",
      lastName: "",
      email: "admin@infofynd.se",
      superAdmin: 0,
    };
  })();

  const isSuperAdmin = admin.superAdmin === 1;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const initials =
    `${admin.firstName?.[0] || ""}${admin.lastName?.[0] || ""}`.toUpperCase() ||
    "AD";

  return (
    <div className="flex rounded-xl border border-slate-300 dark:border-slate-800 bg-blue-50/80 dark:bg-slate-800/80 overflow-hidden">
      <aside className="w-64 border-r flex flex-col justify-between p-4">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2 font-bold text-lg ">
            <span className="text-emerald-400">iF</span>
            <span className=" text-sm font-semibold">Admin Panel</span>
          </div>

          <nav className="space-y-1">
            <NavLink
              to="/admin/medlem"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : " hover:text-slate-100 hover:bg-slate-800/60"
                }`
              }
            >
              <span>👥</span> Medlemmar
            </NavLink>

            <NavLink
              to="/admin/inlägg"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : " hover:text-slate-100 hover:bg-slate-800/60"
                }`
              }
            >
              <span>📰</span> Hantera Inlägg
            </NavLink>
            <NavLink
              to="/admin/inlägg/nytt"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : " hover:text-slate-100 hover:bg-slate-800/60"
                }`
              }
            >
              <span>✍️</span> Skapa Inlägg
            </NavLink>

            {isSuperAdmin && (
              <NavLink
                to="/admin/administratorer"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : " hover:text-slate-100 hover:bg-slate-800/60"
                  }`
                }
              >
                <span>🛡️</span> Admin-konton
              </NavLink>
            )}
          </nav>
        </div>
        <div className="mt-10 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 px-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs shrink-0">
              {initials}
            </div>

            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate">
                {admin.firstName} {admin.lastName}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {admin.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logga ut"
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/50 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
