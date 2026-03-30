import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ImageFallback from "./ImageFallback";

export default function ImageButton({
  width,
  aspectRatio,
  image,
  label,
  fontSize = 24,
  onClick,
}) {
  const [hasPosterError, setHasPosterError] = useState(false);

  useEffect(() => {
    setHasPosterError(false);
  }, [image]);

  return (
    <Box
      sx={{
        width,
        aspectRatio,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          borderRadius: 4,
          overflow: "hidden",
          cursor: "pointer",
          "&:hover .content-wrapper": {
            filter: "brightness(30%)",
          },
          "&:hover .overlay": {
            opacity: 1,
          },
        }}
        onClick={onClick}
      >
        <Box
          className="content-wrapper"
          sx={{
            height: "100%",
            width: "100%",
            transition: "300ms ease",
          }}
        >
          {hasPosterError ? (
            <ImageFallback />
          ) : (
            <Box
              component="img"
              src={image}
              alt=""
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={() => setHasPosterError(true)}
            />
          )}
        </Box>
        {label && (
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
              fontSize,
              textAlign: "center",
              textShadow: "2px 4px 4px rgba(0,0,0,0.7)",
              fontWeight: "bold",
              opacity: 0,
              transition: "0.3s",
              pointerEvents: "none",
            }}
          >
            {label}
          </Box>
        )}
      </Box>
    </Box>
  );
}
