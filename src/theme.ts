// src/theme.ts
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    green: Palette["primary"];
    yellow: Palette["primary"];
    red: Palette["primary"];
    orange: Palette["primary"];
    violet: Palette["primary"];
    blue: Palette["primary"];
    cyan: Palette["primary"];
    gray: Palette["primary"];
  }

  interface PaletteOptions {
    green?: PaletteOptions["primary"];
    yellow?: PaletteOptions["primary"];
    red?: PaletteOptions["primary"];
    orange?: PaletteOptions["primary"];
    violet?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
    cyan?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f7b44",
    },
    secondary: {
      main: "#ff9100",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    // Extended colors
    green: {
      900: "#1B5E20",
      600: "#4CAF50",
      300: "#A5D6A7",
      100: "#E8F5E9",
    },
    yellow: {
      900: "#F57F17",
      600: "#F9A825",
      300: "#FFF176",
      100: "#FFF9C4",
    },
    red: {
      900: "#B71C1C",
      600: "#E53935",
      300: "#EF9A9A",
      100: "#FFEBEE",
    },
    orange: {
      900: "#E65100",
      600: "#FB8C00",
      300: "#FFCC80",
      100: "#FFF3E0",
    },
    violet: {
      900: "#4A148C",
      600: "#7E57C2",
      300: "#B39DDB",
      100: "#EDE7F6",
    },
    blue: {
      900: "#0D47A1",
      600: "#2196F3",
      300: "#64B5F6",
      100: "#BBDEFB",
    },
    cyan: {
      900: "#006064",
      600: "#26C6DA",
      300: "#80DEEA",
      100: "#E0F7FA",
    },
    gray: {
      900: "#212121",
      700: "#616161",
      500: "#9E9E9E",
      300: "#E0E0E0",
      100: "#F5F5F5",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontWeight: 400,
      fontSize: "96px", // 1440px viewport
      lineHeight: 1.2,
      "@media (max-width:1440px)": {
        fontSize: "96px",
      },
      "@media (max-width:1024px)": {
        fontSize: "62px",
      },
      "@media (max-width:768px)": {
        fontSize: "42px",
      },
    },
    h2: {
      fontWeight: 400,
      fontSize: "62px",
      lineHeight: 1.3,
      "@media (max-width:1024px)": {
        fontSize: "48px",
      },
      "@media (max-width:768px)": {
        fontSize: "32px",
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: "48px",
      lineHeight: 1.4,
      "@media (max-width:1024px)": {
        fontSize: "38px",
      },
      "@media (max-width:768px)": {
        fontSize: "24px",
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: "32px",
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: 1.6,
    },
    h6: {
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: 1.4,
      textTransform: "uppercase",
    },
    caption: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: 1.4,
    },
    overline: {
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: 1.4,
      textTransform: "uppercase",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          padding: "16px",
          borderRadius: 12,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderColor: "#e5e5e5",
        },
      },
    },
  },
});

export default theme;
