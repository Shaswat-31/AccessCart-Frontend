import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1a73e8",   // Bright blue
      light: "#e8f0fe",  // Light blue
      dark: "#174ea6",   // Dark blue
      contrastText: "#ffffff",  // White text
    },
    secondary: {
      main: "#fbbc05",   // Bright yellow
      light: "#fff7d6",  // Light yellow
      dark: "#c69300",   // Dark yellow
      contrastText: "#000000",  // Black text
    },
    background: {
      default: "#f5f5f5",  // Light gray background
      paper: "#ffffff",    // White paper background
    },
    text: {
      primary: "#202124",  // Dark text
      secondary: "#5f6368", // Gray text
    },
  },
  
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
      "@media (max-width:900px)": {
        fontSize: "2.8rem",
      },
      "@media (max-width:600px)": {
        fontSize: "2.2rem",
      },
    },
    h2: {
      fontSize: "2.8rem",
      fontWeight: 500,
      lineHeight: 1.3,
      "@media (max-width:900px)": {
        fontSize: "2.4rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.8rem",
      },
    },
    body1: {
      fontSize: "1.1rem",
      fontWeight: 400,
      lineHeight: 1.7,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    button: {
      textTransform: "none",  // No uppercase letters for buttons
      fontWeight: 600,
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners for buttons
          padding: "10px 20px",
          fontWeight: "bold",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a73e8", // Primary color for the AppBar
        },
      },
    },
  },
});

export default theme;
