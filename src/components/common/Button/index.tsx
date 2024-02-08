import { JSX } from "react";
import { ButtonProps, IconButton, Button as MuiButton } from "@mui/material";

interface ExtendedButtonProps extends ButtonProps {
  onClick?: () => void;
  isIcon?: Boolean;
}

const Button = ({ sx, isIcon, ...props }: ExtendedButtonProps): JSX.Element => {
  return isIcon ? (
    <IconButton sx={sx} {...props} />
  ) : (
    <MuiButton
      variant="contained"
      sx={{ textTransform: "none", ...sx }}
      {...props}
    />
  );
};

export default Button;
