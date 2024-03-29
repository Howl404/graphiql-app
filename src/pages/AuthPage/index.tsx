import { Button, Divider, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { AuthFormInputs } from 'src/types';

import AuthService from 'services/AuthService';

import useTranslation from 'hooks/useTranslation';

import InputPassword from 'components/UI/InputPassword';

import googleIcon from 'assets/google.svg';

import confirmPasswordValidation from './utils/confirmPasswordValidation';
import passwordValidation from './utils/passwordValidation';

import styles from './AuthPage.module.scss';

type AuthMode = 'SignIn' | 'SignUp';

export default function AuthPage() {
  const translation = useTranslation();

  const initMode = useLocation().state?.mode as AuthMode | undefined;

  const [mode, setMode] = useState<AuthMode>(initMode ?? 'SignIn');
  const formRef = useRef<HTMLFormElement | null>(null);

  const isSignIn = mode === 'SignIn';

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

  const handleGoogle = () => {
    AuthService.signInWithGoogle(translation);
  };

  const onSubmit: SubmitHandler<AuthFormInputs> = async ({
    email,
    password,
  }) => {
    isSignIn
      ? await AuthService.logInWithEmailAndPassword(
          email,
          password,
          translation
        )
      : await AuthService.registerWithEmailAndPassword(
          email,
          password,
          translation
        );
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authSwitch}>
        <Button
          onClick={() => {
            setMode('SignIn');
          }}
          size="large"
          variant={isSignIn ? 'outlined' : 'text'}
          data-testid="mode-sign-in"
        >
          {translation(`Shared.SignIn`)}
        </Button>
        <Button
          onClick={() => {
            setMode('SignUp');
          }}
          size="large"
          variant={isSignIn ? 'outlined' : 'text'}
          data-testid="mode-sign-up"
        >
          {translation(`Shared.SignUp`)}
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
                required: translation('AuthPage.emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: translation('AuthPage.emailInvalid'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="email"
                  label={translation('AuthPage.email')}
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  autoComplete={'email'}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: translation('AuthPage.passwordError'),
                validate: (password) =>
                  passwordValidation(password, translation),
              }}
              render={({ field }) => (
                <InputPassword
                  field={field}
                  error={errors.password}
                  id="password"
                  label={translation('AuthPage.password')}
                  autocomplete={isSignIn ? 'current-password' : 'new-password'}
                />
              )}
            />
            {!isSignIn && (
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: translation('AuthPage.passwordConfirmError'),
                  validate: (confirm, password) =>
                    confirmPasswordValidation(confirm, password, translation),
                }}
                render={({ field }) => (
                  <InputPassword
                    field={field}
                    error={errors.confirmPassword}
                    id="confirm-password"
                    label={translation('AuthPage.passwordConfirm')}
                    autocomplete="new-password"
                  />
                )}
              />
            )}
            <Button type="submit" variant="contained" data-testid="submit-btn">
              {translation(`Shared.${mode}`)}
            </Button>
            <Divider textAlign="center">
              {translation(`AuthPage.divider`)}
            </Divider>
            <Button
              startIcon={<img src={googleIcon} alt="Google" />}
              onClick={handleGoogle}
            >
              {translation(`AuthPage.google`)}
            </Button>
          </form>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
