import DarkModeToggle from "./components/DarkModeToggle";
import { NavLink, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

export default function App() {
  return (
    <div className="min-h-dvh transition-colors">
      <header className="border-b-2 bg-blue-100 dark:bg-slate-900">
        <nav className="p-4 flex justify-between items-center mx-auto">
          <NavLink to="/">
            <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              InfoFynd
            </h1>
            <p>Drivs av Bock AB</p>
          </NavLink>
          <div>
            <NavLink
              to="/About"
              className="mx-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              About
            </NavLink>
            <DarkModeToggle />
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/About" element={<About />}></Route>
          <Route></Route>
        </Routes>
      </main>
    </div>
  );
}
