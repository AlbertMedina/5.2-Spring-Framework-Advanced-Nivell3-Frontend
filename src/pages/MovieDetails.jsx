import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import {
  getMovie,
  removeMovie,
  rentMovie,
  returnMovie,
  getMovieReviews,
  userHasRentedMovie,
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
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rentConfirmOpen, setRentConfirmOpen] = useState(false);

  const [hasRented, setHasRented] = useState(false);

  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";

  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovie(token, movieId);
        if (!cancelled) setMovie(data);

        if (isUser) {
          const rentedResp = await userHasRentedMovie(token, movieId);
          if (!cancelled) setHasRented(rentedResp.rented);
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMessage(err.message || "Error fetching movie");
          setErrorDialogOpen(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMovie();
    return () => (cancelled = true);
  }, [token, movieId, isUser]);

  const fetchReviews = async () => {
    try {
      const data = await getMovieReviews(token, movieId);
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token && movieId) fetchReviews();
  }, [token, movieId]);

  const handleConfirmDelete = async () => {
    setConfirmDeleteOpen(false);
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

  if (loading) return <CircularProgress />;
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
        onDelete={() => setConfirmDeleteOpen(true)}
        onRentReturn={handleRentReturnClick}
        onReview={() => setReviewModalOpen(true)}
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        text="Are you sure you want to delete this movie?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDeleteOpen(false)}
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
          onReviewAdded={fetchReviews}
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
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
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
