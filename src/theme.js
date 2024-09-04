// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B', 
    },
    secondary: {
      main: '#FF9F1C', 
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;
