import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";

import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { AuthProvider } from "./services/auth.context";
import AuthContext from "./services/auth.context";

const AuthApp = lazy(() => import("./app/AuthApp"));
const AdminApp = lazy(() => import("./app/AdminApp"));
const UserApp = lazy(() => import("./app/UserApp"));

import Nav from "./components/core/Nav";
import Footer from "./components/core/Footer";

import DefaultBackgroundImage from "./assets/background-movie.png";
import AuthBackgroundImage from "./assets/background-videostore.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3e0b00",
      contrastText: "#f5f5f5",
    },
    secondary: {
      main: "#f5f5f5",
      contrastText: "#3e0b00",
    },
  },
  typography: {
    fontFamily: "'Raleway', Arial, sans-serif",
    body1: {
      fontSize: "1.4rem",
    },
    body2: {
      fontSize: "1.2rem",
    },
    body3: {
      fontSize: "1.0rem",
    },
  },
});

function AppRoutes() {
  const { role, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  const authBackground = {
    backgroundImage: `url(${AuthBackgroundImage})`,
    backgroundPosition: "center top",
  };

  const defaultBackground = {
    backgroundImage: `url(${DefaultBackgroundImage})`,
    backgroundPosition: "center center",
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",

        ...(role ? defaultBackground : authBackground),

        pt: role ? 12 : 0,
        pb: 12,

        width: "100%",
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        {role ? role === "ADMIN" ? <AdminApp /> : <UserApp /> : <AuthApp />}
      </Suspense>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <AppRoutes />
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
