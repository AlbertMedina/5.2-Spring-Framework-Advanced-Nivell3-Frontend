import { Box, Checkbox, Typography } from "@mui/material";

export default function HideUnavailableCheckbox({ checked, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        bgcolor: "#3e0b00",
        px: 2,
        py: 1,
        cursor: "pointer",
        minWidth: 120,
        "&:hover": { bgcolor: "#6A1F0F" },
      }}
      onClick={() => onChange(!checked)}
    >
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        sx={{
          color: "#f5f5f5",
          "&.Mui-checked": { color: "#f5f5f5" },
          p: 0,
          mr: 1,
        }}
      />
      <Typography
        sx={{ fontWeight: 500, color: "#f5f5f5", whiteSpace: "nowrap" }}
      >
        Hide unavailable
      </Typography>
    </Box>
  );
}
