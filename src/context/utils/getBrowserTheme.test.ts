import { describe, expect, it, vi } from 'vitest';

import Themes from 'enums/themes';

import getBrowserTheme from './getBrowserTheme';

describe('getBrowserTheme', () => {
  it('returns dark theme when prefers-color-scheme is dark', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const theme = getBrowserTheme();
    expect(theme).toBe(Themes.Dark);
  });

  it('returns light theme when prefers-color-scheme is not dark', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const theme = getBrowserTheme();
    expect(theme).toBe(Themes.Light);
  });
});
