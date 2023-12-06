import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { LangContext } from 'src/context/LangContext';
import { Paths } from 'src/enums';
import { auth } from 'src/firebase';
import { AuthService } from 'src/services/AuthService';

import styles from './Header.module.scss';
import ToggleButtons from '../UI/Toggle';

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    sx: trigger
      ? {
          bgcolor: 'var(--bg-color)',
          transitionDuration: '500ms',
          transitionProperty: 'padding-top, padding-bottom, background-color',
          transitionTimingFunction: 'ease-in-out',
        }
      : {
          pt: 1.1,
          pb: 1.1,
          bgcolor: 'var(--header-color)',
        },
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props: Props) {
  const { children } = props;
  const navigate = useNavigate();
  const isAuth = !!auth.currentUser;
  const { setLang } = React.useContext(LangContext);

  const handleLangClick = (value: string) => {
    setLang(value);
    localStorage.setItem('lang', value);
  };

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography sx={{ width: '100%' }} variant="h6" component="div">
              <div className={styles.wrapper}>
                <div
                  className={styles['logo-wrapper']}
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  <img src="./graphql-icon.svg" alt="" width={30} height={30} />
                  <div className={styles['logo-text']}>Graphql Sandbox</div>
                </div>
                <div className={styles['actions']}>
                  <ToggleButtons
                    handleClick={handleLangClick}
                    optionsName="language"
                    firstOption="EN"
                    secondOption="RU"
                  />
                  {isAuth ? (
                    <Button
                      className={styles['signin-btn']}
                      onClick={() => {
                        AuthService.signOutUser();
                      }}
                    >
                      Sign out
                    </Button>
                  ) : (
                    <Button
                      className={styles['signin-btn']}
                      onClick={() => {
                        navigate(Paths.Auth);
                      }}
                    >
                      Sign in
                    </Button>
                  )}
                </div>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container sx={{ minHeight: 'calc(100vh - 205px)' }}>
        <Box sx={{ my: 2 }}>{children}</Box>
      </Container>
    </>
  );
}
