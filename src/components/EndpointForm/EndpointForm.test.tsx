import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import AppThemeProvider from 'context/ThemeContext';

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
});