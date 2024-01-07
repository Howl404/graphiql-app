import { Brightness7, BrightnessMedium } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'src/firebase';

import Languages from 'enums/languages';
import Paths from 'enums/paths';

import { LangContext } from 'context/LangContext';
import { AppThemeContext } from 'context/ThemeContext';

import AuthService from 'services/AuthService';

import useTranslation from 'hooks/useTranslation';

import ToggleButtons from 'components/UI/Toggle';

import logo from 'assets/graphql-icon.svg';

import ElevationScroll from './ElevationScroll';
import styles from './Header.module.scss';

export default function Header() {
  const navigate = useNavigate();
  const isAuth = !!auth.currentUser;
  const { lang, setLang } = useContext(LangContext);
  const { themeType, toggleTheme, isDarkTheme } = useContext(AppThemeContext);

  const translation = useTranslation();

  function handleAuthClick() {
    if (isAuth) {
      AuthService.signOutUser();
    }
    navigate(Paths.Auth);
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
                <Link to={Paths.Welcome} className={styles.logoWrapper}>
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
                    data-testid="theme-icon"
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
