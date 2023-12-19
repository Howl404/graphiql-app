import PublicIcon from '@mui/icons-material/Public';

import styles from './NotFound.module.scss';

export const NOT_FOUND_TEXT = 'Opps.. Looks like you are lost in Space';

export default function NotFoundPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headingContainer}>
        <h1>4</h1>
        <PublicIcon />
        <h1>4</h1>
      </div>

      <p data-testid="not-found-text">{NOT_FOUND_TEXT}</p>
    </div>
  );
}
