import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import AuthForm from './index';
import '@testing-library/jest-dom';

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
});
