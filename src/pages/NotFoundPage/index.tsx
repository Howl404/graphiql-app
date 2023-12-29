import PublicIcon from '@mui/icons-material/Public';

import useTranslation from 'hooks/useTranslation';

import styles from './NotFound.module.scss';

export default function NotFoundPage() {
  const translation = useTranslation();

  return (
    <div className={styles.pageContainer}>
      <h1 aria-label={'404'}>
        4 <PublicIcon /> 4
      </h1>

      <h2 data-testid="not-found-text">{translation('NotFoundPage.error')}</h2>
    </div>
  );
}
