import Button from '@mui/material/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from 'src/firebase';

import Paths from 'enums/paths';

import useTranslation from 'hooks/useTranslation';

import Loader from 'components/UI/Loader';

import styles from './MainPage.module.scss';

export default function MainPage() {
  const [user, loading] = useAuthState(auth);

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
            to={Paths.Graphiql}
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
              variant={'outlined'}
              data-testid="signup"
            >
              {translation(`Shared.SignUp`)}
            </Button>
          </>
        )}
      </div>
      <div className={styles.textContainer}>
        <h1>{translation('MainPage.heading')}</h1>
        <p>{translation('MainPage.shortDescription')}</p>

        <ul>
          <li>{translation('MainPage.firstFeature')}</li>
          <li>{translation('MainPage.secondFeature')}</li>
          <li>{translation('MainPage.thirdFeature')}</li>
        </ul>

        <h2>{translation('MainPage.aboutUsHeading')}</h2>
        <p>{translation('MainPage.aboutUsText')}</p>

        <h2>{translation('MainPage.aboutCourseHeading')}</h2>
        <p>{translation('MainPage.aboutCourseText')}</p>
      </div>
    </div>
  );
}
