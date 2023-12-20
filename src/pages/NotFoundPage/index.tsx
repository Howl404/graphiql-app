import PublicIcon from '@mui/icons-material/Public';

import styles from './NotFound.module.scss';

export const NOT_FOUND_TEXT = 'Opps.. Looks like you are lost in Space';

export default function NotFoundPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 aria-label={'404'}>
        4 <PublicIcon /> 4
      </h1>

      <h2 data-testid="not-found-text">{NOT_FOUND_TEXT}</h2>
    </div>
  );
}
