import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { createContext, PropsWithChildren, useState } from 'react';

import Themes from 'enums/themes';

import { darkTheme, lightTheme } from './utils/themes';

type AppThemeContextData = {
  themeType: Themes;
  toggleTheme: () => void;
};

export const AppThemeContext = createContext<AppThemeContextData>(null!);

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const initialTheme =
    (localStorage.getItem('theme') as Themes | null) ?? Themes.Dark;
  const [themeType, setThemeType] = useState<Themes>(initialTheme);

  const toggleTheme = () => {
    setThemeType((prevTheme) =>
      prevTheme === Themes.Light ? Themes.Dark : Themes.Light
    );
    localStorage.setItem(
      'theme',
      themeType === Themes.Light ? Themes.Dark : Themes.Light
    );
  };

  const theme = createTheme(
    themeType === Themes.Dark
      ? (darkTheme as ThemeOptions)
      : (lightTheme as ThemeOptions)
  );

  return (
    <AppThemeContext.Provider value={{ themeType, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export default AppThemeProvider;
