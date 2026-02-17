import { useContext } from "react";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import AuthContext from "../../services/auth.context";

export default function AdminNav() {
  const { logout } = useContext(AuthContext);

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={NavLink} to="/movies">
            <Typography variant="body1" color="inherit">
              Movies
            </Typography>
          </Button>
          <Button color="inherit" component={NavLink} to="/users">
            <Typography variant="body1" color="inherit">
              Users
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={logout} size="large">
            <LogoutIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
