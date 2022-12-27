import { CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/system/ThemeProvider/ThemeProvider";
import * as React from "react";
import { Routing } from "./pages/routing";
import { theme } from "./pages/theme";
import "./style.css";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routing />
    </ThemeProvider>
  );
}
