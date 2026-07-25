import { CSSProperties } from "react";

interface Props {
  isOpen: boolean;
}

const getStyles = ({ isOpen }: Props) => ({
  modal: {
    backgroundColor: "rgba(0,0,0,0.4)",
    display: isOpen ? "block" : "none",
    height: "100%",
    left: "0",
    overflow: "auto",
    paddingTop: "100px",
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "1",
  } as CSSProperties,
  modalContent: {
    backgroundColor: "#fff",
    border: "1px solid #888",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column" as const,
    margin: "auto",
    maxWidth: "60rem",
    padding: "20px",
    width: "60%",
  },
  close: {
    alignSelf: "end",
    color: "#aaaaaa",
    cursor: "pointer",
    float: "right",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "right",
  } as CSSProperties,
});

export default getStyles;
