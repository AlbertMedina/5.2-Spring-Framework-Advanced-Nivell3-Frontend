import { Box, Typography, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRatingDisplay from "../movies/StarRatingDisplay";
import userAvatar from "../../assets/user-avatar.webp";

export default function ReviewCard({
  review,
  showDeleteButton = false,
  onDelete,
}) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "white",
        borderRadius: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        boxShadow: 1,
        width: "100%",
        gap: 2,
        wordBreak: "break-word",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 80,
        }}
      >
        <Avatar
          alt={review.username}
          src={userAvatar}
          sx={{ width: 56, height: 56 }}
        />
        <Typography variant="caption" align="center">
          {review.username}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          mt: 1.4,
        }}
      >
        <StarRatingDisplay rating={review.rating} />
        <Typography variant="body2">"{review.comment}"</Typography>
      </Box>

      {showDeleteButton && (
        <IconButton
          onClick={() => onDelete && onDelete(review.id)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey",
          }}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
