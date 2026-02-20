import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox({
  value,
  onChange,
  placeholder = "Search...",
  width = 200,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1,
        borderRadius: 2,
        bgcolor: "#f7f7f7",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        border: "1px solid #3e0b00",
        "&:hover": { bgcolor: "#eaeaea" },
        width,
      }}
    >
      <SearchIcon sx={{ mr: 1, color: "#3e0b00" }} />
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          color: "#3e0b00",
          flex: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      />
    </Box>
  );
}
