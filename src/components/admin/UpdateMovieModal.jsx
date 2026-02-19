import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import { updateMovie } from "../../services/api";
import ErrorDialog from "../shared/ErrorDialog";

export default function UpdateMovieModal({
  open,
  onClose,
  token,
  movie,
  onMovieUpdated,
}) {
  const [updatedMovie, setUpdatedMovie] = useState({
    title: "",
    year: "",
    genre: "",
    duration: "",
    director: "",
    synopsis: "",
  });

  const [loading, setLoading] = useState(false);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (movie) {
      setUpdatedMovie({
        title: movie.title || "",
        year: movie.year || "",
        genre: movie.genre || "",
        duration: movie.duration || "",
        director: movie.director || "",
        synopsis: movie.synopsis || "",
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        title: updatedMovie.title,
        year: parseInt(updatedMovie.year, 10),
        genre: updatedMovie.genre,
        duration: parseInt(updatedMovie.duration, 10),
        director: updatedMovie.director,
        synopsis: updatedMovie.synopsis,
      };

      const updated = await updateMovie(token, movie.id, payload);

      onMovieUpdated(updated);
      onClose();
    } catch (err) {
      setErrorMessage(err.message || "Error updating movie");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Update Movie</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            name="title"
            value={updatedMovie.title}
            onChange={handleChange}
          />
          <TextField
            label="Year"
            name="year"
            type="number"
            value={updatedMovie.year}
            onChange={handleChange}
          />
          <TextField
            label="Genre"
            name="genre"
            value={updatedMovie.genre}
            onChange={handleChange}
          />
          <TextField
            label="Duration (min)"
            name="duration"
            type="number"
            value={updatedMovie.duration}
            onChange={handleChange}
          />
          <TextField
            label="Director"
            name="director"
            value={updatedMovie.director}
            onChange={handleChange}
          />
          <TextField
            label="Synopsis"
            name="synopsis"
            value={updatedMovie.synopsis}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        message={errorMessage}
      />
    </>
  );
}
