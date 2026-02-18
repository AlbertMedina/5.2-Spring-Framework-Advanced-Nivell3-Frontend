import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { getAllMovies, getGenres } from "../services/api";
import AuthContext from "../services/auth.context";

import MovieCard from "../components/movies/MovieCard";
import GenreSelector from "../components/movies/GenreSelector";
import SearchBox from "../components/movies/SearchBox";
import SortToggle from "../components/movies/SortToggle";
import HideUnavailableCheckbox from "../components/movies/HideUnavailableCheckbox.jsx";
import AddMovieCard from "../components/admin/AddMovieCard";
import AddMovieModal from "../components/admin/AddMovieModal";

export default function Movies() {
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const pageSize = 9;

  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);

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

      setMovies(data.content);
      setTotalPages(data.totalPages);
      setHasNext(data.hasNext);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [token, page, titleFilter, genreFilter, onlyAvailable, sortBy, ascending]);

  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <Box
      sx={{
        maxWidth: 1800,
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mt: 4,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <SearchBox
              value={titleFilter}
              onChange={(newText) => {
                setTitleFilter(newText);
                setPage(0);
              }}
              placeholder="Search by title"
              width={400}
            />

            <GenreSelector
              genres={genres}
              value={genreFilter}
              onChange={(newGenre) => {
                setGenreFilter(newGenre);
                setPage(0);
              }}
              width={150}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <SortToggle
              sortBy={sortBy}
              ascending={ascending}
              onSortByChange={(newSort) => setSortBy(newSort)}
              onToggleOrder={() => setAscending(!ascending)}
              width={150}
            />

            <HideUnavailableCheckbox
              checked={!onlyAvailable}
              onChange={(newValue) => {
                setOnlyAvailable(!newValue);
                setPage(0);
              }}
            />
          </Box>
        </Box>

        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && (
          <Grid
            container
            spacing={6}
            justifyContent="center"
            sx={{ mt: 6, columnGap: 16 }}
          >
            {isAdmin && (
              <Grid item xs={12} sm={6}>
                <AddMovieCard onClick={() => setOpenAddModal(true)} />
              </Grid>
            )}

            {movies.map((movie) => (
              <Grid item xs={12} sm={6} key={movie.id}>
                <MovieCard
                  movie={movie}
                  onClick={() => navigate(`/movies/${movie.id}`)}
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
          onClick={() => handlePageChange(page - 1)}
          size="large"
          sx={{ color: "#fff" }}
        >
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>

        <Typography sx={{ mt: 1, color: "#fff" }}>
          PAGE {page + 1} OF {totalPages}
        </Typography>

        <IconButton
          disabled={!hasNext}
          onClick={() => handlePageChange(page + 1)}
          size="large"
          sx={{ color: "#fff" }}
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
          setPage(0);
          fetchMovies();
          fetchGenres();
        }}
      />
    </Box>
  );
}
