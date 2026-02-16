import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider } from "./services/auth.context";

import Nav from "./components/core/Nav";
import Footer from "./components/core/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminHome from "./pages/admin/AdminHome";
import UserHome from "./pages/userUserHome";

import AuthContext from "./services/auth.context";

function AppRoutes() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  if (user.role === "admin") {
    return (
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
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
