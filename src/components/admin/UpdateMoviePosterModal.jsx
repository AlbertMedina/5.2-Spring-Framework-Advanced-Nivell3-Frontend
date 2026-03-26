import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { updateMoviePoster } from "../../services/api";

import ErrorDialog from "../shared/ErrorDialog";

export default function UpdateMoviePosterModal({
  open,
  onClose,
  token,
  movie,
  onMoviePosterUpdated,
}) {
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    if (open && movie) {
      setPosterPreview(movie.posterUrl || null);
      setPosterFile(null);
    }
  }, [movie, open]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const updated = await updateMoviePoster(token, movie.id, posterFile);

      onMoviePosterUpdated(updated);
      onClose();
    } catch (err) {
      setErrorMessage(err.message || "Error updating movie");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const hasChanges =
    posterFile !== null || (movie?.posterUrl && !posterPreview);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
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
            justifyContent: "center",
            pt: 4,
            pb: 0,
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
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </Box>
            )}
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
            disabled={loading || !hasChanges}
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
