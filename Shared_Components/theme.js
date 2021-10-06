import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: "##5C3B42",
      light: "##9C3C41",
      dark: "##5C3B42",
      contrastText: '#E4E5E7',
    },
    secondary: {
      main: "#061621",
      light: "#12393D",
      dark: "#061621",
      contrastText: '#E4E5E7',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
}));

