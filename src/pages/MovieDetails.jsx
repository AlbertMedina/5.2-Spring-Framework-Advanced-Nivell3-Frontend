import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import {
  getMovie,
  removeMovie,
  rentMovie,
  returnMovie,
  userHasRentedMovie,
  getMovieReviews,
  removeReview,
} from "../services/api";
import AuthContext from "../services/auth.context";

import ConfirmDialog from "../components/shared/ConfirmDialog";
import UpdateMovieModal from "../components/admin/UpdateMovieModal";
import AddReviewModal from "../components/admin/AddReviewModal";
import ReviewCard from "../components/movies/ReviewCard";
import MovieDetailsCard from "../components/movies/MovieDetailsCard";
import ErrorDialog from "../components/shared/ErrorDialog";

export default function MovieDetails() {
  const { movieId } = useParams();
  const { token, role, userId, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [confirmDeleteMovieOpen, setConfirmDeleteMovieOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rentConfirmOpen, setRentConfirmOpen] = useState(false);
  const [confirmDeleteReviewOpen, setConfirmDeleteReviewOpen] = useState(false);

  const [hasRented, setHasRented] = useState(false);

  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const data = await getMovie(token, movieId);
      setMovie(data);

      if (isUser) {
        const rentedResp = await userHasRentedMovie(token, movieId);
        setHasRented(rentedResp.rented);
      }
    } catch (err) {
      setErrorMessage(err.message || "Error fetching movie");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    fetchMovieDetails();

    return () => {
      cancelled = true;
    };
  }, [token, movieId, isUser]);

  const fetchReviews = async () => {
    try {
      const data = await getMovieReviews(token, movieId);
      setReviews(data);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching reviews");
      setErrorDialogOpen(true);
    }
  };

  useEffect(() => {
    if (token && movieId) fetchReviews();
  }, [token, movieId]);

  const handleConfirmDeleteMovie = async () => {
    setConfirmDeleteMovieOpen(false);
    try {
      await removeMovie(token, movieId);
      navigate("/movies");
    } catch (err) {
      setErrorMessage(err.message || "Error deleting movie");
      setErrorDialogOpen(true);
    }
  };

  const handleMovieUpdated = (updatedMovie) => {
    setMovie(updatedMovie);
    setUpdateModalOpen(false);
  };

  const handleRentReturnClick = () => {
    setRentConfirmOpen(true);
  };

  const handleConfirmRentReturn = async () => {
    setRentConfirmOpen(false);
    try {
      if (hasRented) {
        await returnMovie(token, movieId);
        setHasRented(false);
      } else {
        await rentMovie(token, movieId);
        setHasRented(true);
      }
    } catch (err) {
      setErrorMessage(err.message || "Error processing rental");
      setErrorDialogOpen(true);
    }
  };

  const handleConfirmDeleteReview = async () => {
    setConfirmDeleteReviewOpen(false);
    try {
      await removeReview(token, movie.id);
      fetchReviews();
      fetchMovieDetails();
    } catch (err) {
      setErrorMessage(err.message || "Error deleting movie");
      setErrorDialogOpen(true);
    }
  };

  const handleReviewAdded = async () => {
    await fetchReviews(); // actualitza la llista de reviews
    await fetchMovieDetails(); // actualitza les dades de la peli (rating avg, etc.)
  };

  if (loading || authLoading) return <CircularProgress />;
  if (!movie) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 12,
        width: "100%",
      }}
    >
      <MovieDetailsCard
        movie={movie}
        isAdmin={isAdmin}
        isUser={isUser}
        hasRented={hasRented}
        onEdit={() => setUpdateModalOpen(true)}
        onDelete={() => setConfirmDeleteMovieOpen(true)}
        onRentReturn={handleRentReturnClick}
        onReview={() => setReviewModalOpen(true)}
      />

      <ConfirmDialog
        open={confirmDeleteMovieOpen}
        text="Are you sure you want to delete this movie?"
        onConfirm={handleConfirmDeleteMovie}
        onCancel={() => setConfirmDeleteMovieOpen(false)}
      />

      <ConfirmDialog
        open={rentConfirmOpen}
        text={
          hasRented
            ? "Are you sure you want to return this movie?"
            : "Are you sure you want to rent this movie?"
        }
        onConfirm={handleConfirmRentReturn}
        onCancel={() => setRentConfirmOpen(false)}
      />

      <ConfirmDialog
        open={confirmDeleteReviewOpen}
        text="Are you sure you want to delete this review?"
        onConfirm={handleConfirmDeleteReview}
        onCancel={() => setConfirmDeleteReviewOpen(false)}
      />

      <UpdateMovieModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        token={token}
        movie={movie}
        onMovieUpdated={handleMovieUpdated}
      />

      {hasRented && (
        <AddReviewModal
          open={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          token={token}
          movieId={movieId}
          onReviewAdded={handleReviewAdded}
        />
      )}

      {reviews.length > 0 && (
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 4,
            maxWidth: 1200,
            width: "100%",
            position: "relative",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4,
          }}
        >
          {reviews.map((r) => {
            const canDelete = isAdmin || r.userId === Number(userId);
            console.log(
              reviews.map((r) => r.userId),
              userId
            );
            console.log(canDelete);

            return (
              <ReviewCard
                key={r.id}
                review={r}
                showDeleteButton={canDelete}
                onDelete={(reviewId) => {
                  setConfirmDeleteReviewOpen(true);
                }}
              />
            );
          })}
        </Box>
      )}

      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        message={errorMessage}
      />
    </Box>
  );
}
