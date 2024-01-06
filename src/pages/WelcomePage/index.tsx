import Button from '@mui/material/Button';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from 'src/firebase';

import Paths from 'enums/paths';

import { AppThemeContext } from 'context/ThemeContext';

import useTranslation from 'hooks/useTranslation';

import Loader from 'components/UI/Loader';

import astronaut from 'assets/astronaut.png';
import dark from 'assets/dark-graphiql.png';
import light from 'assets/light-graphiql.png';

import styles from './WelcomePage.module.scss';

export default function WelcomePage() {
  const [user, loading] = useAuthState(auth);
  const { isDarkTheme } = useContext(AppThemeContext);

  const translation = useTranslation();

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.buttonsContainer}>
        {user ? (
          <Button
            component={Link}
            to={Paths.Main}
            variant={'outlined'}
            data-testid="mainpage"
          >
            {translation(`Shared.MainPage`)}
          </Button>
        ) : (
          <>
            <Button
              component={Link}
              to={Paths.Auth}
              variant={'outlined'}
              data-testid="signin"
            >
              {translation(`Shared.SignIn`)}
            </Button>
            <Button
              component={Link}
              to={Paths.Auth}
              state={{ mode: 'SignUp' }}
              variant={'outlined'}
              data-testid="signup"
            >
              {translation(`Shared.SignUp`)}
            </Button>
          </>
        )}
      </div>
      <div className={styles.textContainer}>
        <h1>{translation('WelcomePage.heading')}</h1>
        <p>{translation('WelcomePage.shortDescription')}</p>

        <div className={styles.features}>
          <ul>
            <li>{translation('WelcomePage.firstFeature')}</li>
            <li>{translation('WelcomePage.secondFeature')}</li>
            <li>{translation('WelcomePage.thirdFeature')}</li>
          </ul>
          <img
            className={styles.graphiqlImg}
            src={isDarkTheme ? dark : light}
            alt="Graphql page"
            width={400}
          />
        </div>

        <div className={styles.aboutUs}>
          <img src={astronaut} alt="Our team" width={300} />
          <div>
            <h2>{translation('WelcomePage.aboutUsHeading')}</h2>
            <p>{translation('WelcomePage.aboutUsText')}</p>
          </div>
        </div>

        <h2>{translation('WelcomePage.aboutCourseHeading')}</h2>
        <p>{translation('WelcomePage.aboutCourseText')}</p>
      </div>
    </div>
  );
}
