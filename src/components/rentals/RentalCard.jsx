import { Box, Typography } from "@mui/material";
import MovieIcon from "@mui/icons-material/LocalMovies";

export default function RentalCard({ rental, onClick }) {
  if (!rental) return null;

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        color: "#3e0b00",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        ...(onClick && {
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: 4,
          },
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 40,
        }}
      >
        <MovieIcon sx={{ fontSize: 60 }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {rental.title}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          Rented by: {rental.username}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          Date: {rental.rentalDate}
        </Typography>
      </Box>
    </Box>
  );
}
