import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function StarRatingInput({ value, onChange }) {
  const [hover, setHover] = useState(0);

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton
          key={star}
          size="small"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          {star <= (hover || value) ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderIcon color="warning" />
          )}
        </IconButton>
      ))}
    </Box>
  );
}
