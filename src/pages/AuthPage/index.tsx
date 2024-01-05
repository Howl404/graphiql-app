import { Button, Divider, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Paths from 'enums/paths';

import { AuthFormInputs } from 'src/types';

import AuthService from 'services/AuthService';

import useTranslation from 'hooks/useTranslation';

import GoogleIcon from 'components/UI/GoogleIcon';
import InputPassword from 'components/UI/InputPassword';

import confirmPasswordValidation from './utils/confirmPasswordValidation';
import passwordValidation from './utils/passwordValidation';

import styles from './AuthPage.module.scss';

type AuthMode = 'SignIn' | 'SignUp' | 'SignOut';

export default function AuthPage() {
  const translation = useTranslation();
  const navigate = useNavigate();
  const initMode = useLocation().state?.mode as AuthMode | undefined;

  const [mode, setMode] = useState<AuthMode>(initMode ?? 'SignIn');
  const formRef = useRef<HTMLFormElement | null>(null);

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
    const response =
      mode === 'SignIn'
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
                />
              )}
            />
            {mode === 'SignUp' && (
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
            <Button startIcon={<GoogleIcon />} onClick={handleGoogle}>
              {translation(`AuthPage.google`)}
            </Button>
          </form>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
