import { ThemeOptions } from '@mui/material';
import { blue, indigo } from '@mui/material/colors';

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: { default: 'var(--primary-dark)' },
    primary: { main: blue[500] },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
    fontSize: 14,
  },
};

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    background: { default: 'var(--secondary-dark)' },
    primary: { main: indigo[500] },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
    fontSize: 14,
  },
};
