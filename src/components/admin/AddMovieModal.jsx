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
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
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
            flexDirection: "row",
            gap: 3,
            pt: 4,
            pb: 2,
            pr: 4,
            pl: 4,
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: 410,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            {!posterPreview && (
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "2 / 3",
                  border: "2px dashed #3e0b00",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained" component="label">
                  Upload Poster
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>
            )}

            {posterPreview && (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "2 / 3",
                }}
              >
                <Box
                  component="img"
                  src={posterPreview}
                  alt="Poster preview"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
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
          </Box>

          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
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
          </Box>
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
