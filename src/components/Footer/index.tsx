import { useContext } from 'react';

import Themes from 'enums/themes';

import cls from 'utils/classnames';

import { AppThemeContext } from 'context/ThemeContext';

import githubIcon from 'assets/github-mark.svg';
import rsschoolIcon from 'assets/rs-school.svg';

import styles from './Footer.module.scss';

export default function Footer() {
  const { themeType } = useContext(AppThemeContext);
  const isDarkTheme = themeType === Themes.Dark;

  const developers = [
    { name: 'Arturas Viachirevas', github: 'https://github.com/Howl404' },
    { name: 'Kostiantyn Suslov', github: 'https://github.com/Wystov' },
    { name: 'Irina Akhanteva', github: 'https://github.com/IrinaEnotova' },
  ];
  return (
    <div
      className={cls(
        styles.wrapper,
        isDarkTheme ? styles.wrapperDark : styles.wrapperLight
      )}
    >
      <ul className={styles.githubList}>
        {developers.map((developer) => (
          <li key={developer.github} data-testid="developer-item">
            <a
              className={cls(
                styles.link,
                isDarkTheme ? styles.linkDark : styles.linkLight
              )}
              href={developer.github}
              target="_blank"
              rel="noreferrer"
            >
              <img src={githubIcon} alt="github" width={15} height={15} />
              <div>{developer.name}</div>
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.rsBlock}>
        <div data-testid="year">{new Date().getFullYear()}</div>
        <div>
          <a
            className={styles.link}
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={rsschoolIcon}
              alt="RS School"
              width={70}
              height={30}
              data-testid="rs-logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
