import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { getAllMovies, getGenres, removeMovie } from "../services/api";
import AuthContext from "../services/auth.context";

import MovieCard from "../components/shared/MovieCard";
import AddMovieCard from "../components/admin/AddMovieCard";
import AddMovieModal from "../components/admin/AddMovieModal";

export default function Movies() {
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 7;

  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("TITLE");
  const [ascending, setAscending] = useState(true);
  const [genres, setGenres] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const isAdmin = role === "ADMIN";

  const fetchGenres = async () => {
    try {
      const data = await getGenres(token);
      setGenres(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchGenres();
  }, [token]);

  const fetchMovies = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError("");
      const data = await getAllMovies({
        token,
        page,
        size: pageSize,
        genre: genreFilter,
        onlyAvailable,
        title: titleFilter,
        sortBy,
        ascending,
      });
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [token, page, titleFilter, genreFilter, onlyAvailable, sortBy, ascending]);

  const handleTitleChange = (e) => setTitleFilter(e.target.value);
  const handleGenreChange = (e) => setGenreFilter(e.target.value);
  const handleOnlyAvailableChange = (e) => setOnlyAvailable(e.target.checked);
  const handleSortByChange = (e) => setSortBy(e.target.value);
  const handleAscendingChange = (e) => setAscending(e.target.value === "asc");
  const handlePageChange = (newPage) => setPage(newPage);

  const handleDelete = async (movieId) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await removeMovie(token, movieId);
      setMovies(movies.filter((m) => m.id !== movieId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: 10,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "85vh",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          Movies
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search by title"
              value={titleFilter}
              onChange={handleTitleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                value={genreFilter}
                onChange={handleGenreChange}
                label="Genre"
              >
                <MenuItem value="">All</MenuItem>
                {genres.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortByChange}
                label="Sort by"
              >
                <MenuItem value="TITLE">Title</MenuItem>
                <MenuItem value="RATING">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={1}>
            <FormControl fullWidth>
              <InputLabel>Order</InputLabel>
              <Select
                value={ascending ? "asc" : "desc"}
                onChange={handleAscendingChange}
                label="Order"
              >
                <MenuItem value="asc">Asc</MenuItem>
                <MenuItem value="desc">Desc</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={onlyAvailable}
                  onChange={handleOnlyAvailableChange}
                />
              }
              label="Only available"
            />
          </Grid>
        </Grid>

        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && (
          <Grid container spacing={6} justifyContent="center">
            {isAdmin && (
              <Grid item xs={12} sm={6} key={"add-movie-card"}>
                <AddMovieCard onClick={() => setOpenAddModal(true)} />
              </Grid>
            )}
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} key={movie.id}>
                <MovieCard
                  movie={movie}
                  onClick={(movieId) => navigate(`/movies/${movieId}`)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <IconButton
          disabled={page === 0}
          color="inherit"
          onClick={() => handlePageChange(page - 1)}
          size="large"
        >
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>
        <Typography sx={{ mt: 1 }}>PAGE {page + 1}</Typography>
        <IconButton
          color="inherit"
          onClick={() => handlePageChange(page + 1)}
          size="large"
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Box>

      <AddMovieModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        token={token}
        genres={genres}
        onMovieAdded={() => {
          fetchMovies();
          fetchGenres();
        }}
      />
    </Box>
  );
}
