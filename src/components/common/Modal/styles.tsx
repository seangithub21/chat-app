import { CSSProperties } from "react";

interface Props {
  isOpen: boolean;
}

const getStyles = ({ isOpen }: Props) => ({
  modal: {
    display: isOpen ? "block" : "none",
    position: "fixed",
    zIndex: "1",
    paddingTop: "100px",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.4)",
  } as CSSProperties,
  modalContent: {
    backgroundColor: "#fff",
    margin: "auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%",
    maxWidth: "60rem",
  },
  close: {
    color: "#aaaaaa",
    float: "right",
    fontSize: "28px",
    fontWeight: "bold",
  } as CSSProperties,
});

export default getStyles;
