import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, IconButton, Box } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../services/auth.context";
import LogoutIcon from "@mui/icons-material/Logout";

export default function UserNav() {
  const { logout } = useContext(AuthContext);

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={NavLink} to="/movies">
            Movies
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" onClick={logout} size="large">
            <LogoutIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
