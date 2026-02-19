import { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";

export default function GenreSelector({ genres = [], value, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (genre) => {
    onChange(genre);
    handleClose();
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        bgcolor: "#3e0b00",
        overflow: "hidden",
        minWidth: 80,
      }}
    >
      <Button
        onClick={handleOpen}
        sx={{
          flex: 1,
          textTransform: "none",
          color: "#f5f5f5",
          "&:hover": { bgcolor: "#6A1F0F" },
          whiteSpace: "nowrap",
        }}
      >
        <Typography sx={{ fontWeight: 500, textAlign: "center", flex: 1 }}>
          {value ? capitalize(value) : "All Genres"}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#6A1F0F",
            color: "#f5f5f5",
            minWidth: 150,
          },
        }}
      >
        <MenuItem
          onClick={() => handleSelect("")}
          sx={{ "&:hover": { bgcolor: "#3e0b00" } }}
        >
          All
        </MenuItem>

        {genres.map((g) => (
          <MenuItem
            key={g}
            onClick={() => handleSelect(g)}
            sx={{ "&:hover": { bgcolor: "#3e0b00" } }}
          >
            {capitalize(g)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
