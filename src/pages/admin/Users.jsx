import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { getAllUsers, removeUser } from "../../services/api";
import { useContext } from "react";
import AuthContext from "../../services/auth.context";

export default function Users() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers(token);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRemove = async (userId) => {
    if (!window.confirm("Are you sure yo want to remove this user?")) return;

    try {
      setRemoving(userId);
      await removeUser(token, userId);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      setError(err.message);
    } finally {
      setRemoving(null);
    }
  };

  if (loading) return <CircularProgress />;

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
          <ListItem
            key={user.id}
            secondaryAction={
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleRemove(user.id)}
                disabled={removing === user.id}
              >
                {removing === user.id ? "Removing..." : "Remove"}
              </Button>
            }
          >
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
