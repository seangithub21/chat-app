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
    fontSize: 12,
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
          "& body, & #root": {
            height: "100%",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #8be8cb 0%, #7fb8ff 100%)",
          color: "#fff",
        },
      },
    },
  },
};

export const darkMode = {
  ...theme,
};

export default theme;
