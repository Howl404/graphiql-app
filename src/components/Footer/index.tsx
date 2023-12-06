import styles from './Footer.module.scss';

export default function Footer() {
  const developers = [
    { name: 'Arturas Viachirevas', github: 'https://github.com/Howl404' },
    { name: 'Kostiantyn Suslov', github: 'https://github.com/Wystov' },
    { name: 'Irina Akhanteva', github: 'https://github.com/IrinaEnotova' },
  ];
  return (
    <div className={styles.wrapper}>
      <ul className={styles.githubList}>
        {developers.map((developer) => (
          <a
            key={developer.github}
            className={styles.link}
            href={developer.github}
            target="_blank"
            rel="noreferrer"
          >
            <img src="/github-mark.svg" alt="icon" width={15} height={15} />
            <li>{developer.name}</li>
          </a>
        ))}
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
