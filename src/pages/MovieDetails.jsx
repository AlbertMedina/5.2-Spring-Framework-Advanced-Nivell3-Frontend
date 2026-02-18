import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getMovie, getMovieRating, removeMovie } from "../services/api";
import AuthContext from "../services/auth.context";

import ConfirmDialog from "../components/shared/ConfirmDialog";
import UpdateMovieModal from "../components/admin/UpdateMovieModal";
import StarRating from "../components/movies/StarRating";

import defaultPoster from "../assets/background-movie.webp";

export default function MovieDetails() {
  const { movieId } = useParams();
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMovie(token, movieId);
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

  // Nou useEffect per obtenir el rating
  useEffect(() => {
    if (!token || !movieId) return;
    let cancelled = false;

    const fetchRating = async () => {
      try {
        const data = await getMovieRating(token, movieId);
        if (!cancelled) setRating(data);
      } catch (err) {
        console.error("Error fetching rating:", err);
      }
    };

    fetchRating();
    return () => {
      cancelled = true;
    };
  }, [token, movieId]);

  const isAdmin = role === "ADMIN";

  const handleEdit = () => setUpdateModalOpen(true);
  const handleDeleteClick = () => setConfirmOpen(true);
  const handleCancelDelete = () => setConfirmOpen(false);

  const handleConfirmDelete = async () => {
    setConfirmOpen(false);
    try {
      await removeMovie(token, movieId);
      navigate("/movies");
    } catch (err) {
      alert(err.message || "Error deleting movie");
    }
  };

  const handleMovieUpdated = (updatedMovie) => {
    setMovie(updatedMovie);
    setUpdateModalOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 12 }}>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          maxWidth: 1200,
          width: "100%",
          position: "relative",
        }}
      >
        {isAdmin && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton color="inherit" onClick={handleEdit} size="large">
              <EditIcon fontSize="large" />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleDeleteClick}
              size="large"
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Box>
        )}

        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={4} sm={3} md={3}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "2 / 3",
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 300,
              }}
            >
              <Box
                component="img"
                src={movie.posterUrl || defaultPoster}
                alt={movie.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </Box>
          </Grid>

          <Grid sx={{ flex: 1, minWidth: 300 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h4" gutterBottom>
                {movie.title}
              </Typography>

              <Typography>
                <strong>Genre:</strong> {movie.genre}
              </Typography>
              <Typography>
                <strong>Year:</strong> {movie.year}
              </Typography>
              <Typography>
                <strong>Duration:</strong> {movie.duration} min
              </Typography>
              <Typography>
                <strong>Director:</strong> {movie.director}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>Synopsis:</strong>
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                "{movie.synopsis}"
              </Typography>

              {rating && (
                <Box sx={{ mt: 2 }}>
                  <Box>
                    <strong>Rating:</strong>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <StarRating rating={rating.average} />
                    <Box>({rating.count} reviews)</Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        <ConfirmDialog
          open={confirmOpen}
          text="Are you sure you want to delete this movie?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />

        <UpdateMovieModal
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          token={token}
          movie={movie}
          onMovieUpdated={handleMovieUpdated}
        />
      </Box>
    </Box>
  );
}
