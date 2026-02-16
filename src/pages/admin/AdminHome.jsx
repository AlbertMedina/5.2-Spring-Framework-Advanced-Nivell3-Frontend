import { Typography, Container, Box } from "@mui/material";

export default function AdminHome() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 12, display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1">
          Admin Home
        </Typography>
      </Box>
    </Container>
  );
}
