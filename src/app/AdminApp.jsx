import { Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "../pages/admin/AdminHome";
import Users from "../pages/admin/Users";

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
