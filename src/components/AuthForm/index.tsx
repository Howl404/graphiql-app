import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthMode from 'src/enums/authMode';
import Paths from 'src/enums/paths';
import { AuthService } from 'src/services/AuthService';
import { AuthFormInputs } from 'src/types';
import {
  confirmPasswordValidation,
  passwordValidation,
} from 'src/utils/password-validation';

import InputPassword from 'components/common/InputPassword';

import style from './style.module.scss';

export default function AuthForm() {
  const [mode, setMode] = useState<keyof typeof AuthMode>('SignIn');
  const [formError, setFormError] = useState<string | null>(null);
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
    response.ok ? navigate(Paths.Main) : setFormError(response.error);
  };

  return (
    <div className={style.authContainer}>
      <div className={style.authSwitch}>
        <Button
          onClick={() => {
            setMode('SignIn');
          }}
          size="large"
          variant={mode === 'SignIn' ? 'outlined' : 'text'}
        >
          {AuthMode.SignIn}
        </Button>
        <Button
          onClick={() => {
            setMode('SignUp');
          }}
          size="large"
          variant={mode === 'SignUp' ? 'outlined' : 'text'}
        >
          {AuthMode.SignUp}
        </Button>
      </div>
      <form className={style.authForm} onSubmit={handleSubmit(onSubmit)}>
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
