interface Props {
  isMobile: Boolean;
}

const getStyles = ({ isMobile }: Props) => ({
  layout: {
    height: "100%",
    maxWidth: "1920px",
    margin: "auto",
    overflow: "hidden",
  },
  container: {
    height: "100%",
  },
});

export default getStyles;
