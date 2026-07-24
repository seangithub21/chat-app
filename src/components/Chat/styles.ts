interface Props {
  isMobile: boolean;
}

const getStyles = ({ isMobile }: Props) => ({
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.6rem",
    height: "100%",
  },
  chat: {
    backgroundColor: "#fff",
    borderRadius: isMobile ? "" : "1rem",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    height: "100%",
    padding: "2rem",
  },
  backButton: {
    fontSize: "2rem",
  },
  form: {
    display: "flex",
    gap: "2rem",
  },
  messages: {
    overflowY: "scroll" as const,
    flex: "1 1 0",
  },
});

export default getStyles;
