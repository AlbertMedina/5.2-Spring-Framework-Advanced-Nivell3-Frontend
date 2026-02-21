import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import AuthContext from "../services/auth.context";
import { registerUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser({ name, surname, username, email, password });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 600,
          bgcolor: "#f5f5f5",
          color: "#3e0b00",
          p: 4,
          borderRadius: 4,
          mb: 15,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          REGISTER
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ width: "100%", mt: 1 }}
        >
          <TextField
            label="Name"
            type="text"
            fullWidth
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Surname"
            type="text"
            fullWidth
            margin="normal"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Sign up
          </Button>
          <Button fullWidth sx={{ mt: 2 }} onClick={handleGoToLogin}>
            <u>Already have an account? Log in</u>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
