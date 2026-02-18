import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
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
        const data = await getMovie(movieId, token);
        if (!cancelled) setMovie(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Error fetching movie");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMovie();

    return () => {
      cancelled = true;
    };
  }, [token, movieId]);

  const isAdmin = role === "ADMIN";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await removeMovie(token, movieId);
      navigate("/movies");
    } catch (err) {
      alert(err.message || "Error deleting movie");
    }
  };

  const handleEdit = () => {
    navigate(`/admin/movies/edit/${movieId}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return null;

  return (
    <Paper sx={{ maxWidth: 900, mx: "auto", mt: 10, p: 3 }}>
      <Grid container spacing={3} alignItems="flex-start">
        {/* Poster */}
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={movie.posterUrl}
            alt={movie.title}
            sx={{
              width: "100%",
              maxHeight: 400, // limita l'altura
              objectFit: "cover", // manté el ratio
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>

        {/* Informació */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {movie.genre} | {movie.year} | {movie.duration} min
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Director: {movie.director}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {movie.description}
          </Typography>

          {isAdmin && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" color="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
