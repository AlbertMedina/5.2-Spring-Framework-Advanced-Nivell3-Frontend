import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, CircularProgress, Grid } from "@mui/material";

import { getMyFavourites } from "../../services/api";
import AuthContext from "../../services/auth.context";

import MovieCard from "../../components/movies/MovieCard";

export default function Favourites() {
  const { token, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFavourites = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError("");

      const data = await getMyFavourites(token);

      setFavourites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [token]);

  const handleFavouriteClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const handlePageChange = (newPage) => setPage(newPage);

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

  if (!favourites) return null;

  return favourites.length > 0 ? (
    <Box
      sx={{
        maxWidth: 1800,
        mx: "auto",
        mt: 12,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "85vh",
        justifyContent: "space-between",
      }}
    >
      <Grid
        container
        spacing={6}
        justifyContent="center"
        sx={{ mt: 6, columnGap: 16 }}
      >
        {favourites.map((f) => (
          <Grid key={f.id}>
            <MovieCard movie={f} onClick={() => handleFavouriteClick(f.id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        mt: 12,
      }}
    >
      <Typography sx={{ color: "#3e0b00", fontWeight: "bold" }}>
        No favourites
      </Typography>
    </Box>
  );
}
