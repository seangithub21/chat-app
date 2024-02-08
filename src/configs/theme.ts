const theme = {
  palette: {},
  typography: {
    fontFamily: [
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.6rem",
    },
    button: {
      fontSize: "1.6rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: 10,
          height: "100%",
          "& body, & #root": {
            height: "100%",
          },
        },
      },
    },
  },
};

export const darkMode = {
  ...theme,
};

export const mobile = {
  ...theme,
};

export default theme;
