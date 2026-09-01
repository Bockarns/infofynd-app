import { Route, Routes } from "react-router";
import Navbar from "./components/SiteComponents/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Archive from "./pages/Archive/Archive";
import RegisterNewMember from "./pages/Register/RegisterMember";

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col transition-colors">
      <Navbar />
      <main className="max-w-6xl w-full mx-auto p-4 grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/omoss" element={<About />} />
          <Route path="/arkiv" element={<Archive />} />
          <Route path="/nymedlem" element={<RegisterNewMember />} />
        </Routes>
      </main>
      <footer className="border-t border-slate-300 dark:border-slate-800 bg-blue-50 dark:bg-slate-800 py-6 mt-12 text-center text-xs opacity-75">
        <p className="font-semibold">InfoFynd - Drivs av Bock AB</p>
        <p className="mt-1">
          &copy; {new Date().getFullYear()} Alla rättigheter förbehållna.
        </p>
      </footer>
    </div>
  );
}
