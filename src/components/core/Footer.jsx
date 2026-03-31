import { Typography, AppBar, Toolbar } from "@mui/material";

export default function Footer() {
  return (
    <AppBar position="fixed" component="footer" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography fontSize={14} color="inherit">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
