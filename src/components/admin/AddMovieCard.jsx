import { Box, ButtonBase } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import backgroundImage from "../../assets/background-movie-default.webp";

export default function AddMovieCard({
  onClick,
  width = 250,
  aspectRatio = "2 / 3",
  fontSize = 80,
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width,
        aspectRatio,
        borderRadius: 2,
        overflow: "hidden",
        display: "block",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
          "&:hover .add-icon": {
            transform: "translate(-50%, -50%) scale(1.3)",
          },
        }}
      >
        <Box
          component="img"
          src={backgroundImage}
          alt="New Movie"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(40%)",
          }}
        />

        <AddCircleOutlineIcon
          className="add-icon"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(1.0)",
            color: "white",
            fontSize,
            transition: "transform 0.4s ease",
          }}
        />
      </Box>
    </ButtonBase>
  );
}
