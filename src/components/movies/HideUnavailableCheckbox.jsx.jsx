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
        bgcolor: "#f7f7f7",
        border: "1px solid #ddd",
        px: 2,
        py: 1,
        cursor: "pointer",
        minWidth: 120,
        "&:hover": { bgcolor: "#eaeaea" },
      }}
      onClick={() => onChange(!checked)}
    >
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        sx={{
          color: "#222",
          "&.Mui-checked": { color: "#222" },
          p: 0,
          mr: 1,
        }}
      />
      <Typography sx={{ fontWeight: 500, color: "#222", whiteSpace: "nowrap" }}>
        Hide unavailable
      </Typography>
    </Box>
  );
}
