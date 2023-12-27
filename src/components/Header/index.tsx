import { Brightness7, BrightnessMedium } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { cloneElement, ReactElement, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'src/firebase';

import AuthMode from 'enums/authMode';
import Languages from 'enums/languages';
import Paths from 'enums/paths';
import Themes from 'enums/themes';

import { LangContext } from 'context/LangContext';
import { AppThemeContext } from 'context/ThemeContext';

import AuthService from 'services/AuthService';

import ToggleButtons from 'components/UI/Toggle';

import logo from 'assets/graphql-icon.svg';

import styles from './Header.module.scss';

type PropsType = {
  children: ReactElement;
  theme: Themes;
};

function ElevationScroll({ children, theme }: PropsType) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    sx: trigger
      ? {
          bgcolor:
            theme === Themes.Dark
              ? 'var(--primary-dark)'
              : 'var(--secondary-dark)',
          borderBottom:
            theme === Themes.Dark ? 'none' : '1px solid var(--header-light)',
          transitionDuration: '500ms',
          transitionProperty: 'padding-top, padding-bottom, background-color',
          transitionTimingFunction: 'ease-in-out',
        }
      : {
          pt: 1.1,
          pb: 1.1,
          bgcolor:
            theme === Themes.Dark ? 'var(--header)' : 'var(--header-light)',
        },
    elevation: trigger ? 4 : 0,
  });
}

export default function Header() {
  const navigate = useNavigate();
  const isAuth = !!auth.currentUser;
  const { lang, setLang } = useContext(LangContext);
  const { themeType, toggleTheme } = useContext(AppThemeContext);
  const isDarkTheme = themeType === Themes.Dark;

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
      <ElevationScroll theme={themeType}>
        <AppBar>
          <Toolbar>
            <Typography
              sx={{
                width: '100%',
                fontFamily: 'Montserrat',
              }}
              variant="h6"
              component="div"
            >
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
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={toggleTheme}
                    color="primary"
                  >
                    {isDarkTheme ? <BrightnessMedium /> : <Brightness7 />}
                  </IconButton>
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
                    {isAuth ? AuthMode.SignOut : AuthMode.SignIn}
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
