import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { AuthFormInputs } from 'src/types';

import AuthForm from '.';
import '@testing-library/jest-dom';
import confirmPasswordValidation from './utils/confirmPasswordValidation';
import passwordValidation from './utils/passwordValidation';

describe('Tests for AuthForm component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    );
  });

  it('should render login form by default', () => {
    const passwordInput = screen.queryByLabelText('Password');
    const confirmPasswordInput = screen.queryByLabelText('Confirm password');
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).not.toBeInTheDocument();
  });

  it('should switch form mode on button click', async () => {
    const btnSignUp = screen.getByTestId('mode-sign-up');
    const btnSignIn = screen.getByTestId('mode-sign-in');
    fireEvent.click(btnSignUp);

    await waitFor(() => {
      const confirmPasswordInput = screen.queryByLabelText('Confirm password');
      expect(confirmPasswordInput).toBeInTheDocument();
    });

    fireEvent.click(btnSignIn);

    await waitFor(() => {
      const passwordInput = screen.queryByLabelText('Password');
      const confirmPasswordInput = screen.queryByLabelText('Confirm password');
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).not.toBeInTheDocument();
    });
  });

  it('should validate password', () => {
    expect(passwordValidation('a')).toBe('At least one uppercase letter');
    expect(passwordValidation('A')).toBe('At least one lowercase letter');
    expect(passwordValidation('aA')).toBe('At least one number');
    expect(passwordValidation('aA1')).toBe('At least one special character');
    expect(passwordValidation('aA1!')).toBe('At least 8 characters');
    expect(passwordValidation('aA12345678!')).toBeTruthy();
  });

  it('should confirm that passwords match', () => {
    expect(
      confirmPasswordValidation('a', { password: 'b' } as AuthFormInputs)
    ).toBe('Passwords do not match');

    expect(
      confirmPasswordValidation('a', { password: 'a' } as AuthFormInputs)
    ).toBeTruthy();
  });
});
