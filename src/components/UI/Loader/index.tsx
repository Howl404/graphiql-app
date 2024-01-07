import styles from './Loader.module.scss';

export default function Loader() {
  return <span className={styles.loader} data-testid="loader"></span>;
}
