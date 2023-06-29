import { JSX } from "react";
import { ButtonProps, Button as MuiButton } from "@mui/material";

interface ExtendedButtonProps extends ButtonProps {
  onClick: () => void;
}

const Button = ({
  children,
  sx,
  ...props
}: ExtendedButtonProps): JSX.Element => {
  return (
    <MuiButton
      variant="contained"
      sx={{ textTransform: "none", ...sx }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
