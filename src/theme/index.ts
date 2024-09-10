'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    subtitle2: {
      fontSize: '1.7rem',
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1.2rem',
    },
  },
});
export const providerTheme = responsiveFontSizes(theme);
