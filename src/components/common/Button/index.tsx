import { JSX } from "react";
import { ButtonProps, Button as MuiButton } from "@mui/material";

interface ExtendedButtonProps extends ButtonProps {
  onClick?: () => void;
}

const Button = ({ sx, ...props }: ExtendedButtonProps): JSX.Element => {
  return (
    <MuiButton
      variant="contained"
      sx={{ textTransform: "none", ...sx }}
      {...props}
    />
  );
};

export default Button;
