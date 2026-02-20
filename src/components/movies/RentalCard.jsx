import { Box, Typography } from "@mui/material";

export default function RentalCard({ rental }) {
  if (!rental) return null;

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
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
  );
}
