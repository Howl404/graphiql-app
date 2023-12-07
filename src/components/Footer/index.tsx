import githubIcon from 'src/assets/github-mark.svg';
import rsschoolIcon from 'src/assets/rs-school.svg';

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
            <img src={githubIcon} alt="icon" width={15} height={15} />
            <li>{developer.name}</li>
          </a>
        ))}
      </ul>
      <ul className={styles.rsList}>
        <li>2023</li>
        <li>
          <a
            className={styles.link}
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={rsschoolIcon} alt="RS School" width={70} height={30} />
          </a>
        </li>
      </ul>
    </div>
  );
}
