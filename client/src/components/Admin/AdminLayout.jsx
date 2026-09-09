import { Outlet, NavLink } from "react-router";

export default function AdminLayout() {
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
          </nav>
        </div>
        {/*TODO: Hämta admin info från DB när vi har JWT och bcrypt*/}
        <div className="mt-10 pt-4 border-t border-slate-800/80 flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
            AD
          </div>

          <div className="overflow-hidden">
            <p className="text-xs font-semibold truncate">Admin Gordon</p>
            <p className="text-[10px] text-slate-400 truncate">
              Admin@infofynd.se
            </p>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
