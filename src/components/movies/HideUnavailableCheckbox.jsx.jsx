import { Box, Checkbox, Typography } from "@mui/material";

export default function HideUnavailableCheckbox({
  checked,
  onChange,
  minWidth = 150,
  height = 40,
  fontSize = 16,
}) {
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
        "&:hover": { bgcolor: "#6A1F0F" },
        minWidth,
        height,
      }}
      onClick={() => onChange(!checked)}
    >
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        sx={{
          p: 0,
          color: "#f5f5f5",
          "&.Mui-checked": { color: "#f5f5f5" },
          "& .MuiSvgIcon-root": {
            fontSize: fontSize * 1.3,
          },
        }}
      />
      <Typography
        sx={{
          ml: 1,
          fontSize,
          fontWeight: 500,
          color: "#f5f5f5",
          whiteSpace: "nowrap",
        }}
      >
        Hide unavailable
      </Typography>
    </Box>
  );
}
