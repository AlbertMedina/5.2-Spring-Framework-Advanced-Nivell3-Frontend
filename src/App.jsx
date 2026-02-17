import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";

import { AuthProvider } from "./services/auth.context";
import AuthContext from "./services/auth.context";

import Nav from "./components/core/Nav";
import Footer from "./components/core/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const AdminApp = lazy(() => import("./app/AdminApp"));
const UserApp = lazy(() => import("./app/UserApp"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#222",
      contrastText: "#f5f5f5",
    },
    background: {
      default: "#f0f0f0",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    body2: {
      fontSize: "0.9rem",
      color: "#f5f5f5",
    },
  },
});

function AppRoutes() {
  const { role, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  const defaultStyle = {
    backgroundImage: "url('src/assets/background-theater.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100vh",
    overflow: "hidden",
  };

  const authStyle = {
    backgroundImage: "url('src/assets/background-videostore.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    minHeight: "100vh",
    overflow: "hidden",
  };

  if (!role) {
    return (
      <div style={authStyle}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div style={defaultStyle}>
      <Suspense fallback={<div>Loading...</div>}>
        {role === "ADMIN" ? <AdminApp /> : <UserApp />}
      </Suspense>
    </div>
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
