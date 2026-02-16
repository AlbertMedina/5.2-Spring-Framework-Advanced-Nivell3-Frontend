import { Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "../pages/admin/AdminHome";

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
