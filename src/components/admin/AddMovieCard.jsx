import { Box, ButtonBase } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import backgroundImage from "../../assets/background-movie.webp";

export default function AddMovieCard({ onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: 250,
        height: 380,
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
            transform: "translate(-50%, -50%) scale(1.5)",
          },
        }}
      >
        <Box
          component="img"
          src={backgroundImage}
          alt="Afegir pel·lícula"
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
            transform: "translate(-50%, -50%) scale(1.1)",
            color: "white",
            fontSize: 100,
            transition: "transform 0.4s ease",
          }}
        />
      </Box>
    </ButtonBase>
  );
}
