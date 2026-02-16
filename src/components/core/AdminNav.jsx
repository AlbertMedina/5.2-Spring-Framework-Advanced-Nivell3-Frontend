import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../services/auth.context";

export default function AdminNav() {
  const { logout } = useContext(AuthContext);

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={NavLink} to="/users">
            Users
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button color="inherit" onClick={logout}>
            Log out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
