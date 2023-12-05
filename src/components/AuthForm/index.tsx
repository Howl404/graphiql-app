import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { AuthService } from 'src/services/AuthService';
import { AuthFormInputs } from 'src/types';
import {
  confirmPasswordValidation,
  passwordValidation,
} from 'src/utils/password-validation';

import style from './style.module.scss';
import InputPassword from '../common/InputPassword';

export default function AuthForm() {
  const [mode, setMode] = useState('signin');

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

  const onSubmit: SubmitHandler<AuthFormInputs> = ({ email, password }) => {
    mode === 'signin'
      ? AuthService.logInWithEmailAndPassword(email, password)
      : AuthService.registerWithEmailAndPassword(email, password);
  };

  return (
    <div className={style['auth-container']}>
      <div className={style['auth-switch']}>
        <Button
          onClick={() => {
            setMode('signin');
          }}
        >
          Sign In
        </Button>
        <Button
          onClick={() => {
            setMode('signup');
          }}
        >
          Sign Up
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
          {mode === 'signin' ? 'Sign in' : 'Sign up'}
        </Button>
      </form>
    </div>
  );
}
