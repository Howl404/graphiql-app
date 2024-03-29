import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import LangContextProvider from 'context/LangContext';

import SchemaBreadcrumbs from './index';

import '@testing-library/jest-dom';

const mockTranslation = (str: string) => str;

describe('Tests for SchemaBreadcrumbs component', () => {
  const onClick = vi.fn();

  it('renders only disabled root for empty list', () => {
    render(
      <MemoryRouter>
        <LangContextProvider>
          <SchemaBreadcrumbs
            items={[]}
            handleClick={onClick}
            translation={mockTranslation}
          />
        </LangContextProvider>
      </MemoryRouter>
    );

    const breadcrumbs = screen.getAllByRole('button');

    expect(breadcrumbs.length).toBe(1);
    expect(breadcrumbs[0]).toHaveTextContent('MainPage.root');
    expect(breadcrumbs[0]).toBeDisabled();
  });

  it('renders all breadcrumbs and they work', () => {
    const items = [
      {
        type: 'Query',
        name: 'query',
        text: 'Query',
      },
      {
        type: 'Capsule',
        name: 'capsule',
        text: 'Capsule',
      },
    ];

    render(
      <MemoryRouter>
        <LangContextProvider>
          <SchemaBreadcrumbs
            items={items}
            handleClick={onClick}
            translation={mockTranslation}
          />
        </LangContextProvider>
      </MemoryRouter>
    );

    const breadcrumbs = screen.getAllByRole('button');

    expect(breadcrumbs.length).toBe(3);
    expect(breadcrumbs[2]).toBeDisabled();
    expect(breadcrumbs[0]).not.toBeDisabled();

    breadcrumbs[0].click();

    expect(onClick).toHaveBeenCalledWith(0);
  });

  it('puts type as textcontent if name is undefined and onclick is called with right index', () => {
    const items = [
      {
        type: 'Query',
        text: 'Query',
      },
      { type: 'Next', text: 'next' },
      { type: 'Last', text: 'last' },
    ];
    render(
      <MemoryRouter>
        <LangContextProvider>
          <SchemaBreadcrumbs
            items={items}
            handleClick={onClick}
            translation={mockTranslation}
          />
        </LangContextProvider>
      </MemoryRouter>
    );

    const breadcrumbs = screen.getAllByRole('button');

    expect(breadcrumbs[1]).toHaveTextContent(items[0].type);

    fireEvent.click(breadcrumbs[1]);

    expect(onClick).toHaveBeenCalledWith(1);
  });
});
