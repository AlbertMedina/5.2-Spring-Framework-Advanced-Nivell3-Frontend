import { Box } from "@mui/material";

export default function ImageButton({
  width,
  aspectRatio,
  image,
  text,
  onClick,
}) {
  return (
    <Box
      sx={{
        width: width,
        aspectRatio: aspectRatio,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          borderRadius: 4,
          overflow: "hidden",
          cursor: "pointer",
          "&:hover img": {
            filter: "brightness(30%)",
            transition: "300ms ease",
          },
          "&:hover .overlay": {
            opacity: 1,
          },
        }}
        onClick={onClick}
      >
        <img
          src={image}
          alt={text}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "0.3s",
          }}
        />
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 48,
            textAlign: "center",
            textShadow: "2px 4px 4px rgba(0,0,0,0.7)",
            fontWeight: "bold",
            opacity: 0,
            transition: "0.3s",
          }}
        >
          {text}
        </Box>
      </Box>
    </Box>
  );
}
