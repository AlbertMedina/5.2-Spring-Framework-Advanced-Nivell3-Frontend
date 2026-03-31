import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import { updateMovieInfo } from "../../services/api";
import ErrorDialog from "../shared/ErrorDialog";

export default function UpdateMovieInfoModal({
  open,
  onClose,
  token,
  movie,
  onMovieInfoUpdated,
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
    if (open && movie) {
      setUpdatedMovie({
        title: movie.title || "",
        year: movie.year || "",
        genre: movie.genre || "",
        duration: movie.duration || "",
        director: movie.director || "",
        synopsis: movie.synopsis || "",
      });
    }
  }, [movie, open]);

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

      const updated = await updateMovieInfo(token, movie.id, payload);

      onMovieInfoUpdated(updated);
      onClose();
    } catch (err) {
      setErrorMessage(err.message || "Error updating movie");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const hasChanges =
    movie &&
    (updatedMovie.title !== (movie.title || "") ||
      updatedMovie.year.toString() !== (movie.year?.toString() || "") ||
      updatedMovie.genre !== (movie.genre || "") ||
      updatedMovie.duration.toString() !== (movie.duration?.toString() || "") ||
      updatedMovie.director !== (movie.director || "") ||
      updatedMovie.synopsis !== (movie.synopsis || ""));

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
            pt: 4,
            pb: 2,
            pr: 4,
            pl: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiInputBase-input": { fontSize: 16 },
            "& .MuiInputLabel-root": { fontSize: 16 },
          }}
        >
          <TextField
            label="Title"
            name="title"
            size="small"
            margin="dense"
            value={updatedMovie.title}
            onChange={handleChange}
          />
          <TextField
            label="Year"
            name="year"
            size="small"
            margin="dense"
            type="number"
            value={updatedMovie.year}
            onChange={handleChange}
          />
          <TextField
            label="Genre"
            name="genre"
            size="small"
            margin="dense"
            value={updatedMovie.genre}
            onChange={handleChange}
          />
          <TextField
            label="Duration (min)"
            name="duration"
            size="small"
            margin="dense"
            type="number"
            value={updatedMovie.duration}
            onChange={handleChange}
          />
          <TextField
            label="Director"
            name="director"
            size="small"
            margin="dense"
            value={updatedMovie.director}
            onChange={handleChange}
          />
          <TextField
            label="Synopsis"
            name="synopsis"
            size="small"
            margin="dense"
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
              fontSize: 12,
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
            disabled={loading || !hasChanges}
            sx={{
              fontSize: 12,
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
