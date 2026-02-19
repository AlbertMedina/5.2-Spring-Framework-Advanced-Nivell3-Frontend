import { useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../services/auth.context";
import { getUser, getUserRentals, removeUser } from "../../services/api";
import ConfirmDialog from "../../components/shared/ConfirmDialog";

export default function UserDetails() {
  const { token } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError("");

        const userData = await getUser(token, userId);
        const rentalsData = await getUserRentals(token, userId);

        if (!cancelled) {
          setUser(userData);
          setRentals(rentalsData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUserData();

    return () => {
      cancelled = true;
    };
  }, [token, userId]);

  const handleRemoveClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmRemove = async () => {
    try {
      setRemoving(true);
      await removeUser(token, userId);
      setConfirmOpen(false);
      navigate("/users");
    } catch (err) {
      setError(err.message);
      setConfirmOpen(false);
    } finally {
      setRemoving(false);
    }
  };

  const handleCancelRemove = () => {
    setConfirmOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!user) return null;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        User details
      </Typography>

      <Typography>
        <strong>Name:</strong> {user.name}
      </Typography>
      <Typography>
        <strong>Surname:</strong> {user.surname}
      </Typography>
      <Typography>
        <strong>Username:</strong> @{user.username}
      </Typography>
      <Typography>
        <strong>Email:</strong> {user.email}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Active rentals
      </Typography>

      {rentals.length === 0 ? (
        <Typography>No active rentals</Typography>
      ) : (
        <List>
          {rentals.map((rental) => (
            <ListItem key={rental.id}>
              <ListItemText
                primary={rental.movieTitle}
                secondary={`Rented on ${rental.rentedAt}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleRemoveClick}
          disabled={removing}
        >
          {removing ? "Removing..." : "Delete User"}
        </Button>
      </Box>

      <ConfirmDialog
        open={confirmOpen}
        text={`Are you sure you want to remove user ${user.username}?`}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </Box>
  );
}
