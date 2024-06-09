import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(15 23 42)",
      paper: "rgb(30 41 59)",
    },
    primary: {
      main: "rgb(37 99 235)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          textTransform: "none",
          textWrap: "nowrap",
        },
      },
    },
  },
});

export default theme;
