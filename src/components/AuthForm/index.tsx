import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Paths from 'enums/paths';

import { AuthFormInputs } from 'src/types';

import AuthService from 'services/AuthService';

import useTranslation from 'hooks/useTranslation';

import InputPassword from 'components/UI/InputPassword';

import confirmPasswordValidation from './utils/confirmPasswordValidation';
import passwordValidation from './utils/passwordValidation';

import styles from './AuthForm.module.scss';

type AuthMode = 'SignIn' | 'SignUp' | 'SignOut';

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('SignIn');

  const translation = useTranslation();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    mode: 'onChange',
    delayError: 500,
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<AuthFormInputs> = async ({
    email,
    password,
  }) => {
    const response =
      mode === 'SignIn'
        ? await AuthService.logInWithEmailAndPassword(email, password)
        : await AuthService.registerWithEmailAndPassword(email, password);
    response && navigate(Paths.Main);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authSwitch}>
        <Button
          onClick={() => {
            setMode('SignIn');
          }}
          size="large"
          variant={mode === 'SignIn' ? 'outlined' : 'text'}
          data-testid="mode-sign-in"
        >
          {translation(`Shared.SignIn`)}
        </Button>
        <Button
          onClick={() => {
            setMode('SignUp');
          }}
          size="large"
          variant={mode === 'SignUp' ? 'outlined' : 'text'}
          data-testid="mode-sign-up"
        >
          {translation(`Shared.SignUp`)}
        </Button>
      </div>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter valid email address',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="email"
              label="E-mail"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            validate: passwordValidation,
          }}
          render={({ field }) => (
            <InputPassword
              field={field}
              error={errors.password}
              id="password"
              label="Password"
            />
          )}
        />
        {mode === 'SignUp' && (
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirmation of password is required',
              validate: confirmPasswordValidation,
            }}
            render={({ field }) => (
              <InputPassword
                field={field}
                error={errors.confirmPassword}
                id="confirm-password"
                label="Confirm password"
              />
            )}
          />
        )}
        <Button type="submit" variant="contained" data-testid="submit-btn">
          {translation(`Shared.${mode}`)}
        </Button>
      </form>
    </div>
  );
}
