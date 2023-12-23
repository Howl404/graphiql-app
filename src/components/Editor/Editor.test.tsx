import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import EditorMode from 'enums/editorMode';

import '@testing-library/jest-dom';
import Editor from './index';

describe('Editor', () => {
  const handleChange = vi.fn();

  it('should render readonly json viewer with the passed JSON', () => {
    const data = JSON.stringify({
      data: {
        rockets: [
          {
            country: 'Republic of the Marshall Islands',
          },
          {
            country: 'United States',
          },
        ],
      },
    });

    render(
      <Editor
        editorMode={EditorMode.JSON}
        value={data}
        setValue={handleChange}
      />
    );

    const viewer = screen.getByTestId('viewer');
    const editor = screen.queryByTestId('editor');
    const itemCountries = screen.getAllByText(/country/i);

    expect(viewer).toBeInTheDocument();
    expect(editor).not.toBeInTheDocument();
    expect(itemCountries.length).toBe(2);
  });
});
