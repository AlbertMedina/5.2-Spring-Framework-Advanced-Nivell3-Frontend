import { useEffect, useState, useContext } from "react";
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
  Paper,
} from "@mui/material";
import { getAllMovies, getGenres } from "../../services/api";
import AuthContext from "../../services/auth.context";

export default function Movies() {
  const { token } = useContext(AuthContext);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // filtres
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("TITLE");
  const [ascending, setAscending] = useState(true);

  const [genres, setGenres] = useState([]);

  // Fetch genres
  useEffect(() => {
    if (!token) return;

    const fetchGenres = async () => {
      try {
        const data = await getGenres(token);
        setGenres(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGenres();
  }, [token]);

  // Fetch movies
  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllMovies({
          token,
          page,
          size: pageSize,
          genre: genreFilter || undefined,
          onlyAvailable,
          title: titleFilter || undefined,
          sortBy,
          ascending,
        });

        if (!cancelled) setMovies(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [token, page, titleFilter, genreFilter, onlyAvailable, sortBy, ascending]);

  // Handlers filtres
  const handleTitleChange = (e) => setTitleFilter(e.target.value);
  const handleGenreChange = (e) => setGenreFilter(e.target.value);
  const handleOnlyAvailableChange = (e) => setOnlyAvailable(e.target.checked);
  const handleSortByChange = (e) => setSortBy(e.target.value);
  const handleAscendingChange = (e) => setAscending(e.target.value === "asc");
  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Movies
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
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
            <Select value={genreFilter} onChange={handleGenreChange} label="Genre">
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
            <Select value={sortBy} onChange={handleSortByChange} label="Sort by">
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

        <Grid item xs={12} sm={2} sx={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={<Checkbox checked={onlyAvailable} onChange={handleOnlyAvailableChange} />}
            label="Only available"
          />
        </Grid>
      </Grid>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} key={movie.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">{movie.title}</Typography>
                <Typography variant="body2">
                  {movie.genre} | {movie.year} | {movie.duration} min
                </Typography>
                <Typography variant="body2">Director: {movie.director}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 1 }}>
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <Typography sx={{ mt: 1 }}>Page {page}</Typography>
        <Button variant="outlined" onClick={() => handlePageChange(page + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
