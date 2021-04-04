import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
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
    MuiButton: {
      variants: [
        {
          props: { variant: "fileInput" },
          style: {
            backgroundColor: "rgba(210,210,210,0.25)",
            color: "#1F1F1F",
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid rgb(118,108,108)",
            borderRadius: "5px",
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: ["Cabin", "sans-serif"].join(","),
    button: {
      fontFamily: ["Cabin", "sans-serif"].join(","),
      fontWeight: 800,
      textTransform: "none",
      fontSize: "16px",
    },
    h1: {
      fontFamily: ["Abhaya Libre", "serif"].join(","),
      fontWeight: 800,
      fontSize: "55px",
      lineHeight: 1.18,
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
      fontSize: "32px",
      lineHeight: 1.32,
    },
    h5: {
      fontFamily: ["Abhaya Libre", "serif"].join(","),
      fontSize: "28px",
      lineHeight: 1.01,
    },
    h6: {
      fontFamily: ["Abhaya Libre", "serif"].join(","),
      fontWeight: 800,
      fontSize: "18px",
      lineHeight: 1.167,
    },
    overline: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: 1.36,
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
    success: {
      light: "#0ACF83",
      main: "#3BB54A",
      dark: "#000",
      contrastText: "#fff",
    },
  },
});

theme = responsiveFontSizes(theme, {
  factor: 4
});
export default theme;
