import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function StarRatingDisplay({
  rating,
  maxRating = 5,
  fontSize = 16,
  color = "primary",
}) {
  const roundedRating = Math.round(rating * 2) / 2;

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    if (i <= roundedRating) {
      stars.push(<StarIcon key={i} sx={{ fontSize, color }} />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<StarHalfIcon key={i} sx={{ fontSize, color }} />);
    } else {
      stars.push(<StarBorderIcon key={i} sx={{ fontSize, color }} />);
    }
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>{stars}</Box>
  );
}
