const getStyles = () => ({
  container: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    backgroundColor: "#fff",
  },
  backButton: {
    fontSize: "2rem",
  },
  form: {
    display: "flex",
  },
  messages: {
    overflowY: "scroll" as const,
    flex: "1 1 0",
  },
});

export default getStyles;
