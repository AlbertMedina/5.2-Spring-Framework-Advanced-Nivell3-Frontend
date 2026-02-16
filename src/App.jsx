import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";

import { AuthProvider } from "./services/auth.context";
import AuthContext from "./services/auth.context";

import Nav from "./components/core/Nav";
import Footer from "./components/core/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

const AdminApp = lazy(() => import("./admin/AdminApp"));
const UserApp = lazy(() => import("./user/UserApp"));

function AppRoutes() {
  const { role, loading } = useContext(AuthContext);

  if (loading) return <div>Carregant...</div>;

  if (!role) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Suspense fallback={<div>Carregant...</div>}>
      {role === "ADMIN" ? <AdminApp /> : <UserApp />}
    </Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
