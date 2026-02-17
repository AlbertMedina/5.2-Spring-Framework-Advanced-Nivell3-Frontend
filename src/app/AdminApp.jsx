import { Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "../pages/admin/AdminHome";
import Movies from "../pages/admin/Movies";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:userId" element={<UserDetails />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}