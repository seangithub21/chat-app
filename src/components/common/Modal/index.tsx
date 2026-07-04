import { JSX } from "react";
import { ModalOwnProps, Modal as MuiModal, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import getStyles from "./styles";

const Modal = ({ children, ...props }: ModalOwnProps): JSX.Element => {
  const theme = useTheme();
  const classes = getStyles(theme);

  return (
    <MuiModal {...props}>
      <div style={classes.container}>
        <div style={{ textAlign: "right" }}>
          <CloseIcon onClick={() => {}} sx={classes.cross} />
        </div>
        {children}
      </div>
    </MuiModal>
  );
};

export default Modal;
