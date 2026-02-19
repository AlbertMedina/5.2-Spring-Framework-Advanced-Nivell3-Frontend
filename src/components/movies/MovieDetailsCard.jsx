import { Box, Typography, Grid, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

import StarRatingDisplay from "../movies/StarRatingDisplay";
import defaultPoster from "../../assets/background-movie.webp";

export default function MovieDetailsCard({
  movie,
  isAdmin,
  isUser,
  hasRented,
  onEdit,
  onDelete,
  onRentReturn,
  onReview,
}) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 3,
        boxShadow: 4,
        maxWidth: 1200,
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          gap: 1,
        }}
      >
        {isAdmin && (
          <>
            <IconButton color="inherit" onClick={onEdit} size="large">
              <EditIcon fontSize="large" />
            </IconButton>
            <IconButton color="inherit" onClick={onDelete} size="large">
              <DeleteIcon fontSize="large" />
            </IconButton>
          </>
        )}

        {isUser && (
          <>
            <Button
              variant="contained"
              size="small"
              startIcon={<LocalMoviesIcon />}
              onClick={onRentReturn}
            >
              {hasRented ? "Return" : "Rent"}
            </Button>

            {hasRented && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<RateReviewIcon />}
                onClick={onReview}
              >
                Review
              </Button>
            )}
          </>
        )}
      </Box>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={4} sm={3} md={3}>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "2 / 3",
              overflow: "hidden",
              borderRadius: 2,
              boxShadow: 3,
              maxWidth: 300,
            }}
          >
            <Box
              component="img"
              src={movie.posterUrl || defaultPoster}
              alt={movie.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </Box>
        </Grid>

        <Grid sx={{ flex: 1, minWidth: 300 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ wordBreak: "break-word" }}
            >
              {movie.title}
            </Typography>

            <Typography sx={{ wordBreak: "break-word" }}>
              <strong>Genre:</strong> {movie.genre}
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }}>
              <strong>Year:</strong> {movie.year}
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }}>
              <strong>Duration:</strong> {movie.duration} min
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }}>
              <strong>Director:</strong> {movie.director}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Synopsis:</strong>
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
              "{movie.synopsis}"
            </Typography>

            {movie.rating && (
              <Box sx={{ mt: 2 }}>
                <Box>
                  <strong>Rating:</strong>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <StarRatingDisplay rating={movie.rating.average} />
                  <Box>({movie.rating.count} reviews)</Box>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
