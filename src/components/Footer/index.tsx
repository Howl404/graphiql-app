import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.githubList}>
        <a
          className={styles.link}
          href="https://github.com/Howl404"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/github-mark.svg" alt="icon" width={15} height={15} />
          <li>Arturas Viachirevas</li>
        </a>
        <a
          className={styles.link}
          href="https://github.com/Wystov"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/github-mark.svg" alt="icon" width={15} height={15} />
          <li>Kostiantyn Suslov</li>
        </a>
        <a
          className={styles.link}
          href="https://github.com/IrinaEnotova"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/github-mark.svg" alt="icon" width={15} height={15} />
          <li>Irina Akhanteva</li>
        </a>
      </ul>
      <ul className={styles.rsList}>
        <li>2023</li>
        <a
          className={styles.link}
          href="https://rs.school/react/"
          target="_blank"
          rel="noreferrer"
        >
          <li>
            <img src="/rs-school.svg" alt="RS School" width={70} height={30} />
          </li>
        </a>
      </ul>
    </div>
  );
}
