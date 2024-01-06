import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';

import LangContextProvider from 'context/LangContext';
import AppThemeProvider from 'context/ThemeContext';

import Header from 'components/Header';

import ActionsPanel from './index';

describe('ActionsPanel', () => {
  const clickRun = vi.fn();
  const clickToggle = vi.fn();
  const clickPrettify = vi.fn();

  beforeEach(() => {
    render(
      <LangContextProvider>
        <AppThemeProvider>
          <ActionsPanel
            query="test query"
            sendQuery={clickRun}
            toggleDocs={clickToggle}
            setPrettifiedQuery={clickPrettify}
          />
        </AppThemeProvider>
      </LangContextProvider>
    );
  });

  it('should contain action icons', () => {
    const runIcon = screen.getByTestId('Run');
    const docsIcon = screen.getByTestId('Docs');
    const prettifyIcon = screen.getByTestId('Prettify');
    const copyIcon = screen.getByTestId('Copy');

    expect(runIcon).toBeInTheDocument();
    expect(docsIcon).toBeInTheDocument();
    expect(prettifyIcon).toBeInTheDocument();
    expect(copyIcon).toBeInTheDocument();
  });

  it('should call functions when certain icons are clicked', () => {
    const runIcon = screen.getByTestId('Run');
    const docsIcon = screen.getByTestId('Docs');
    const prettifyIcon = screen.getByTestId('Prettify');

    expect(clickRun).not.toHaveBeenCalled();
    runIcon.click();
    expect(clickRun).toHaveBeenCalledOnce();

    expect(clickToggle).not.toHaveBeenCalled();
    docsIcon.click();
    expect(clickToggle).toHaveBeenCalledOnce();

    expect(clickPrettify).not.toHaveBeenCalled();
    prettifyIcon.click();
    expect(clickPrettify).toHaveBeenCalledOnce();
  });

  it('after clicking on the copyIcon the query is copied', async () => {
    const copyIcon = screen.getByTestId('Copy');
    const user = userEvent.setup();

    await user.click(copyIcon);
    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe('test query');
  });

  it(`should change panel's style after click on theme icon`, () => {
    cleanup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppThemeProvider>
          <LangContextProvider>
            <Header />
            <ActionsPanel
              query="test query"
              sendQuery={clickRun}
              toggleDocs={clickToggle}
              setPrettifiedQuery={clickPrettify}
            />
          </LangContextProvider>
        </AppThemeProvider>
      </MemoryRouter>
    );

    const theme = screen.getByTestId('theme-icon');
    const panel = screen.getByTestId('actions-panel');

    expect(
      Array.from(panel.classList).some((classname) =>
        classname.includes('actionsLight')
      )
    ).toBe(true);
    fireEvent.click(theme);
    expect(
      Array.from(panel.classList).some((classname) =>
        classname.includes('actionsDark')
      )
    ).toBe(true);
  });
});
