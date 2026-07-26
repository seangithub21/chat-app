import getStyles from "./styles";

interface Props {
  children?: JSX.Element;
  handleClose: () => void;
  isOpen: boolean;
}

const Modal = ({ children, handleClose, isOpen }: Props) => {
  const classes = getStyles({ isOpen });

  return (
    <div style={classes.modal}>
      <div style={classes.modalContent}>
        <span style={classes.close} onClick={handleClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
