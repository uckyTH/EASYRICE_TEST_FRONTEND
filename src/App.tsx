import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "./theme";
import { Router } from "./Routes";
import "./App.css";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ marginBottom: 3, backgroundColor: 'grey.300' }}>
        <Typography variant="h4" marginLeft={10} color="green.900">
          EASYRICE TEST
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Router />
      </Container>
    </ThemeProvider>
  );
}

export default App;
