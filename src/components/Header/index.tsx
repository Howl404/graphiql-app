import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { cloneElement, ReactElement, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'src/firebase';

import Languages from 'enums/languages';
import Paths from 'enums/paths';

import { LangContext } from 'context/LangContext';

import AuthService from 'services/AuthService';

import useTranslation from 'hooks/useTranslation';

import ToggleButtons from 'components/UI/Toggle';

import logo from 'assets/graphql-icon.svg';

import styles from './Header.module.scss';

type PropsType = {
  children: ReactElement;
};

function ElevationScroll({ children }: PropsType) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    sx: trigger
      ? {
          bgcolor: 'var(--primary-dark)',
          transitionDuration: '500ms',
          transitionProperty: 'padding-top, padding-bottom, background-color',
          transitionTimingFunction: 'ease-in-out',
        }
      : {
          pt: 1.1,
          pb: 1.1,
          bgcolor: 'var(--header)',
        },
    elevation: trigger ? 4 : 0,
  });
}

export default function Header() {
  const navigate = useNavigate();
  const isAuth = !!auth.currentUser;
  const { lang, setLang } = useContext(LangContext);

  const translation = useTranslation();

  function handleAuthClick() {
    if (isAuth) {
      AuthService.signOutUser();
    } else {
      navigate(Paths.Auth);
    }
  }

  return (
    <>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Typography sx={{ width: '100%' }} variant="h6" component="div">
              <div className={styles.wrapper}>
                <Link to={Paths.Main} className={styles.logoWrapper}>
                  <img
                    src={logo}
                    alt="Logo"
                    width={30}
                    height={30}
                    data-testid="logo"
                  />
                  <div className={styles.logoText}>GraphQL Sandbox</div>
                </Link>
                <div className={styles.actions}>
                  <ToggleButtons
                    optionsName="language"
                    firstOption={Languages.EN}
                    secondOption={Languages.RU}
                    value={lang}
                    setValue={setLang}
                  />
                  <Button
                    className={styles.authBtn}
                    onClick={handleAuthClick}
                    data-testid={isAuth ? 'sign-out-btn' : 'sign-in-btn'}
                  >
                    {isAuth
                      ? translation('Shared.SignOut')
                      : translation('Shared.SignIn')}
                  </Button>
                </div>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
}
