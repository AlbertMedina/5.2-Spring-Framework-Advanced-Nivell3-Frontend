import { Box, Typography } from "@mui/material";

import userAvatar from "../../assets/user-avatar.webp";
import { capitalizeWords } from "../../utils/stringUtils";

export default function UserCard({ user, onClick }) {
  if (!user) return null;

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        color: "#3e0b00",
        width: "100%",
        minWidth: 400,
        display: "flex",
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
          maxWidth: 100,
        }}
      >
        <Box
          component="img"
          src={userAvatar}
          alt={user.username}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {capitalizeWords(user.name)} {capitalizeWords(user.surname)}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          {user.username}
        </Typography>
      </Box>
    </Box>
  );
}
