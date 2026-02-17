import { Routes, Route, Navigate } from "react-router-dom";
import UserHome from "../pages/user/UserHome";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";

export default function UserApp() {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:movieId" element={<MovieDetails />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
