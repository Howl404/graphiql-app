import { fireEvent, render, screen } from '@testing-library/react';
import { FieldError } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import InputPassword from './index';

describe('InputPassword Component', () => {
  it('should toggle password visibility and contain correct error', () => {
    const props = {
      field: {
        onChange: () => {},
        onBlur: () => {},
        value: '',
        name: 'password',
        ref: () => {},
      },
      error: { message: 'test-error' } as FieldError,
      id: 'password',
      label: 'Password',
    };

    render(<InputPassword {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const input = screen.getByLabelText(props.label) as HTMLInputElement;
    expect(input.type).toBe('text');

    fireEvent.click(button);
    expect(input.type).toBe('password');

    const errorMessage = screen.getByText('test-error');
    expect(errorMessage).toBeDefined();
  });
});
