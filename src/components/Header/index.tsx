import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useContext,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'src/assets/graphql-icon.svg';
import { LangContext } from 'src/context/LangContext';
import { AuthMode } from 'src/enums/AuthMode';
import { Languages } from 'src/enums/Languages';
import { Paths } from 'src/enums/Paths';
import { auth } from 'src/firebase';
import { AuthService } from 'src/services/AuthService';

import ToggleButtons from 'components/UI/Toggle';

import styles from './Header.module.scss';

type PropsType = {
  children: ReactElement;
};

function ElevationScroll(props: PropsType) {
  const { children }: PropsWithChildren = props;
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

  function handleChangeLang(value: Languages) {
    setLang(value);
    localStorage.setItem('lang', value);
  }

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
                  <img src={logo} alt="Logo" width={30} height={30} />
                  <div className={styles.logoText}>Graphql Sandbox</div>
                </Link>
                <div className={styles.actions}>
                  <ToggleButtons
                    optionsName="language"
                    firstOption={Languages.EN}
                    secondOption={Languages.RU}
                    value={lang}
                    setValue={handleChangeLang}
                  />
                  <Button className={styles.authBtn} onClick={handleAuthClick}>
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
