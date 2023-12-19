import Button from '@mui/material/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase.ts';

import authMode from 'enums/authMode';
import Paths from 'enums/paths';

import { useTranslation } from 'hooks/useTranslation';

import styles from './MainPage.module.scss';

export default function MainPage() {
  const [user] = useAuthState(auth);

  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.buttonsContainer}>
        {user ? (
          <Button href={Paths.Editor} variant={'outlined'}>
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
        <h1>{t('MainPage.heading')}</h1>
        <p>{t('MainPage.shortDescription')}</p>

        <ul>
          <li>{t('MainPage.firstFeature')}</li>
          <li>{t('MainPage.secondFeature')}</li>
          <li>{t('MainPage.thirdFeature')}</li>
        </ul>

        <h2>{t('MainPage.aboutUsHeading')}</h2>
        <p>{t('MainPage.aboutUsText')}</p>

        <h2>{t('MainPage.aboutCourseHeading')}</h2>
        <p>{t('MainPage.aboutCourseText')}</p>
      </div>
    </div>
  );
}
