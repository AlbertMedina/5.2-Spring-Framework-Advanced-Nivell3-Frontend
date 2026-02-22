import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";

export default function MovieCarouselButon({
  movies,
  visibleCount = 3,
  intervalMs = 3000,
  onClick,
}) {
  const [index, setIndex] = useState(0);

  const pages = useMemo(() => {
    if (!movies || movies.length < visibleCount) return [];

    const trimmedLength = movies.length - (movies.length % visibleCount);
    const trimmedMovies = movies.slice(0, trimmedLength);

    const result = [];
    for (let i = 0; i < trimmedMovies.length; i += visibleCount) {
      result.push(trimmedMovies.slice(i, i + visibleCount));
    }
    return result;
  }, [movies]);

  useEffect(() => {
    if (pages.length <= 1) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % pages.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [pages.length, intervalMs]);

  if (pages.length === 0) return null;

  return (
    <Box
      sx={{
        p: 1,
        width: "100%",
        maxWidth: 960,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        "&:hover .carousel-overlay": {
          opacity: 1,
        },
        "&:hover .carousel-track": {
          filter: "brightness(30%)",
        },
      }}
      onClick={onClick}
    >
      <Box
        className="carousel-track"
        sx={{
          display: "flex",
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 600ms ease-in-out, filter 300ms ease",
        }}
      >
        {pages.map((page, pageIndex) => (
          <Box
            key={pageIndex}
            sx={{
              minWidth: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {page.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  p: 1,
                  flex: 1,
                }}
              >
                <Box
                  component="img"
                  src={movie.posterUrl}
                  alt={movie.title}
                  sx={{
                    width: "100%",
                    aspectRatio: "2 / 3",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <Box
        className="carousel-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5f5f5",
          fontWeight: "bold",
          opacity: 0,
          transition: "0.3s",
          pointerEvents: "none",
          fontSize: 48,
          textShadow: "2px 4px 4px rgba(0,0,0,0.7)",
        }}
      >
        Explore our top-rated movies
      </Box>
    </Box>
  );
}
