import { Button, Divider, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import AuthMode from 'enums/authMode';
import Paths from 'enums/paths';

import { AuthFormInputs } from 'src/types';

import AuthService from 'services/AuthService';

import GoogleIcon from 'components/UI/GoogleIcon';
import InputPassword from 'components/UI/InputPassword';

import confirmPasswordValidation from './utils/confirmPasswordValidation';
import passwordValidation from './utils/passwordValidation';

import styles from './AuthPage.module.scss';

export default function AuthPage() {
  const [mode, setMode] = useState<keyof typeof AuthMode>('SignIn');
  const formRef = useRef<HTMLFormElement | null>(null);

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
          {AuthMode.SignIn}
        </Button>
        <Button
          onClick={() => {
            setMode('SignUp');
          }}
          size="large"
          variant={mode === 'SignUp' ? 'outlined' : 'text'}
          data-testid="mode-sign-up"
        >
          {AuthMode.SignUp}
        </Button>
      </div>
      <SwitchTransition>
        <CSSTransition
          key={mode}
          nodeRef={formRef}
          timeout={150}
          classNames={{
            enter: styles[`authForm--${mode}-enter`],
            enterActive: styles['authForm-enter-active'],
            exit: styles['authForm-exit'],
            exitActive: styles[`authForm--${mode}-exit-active`],
          }}
        >
          <form
            className={styles.authForm}
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
          >
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
              {AuthMode[mode]}
            </Button>
            <Divider textAlign="center">or</Divider>
            <Button
              startIcon={<GoogleIcon />}
              onClick={AuthService.signInWithGoogle}
            >
              Continue with google
            </Button>
          </form>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
