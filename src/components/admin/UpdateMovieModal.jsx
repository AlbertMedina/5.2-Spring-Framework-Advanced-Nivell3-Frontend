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
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        slotProps={{
          backdrop: {
            sx: {
              bgcolor: "rgba(0, 0, 0, 0.6)",
            },
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 4,
            pb: 2,
            pr: 4,
            pl: 4,
          }}
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

        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            pt: 2,
            pb: 4,
            pr: 4,
            pl: 4,
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: "#3e0b00",
              borderColor: "#3e0b00",
              bgcolor: "#f5f5f5",
              "&:hover": {
                bgcolor: "#f5f5f5",
                borderColor: "#3e0b00",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: "#3e0b00",
              color: "#f5f5f5",
              "&:hover": {
                bgcolor: "#2e0800",
              },
            }}
          >
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
