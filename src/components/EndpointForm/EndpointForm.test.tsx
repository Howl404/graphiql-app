import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import LangContextProvider from 'context/LangContext';
import AppThemeProvider from 'context/ThemeContext';

import Header from 'components/Header';

import EndpointForm from './index';

describe('EndpointForm', () => {
  const changeEndpoint = vi.fn();
  const changeInput = vi.fn();

  beforeEach(() => {
    render(
      <AppThemeProvider>
        <EndpointForm
          inputValue=""
          handleChangeEndpoint={changeEndpoint}
          handleChangeInput={changeInput}
        />
      </AppThemeProvider>
    );
  });

  it('should contain specific content', () => {
    const input = screen.getByTestId('endpoint-input');
    const btn = screen.getByTestId('endpoint-btn');

    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('should call function changeEndpoint after clicking the button', () => {
    const btn = screen.getByTestId('endpoint-btn');

    expect(changeEndpoint).not.toHaveBeenCalled();
    btn.click();
    expect(changeEndpoint).toHaveBeenCalledOnce();
  });

  it(`should change wrapper's style after click on theme icon`, () => {
    cleanup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppThemeProvider>
          <LangContextProvider>
            <Header />
            <EndpointForm
              inputValue=""
              handleChangeEndpoint={changeEndpoint}
              handleChangeInput={changeInput}
            />
          </LangContextProvider>
        </AppThemeProvider>
      </MemoryRouter>
    );

    const theme = screen.getByTestId('theme-icon');
    const input = screen.getByTestId('endpoint-input');

    expect(
      Array.from(input.classList).some((classname) =>
        classname.includes('inputLight')
      )
    ).toBe(true);
    fireEvent.click(theme);
    expect(
      Array.from(input.classList).some((classname) =>
        classname.includes('inputDark')
      )
    ).toBe(true);
  });
});
