import { Typography, Container, Box } from "@mui/material";

import logo from "../../assets/logo-dark.png";

export default function UserHome() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 12,
          mb: 12,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Afegir pel·lícula"
          sx={{
            aspectRatio: "6 / 2",
            width: 1200,
            objectFit: "cover",
            maxWidth: "100%",
          }}
        />
      </Box>
    </Box>
  );
}
