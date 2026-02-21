import { Routes, Route, Navigate } from "react-router-dom";
import UserHome from "../pages/user/UserHome";
import Me from "../pages/user/Me";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import Favourites from "../pages/user/Favourites";

export default function UserApp() {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/me" element={<Me />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:movieId" element={<MovieDetails />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
