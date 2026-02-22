import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

import { getAllMovies } from "../../services/api";
import AuthContext from "../../services/auth.context";

import MovieCarousel from "../../components/home/MovieCarouselButon";

import logo from "../../assets/logo-dark.png";

export default function UserHome() {
  const { token, role, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    if (!token) return;
    try {
      setLoading(true);

      const data = await getAllMovies({
        token,
        page: 0,
        size: 15,
        genre: "",
        onlyAvailable: false,
        title: "",
        sortBy: "RATING",
        ascending: false,
      });

      setMovies(data.content);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching movies");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [token]);

  const handleCarouselClick = () => {
    navigate(`/movies`);
  };

  if (loading || authLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "transparent",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!movies) return null;

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
          flexDirection: "column",
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

        <MovieCarousel
          movies={movies}
          intervalMs={3000}
          onClick={handleCarouselClick}
        />
      </Box>
    </Box>
  );
}
