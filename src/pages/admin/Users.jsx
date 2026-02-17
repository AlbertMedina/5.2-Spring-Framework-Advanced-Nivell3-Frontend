import { useEffect, useState, useContext } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { getAllUsers } from "../../services/api";
import AuthContext from "../../services/auth.context";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllUsers(token);

        if (!cancelled) {
          setUsers(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setUsers([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <List>
        {users.map((user) => (
          <ListItemButton
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <ListItemText
              primary={`${user.name} ${user.surname}`}
              secondary={`@${user.username}`}
            />
          </ListItemButton>
        ))}
      </List>

      {!users.length && !error && (
        <Typography>No users found</Typography>
      )}
    </Box>
  );
}
