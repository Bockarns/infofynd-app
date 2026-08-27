import { useState } from "react";
import { NavLink } from "react-router";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-slate-300 dark:border-slate-800 bg-blue-50/80 dark:bg-slate-800/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex flex-col">
          <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            InfoFynd
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Drivs av Bock AB
          </p>
        </NavLink>

        <nav className="hidden md:flex items-center gap-4">
          <NavLink
            to="/"
            className="text-sm font-medium hover:text-emerald-600"
          >
            Hem
          </NavLink>
          <NavLink
            to="/omoss"
            className="text-sm font-medium hover:text-emerald-600"
          >
            Om oss
          </NavLink>
          <NavLink
            to="/arkiv"
            className="text-sm font-medium hover:text-emerald-600"
          >
            Arkiv
          </NavLink>
          <NavLink
            to="/nymedlem"
            className="text-sm font-medium hover:text-emerald-600"
          >
            Registrera
          </NavLink>
          <DarkModeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            aria-label="Öppna meny"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium py-2 hover:text-emerald-600"
          >
            Hem
          </NavLink>
          <NavLink
            to="/omoss"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium py-2 hover:text-emerald-600"
          >
            Om oss
          </NavLink>
          <NavLink
            to="/arkiv"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium py-2 hover:text-emerald-600"
          >
            Arkiv
          </NavLink>
          <NavLink
            to="/nymedlem"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium py-2 hover:text-emerald-600"
          >
            Registrera
          </NavLink>
        </div>
      )}
    </header>
  );
}
