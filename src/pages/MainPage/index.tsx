import Button from '@mui/material/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase';

import authMode from 'enums/authMode';
import Paths from 'enums/paths';

import { useTranslation } from 'hooks/useTranslation';

import styles from './MainPage.module.scss';

export default function MainPage() {
  const [user] = useAuthState(auth);

  const translation = useTranslation();

  return (
    <div>
      <div className={styles.buttonsContainer}>
        {user ? (
          <Button href={Paths.Graphiql} variant={'outlined'}>
            Main Page
          </Button>
        ) : (
          <>
            <Button href={Paths.Auth} variant={'outlined'}>
              {authMode.SignIn}
            </Button>
            <Button href={Paths.Auth} variant={'outlined'}>
              {authMode.SignUp}
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
