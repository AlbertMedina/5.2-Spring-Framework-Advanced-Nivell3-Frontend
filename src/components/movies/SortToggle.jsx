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
  width = 150,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleSelectOption = (option) => {
    onSortByChange(option);
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        bgcolor: "#9F1A1A",
        border: "1px solid #B03030",
        width,
      }}
    >
      <Button
        onClick={handleMenuOpen}
        sx={{
          flex: 1,
          textTransform: "none",
          color: "#222",
          "&:hover": { bgcolor: "#AC2525" },
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Typography sx={{ fontWeight: 500, textAlign: "center", flex: 1 }}>
          {sortBy === "TITLE" ? "Title" : "Rating"}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#f7f7f7",
            color: "#222",
            minWidth: 120,
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt}
            onClick={() => handleSelectOption(opt)}
            sx={{ "&:hover": { bgcolor: "#eaeaea" } }}
          >
            {opt === "TITLE" ? "Title" : "Rating"}
          </MenuItem>
        ))}
      </Menu>

      <Tooltip title={ascending ? "Ascending" : "Descending"}>
        <Button
          onClick={onToggleOrder}
          sx={{
            px: 1.5,
            color: "#222",
            "&:hover": { bgcolor: "#AC2525" },
          }}
        >
          {ascending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </Button>
      </Tooltip>
    </Box>
  );
}
