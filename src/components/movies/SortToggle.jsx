import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function SortToggle({
  sortBy,
  ascending,
  onSortByChange,
  onToggleOrder,
  options = ["TITLE", "RATING"],
  minWidth = 150,
  height = 40,
  fontSize = 16,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleSelectOption = (option) => {
    onSortByChange(option);
    handleMenuClose();
  };

  const Icon = ascending ? ArrowUpwardIcon : ArrowDownwardIcon;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        bgcolor: "#3e0b00",
        minWidth,
        height,
      }}
    >
      <Button
        onClick={handleMenuOpen}
        sx={{
          flex: 1,
          textTransform: "none",
          color: "#f5f5f5",
          "&:hover": { bgcolor: "#6A1F0F" },
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Typography
          sx={{ fontSize, fontWeight: 500, textAlign: "center", flex: 1 }}
        >
          {sortBy === "TITLE" ? "Title" : "Rating"}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#6A1F0F",
            color: "#f5f5f5",
            minWidth,
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt}
            onClick={() => handleSelectOption(opt)}
            sx={{ fontSize, "&:hover": { bgcolor: "#3e0b00" } }}
          >
            {opt === "TITLE" ? "Title" : "Rating"}
          </MenuItem>
        ))}
      </Menu>

      <Tooltip>
        <Button
          onClick={onToggleOrder}
          sx={{
            px: 1.5,
            color: "#f5f5f5",
            "&:hover": { bgcolor: "#6A1F0F" },
          }}
        >
          <Icon sx={{ fontSize: fontSize * 1.3 }} />
        </Button>
      </Tooltip>
    </Box>
  );
}
