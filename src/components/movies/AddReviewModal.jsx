import { useState } from "react";
import { Box, Modal, Typography, Button, TextField } from "@mui/material";

import StarRatingInput from "./StarRatingInput";
import ErrorDialog from "../shared/ErrorDialog";
import { addReview } from "../../services/api";

export default function AddReviewModal({
  open,
  onClose,
  token,
  movieId,
  onReviewAdded,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await addReview(token, { movieId, rating, comment });
      onReviewAdded();
      onClose();
      setRating(0);
      setComment("");
    } catch (err) {
      setErrorMessage(err.message || "Error adding review");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: {
            sx: {
              bgcolor: "rgba(0, 0, 0, 0.6)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#f5f5f5",
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom color="#3e0b00">
              <strong>Rating:</strong>
            </Typography>
            <StarRatingInput value={rating} onChange={setRating} />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 3,
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
              variant="contained"
              onClick={handleSubmit}
              disabled={rating === 0 || comment.trim() === "" || loading}
              sx={{
                bgcolor: "#3e0b00",
                color: "#f5f5f5",
                "&:hover": {
                  bgcolor: "#2e0800",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        message={errorMessage}
      />
    </>
  );
}
