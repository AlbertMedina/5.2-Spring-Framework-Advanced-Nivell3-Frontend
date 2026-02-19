import { Box, Typography } from "@mui/material";
import StarRatingDisplay from "../movies/StarRatingDisplay";

export default function ReviewCard({ review }) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "white",
        borderRadius: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        boxShadow: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <StarRatingDisplay rating={review.rating} />
        <Typography variant="body2">{review.comment}</Typography>
      </Box>
    </Box>
  );
}
