import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, PropsWithChildren, useState } from 'react';

import Themes from 'enums/themes';

import getBrowserTheme from './utils/getBrowserTheme';
import { darkTheme, lightTheme } from './utils/themes';

type AppThemeContextData = {
  themeType: Themes;
  toggleTheme: () => void;
  isDarkTheme: boolean;
};

export const AppThemeContext = createContext<AppThemeContextData>(null!);

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const initialTheme =
    (localStorage.getItem('theme') as Themes | null) ??
    getBrowserTheme() ??
    Themes.Dark;
  const [themeType, setThemeType] = useState<Themes>(initialTheme);
  const isDarkTheme = themeType === Themes.Dark;

  const toggleTheme = () => {
    setThemeType(isDarkTheme ? Themes.Light : Themes.Dark);
    localStorage.setItem('theme', isDarkTheme ? Themes.Light : Themes.Dark);
  };

  const theme = createTheme(isDarkTheme ? darkTheme : lightTheme);

  return (
    <AppThemeContext.Provider value={{ themeType, toggleTheme, isDarkTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export default AppThemeProvider;
