import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SchemaItemsList from '.';
import '@testing-library/jest-dom';

describe('Tests for SchemaItemsList component', () => {
  const props = {
    title: 'List title',
    data: [
      {
        name: 'landings',
        type: {
          kind: 'SCALAR',
          name: 'Int',
          ofType: null,
        },
      },
      {
        name: 'missions',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: 'CapsuleMission',
            ofType: null,
          },
        },
      },
    ],
    handleFieldClick: vi.fn(),
  };

  it('renders all items', async () => {
    render(<SchemaItemsList {...props} />);

    const listItems = screen.getAllByRole('listitem');
    const title = screen.getByText(props.title);

    expect(listItems.length).toBe(2);
    expect(title).toBeInTheDocument();
  });
});
