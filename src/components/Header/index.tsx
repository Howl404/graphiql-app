import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { PropsWithChildren, ReactElement, cloneElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthMode, Paths } from 'src/enums';
import { auth } from 'src/firebase';
import { AuthService } from 'src/services/AuthService';

import ToggleButtons from 'components/UI/Toggle';

import styles from './Header.module.scss';

type Props = {
  children?: ReactElement;
};

function ElevationScroll(props: Props) {
  const { children }: PropsWithChildren = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children!, {
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

export default function Header(props: Props) {
  const navigate = useNavigate();
  const isAuth = !!auth.currentUser;

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography sx={{ width: '100%' }} variant="h6" component="div">
              <div className={styles.wrapper}>
                <div
                  className={styles.logoWrapper}
                  onClick={() => {
                    navigate(Paths.Main);
                  }}
                >
                  <img src="./graphql-icon.svg" alt="" width={30} height={30} />
                  <div className={styles.logoText}>Graphql Sandbox</div>
                </div>
                <div className={styles.actions}>
                  <ToggleButtons
                    optionsName="language"
                    firstOption="EN"
                    secondOption="RU"
                  />
                  {isAuth ? (
                    <Button
                      className={styles.signinBtn}
                      onClick={() => {
                        AuthService.signOutUser();
                      }}
                    >
                      {AuthMode.SignOut}
                    </Button>
                  ) : (
                    <Button
                      className={styles.signinBtn}
                      onClick={() => {
                        navigate(Paths.Auth);
                      }}
                    >
                      {AuthMode.SignIn}
                    </Button>
                  )}
                </div>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container></Container>
    </>
  );
}
