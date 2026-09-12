import { Route, Routes, Navigate } from "react-router";
import Navbar from "./components/SiteComponents/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Archive from "./pages/Archive/Archive";
import RegisterNewMember from "./pages/Register/RegisterMember";
import GDPR from "./pages/GDPR/GDPR";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminMembers from "./pages/Admin/AdminMembers";
import AdminPosts from "./pages/Admin/AdminPosts";
import AdminCreatePost from "./pages/Admin/AdminCreatePost";
import AdminEditPost from "./pages/Admin/AdminEditPost";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminManagement from "./pages/Admin/AdminManagement";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

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
          <Route path="/gdpr" element={<GDPR />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="medlem" element={<AdminMembers />} />
            <Route path="inlägg" element={<AdminPosts />} />
            <Route path="inlägg/nytt" element={<AdminCreatePost />} />
            <Route path="inlägg/redigera/:id" element={<AdminEditPost />} />
            <Route path="administratorer" element={<AdminManagement />} />
          </Route>
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
