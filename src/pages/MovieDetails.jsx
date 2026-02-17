import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { getMovie, removeMovie } from "../services/api";
import AuthContext from "../services/auth.context";

export default function MovieDetails() {
  const { movieId } = useParams();
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMovie(movieId);
        if (!cancelled) setMovie(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMovie();
    return () => (cancelled = true);
  }, [token, movieId]);

  const isAdmin = role === "ADMIN";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await removeMovie(token, movieId);
      navigate("/movies");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/movies/edit/${movieId}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return null;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>{movie.title}</Typography>
      <Typography variant="body1">{movie.genre} | {movie.year} | {movie.duration} min</Typography>
      <Typography variant="body1">Director: {movie.director}</Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>{movie.description}</Typography>

      {isAdmin && (
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button variant="outlined" color="primary" onClick={handleEdit}>Edit</Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
        </Box>
      )}
    </Box>
  );
}
