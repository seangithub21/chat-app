import { Theme } from "@mui/material";

const getStyles = (theme: Theme) => {
  return {
    container: {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      minWidth: "35rem",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "1rem",
      boxShadow: "rgb(38, 57, 77) 0rem 2rem 3rem -1rem",
      padding: "4rem",
    },
    cross: {
      cursor: "pointer",
      fontSize: "2.5rem",
    },
  };
};

export default getStyles;
