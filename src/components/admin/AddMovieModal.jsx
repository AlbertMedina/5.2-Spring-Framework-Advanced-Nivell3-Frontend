import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addMovie } from "../../services/api";
import ErrorDialog from "../shared/ErrorDialog";

export default function AddMovieModal({ open, onClose, token, onMovieAdded }) {
  const [newMovie, setNewMovie] = useState({
    title: "",
    year: "",
    genre: "",
    duration: "",
    director: "",
    synopsis: "",
    copies: "",
  });

  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPosterFile(file);
    setPosterPreview(URL.createObjectURL(file));
  };

  const handleRemovePoster = () => {
    setPosterFile(null);
    setPosterPreview(null);
  };

  useEffect(() => {
    return () => {
      if (posterPreview) URL.revokeObjectURL(posterPreview);
    };
  }, [posterPreview]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        title: newMovie.title,
        year: parseInt(newMovie.year, 10),
        genre: newMovie.genre,
        duration: parseInt(newMovie.duration, 10),
        director: newMovie.director,
        synopsis: newMovie.synopsis,
        numberOfCopies: parseInt(newMovie.copies, 10),
      };

      await addMovie(token, payload, posterFile);

      setNewMovie({
        title: "",
        year: "",
        genre: "",
        duration: "",
        director: "",
        synopsis: "",
        copies: "",
      });
      setPosterFile(null);
      setPosterPreview(null);

      onMovieAdded();
      onClose();
    } catch (err) {
      const firstError = Array.isArray(err.errors)
        ? err.errors[0].message
        : err.message;
      setErrorMessage(firstError || "Error adding movie");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Movie</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            name="title"
            value={newMovie.title}
            onChange={handleChange}
          />
          <TextField
            label="Year"
            name="year"
            type="number"
            value={newMovie.year}
            onChange={handleChange}
          />
          <TextField
            label="Genre"
            name="genre"
            value={newMovie.genre}
            onChange={handleChange}
          />
          <TextField
            label="Duration"
            name="duration"
            type="number"
            value={newMovie.duration}
            onChange={handleChange}
          />
          <TextField
            label="Director"
            name="director"
            value={newMovie.director}
            onChange={handleChange}
          />
          <TextField
            label="Synopsis"
            name="synopsis"
            value={newMovie.synopsis}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            label="Number of Copies"
            name="copies"
            type="number"
            value={newMovie.copies}
            onChange={handleChange}
          />

          {!posterPreview && (
            <Button variant="contained" component="label">
              Upload Poster
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          )}

          {posterPreview && (
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={posterPreview}
                alt="Poster preview"
                sx={{
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
              <IconButton
                onClick={handleRemovePoster}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
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
