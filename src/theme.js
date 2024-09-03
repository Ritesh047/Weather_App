// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B', // Coral Pink
    },
    secondary: {
      main: '#FF9F1C', // Tangerine
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;
