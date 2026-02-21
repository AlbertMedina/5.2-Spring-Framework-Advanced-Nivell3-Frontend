import { Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "../pages/admin/AdminHome";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:movieId" element={<MovieDetails />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:userId" element={<UserDetails />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
