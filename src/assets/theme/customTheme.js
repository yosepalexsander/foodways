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
            borderRadius: 5,
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
    success: {
      light: "#0ACF83",
      main: "#3BB54A",
      dark: "#000",
      contrastText: "#fff",
    },
  },
});

export default theme;
