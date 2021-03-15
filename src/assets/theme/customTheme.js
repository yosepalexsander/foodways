import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: ["Cabin", "sans-serif"].join(","),
          fontWeight: 400,
          background: "#E5E5E5",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Cabin", "sans-serif"].join(","),
    button: {
      fontFamily: ["Cabin", "sans-serif"].join(","),
      fontWeight: 800,
      textTransform: "none",
      fontSize: "1rem",
    },
    h1: {
      fontFamily: ["Abhaya Libre", "serif"].join(","),
      fontWeight: 800,
      lineHeight: "64.88px",
      fontSize: "55px",
    },
    h2: {
      fontFamily: ["Abhaya Libre", "serif"].join(","),
      fontSize: "47px",
    },
    h3: {
      fontFamily: ["Abhaya Libre", "serif"].join(","),
      fontSize: "45px",
    },
    h4: {
      fontFamily: ["Abhaya Libre", "serif"].join(","),
      fontSize: "2rem",
      lineHeight: "42.47px",
    },
    h5: {
      fontFamily: ["Abhaya Libre", "serif"].join(","),
      fontSize: "1.75rem",
      lineHeight: "28.31px",
    },
    h6: {
      fontFamily: ["Abhaya Libre", "serif"].join(","),
      fontWeight: 800,
      fontSize: "18px",
      lineHeight: "21px",
    },
    overline: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "19px",
      color: "#FF1515",
    },
  },
  palette: {
    primary: {
      light: "#ffcd38",
      main: "#FFC700",
      dark: "#b28704",
      contrastText: "#fff",
    },
    secondary: {
      light: "#613D2B",
      main: "#433434",
      dark: "#972e0e",
      contrastText: "#fff",
    },
  },
});

export default theme;
