import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import theme from "./assets/theme/customTheme";
import { UserContextProvider } from "./logics/contexts/authContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
