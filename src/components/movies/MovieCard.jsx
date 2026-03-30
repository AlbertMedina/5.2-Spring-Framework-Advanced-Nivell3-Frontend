import { useState, useEffect } from "react";

import { Paper, Typography, Box, ButtonBase } from "@mui/material";

import ImageFallback from "../shared/ImageFallback";
import StarRatingDisplay from "../movies/StarRatingDisplay";

import defaultPoster from "../../assets/background-movie-default.webp";

export default function MovieCard({
  movie,
  onClick,
  width = 250,
  aspectRatio = "2 / 3",
  fontSize = 16,
}) {
  const [hasPosterError, setHasPosterError] = useState(false);

  useEffect(() => {
    setHasPosterError(false);
  }, [movie]);

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width,
        aspectRatio,
        textAlign: "left",
        borderRadius: 2,
        overflow: "hidden",
        display: "block",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          cursor: "pointer",
          "&:hover .details": {
            opacity: 1,
            transform: "translateY(0)",
          },
        }}
        elevation={3}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#eee",
            position: "relative",
          }}
        >
          {hasPosterError ? (
            <ImageFallback />
          ) : (
            <Box
              component="img"
              src={movie.posterUrl || defaultPoster}
              alt={movie.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
              onError={() => setHasPosterError(true)}
            />
          )}
          <Box
            component="img"
            src={movie.posterUrl || defaultPoster}
            alt={movie.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.target.src = defaultPoster;
            }}
          />

          <Box
            className="details"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              bgcolor: "rgba(0,0,0,0.85)",
              color: "white",
              p: 2,
              opacity: 0,
              transform: "translateY(100%)",
              transition: "all 0.4s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize, fontWeight: "bold" }}>
              {movie.title}
            </Typography>
            <Typography sx={{ fontSize: fontSize * 0.9 }}>
              {movie.genre} | {movie.year} | {movie.duration} min
            </Typography>
            <Typography sx={{ fontSize: fontSize * 0.9 }}>
              Director: {movie.director}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 0.5,
              }}
            >
              <StarRatingDisplay
                rating={movie.rating.average}
                fontSize={fontSize}
                color="secondary"
              />
              <Typography sx={{ fontSize }}>({movie.rating.count})</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </ButtonBase>
  );
}
