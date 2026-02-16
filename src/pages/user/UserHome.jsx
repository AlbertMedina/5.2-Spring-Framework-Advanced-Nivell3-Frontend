import { Typography, Container, Box } from "@mui/material";

export default function UserHome() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 12, display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1">
          User Home
        </Typography>
      </Box>
    </Container>
  );
}
