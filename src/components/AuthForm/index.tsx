import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { AuthMode } from 'src/enums';
import { AuthService } from 'src/services/AuthService';
import { AuthFormInputs } from 'src/types';
import {
  confirmPasswordValidation,
  passwordValidation,
} from 'src/utils/password-validation';

import style from './style.module.scss';
import InputPassword from '../common/InputPassword';

export default function AuthForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [formError, setFormError] = useState<string | null>(null);

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
      mode === 'signin'
        ? await AuthService.logInWithEmailAndPassword(email, password)
        : await AuthService.registerWithEmailAndPassword(email, password);
    response.ok ? console.log('router redirect') : setFormError(response.error);
  };

  return (
    <div className={style['auth-container']}>
      <div className={style['auth-switch']}>
        <Button
          onClick={() => {
            setMode('signin');
          }}
          size="large"
          variant={mode === 'signin' ? 'outlined' : 'text'}
        >
          {AuthMode.signin}
        </Button>
        <Button
          onClick={() => {
            setMode('signup');
          }}
          size="large"
          variant={mode === 'signup' ? 'outlined' : 'text'}
        >
          {AuthMode.signup}
        </Button>
      </div>
      <form className={style['auth-form']} onSubmit={handleSubmit(onSubmit)}>
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
              error={errors.email ? true : false}
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
        {mode === 'signup' && (
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
        <Button type="submit" variant="contained">
          {AuthMode[mode]}
        </Button>

        {/* TODO: Change mui snackbar to toastify */}

        <Snackbar
          open={formError !== null}
          autoHideDuration={5000}
          onClose={() => setFormError(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert severity="error">{formError}</Alert>
        </Snackbar>
      </form>
    </div>
  );
}
