import { useState } from "react";
import { Box, Modal, Typography, Button, TextField } from "@mui/material";

import StarRatingInput from "../movies/StarRatingInput";
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
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Review
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>
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
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}
          >
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={rating === 0 || loading}
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
