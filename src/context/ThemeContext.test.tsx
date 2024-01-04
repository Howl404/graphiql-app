import { act, render } from '@testing-library/react';
import { useContext } from 'react';
import { describe, expect, it, vi } from 'vitest';

import Themes from 'enums/themes';

import AppThemeProvider, { AppThemeContext } from 'context/ThemeContext';

describe('AppThemeProvider', () => {
  it('should toggle theme from light to dark and vice versa', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(Themes.Light);
    vi.spyOn(Storage.prototype, 'setItem');

    let themeContextValue = null;

    const TestComponent = () => {
      const { themeType, toggleTheme } = useContext(AppThemeContext);
      themeContextValue = themeType;
      return <button onClick={toggleTheme}>Toggle Theme</button>;
    };

    const { getByText } = render(
      <AppThemeProvider>
        <TestComponent />
      </AppThemeProvider>
    );

    const button = getByText('Toggle Theme');

    expect(themeContextValue).toBe(Themes.Light);
    expect(localStorage.getItem('theme')).toBe(Themes.Light);

    act(() => {
      button.click();
    });

    expect(themeContextValue).toBe(Themes.Dark);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', Themes.Dark);

    act(() => {
      button.click();
    });

    expect(themeContextValue).toBe(Themes.Light);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', Themes.Light);
  });
});
