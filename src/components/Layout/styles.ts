interface Props {
  isMobile: Boolean;
}

const getStyles = ({ isMobile }: Props) => ({
  layout: {
    height: "100%",
    margin: "auto",
    maxWidth: "1200px",
    overflow: "hidden",
  },
  container: {
    height: "100%",
  },
  menu: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    justifyContent: "space-between",
    padding: "2rem",
  },
});

export default getStyles;
