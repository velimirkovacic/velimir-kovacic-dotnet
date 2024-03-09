import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          fontFamily: "Inter",
          textTransform: "none",
          backgroundColor: "#A26AD2",
          "&:hover": {
            backgroundColor: "#8a43c6",
            boxShadow: "none",
          },
          borderRadius: "32px",
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "32px",
          backgroundColor: "white",
          //padding: '0px',
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
          "& .MuiOutlinedInput-input": {
            padding: "0px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
            borderWidth: "1px",
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
